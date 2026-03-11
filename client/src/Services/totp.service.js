import * as OTPAuth from "otpauth";
import QRCode from "qrcode";

export const generateTOTP = async (email) => {

    const secret = new OTPAuth.Secret();

    const totp = new OTPAuth.TOTP({
        issuer: "Baraly",
        label: email,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret
    });

    const uri = totp.toString();

    const qr = await QRCode.toDataURL(uri);

    return {
        secret: secret.base32,
        qr
    };

};

export const verifyTOTP = (token, secret) => {

    const totp = new OTPAuth.TOTP({
        issuer: "Baraly",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret)
    });

    const delta = totp.validate({ token });

    return delta !== null;

};