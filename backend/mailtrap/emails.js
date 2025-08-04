import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE ,PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js";
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

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipients = [{ email }];
    try {
        await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Password Reset Request",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset Request", 
    });
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email: " + error.message);
    };
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};
            