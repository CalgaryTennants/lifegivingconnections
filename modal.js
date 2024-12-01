document.addEventListener('DOMContentLoaded', function() {
    // Load modal HTML
    fetch('modal.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            initializeModal();
        })
        .catch(error => console.error('Error loading modal:', error));

    function initializeModal() {
        const modal = document.getElementById('feedbackModal');
        const feedbackButton = document.querySelector('.feedback-button');
        const cancelButton = document.getElementById('cancelFeedback');
        const submitButton = document.getElementById('submitFeedback');
        const feedbackText = document.getElementById('feedbackText');
        const emailInput = document.getElementById('emailInput');

        function validateInputs() {
            const validation = FeedbackValidator.validateForm(
                emailInput.value,
                feedbackText.value
            );
            
            submitButton.disabled = !validation.isValid;
        }

        // Check validation on any input
        emailInput.addEventListener('input', validateInputs);
        feedbackText.addEventListener('input', validateInputs);

        feedbackButton.addEventListener('click', function() {
            modal.style.display = 'block';
            validateInputs();  // Check initial state
        });

        cancelButton.addEventListener('click', function() {
            modal.style.display = 'none';
            emailInput.value = '';
            feedbackText.value = '';
            validateInputs();
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                emailInput.value = '';
                feedbackText.value = '';
                validateInputs();
            }
        });
    }
}); 