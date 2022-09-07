const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const RequestError = require('./RequestError')

const sendVerification = (email, link) => {
    const msg = {
        to: email,
        from: 'llomaka80@gmail.com',
        subject: 'Email Verification Notification',
        text: `Please verify email provided during registration in Phonebook portal by following link: ${link}`,
        html: `Please <strong>verify</strong> email provided during registration in Phonebook portal by following link: <strong>${link}</strong>`,
    }
    sgMail
        .send(msg)
        .catch((error) => {
            throw RequestError(500, error.message)
        })
}

module.exports = sendVerification