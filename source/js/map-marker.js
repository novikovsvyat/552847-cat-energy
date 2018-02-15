function initMap() {
  var myLatLng = {lat: 59.938779, lng: 30.323198};

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: myLatLng
  });

  var markerImage = new google.maps.MarkerImage(
    "img/map-pin.png",
    new google.maps.Size(124,106),
    new google.maps.Point(0,0),
    new google.maps.Point(63,106)
  );

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: markerImage,
    title: "Hello World!"
  });

  marker.setMap(map);
}
