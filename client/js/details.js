/* eslint-disable no-unused-vars */
// View details script

const interventionsUrl = 'http://localhost:3000/api/v1/interventions';
const redflagsUrl = 'http://localhost:3000/api/v1/red-flags';
const id = new URLSearchParams(window.location.search).get('id');
const rType = new URLSearchParams(window.location.search).get('type');
const url = rType === 'redflag' ? redflagsUrl : interventionsUrl;
const token = localStorage.getItem('token');
const showMap = document.getElementById('map');
const type = document.getElementById('type');
const status = document.getElementById('status');
const comment = document.getElementById('comment');


function initMap(lattitude, longitude) {
    const coords = { lat: lattitude, lng: longitude };
    const newmap = new google.maps.Map(
        showMap, { zoom: 5, center: coords },
    );
    const marker = new google.maps.Marker({ position: coords, map: newmap });
}


function loadRecord() {
    fetch(`${url}/${id}`, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'cors',
        },
    })
        .then(res => res.json())
        .then((response) => {
            if (!response.data) {
                type.innerHTML = '<h3>No record found</h3>';
                initMap(9.0820, 8.6753);
            } else {
                const coordinates = response.data.location.split(',');
                const lattitude = parseFloat(coordinates[0]);
                const longitude = parseFloat(coordinates[1]);

                initMap(lattitude, longitude);

                type.innerHTML = `<h3>${response.data.type}</h3>`;
                status.innerHTML = `<h4>Status</h4>${response.data.status}`;
                comment.innerHTML = `<h4>Comment</h4>${response.data.comment}`;
            }
        })
        .catch(err => err);
}

loadRecord();
