$(document).ready(function () {
    $('.show-search-bar').click(function () {
        $('.search-bar').toggle()
    })
    //dark mode
    // $('#toggle-dark-mode').click(function(){
    //     $('.header').toggleClass('dark')
    //     $('.search-field').toggleClass('dark-input')
    //     $('#toggle-dark-mode').toggleClass('dark-toggle-btn')
    //     $('.menu').toggleClass('dark-menu')
    // })
})
function click_to_flex(element_click, element_show, class_active) {
    $(`${element_click}`).click(function () {
        $(`${element_show}`).toggleClass(class_active)
    })
}
click_to_flex('.category-click', '.cat-submenu-mobile', 'hidden')
click_to_flex('.chart-click', '.chart-submenu-mobile', 'hidden')
click_to_flex('.toggle_menu_mobile', '.menu_mobile_content', 'height-fit')
click_to_flex('.toggle-user-feature', '.user-feature', 'hidden')
click_to_flex('.toggle-noti-feature', '.noti-list', 'hidden')

click_out_to_hide(".user-feature", '.toggle-user-feature')
click_out_to_hide(".noti-list", '.toggle-noti-feature')
function type_search(type) {
    if ($(`.field${type}`).val() != "")
        $(`.result${type}`).css({ 'display': 'flex' })
    else
        $(`.result${type}`).css({ 'display': 'none' })
}

$('.search-result.resultpc').html("")


function viewRegister() {
    window.location.href = '/auth/viewRegister'
}

function viewLogin() {
    window.location.href = '/auth/viewLogin'
}

function viewDetails(id) {
    window.location.href = `/manga/${id}`
}

function findCategory(id) {
    window.location.href = `/category/${id}`
}

async function search() {
    let name = $('#name').val()
    //console.log(name);
    try {
        let data = await $.ajax({
            type: "GET",
            url: `/manga/search?name=${name}`,
        })
        // console.log(data);
        $('.search-result.resultpc').html(data)
    } catch (e) {
        console.log(e);
    }
}


async function follow() {

    try {
        let data = await $.ajax({
            type: "GET",
            url: `/follow/viewFollow`
        })
        //console.log(69, data);
        if (data.status === 403) {
            if (confirm(data.message)) {
                window.location.href = `/auth/viewLogin`
            }
        } else {
            window.location.href = `/follow/viewFollow`
        }
    } catch (e) {
        console.log(e);
    }
}