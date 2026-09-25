import { SendEmailOptions } from "../types";
export declare const sendEmail: ({ to, subject, html, text }: SendEmailOptions) => Promise<void>;
