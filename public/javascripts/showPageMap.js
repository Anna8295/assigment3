mapboxgl.accessToken = 'pk.eyJ1IjoiODJhbm5hOTkiLCJhIjoiY2w5cDF3Zm8xMGs4NzQxazRobWV5dzdzYyJ9.56YYw7_4YiNrJGrWd8QSjw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [13.0000, 49.0000],
    zoom: 3
}) 

for (i=0; i< users.length; i++){
    new mapboxgl.Marker()
    .setLngLat(users[i].geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${users[i].username}</h3><p>${users[i].adress}</p>`
            )
    )
    .addTo(map)
}
