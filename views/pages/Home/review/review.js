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

click_to_flex('.category-click', '.cat-submenu-mobile', 'hidden')
click_to_flex('.chart-click', '.chart-submenu-mobile', 'hidden')
click_to_flex('.toggle_menu_mobile', '.menu_mobile_content', 'height-fit')
click_to_flex('.toggle-user-feature', '.user-feature', 'hidden')
click_to_flex('.toggle-noti-feature', '.noti-list', 'hidden')

click_out_to_hide(".user-feature", '.toggle-user-feature')
click_out_to_hide(".noti-list", '.toggle-noti-feature')
function click_to_flex(element_click, element_show, class_active) {
    $(`${element_click}`).click(function () {
        $(`${element_show}`).toggleClass(class_active)
    })
}
$('.search-result.resultpc').html("")

async function readMore(monney, price, checked) {
    let id = window.location.href.split('/')[4]
    let chap = window.location.href.split('/')[5]
    console.log(83, 'a');
    try {
        if (price > 0 && !monney) {
            if (confirm('ban can dang nhap de su dung tinh nang nay')) {
                sessionStorage.setItem("href", `/manga/${id}/${chap}/review`);
                window.location.href = '/auth/viewLogin'
            }
        } else if (price > 0 && monney) {
            if (checked == "true") {
                //console.log(69);
                window.location.href = `/manga/${id}/${chap}`
            } else if (monney < price) {
                alert('ban chua du tien de mua truyen')
            } else {
                if (confirm('ban co muon mua chuyen khong')) {
                    window.location.href = `/manga/${id}/${chap}`
                    alert('mua truyen thanh cong')
                }
            }
        } else {
            window.location.href = `/manga/${id}/${chap}`
        }
    } catch (e) {
        console.log(e);
    }
}