import nodeMailer from 'nodemailer';
import config from '../config';
import Promise from 'bluebird';

let mailOptions = {
    from: '"CMDB" <cmdb.mail@chinaredstar.com>', // sender address
    to: 'xiao.feng695@chinaredstar.com', // list of receivers
    subject: 'CMDB 启动消息', // Subject line
    text: 'cmdb启动', // plaintext body
    html: '<b>CMDB</b>' // html body
};

class Mail {
    constructor() {
        this.transporter = nodeMailer.createTransport(config.mail.config);
        this.sendMail = Promise.promisify(this.transporter.sendMail.bind(this.transporter));
        this.verify = Promise.promisify(this.transporter.verify.bind(this.transporter));
    }

    async init() {
        this.verified = await this.verify();

        if (this.verified && config.mail.admin) {
            mailOptions.to = config.mail.admin;
            await this.sendMail(mailOptions);
        }
    }
}

export default new Mail();