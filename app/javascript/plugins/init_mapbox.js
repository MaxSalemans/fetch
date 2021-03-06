import mapboxgl from 'mapbox-gl';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 90, maxZoom: 13 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) {

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

const popupOffsets = {
 'bottom': [-7, -25]
 };

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const popup = new mapboxgl.Popup({offset: popupOffsets}).setHTML(marker.infoWindow);

      const element = document.createElement('div');
      element.className = `marker-${marker.dogID}`;
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '50px';
      element.style.height = '50px';

      let mapboxMarker = new mapboxgl.Marker(element)
      .setLngLat([marker.lng, marker.lat])
      .setPopup(popup)
      .addTo(map)

      let dogCard = document.querySelector(`#card-${marker.dogID}`)

      dogCard.addEventListener('click', () => {
        mapboxMarker.togglePopup()
        map.flyTo({center: [marker.lng, marker.lat], zoom: 13})
      })
    });

    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
