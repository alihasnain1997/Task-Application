const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (name, email) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'warid.9279@gmail.com', // Change to your verified sender
        subject: 'Welcome To Task App',
        text: `Hello! welcome to Task app, ${name}`,

    }
    sgMail.send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}
const sendGoodBye = (name, email) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'warid.9279@gmail.com', // Change to your verified sender
        subject: 'GoodBye From Task App',
        text: `Dear ${name}, let us inform why you left the task app`,

    }
    sgMail.send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}
module.exports={
sendWelcomeEmail:sendWelcomeEmail,
sendGoodBye:sendGoodBye
}