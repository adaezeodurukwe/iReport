/* eslint-disable no-unused-vars */
// Update record script

const id = new URLSearchParams(window.location.search).get('id');
const recordType = new URLSearchParams(window.location.search).get('type');
const redflagUrl = `https://ireporter-endpoints.herokuapp.com/api/v1/red-flags/${id}`;
const interventionUrl = `https://ireporter-endpoints.herokuapp.com/api/v1/interventions/${id}`;
const token = localStorage.getItem('token');
const type = document.getElementById('type');
const longlat = document.getElementById('location');
const comment = document.getElementById('comment');
const error = document.getElementById('error');
const errormsg = document.getElementById('errormsg');
const snackbar = document.getElementById('snackbar');
const url = recordType === 'redflag' ? redflagUrl : interventionUrl;

const headers = {
    Accept: 'application/json, text/plain, */*',
    'content-type': 'application/json',
    'x-access-token': token,
    credentials: 'cors',
};

function loadRecord() {
    type.disabled = true;

    fetch(url, { method: 'GET', headers })
        .then(res => res.json())
        .then((Response) => {
            type.options[type.selectedIndex].text = Response.data.type;
            longlat.value = Response.data.location;
            comment.value = Response.data.comment;
        })
        .catch(err => err);
}

function validate(values) {
    if (values.location === '') {
        error.innerHTML = 'Enter location';
        longlat.focus();
        return false;
    }

    if (values.comment === '') {
        error.innerHTML = 'Enter comment';
        comment.focus();
        return false;
    }

    return true;
}

function displayError(message) {
    errormsg.innerHTML = message;
    snackbar.className = 'show';
    setTimeout(() => { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
}

function updateLocation(value) {
    fetch(`${url}/location`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            location: value,
        }),
    })
        .then(res => res.json())
        .then((Response) => {
            if (Response.status !== 200) displayError(Response.message);
            else window.location.replace('profile.html');
        })
        .catch(err => err);
}

function updateComment(value) {
    fetch(`${url}/comment`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            comment: value,
        }),
    })
        .then(res => res.json())
        .then((Response) => {
            if (Response.status !== 200) displayError(Response.message);
            else window.location.replace('profile.html');
        })
        .catch(err => err);
}


function updateRecord(e) {
    e.preventDefault();

    const values = {
        location: longlat.value.trim(),
        comment: comment.value.trim(),
    };
    validate(values);

    if (validate(values)) {
        updateLocation(values.location);
        updateComment(values.comment);
    }
}

document.getElementById('updateRecord').addEventListener('submit', updateRecord);
loadRecord();
