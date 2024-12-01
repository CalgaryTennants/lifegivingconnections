document.addEventListener('DOMContentLoaded', function() {
    const featuredContent = document.getElementById('featuredContent');

    // Load and display featured items when page loads
    loadFeaturedItems();

    async function loadFeaturedItems() {
        try {
            const response = await fetch('files/list.csv');
            const csvText = await response.text();
            const results = findFeaturedItems(csvText);
            displayFeaturedItems(results);
        } catch (error) {
            console.error('Error:', error);
            displayError('Failed to load featured items');
        }
    }

    function findFeaturedItems(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        const results = [];
        
        // Find indices for all fields
        const titleIndex = headers.indexOf('Title');
        const ratingIndex = headers.indexOf('Rating');
        const mediaIndex = headers.indexOf('Media');
        const locationIndex = headers.indexOf('Location');
        const summaryIndex = headers.indexOf('Summary');
        const commentIndex = headers.indexOf('Comment');
        const featuredIndex = headers.indexOf('Featured');
        const imageIndex = headers.indexOf('Image');
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const values = line.split(',').map(value => value.trim());
            if (values[featuredIndex].toUpperCase() === 'TRUE') {
                results.push({
                    title: values[titleIndex],
                    rating: parseInt(values[ratingIndex]) || 0,
                    media: values[mediaIndex],
                    location: values[locationIndex],
                    summary: values[summaryIndex],
                    comment: values[commentIndex],
                    image: values[imageIndex]
                });
            }
        }

        return results;
    }

    function displayFeaturedItems(results) {
        if (!featuredContent) return;
        
        featuredContent.innerHTML = '';
        if (results.length === 0) {
            featuredContent.innerHTML = '<p>No featured items available</p>';
            return;
        }

        results.forEach(result => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            
            // Title and stars in a header row
            const headerDiv = document.createElement('div');
            headerDiv.className = 'result-header';

            // Create title row for title and stars
            const titleRow = document.createElement('div');
            titleRow.className = 'title-row';

            // Add title
            const titleSpan = document.createElement('span');
            titleSpan.className = 'title';
            titleSpan.textContent = result.title;
            titleRow.appendChild(titleSpan);

            // Add stars to title row
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
            
            titleRow.appendChild(starsContainer);

            // Add title row to header
            headerDiv.appendChild(titleRow);

            // Add image if it exists
            if (result.image) {
                const img = new Image();
                img.className = 'result-image';
                img.alt = result.title;
                img.src = `images/${result.image}`;
                headerDiv.appendChild(img);
            }

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
            featuredContent.appendChild(div);
        });
    }

    function displayError(message) {
        if (featuredContent) {
            featuredContent.innerHTML = `<p style="color: red;">${message}</p>`;
        }
    }
});