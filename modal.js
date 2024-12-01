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
        const feedbackModal = document.getElementById('feedbackModal');
        const feedbackButton = document.querySelector('.feedback-button');
        const cancelButton = document.getElementById('cancelFeedback');
        const submitButton = document.getElementById('submitFeedback');
        const feedbackText = document.getElementById('feedbackText');

        function validateInputs() {
            const validation = FeedbackValidator.validateForm(
                feedbackText.value
            );
            
            submitButton.disabled = !validation.isValid;
        }

        feedbackText.addEventListener('input', validateInputs);

        feedbackButton.addEventListener('click', function() {
            feedbackModal.style.display = 'block';
            validateInputs();
        });

        submitButton.addEventListener('click', function() {
            const subject = encodeURIComponent("Resources webpage feedback");
            const body = encodeURIComponent(feedbackText.value);
            window.location.href = `mailto:inhistime311@gmail.com?subject=${subject}&body=${body}`;
            
            // Close modal and clear form
            feedbackModal.style.display = 'none';
            feedbackText.value = '';
            validateInputs();
        });

        cancelButton.addEventListener('click', function() {
            feedbackModal.style.display = 'none';
            feedbackText.value = '';
            validateInputs();
        });

        window.addEventListener('click', function(event) {
            if (event.target === feedbackModal) {
                feedbackModal.style.display = 'none';
                feedbackText.value = '';
                validateInputs();
            }
        });
    }
}); 