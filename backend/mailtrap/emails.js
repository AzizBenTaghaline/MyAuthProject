import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{ email }];
    try {
        await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Verification Email",
        });
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email: " + error.message);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipients = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            template_uuid: "d07b436b-c88e-4dd1-84dc-db7f6248dfff",
            template_variables: {
                company_info_name: "My Kanban Dashboard",
                name: name
            }
        });
        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email: " + error.message);
    }
};