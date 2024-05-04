$(document).ready(function() {
  var amenitiesChecked = [];

  $('input[type="checkbox"]').change(function() {
    var amenityId = $(this).data('id');
    var amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenitiesChecked.push(amenityId);
    } else {
      var index = amenitiesChecked.indexOf(amenityId);
      if (index !== -1) {
        amenitiesChecked.splice(index, 1);
      }
    }

    $('div.Amenities h4').text('Amenities: ' + amenitiesChecked.map(function(id) {
      return id;
    }).join(', '));
  });
});
