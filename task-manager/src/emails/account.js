const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = ''
sgMail.setApiKey(sendgridAPIKey)
sgMail.send({
    from: '1421179565z@gmail.com',
    to: 'jasminerxz@gmail.com',
    subject: 'This is my first creation',
    text: 'I hope this one actually get to you'
})