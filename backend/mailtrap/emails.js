import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.js";

export const sendVerificationEmail= async (email, verificationToken) => {
    const recipients= [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Verification Email",
        })}
    catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email: " + error.message);}}