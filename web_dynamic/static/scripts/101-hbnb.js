document.addEventListener('DOMContentLoaded', function () {
  // Function to fetch places based on selected amenities, states, and cities
  function fetchPlaces() {
    // Get list of checked amenities
    const checkedAmenities = [...document.querySelectorAll('.amenities input:checked')].map(input => input.parentElement.dataset.id);
    // Get list of checked states
    const checkedStates = [...document.querySelectorAll('.locations li input:checked')].map(input => input.parentElement.dataset.id);
    // Get list of checked cities
    const checkedCities = [...document.querySelectorAll('.locations li ul li input:checked')].map(input => input.parentElement.dataset.id);
    // Make POST request to places_search with list of amenities, states, and cities
    fetch('http://0.0.0.0:5001/api/v1/places_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amenities: checkedAmenities,
        states: checkedStates,
        cities: checkedCities
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
            </div>`;
          placesSection.appendChild(article);
        });
      })
      .catch(error => console.error('Error fetching places:', error));
  }

  // Add event listener to filter button
  document.getElementById('filter-button').addEventListener('click', fetchPlaces);

  // Listen to changes on input checkboxes for states and cities
  document.querySelectorAll('.locations input').forEach(input => {
    input.addEventListener('change', function () {
      const selectedLocations = [...document.querySelectorAll('.locations input:checked')].map(input => input.parentElement.dataset.name);
      document.querySelector('.locations h4').innerText = selectedLocations.join(', ') || '\u00A0';
    });
  });

  // Listen to changes on input checkboxes for amenities
  document.querySelectorAll('.amenities input').forEach(input => {
    input.addEventListener('change', function () {
      const selectedAmenities = [...document.querySelectorAll('.amenities input:checked')].map(input => input.parentElement.dataset.name);
      document.querySelector('.amenities h4').innerText = selectedAmenities.join(', ') || '\u00A0';
    });
  });

  // Function to fetch and display reviews
  function fetchReviews() {
    const reviewsSection = document.querySelector('.reviews .review-list');
    // If reviews are hidden, fetch and display them
    if (reviewsSection.style.display === 'none') {
      fetch('http://0.0.0.0:5001/api/v1/reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          reviewsSection.innerHTML = '';
          data.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
              <p><b>${review.user.first_name} ${review.user.last_name}:</b> ${review.text}</p>`;
            reviewsSection.appendChild(reviewElement);
          });
          // Show reviews
          reviewsSection.style.display = 'block';
          document.getElementById('toggle-reviews').innerText = 'hide';
        })
        .catch(error => console.error('Error fetching reviews:', error));
    } else {
      // Hide reviews if already displayed
      reviewsSection.style.display = 'none';
      document.getElementById('toggle-reviews').innerText = 'show';
    }
  }

  // Add event listener to toggle reviews
  document.getElementById('toggle-reviews').addEventListener('click', fetchReviews);
});
