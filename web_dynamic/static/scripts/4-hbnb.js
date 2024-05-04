document.addEventListener('DOMContentLoaded', function () {
  // Function to fetch places based on selected amenities
  function fetchPlaces() {
    // Get list of checked amenities
    const checkedAmenities = [...document.querySelectorAll('.amenities input:checked')].map(input => input.parentElement.dataset.id);
    // Make POST request to places_search with list of amenities
    fetch('http://0.0.0.0:5001/api/v1/places_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amenities: checkedAmenities
      })
    })
      .then(response => response.json())
      .then(data => {
        // Clear existing places
        const placesSection = document.querySelector('.places');
        placesSection.innerHTML = '';
        // Add each place to the DOM
        data.forEach(place => {
          const article = document.createElement('article');
          article.innerHTML = `
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="user">
              <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
            </div>
            <div class="description">
              ${place.description}
            </div>
          `;
          placesSection.appendChild(article);
        });
      })
      .catch(error => console.error('Error fetching places:', error));
  }

  // Add event listener to filter button
  document.getElementById('filter-button').addEventListener('click', fetchPlaces);
});
