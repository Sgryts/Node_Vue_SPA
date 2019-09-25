import {Request, Response} from 'express';
import * as reCAPTCHA from 'recaptcha2';
import * as nodemailer from 'nodemailer';
import logger from "../../middleware/logger";

const {validate} = require('../contact/contact.model');


export default class PhotoController {
    private errorMessage: string = '';
    // what does captcha return?
    // get forms values + recaptcha
    // if form values OK
    public reCaptcha = async (req: Request, res: Response) => {
        const recaptcha = new reCAPTCHA({
            siteKey: process.env.SITE_KEY,
            secretKey: process.env.SECURITY_ERR,
            ssl: false
        });

        recaptcha.validateRequest(req)
            .then(function () {
                // display send btn if success
                // Generating the reCAPTCHA widget
                // recaptcha.formElement() returns standard form element for
                // reCAPTCHA which you should include at the end of  your html form element.
                //  You can also set CSS classes like this: recaptcha.formElement('custom-class-for-recaptcha').
                //  The default class is g-recaptcha.
                // <div class="custom-class-for-recaptcha" data-sitekey="your-site-key"></div> front end
                res.status(201).send({
                    success: true,
                    message: 'Checked',
                    data: null
                });
            })
            .catch(function (err) {
                logger.error(err.message, err);
                res.status(400).send({
                    success: false,
                    message: 'Please check reCAPTCHA form',
                    data: recaptcha.translateErrors(err)
                });
            });
    }


    public sendEmail = async (req: Request, res: Response) => {
        //recaptcha
        try {
            const {error} = validate(req.body);
            if (error) {
                switch (error.details[0].context.key) {
                    case 'name':
                        this.errorMessage = 'Invalid name (at least 2 characters required)';
                        break
                    case 'subject':
                        this.errorMessage = 'Invalid subject (at least 2 characters required, max 255)';
                        break
                    case 'email':
                        this.errorMessage = 'Invalid email';
                        break
                    case 'body':
                        this.errorMessage = 'Invalid body (at least 2 characters required, max 500)';
                        break
                    default:
                        this.errorMessage = 'Invalid input';
                }

                return res.status(400).send({
                    success: false,
                    message: this.errorMessage,
                    data: null
                });
            }

            const {name, email, subject, body} = req.body;

            const testAccount = await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass // generated ethereal password
                }
            });

            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: `"SGpixels - ${name} " ${email}`, // sender address
                to: process.env.ADMIN_EMAIL, //"bar@example.com, baz@example.com", // list of receivers
                subject: subject, // Subject line
                text: body, // plain text body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        } catch (err) {
            logger.error(err.message, err);
            res.status(400).send({
                success: false,
                message: 'Please check reCAPTCHA form',
                data: null
            });
        }
    }

}
