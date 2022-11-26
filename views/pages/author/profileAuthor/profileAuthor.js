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



//change
async function ChangeName() {
  let newName = $('.Name-span').text();
  console.log(newName);
  let res = await $.ajax({
    type: "PATCH",
    url: '/author/change-name',
    data: { newName }
  })
  alert(res.mess)
  window.location.reload();
}
async function ChangeDes() {
  let newDes = $('.Des-span').text();
  let res = await $.ajax({
    type: "PATCH",
    url: '/author/change-des',
    data: { newDes }
  })
  alert(res.mess)
  window.location.reload();
}

async function ChangeAvatar() {
  try {
    const form = $('.changeAvatar-form')[0]//chuyen ve DOM
    const formData = new FormData(form)//Tra ve formData

    const data = await $.ajax({
      url: '/author/change-avatar',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
    })
    console.log(data);
    if (data.status === 200) {
      alert('success')
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
async function ChangeEmail() {
  let newEmail = $('.Email-span').text();
  let res = await $.ajax({
    type: "PATCH",
    url: '/author/change-email',
    data: { newEmail }
  })
  if (res.status === 200) {

    alert('success')
    window.location.reload();
  }
}
async function ChangePassword() {
  let oldPass = $('#oldPassword').val()
  let newPass = $('#newPassword').val()
  if (!oldPass || !newPass) {
    return alert('k dc bo trong')
  }
  let res = await $.ajax({
    type: "PATCH",
    url: '/author/change-password',
    data: { oldPass, newPass }
  })
  alert(res.mess)
  if (res.mess == 'success')
    return window.location.href = "/auth/viewLogin";
}