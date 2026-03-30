const { setGlobalOptions } = require("firebase-functions");
const { onRequest, onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const crypto = require("crypto");

setGlobalOptions({ 
    maxInstances: 10,
    cors: true 
});

admin.initializeApp();
const db = admin.firestore();

const PAYSTACK_SECRET = defineSecret("PAYSTACK_SECRET");

exports.paystackWebhook = onRequest(
    {
        secrets: [PAYSTACK_SECRET],
        ingressSettings: "ALLOW_ALL",
    },
    async (req, res) => {
        try {
            // 1️⃣ Verify signature
            const secret = PAYSTACK_SECRET.value();
            const hash = crypto
                .createHmac("sha512", secret)
                .update(JSON.stringify(req.body))
                .digest("hex");

            if (hash !== req.headers["x-paystack-signature"]) {
                console.error("Invalid Paystack signature");
                return res.status(400).send("Invalid signature");
            }

            const event = req.body;
            const eventType = event.event;
            const data = event.data;

            console.log("Paystack event received:", eventType);

            // 2️⃣ Find user
            const email = data?.customer?.email;
            if (!email) return res.sendStatus(200);

            const userSnap = await db
                .collection("users")
                .where("email", "==", email)
                .limit(1)
                .get();

            if (userSnap.empty) {
                console.error("User not found:", email);
                return res.sendStatus(200);
            }

            const userRef = userSnap.docs[0].ref;
            const existingSubscription =
                userSnap.docs[0].data()?.subscription || {};

            // 3️⃣ Handle lifecycle events
            switch (eventType) {
                case "subscription.create":
                case "subscription.enable": {
                    const subscriptionUpdate = {
                        active: true,
                        status: "active",
                        planCode: data.plan?.id,
                        subscriptionCode: data.subscription_code,
                        emailToken: data.email_token,
                        startedAt:
                            admin.firestore.FieldValue.serverTimestamp(),
                    };

                    if (data.next_payment_date) {
                        subscriptionUpdate.expiresAt =
                            admin.firestore.Timestamp.fromDate(
                                new Date(data.next_payment_date)
                            );
                    }
                        await userRef.set(
                            {
                                subscription: {
                                    ...existingSubscription,
                                    ...subscriptionUpdate,
                                    updatedAt:
                                        admin.firestore.FieldValue.serverTimestamp(),
                                },
                                paymentMethod: data.authorization
                                    ? {
                                        authorizationCode:
                                            data.authorization.authorization_code,
                                        brand: data.authorization.brand,
                                        last4: data.authorization.last4,
                                        expMonth: data.authorization.exp_month,
                                        expYear: data.authorization.exp_year,
                                        reusable: data.authorization.reusable,
                                    }
                                    : {},
                            },
                            { merge: true }
                        );

                    break;
                }

                case "subscription.not_renew": {
                    await userRef.set(
                        {
                            subscription: {
                                ...existingSubscription,
                                status: "cancelling",
                                willNotRenew: true,
                                cancelRequestedAt:
                                    admin.firestore.FieldValue.serverTimestamp(),
                            },
                        },
                        { merge: true }
                    );
                    break;
                }

                case "subscription.disable": {
                    await userRef.set(
                        {
                            subscription: {
                                ...existingSubscription,
                                status: "cancelled",
                                active: false,
                                cancelledAt:
                                    admin.firestore.FieldValue.serverTimestamp(),
                            },
                        },
                        { merge: true }
                    );
                    break;
                }

                case "invoice.payment_failed": {
                    await userRef.set(
                        {
                            subscription: {
                                ...existingSubscription,
                                status: "past_due",
                                lastPaymentFailedAt:
                                    admin.firestore.FieldValue.serverTimestamp(),
                            },
                        },
                        { merge: true }
                    );
                    break;
                }

                default:
                    console.log("Unhandled Paystack event:", eventType);
            }

            console.log("🔥 Webhook processed:", eventType);
            return res.sendStatus(200);
        } catch (err) {
            console.error("Webhook error:", err);
            return res.sendStatus(500);
        }
    }
);
exports.generatePostIdea = onCall(
    {
        maxInstances: 10,
        secrets: ["OPENAI_API_KEY"],
    },
    async (request) => {
        if (!request.auth) {
            throw new Error("Unauthenticated");
        }

        const { mediaType, ideaPrompt } = request.data;
        const OPENAI_KEY = process.env.OPENAI_API_KEY;

        const prompt = `You are a professional social media strategist.

Generate ONE high quality content idea.

MEDIA TYPE:
${mediaType || "Any"}

USER DIRECTION:
${ideaPrompt || "Completely random idea"}

Return ONLY valid JSON in this structure:

{
  "title": "",
  "summary": "",
  "platforms": [],
  "category": "",
  "mediaType": "",
  "caption": "",
  "tips": []
}`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                temperature: 0.8,
                messages: [{ role: "user", content: prompt }],
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("OpenAI error:", err);
            throw new Error("OpenAI request failed");
        }

        const data = await response.json();
        const text = data.choices[0].message.content;

        try {
            return JSON.parse(text.replace(/```json|```/g, "").trim());
        } catch {
            throw new Error("Failed to parse OpenAI response");
        }
    }
);