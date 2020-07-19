import { Request, Response } from 'express';
const axios = require('axios');
import * as nodemailer from 'nodemailer';
import { logger } from '../../middleware/logger';
import CONFIG from '../../config/config';
const { validate } = require('../contact/contact.model');


export default class PhotoController {
  private errorMessage: string = '';

  private isReCaptchaValid = async (token: string, secretKey: string): Promise<boolean> => {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await axios.get(url);
    return response.data.success;
  }

  public sendEmail = async (req: Request, res: Response) => {
    try {
      if (!await this.isReCaptchaValid(req.body['g-recaptcha-response'], CONFIG.DEV_SECRET_KEY)) {
        return res.status(400).send({
          success: false,
          message: 'Please check reCAPTCHA form',
          data: null
        });
      }
      const { error } = validate(req.body);
      if (error) {
        switch (error.details[0].context.key) {
          case 'name':
            this.errorMessage = 'Invalid name (at least 2 characters required)';
            break;
          case 'subject':
            this.errorMessage = 'Invalid subject (at least 2 characters required, max 255)';
            break;
          case 'email':
            this.errorMessage = 'Invalid email';
            break;
          case 'body':
            this.errorMessage = 'Invalid body (at least 2 characters required, max 500)';
            break;
          default:
            this.errorMessage = 'Invalid input';
        }

        return res.status(400).send({
          success: false,
          message: this.errorMessage,
          data: null
        });
      }

      const { name, email, subject, body } = req.body;

      const transporter = nodemailer.createTransport({
        host: CONFIG.DEV_SMTP_HOST,
        port: +CONFIG.DEV_SMTP_PORT,
        auth: {
          user: CONFIG.DEV_SMTP_USERNAME,
          pass: CONFIG.DEV_SMTP_PASSWORD
        }
      });

      const info = await transporter.sendMail({
        from: `"SGpixels - ${name} " ${email}`,
        to: CONFIG.ADMIN_SMTP_EMAIL,
        subject: subject,
        text: body,
      });

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.status(201).send({
        success: true,
        message: 'Email sent succesfully',
        data: null
      });
    } catch (err) {
      logger.error(err.message, err);
      res.status(500).send({
        success: false,
        message: 'Please try again',
        data: null
      });
    }
  }
}
