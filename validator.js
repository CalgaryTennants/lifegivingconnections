class FeedbackValidator {
    static validateForm(feedback) {
        const trimmedFeedback = feedback.trim();
        return {
            isValid: trimmedFeedback.length > 0,
            message: trimmedFeedback.length > 0 ? '' : 'Please enter your feedback'
        };
    }
} 