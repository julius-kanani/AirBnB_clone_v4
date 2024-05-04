document.addEventListener('DOMContentLoaded', function() {
  // Make a request to check the status of the API
  fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(response => response.json())
    .then(data => {
      // Check if the status is "OK"
      if (data.status === "OK") {
        // Add the "available" class to the api_status div
        document.getElementById('api_status').classList.add('available');
      } else {
        // Remove the "available" class from the api_status div
        document.getElementById('api_status').classList.remove('available');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
