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

        // Open modal when feedback button is clicked
        feedbackButton.addEventListener('click', function() {
            modal.style.display = 'block';
        });

        // Close modal when Cancel is clicked
        cancelButton.addEventListener('click', function() {
            modal.style.display = 'none';
            feedbackText.value = '';  // Clear the textarea
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                feedbackText.value = '';  // Clear the textarea
            }
        });

        // Enable/disable OK button based on textarea content
        feedbackText.addEventListener('input', function() {
            submitButton.disabled = !this.value.trim();
        });
    }
}); 