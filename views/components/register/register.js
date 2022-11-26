async function register() {
    let email = $('#email').val();
    let username = $('#username').val();
    let password = $('#password').val();
    let dateOfBirth = $('#dateOfBirth').val();
    console.log(email, username, password, dateOfBirth);
    try {
        if (password.length < 8) {
            alert('Please enter a password > 8 characters');
        } else {
            let data = await $.ajax({
                url: '/auth/register',
                type: 'POST',
                data: {
                    email, username, password, dateOfBirth
                }
            })
            if (data.status == 200) {
                alert('Success')
                window.location.href = '/auth/viewLogin'
            } else {
                alert('Email  da ton tai')
            }
        }
    } catch (e) {
        console.log(e);
    }
}

async function registerEnter(event) {
    let x = event.key;
    if (x == 'Enter') {
        let email = $('#email').val();
        let username = $('#username').val();
        let password = $('#password').val();
        let dateOfBirth = $('#dateOfBirth').val();
        console.log(email, username, password, dateOfBirth);
        try {
            let data = await $.ajax({
                url: '/auth/register',
                type: 'POST',
                data: {
                    email, username, password, dateOfBirth
                }
            })
            if (data.status == 200) {
                alert('Success')
                window.location.href = '/auth/viewLogin'
            }
        } catch (e) {
            console.log(e);
        }
    } else {

    }
}

async function login() {
    window.location.href = '/auth/viewLogin'
}