const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

function isPhoneNumber(input) {
    const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    return phoneRegex.test(input);
}

function formatPhoneNumber(input) {
    if (input.startsWith("+880")) {
        return input.replace("+880", "880");
    } else if (input.startsWith("01")) {
        return `88${input}`;
    } else {
        return input;
    }
}

export { isEmail, isPhoneNumber, formatPhoneNumber };
