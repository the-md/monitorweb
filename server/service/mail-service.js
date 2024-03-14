const nodemailer = require('nodemailer');


class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.CLIENT_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
    async sendNotificationMail(to, url, status) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Статус сайта ' + url,
            text: '',
            html:
                `
                    <div>
                        <h1>Статус сайта ${url} ${status}</h1>
                    </div>
                `
        })
    }
}

module.exports = new MailService();
