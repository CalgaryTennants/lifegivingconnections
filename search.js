document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const backButton = document.getElementById('backButton');
    const searchResults = document.getElementById('searchResults');

    // If we're on the search results page, perform the search
    if (window.location.pathname.includes('search-results.html')) {
        const searchTerm = sessionStorage.getItem('searchTerm');
        if (searchTerm) {
            searchInput.value = searchTerm;
            performSearch(searchTerm);
        }
    }

    // Add event listeners
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            sessionStorage.setItem('searchTerm', searchTerm);
            if (window.location.pathname.includes('search-results.html')) {
                performSearch(searchTerm);
            } else {
                window.location.href = 'search-results.html';
            }
        }
    });

    // Handle Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Handle back button
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    async function performSearch(searchTerm) {
        try {
            const response = await fetch('files/list.csv');
            const csvText = await response.text();
            const results = searchCSV(csvText, searchTerm);
            displayResults(results);
        } catch (error) {
            console.error('Error:', error);
            displayError('Failed to load search data');
        }
    }

    function searchCSV(csvText, searchTerm) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        const results = [];
        
        // Find indices for all fields we want to display
        const titleIndex = headers.indexOf('Title');
        const ratingIndex = headers.indexOf('Rating');
        const mediaIndex = headers.indexOf('Media');
        const locationIndex = headers.indexOf('Location');
        const summaryIndex = headers.indexOf('Summary');
        const commentIndex = headers.indexOf('Comment');
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const values = line.split(',').map(value => value.trim());
            if (values.some(value => value.toLowerCase().includes(searchTerm.toLowerCase()))) {
                results.push({
                    title: values[titleIndex],
                    rating: parseInt(values[ratingIndex]) || 0,
                    media: values[mediaIndex],
                    location: values[locationIndex],
                    summary: values[summaryIndex],
                    comment: values[commentIndex]
                });
            }
        }

        return results;
    }

    function displayResults(results) {
        if (!searchResults) return;
        
        searchResults.innerHTML = '';
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No matches found</p>';
        } else {
            results.forEach(result => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                
                // Title and stars in a header row
                const headerDiv = document.createElement('div');
                headerDiv.className = 'result-header';
                
                // Add title
                const titleSpan = document.createElement('span');
                titleSpan.className = 'title';
                titleSpan.textContent = result.title;
                headerDiv.appendChild(titleSpan);
                
                // Add stars
                const starsContainer = document.createElement('span');
                starsContainer.className = 'stars';
                
                // Add outline stars first
                for (let i = 0; i < (5 - result.rating); i++) {
                    const star = document.createElement('span');
                    star.className = 'star outline';
                    star.innerHTML = '☆';
                    starsContainer.appendChild(star);
                }
                
                // Then add filled stars
                for (let i = 0; i < result.rating; i++) {
                    const star = document.createElement('span');
                    star.className = 'star filled';
                    star.innerHTML = '★';
                    starsContainer.appendChild(star);
                }
                
                headerDiv.appendChild(starsContainer);
                div.appendChild(headerDiv);
                
                // Add details section
                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'result-details';
                
                // Add each field if it has a value
                if (result.media) {
                    detailsDiv.innerHTML += `<p><strong>Media:</strong> ${result.media}</p>`;
                }
                if (result.location) {
                    detailsDiv.innerHTML += `<p><strong>Location:</strong> <a href="${result.location}" target="_blank">Visit Resource</a></p>`;
                }
                if (result.summary) {
                    detailsDiv.innerHTML += `<p><strong>Summary:</strong> ${result.summary}</p>`;
                }
                if (result.comment) {
                    detailsDiv.innerHTML += `<p><strong>Comment:</strong> ${result.comment}</p>`;
                }
                
                div.appendChild(detailsDiv);
                searchResults.appendChild(div);
            });
        }
    }

    function displayError(message) {
        if (searchResults) {
            searchResults.innerHTML = `<p style="color: red;">${message}</p>`;
        }
    }
});
