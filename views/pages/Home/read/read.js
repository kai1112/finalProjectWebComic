$(document).ready(function () {
    let imgInp = $('#addfile')[0]
    let blah = $('.preview-image')[0]
    let imgSrc = $('.preview-image').attr('src')
    imgInp.onchange = e => {
        const [file] = imgInp.files
        if (file) blah.src = URL.createObjectURL(file)
    }
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
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        let a = $('.main-container').offset().top
        if (scroll >= a) {
            $('.feature-bar').css({
                'position': 'fixed',
                'top': '0px',
                'left': '0',
                'right': '0'
            })
        } else {
            $('.feature-bar').css({
                'position': 'relative',
            })
        }
    });
    click_to_flex('.category-click', '.cat-submenu-mobile', 'hidden')
    click_to_flex('.chart-click', '.chart-submenu-mobile', 'hidden')
    click_to_flex('.toggle_menu_mobile', '.menu_mobile_content', 'height-fit')
    click_to_flex('.chapter-list-bottom-toggle', '.chapter-list-bottom-container', 'hidden')
    click_to_flex('.list-chapter', '.chapter-list-top', 'hidden')
    click_to_flex('.select-chapter', '.feature-bar-chapter-list', 'hidden')
    click_to_flex('.toggle-user-feature', '.user-feature', 'hidden')
    click_to_flex('.toggle-noti-feature', '.noti-list', 'hidden')

    click_out_to_hide(".user-feature", '.toggle-user-feature')
    click_out_to_hide(".noti-list", '.toggle-noti-feature')
    click_out_to_hide('.feature-bar-chapter-list', '.select-chapter')
})
function click_to_flex(element_click, element_show, class_active) {
    $(`${element_click}`).click(function () {
        $(`${element_show}`).toggleClass(class_active)
    })
}
function click_out_to_hide(class_hide, button_trigger) {
    $(document).mouseup(function (e) {
        var container = $(class_hide);
        var btn = $(button_trigger)
        if (!btn.is(e.target) && btn.has(e.target).length === 0 && !container.is(e.target) && container.has(e.target).length === 0 && !container.hasClass('hidden')) {
            container.addClass('hidden');
        }
    });
}

function type_search(type) {
    if ($(`.field${type}`).val() != "")
        $(`.result${type}`).css({ 'display': 'flex' })
    else
        $(`.result${type}`).css({ 'display': 'none' })
}


async function prev(chap) {
    let id = window.location.href.split('/')[4]
    if (chap == 1) {
        alert('This is the first page you canot go back')
    } else {
        // console.log(chap - 1);
        window.location.href = `/manga/${id}/${chap - 1}`
    }
}

$('.search-result.resultpc').html("")


async function next(chap, length) {
    let id = window.location.href.split('/')[4]
    // console.log(+chap + 1);
    if (chap === length) {
        alert('this is the last page canot go forward')
    } else {
        window.location.href = `/manga/${id}/${+ chap + 1}`
    }
}

async function goToChap(chap) {
    let id = window.location.href.split('/')[4]
    // console.log(chap);
    window.location.href = `/manga/${id}/${chap}`
}


async function addComment(chapterID) {
    let title = $('#title').val()
    if (title === undefined) {
        title = ""
    }
    // console.log(title);
    const form = $("form")[0];
    const formData = new FormData(form);
    formData.append('title', title)
    formData.append('chapterID', chapterID)
    // console.log(formData);
    try {
        let data = await $.ajax({
            type: "POST",
            url: '/comment/createComment',
            data: formData,
            processData: false,
            contentType: false,
        })
        if (data.status == 200) {
            // console.log(data.message)
            window.location.reload()
        }
    } catch (e) {
        console.log(e);
    }
}

async function like(id) {
    // console.log(id);
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

async function nextComment(page) {
    let id = window.location.href.split('/')[4]
    let chap = window.location.href.split('/')[5]

    try {
        let data = await $.ajax({
            url: `/manga/${id}/${chap}/getPaginationComment?page=${page}`,
            type: 'GET',

        })
        $(".comment-list").html(data);
    } catch (e) {
        console.log(e);
    }
}

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
    // console.log(name);
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

function viewDetails(slug) {
    // console.log(slug);
    window.location.href = `/manga/${slug}`
}