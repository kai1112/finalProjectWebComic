async function login() {
  // let data1 = 'a'
  let href = localStorage.getItem("href");
  // console.log(personName);
  let email = $('#email').val();
  let password = $('#password').val();
  // console.log(email, password);
  try {
    let data = await $.ajax({
      url: '/auth/login',
      type: 'POST',
      data: {
        email,
        password,
      }
    })
    if (!href) {
      console.log(18, data.role);
      if (data.role === "admin") {
        alert('login success')
        window.location.href = '/admin/adminProfile'
      } else if (data.role === "author") {
        alert('login success')
        window.location.href = '/author/authorProfile'
      } else if (data.role === "user") {
        alert('login success')
        window.location.href = '/user/userProfile'
      } else {
        alert('login fail')
        window.location.href = '/auth/viewLogin'
      }
    } else {
      if (data.role) {
        window.location.href = href
        localStorage.clear();

      } else {
        alert('login fail')
      }
    }
  } catch (e) {
    res.json(e);
  }

}

async function register() {
  window.location.href = '/auth/viewRegister'
}

async function viewLogin() {
  window.location.href = '/auth/viewLogin'
}