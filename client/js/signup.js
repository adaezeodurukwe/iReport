// Sign up script

const url = 'http://localhost:3000/api/v1/auth/signup';
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const othernames = document.getElementById('othernames');
const username = document.getElementById('username');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confpassword');
// eslint-disable-next-line no-useless-escape
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


function validate(values) {
    if (values.firstname === '') {
        document.getElementById('error').innerHTML = 'Enter your first name';
        document.getElementById('firstname').focus();
        return false;
    }

    if (values.lastname === '') {
        document.getElementById('error').innerHTML = 'Enter your last name';
        document.getElementById('lastname').focus();
        return false;
    }

    if (values.username === '') {
        document.getElementById('error').innerHTML = 'Enter username';
        document.getElementById('username').focus();
        return false;
    }

    if (values.phone < 9) {
        document.getElementById('error').innerHTML = 'Enter valid phone number';
        document.getElementById('phone').focus();
        return false;
    }

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

    if (values.confirmPassword !== values.password) {
        document.getElementById('error').innerHTML = 'Confirm Password';
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
            firstname: values.firstname,
            lastname: values.lastname,
            othernames: values.othernames,
            username: values.username,
            email: values.email,
            password: values.password,
            phone: values.phone,
        }),
    })
        .then(res => res.json())
        .then((response) => {
            if (response.status !== 201) {
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

function createUser(e) {
    e.preventDefault();

    const values = {
        firstname: firstname.value.trim(),
        lastname: lastname.value.trim(),
        othernames: othernames.value.trim(),
        username: username.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        password: password.value.trim(),
        confirmPassword: confirmPassword.value,
    };

    if (validate(values)) {
        fetchRequest(values);
    }
}

// Set event listener
document.getElementById('signUp').addEventListener('submit', createUser);
