document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const backButton = document.getElementById('backButton');

    // Handle search button click
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Store the search term and redirect to results page
            sessionStorage.setItem('searchTerm', searchTerm);
            window.location.href = 'search-results.html';
        }
    });

    // Handle Enter key in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Handle back button if it exists (only on search-results.html)
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}); 