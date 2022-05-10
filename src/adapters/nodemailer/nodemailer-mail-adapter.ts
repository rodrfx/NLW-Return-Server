import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: '643b82d58817a0',
		pass: '96ca6b2c90d749',
	},
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body }: SendMailData): Promise<void> {
		await transport.sendMail({
			from: 'Equipe Feedget <oi@feedget.com>',
			to: 'Rodrigo Xavier <rodrfx@gmail.com>',
			subject,
			html: body,
		});
	}
}
