window.onload = () => {
     let places = staticLoadPlaces();
     renderPlaces(places);// This two line will load the fuction renderplacese(places)
};

function staticLoadPlaces() { //when load place first load staticloadplaces location lat and lng,then loadthe renderplaces and shows the detail of the latitude and the longitude
    return [
        {
            name: 'MyModel',
            location: {
                lat: <your-latitude>,
                lng: <your-longitude>,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);//model's location detail
        model.setAttribute('gltf-model', './assets/MyModel/scene.gltf');//locate and pu a model to the place
        model.setAttribute('rotation', '0 90 0');//can rotate the camera to find the model
        model.setAttribute('animation-mixer', '');//mix the gps and the model in the camera
        model.setAttribute('scale', '0.5 0.5 0.5');//to change the model size

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}