// Control access script

const statusUrl = 'http://localhost:3000/api/v1/auth/user';

function getStatus() {
    const token = localStorage.getItem('token');
    fetch(statusUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'x-access-token': token,
            credentials: 'cors',
        },
    })
        .then(res => res.json())
        .then((Response) => {
            if (Response.status !== 200) window.location.replace('signin.html');
        });
}

// eslint-disable-next-line no-unused-vars
function logout() {
    localStorage.removeItem('token');
    const newpage = window.location.replace('index.html');
    return newpage;
}

getStatus();
