import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface ISendEmailArgs {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

@Injectable()
export class MailerService {
    transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'info-bot@air-thought.com', // generated ethereal user
            pass: 'd#**BUkFF-gqy4L', // generated ethereal password
        },
    });

    async sendEmail({ to, subject, text, html }: ISendEmailArgs) {
        return await this.transporter.sendMail({
            from: '"WEB-CHAT" <info-bot@air-thought.com>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });
    }
}
