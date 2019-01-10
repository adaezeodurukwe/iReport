// Sign in script

const url = 'http://localhost:3000/api/v1/auth/signin';
const email = document.getElementById('email');
const password = document.getElementById('password');
// eslint-disable-next-line no-useless-escape
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


function validate(values) {
    if (!values.email.match(mailformat)) {
        document.getElementById('error').innerHTML = 'Enter valid Email';
        document.getElementById('email').focus();

        return false;
    }

    if (values.password.length < 4) {
        document.getElementById('error').innerHTML = 'Email should have at least four characters';
        document.getElementById('confpassword').focus();
        return false;
    }

    return true;
}

function fetchRequest(values) {
    fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            email: values.email,
            password: values.password,
        }),
    })
        .then(res => res.json())
        .then((response) => {
            if (response.status !== 200) {
                document.getElementById('errormsg').innerHTML = response.message;
                const x = document.getElementById('snackbar');
                x.className = 'show';
                setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
            } else {
                localStorage.setItem('token', response.data[0].token);
                window.location.replace('profile.html');
            }
        });
}

function loginUser(e) {
    e.preventDefault();

    const values = {
        email: email.value.trim(),
        password: password.value.trim(),
    };

    if (validate(values)) {
        fetchRequest(values);
    }
}

// Set event listener
document.getElementById('signIn').addEventListener('submit', loginUser);
