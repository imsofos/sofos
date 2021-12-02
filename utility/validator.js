// Thanks to:
// https://github.com/manishsaraan/email-validator/blob/master/index.js

const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const validateEmail = email => {
    if (!email) return false;

    const emailParts = email.split('@');
    if (emailParts.length !== 2) return false

    const account = emailParts[0];
    const domain = emailParts[1];
    if (account.length > 64) return false
    else if (domain.length > 255) return false

    const domainParts = domain.split('.');
    if (domainParts.some(part => part.length > 63)) return false;

    if (!tester.test(email)) return false;

    return true;
};

module.exports = { validateEmail }