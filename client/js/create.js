// Create record script

const redflagUrl = 'http://localhost:3000/api/v1/red-flags';
const interventionUrl = 'http://localhost:3000/api/v1/interventions';
const token = localStorage.getItem('token');
const type = document.getElementById('type');
const longlat = document.getElementById('location');
const comment = document.getElementById('comment');
const error = document.getElementById('error');
const errormsg = document.getElementById('errormsg');
const snackbar = document.getElementById('snackbar');

function validate(values) {
    if (values.type === 'Choose Type') {
        error.innerHTML = 'Select record type';
        type.focus();
        return false;
    }

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

function fetchRequest(url, values) {
    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-access-token': token,
        },
        body: JSON.stringify({
            type: values.type,
            location: values.location,
            comment: values.comment,
        }),
    })
        .then(res => res.json())
        .then((response) => {
            if (response.status !== 201) {
                displayError(response.message);
            } else {
                window.location.replace('profile.html');
            }
        })
        .catch(err => err);
}

function createRecord(e) {
    e.preventDefault();

    const values = {
        type: type.options[type.selectedIndex].text.toLowerCase(),
        location: longlat.value.trim(),
        comment: comment.value.trim(),
    };

    validate(values);

    if (validate(values)) {
        if (values.type === 'red flag') {
            fetchRequest(redflagUrl, values);
        } else if (values.type === 'intervention') {
            fetchRequest(interventionUrl, values);
        }
    }
}

// Set event listener
document.getElementById('createRecord').addEventListener('submit', createRecord);
