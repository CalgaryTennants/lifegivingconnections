class FeedbackValidator {
    static validateEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            isValid: emailRegex.test(email),
            message: emailRegex.test(email) ? '' : 'Please enter a valid email address'
        };
    }

    static validateFeedback(feedback) {
        // Check if feedback has actual content (not just whitespace)
        const trimmedFeedback = feedback.trim();
        return {
            isValid: trimmedFeedback.length > 0,
            message: trimmedFeedback.length > 0 ? '' : 'Please enter your feedback'
        };
    }

    static validateForm(email, feedback) {
        const emailValidation = this.validateEmail(email);
        const feedbackValidation = this.validateFeedback(feedback);

        return {
            isValid: emailValidation.isValid && feedbackValidation.isValid,
            errors: {
                email: emailValidation.message,
                feedback: feedbackValidation.message
            }
        };
    }
} 