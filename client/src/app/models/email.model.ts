export interface IEmail {
    name: string;
    subject: string;
    email: string;
    body: string;
}

export interface IEmailForm extends IEmail {
    captcha: string;
}