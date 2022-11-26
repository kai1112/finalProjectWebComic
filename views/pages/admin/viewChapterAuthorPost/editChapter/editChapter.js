
let proName = $('.Name-span').text()
let proDes = $('.Des-span').text()

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


$('.detailHideBtn').on('click', (e) => {
    $('.detailContainer').css({ display: 'none' })
})


async function ChangeName(id) {
    let newName = $('.Name-span').text();
    console.log(newName);
    let res = await $.ajax({
        type: "PATCH",
        url: `/chapter/change-title-chapter/${id}`,
        data: { newName }
    })
    if (res.status === 200) {
        alert("success")
        window.location.reload();
    }

}
async function ChangeDes(id) {
    let newDes = $('.Des-span').text();
    let res = await $.ajax({
        type: "PATCH",
        url: `/chapter/change-content-chapter/${id}`,
        data: { newDes }
    })
    alert(res.mess)
    window.location.reload();
}

