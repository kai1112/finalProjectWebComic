//preview img
let imgInp = $('#avatar')[0]
let blah = $('.preview-avatar')[0]
let imgSrc = $('.preview-avatar').attr('src')
imgInp.onchange = e => {
    const [file] = imgInp.files
    if (file) blah.src = URL.createObjectURL(file)
}
let proName = $('.Name-span').text()
let proDes = $('.Des-span').text()
let price = $('.price-span').text()

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
click_flexible('price', price)

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




async function edit() {
    try {
        let id = window.location.href.split('/')[5]
        const form = $('.edit-form')[0]//chuyen ve DOM
        const formData = new FormData(form)//Tra ve formData
        const data = await $.ajax({
            url: `/reviewManga/editManga/${id}`,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
        })
        if (data.status === 200) {
            window.location.href = `/reviewManga/viewAllManga`
        }
    } catch (e) {
        console.log(e);
    }
}
