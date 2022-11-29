// async function changInfo(id)
// {   
//     let username = $("#username").val();
//     const form = $("form")[0];
//     const formData = new FormData(form);
//     if (username.length > 5) {
//       let data = await $.ajax({
//         url: `/author/changeProfile/${id}`,
//         type: "POST",
//         data: formData,
//         processData: false,
//         contentType: false,
//         }
//       );
//       console.log(data);
//       if (data.status == 200) {
//         alert("create successful");
//         window.location.href = `/auth/changeProfile/${id}`;
//       }
//     } else {
//       alert("nhap name lon hon 5");
//     }
// }

let imgInp = $('#change-avatar')[0]
let blah = $('.preview-avatar')[0]
let imgSrc = $('.preview-avatar').attr('src')
imgInp.onchange = e => {
  const [file] = imgInp.files
  if (file) blah.src = URL.createObjectURL(file)
}
let proName = $('.Name-span').text()
let proDes = $('.Des-span').text()
let proEmail = $('.Email-span').text()

function click_flexible(field, preVal) {
  $(`.edit${field}`).on('click', (e) => {
    $(`.${field}-span`).attr({ "contentEditable": 'true', "style": 'outline:none' })
    $(`.${field}-span`).focus()
    $(`.setEdit${field}`).css({ display: 'block' })
    $(e.target).css({ display: 'none' })
  })
  $(`.cancel${field}`).on('click', e => {
    $(`.${field}-span`).attr({ "contentEditable": 'false' })
    $(`.setEdit${field}`).css({ display: 'none' })
    $(`.edit${field}`).css({ display: 'block' })
    $(`.${field}-span`).text(preVal)
  })
}
click_flexible('Name', proName)
click_flexible('Des', proDes)
click_flexible('Email', proEmail)

$('.editPass').on('click', (e) => {
  $(e.target).css({ display: 'none' })
  $('#oldPassword').css({ display: 'block' })
  $('#newPassword').css({ display: 'block' })
  $(`.setEditPass`).css({ display: 'block' })
  $(`.cancelPass`).on('click', e => {
    $('#oldPassword').css({ display: 'none' })
    $('#newPassword').css({ display: 'none' })
    $(`.setEditPass`).css({ display: 'none' })
    $(`.editPass`).css({ display: 'block' })
  })
})
$('.editAvatar').on('click', (e) => {
  $(e.target).css({ display: 'none' })
  $('.changeAvatar-form').css({ display: 'block' })
  $(`.setEditAvatar`).css({ display: 'flex' })
  $(`.cancelAvatar`).on('click', e => {
    $('.changeAvatar-form').css({ display: 'none' })
    $(`.setEditAvatar`).css({ display: 'none' })
    $(`.editAvatar`).css({ display: 'block' })
    $('.preview-avatar').attr('src', imgSrc)
  })
})
$('.seeAllFollowing').on('click', (e) => {
  $('.detailContainer').css({ display: 'flex' })
})
$('.detailHideBtn').on('click', (e) => {
  $('.detailContainer').css({ display: 'none' })
})

//show follow and block detail
async function ShowDetail(route) {
  $('.detailContainer').css({ display: 'flex' })
  let res = await $.ajax({
    url: `/api/${route}/get-all-${route}-author`
  })
  $('.detailContainer').html(res)
}
async function UnfollowAndUnblockDetail(authorId, route, element) {
  await $.ajax({
    url: `/api/${route}/un${route}-author/${authorId}`,
    type: 'DELETE'
  })
  $(element).text(`Un${route}ed`)
  $(element).css({ background: 'rgb(26, 137, 23)', color: 'white' })
}
//change
async function ChangeName() {
  let newName = $('.Name-span').text();
  let res = await $.ajax({
    type: "PATCH",
    url: '/admin/change-name',
    data: { newName }
  })
  alert(res.mess)
  window.location.reload();
}
async function ChangeDes() {
  try {
    let newDes = $('.Des-span').text();
    let res = await $.ajax({
      type: "PATCH",
      url: '/admin/change-des',
      data: { newDes }
    })
    alert(res.mess)
    window.location.href = '/admin/adminProfile';
  } catch (e) {
    console.log(e);
  }
}

async function ChangeAvatar() {
  try {
    const form = $('.changeAvatar-form')[0]//chuyen ve DOM
    const formData = new FormData(form)//Tra ve formData
    const res = await $.ajax({
      url: '/admin/change-avatar',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
    })
    alert(res.mess)
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
async function ChangeEmail() {
  let newEmail = $('.Email-span').text();
  let res = await $.ajax({
    type: "PATCH",
    url: '/admin/change-email',
    data: { newEmail }
  })
  alert(res.mess)
  window.location.reload();
}
async function ChangePassword() {
  let oldPass = $('#oldPassword').val()
  let newPass = $('#newPassword').val()
  if (!oldPass || !newPass) {
    return alert('not be empty')
  }
  let res = await $.ajax({
    type: "PATCH",
    url: '/admin/change-password',
    data: { oldPass, newPass }
  })
  alert(res.mess)
  if (res.mess == 'success')
    return window.location.href = "/auth/viewLogin";
}