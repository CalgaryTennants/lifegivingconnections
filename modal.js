document.addEventListener('DOMContentLoaded', function() {
    // Load both modals
    Promise.all([
        fetch('modal.html').then(response => response.text()),
        fetch('confirmation-modal.html').then(response => response.text())
    ]).then(([feedbackHtml, confirmationHtml]) => {
        document.body.insertAdjacentHTML('beforeend', feedbackHtml);
        document.body.insertAdjacentHTML('beforeend', confirmationHtml);
        initializeModals();
    }).catch(error => console.error('Error loading modals:', error));

    function initializeModals() {
        const feedbackModal = document.getElementById('feedbackModal');
        const confirmationModal = document.getElementById('confirmationModal');
        const feedbackButton = document.querySelector('.feedback-button');
        const cancelButton = document.getElementById('cancelFeedback');
        const submitButton = document.getElementById('submitFeedback');
        const closeConfirmButton = document.getElementById('closeConfirmation');
        const feedbackText = document.getElementById('feedbackText');
        const emailInput = document.getElementById('emailInput');

        function validateInputs() {
            const validation = FeedbackValidator.validateForm(
                emailInput.value,
                feedbackText.value
            );
            
            submitButton.disabled = !validation.isValid;
        }

        emailInput.addEventListener('input', validateInputs);
        feedbackText.addEventListener('input', validateInputs);

        feedbackButton.addEventListener('click', function() {
            feedbackModal.style.display = 'block';
            validateInputs();
        });

        submitButton.addEventListener('click', function() {
            // Show confirmation modal with submitted data
            document.getElementById('submittedEmail').textContent = emailInput.value;
            document.getElementById('submittedFeedback').textContent = feedbackText.value;
            
            feedbackModal.style.display = 'none';
            confirmationModal.style.display = 'block';
            
            // Clear feedback form
            emailInput.value = '';
            feedbackText.value = '';
            validateInputs();
        });

        cancelButton.addEventListener('click', function() {
            feedbackModal.style.display = 'none';
            emailInput.value = '';
            feedbackText.value = '';
            validateInputs();
        });

        closeConfirmButton.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });

        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === feedbackModal) {
                feedbackModal.style.display = 'none';
                emailInput.value = '';
                feedbackText.value = '';
                validateInputs();
            } else if (event.target === confirmationModal) {
                confirmationModal.style.display = 'none';
            }
        });
    }
}); 