export function evaluatePassword(password) {
    const rules = {
        length: password.length >= 10,
        uppercase: /[A-Z]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(rules).filter(Boolean).length;

    return {
        rules,
        score,
        isValid: score === 3,
        label:
            score === 0
                ? "Very weak"
                : score === 1
                    ? "Weak"
                    : score === 2
                        ? "Almost there"
                        : "Strong",
    };
}
