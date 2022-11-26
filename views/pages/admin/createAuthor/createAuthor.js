async function register() {
    let email = $('#email').val();
    let username = $('#username').val();
    let password = $('#password').val();
    let dateOfBirth = $('#dateOfBirth').val();
    console.log(email, username, password, dateOfBirth);
    try {
        let data = await $.ajax({
            url: '/author/createAuthor',
            type: 'POST',
            data: {
                email, username, password, dateOfBirth
            }
        })
        if (data.status == 200) {
            alert('Success')
            window.location.href = '/author/getAllAuthor'
        }
    } catch (e) {
        console.log(e);
    }
}

