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

click_out_to_hide(".noti-list", '.toggle-noti-feature')
function click_to_flex(element_click, element_show, class_active) {
    $(`${element_click}`).click(function () {
        $(`${element_show}`).toggleClass(class_active)
    })
}
function type_search(type) {
    if ($(`.field${type}`).val() != "")
        $(`.result${type}`).css({ 'display': 'flex' })
    else
        $(`.result${type}`).css({ 'display': 'none' })
}

$('.search-result.resultpc').html("")



function viewDetails(slug) {
    console.log(slug);
    window.location.href = `/manga/${slug}`
}



async function nextPages(page) {
    try {
        let limit = 20;
        let data = await $.ajax({
            url: `/manga/pagination?page=${page}&limit=${limit}`,
            type: 'GET',
            // data: page

        })
        //console.log(data);
        $(".list-item").html(data);
    } catch (e) {
        console.log(e);
    }
}

async function viewChapter1(chap, slug, price, monney) {
    try {
        let data = await $.ajax({
            url: `/manga/${slug}/checked`,
            type: 'GET',
        })
        console.log(data.data == "true");

        if (price > 0 && !monney) {
            if (confirm('You need to login to use this feature')) {
                localStorage.setItem("href", `/manga/${slug}`);
                window.location.href = '/auth/viewLogin'
            }
        } else if (price > 0 && monney) {
            if (data.data == true) {
                //console.log(69);
                window.location.href = `/manga/${slug}/${chap}`
            } else if (monney < price) {
                alert('you donot have enough money to buy manga')
            } else {
                if (confirm('Do you want to buy the manga?')) {
                    window.location.href = `/manga/${slug}/${chap}`
                    alert('successfully purchase')
                }
            }
        } else {
            window.location.href = `/manga/${slug}/${chap}`
        }
    } catch (e) {
        console.log(e);
    }
}

async function like(id) {
    //console.log(id);
    try {
        let data = await $.ajax({
            type: "POST",
            url: '/comment/updateComment',
            data: { id }
        })
        if (data.status === 200) {
            window.location.reload();
        }
    } catch (e) {
        console.log(e);
    }
}