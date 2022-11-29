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

    $('.feature-bar a').click((e) => {
        $('.nav-active').removeClass('nav-active')
        $(e.target).addClass('nav-active');
        let aId = $(e.target).attr('id')
        if (aId == 'feature-bar-des') {
            $('.des-component').css({ 'display': 'flex' })
            $('.chapterList-component').css({ 'display': 'none' })
            $('.comment-component').css({ 'display': 'none' })
            $('.follow-component').css({ 'display': 'none' })
            $('.report-component').css({ 'display': 'none' })
        }
        if (aId == 'feature-bar-chapter') {
            $('.des-component').css({ 'display': 'none' })
            $('.chapterList-component').css({ 'display': 'flex' })
            $('.comment-component').css({ 'display': 'none' })
            $('.follow-component').css({ 'display': 'none' })
            $('.report-component').css({ 'display': 'none' })

        }
        if (aId == 'feature-bar-comment') {
            $('.des-component').css({ 'display': 'none' })
            $('.chapterList-component').css({ 'display': 'none' })
            $('.comment-component').css({ 'display': 'flex' })
            $('.report-component').css({ 'display': 'none' })
            $('.follow-component').css({ 'display': 'none' })
        }
        if (aId == 'feature-bar-follow') {
            $('.des-component').css({ 'display': 'none' })
            $('.chapterList-component').css({ 'display': 'none' })
            $('.comment-component').css({ 'display': 'none' })
            $('.report-component').css({ 'display': 'none' })
            $('.follow-component').css({ 'display': 'flex' })
        }
        if (aId == 'feature-bar-report') {
            $('.des-component').css({ 'display': 'none' })
            $('.chapterList-component').css({ 'display': 'none' })
            $('.comment-component').css({ 'display': 'none' })
            $('.report-component').css({ 'display': 'flex' })
            $('.follow-component').css({ 'display': 'none' })
        }
    });
})
function click_to_flex(element_click, element_show, class_active) {
    $(`${element_click}`).click(function () {
        $(`${element_show}`).toggleClass(class_active)
    })
}

$(".comment_report i").click(function () {
    $(this).siblings().slideToggle("100");
});

$(".report_comment").click(function () {
    $(".report_form").css("display", "block");
});
$(".reback").click(function () {
    $(".report_form").css("display", "none");
});
click_to_flex('.category-click', '.cat-submenu-mobile', 'hidden')
click_to_flex('.chart-click', '.chart-submenu-mobile', 'hidden')
click_to_flex('.toggle_menu_mobile', '.menu_mobile_content', 'height-fit')

click_to_flex('.toggle-user-feature', '.user-feature', 'hidden')
click_to_flex('.toggle-noti-feature', '.noti-list', 'hidden')

click_out_to_hide(".user-feature", '.toggle-user-feature')
function type_search(type) {
    if ($(`.field${type}`).val() != "")
        $(`.result${type}`).css({ 'display': 'flex' })
    else
        $(`.result${type}`).css({ 'display': 'none' })
}

$('.search-result.resultpc').html("")



function click_to_flex(element_click, element_show, class_active) {
    $(`${element_click}`).click(function () {
        $(`${element_show}`).toggleClass(class_active)
    })
}


async function viewChapter(chap, price, monney, checked) {
    let slug = window.location.href.split('/')[4]
    // console.log(chap, price, monney, checked);

    try {
        if (price > 0 && !monney) {
            if (confirm('You need to login to use this feature')) {
                localStorage.setItem("href", `/manga/${slug}`);
                window.location.href = '/auth/viewLogin'
            }
        } else if (price > 0 && monney) {
            if (checked == "true") {
                //console.log(69);
                window.location.href = `/manga/${slug}/${chap}`
            } else if (monney < price) {
                alert('you donot have enough money to buy the manga')
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

async function followManga(id) {
    try {
        let data = await $.ajax({
            type: 'POST',
            url: '/follow/addFollow',
            data: { id }
        })
        if (data.status === 200) {
            alert(data.message)
            window.location.reload()
        } else {
            if (confirm('You need to login to use this feature')) {
                localStorage.setItem("href", `/manga/${slug}`);
                window.location.href = '/auth/viewLogin'
            }
        }
    } catch (e) {
        console.log(e);
    }
}


async function readFirst(chap, price, monney, checked) {
    let slug = window.location.href.split('/')[4]
    try {
        if (price > 0 && !monney) {
            if (confirm('You need to login to use this feature')) {
                localStorage.setItem("href", `/manga/${slug}`);
                window.location.href = '/auth/viewLogin'
            }
        } else if (price > 0 && monney) {
            if (checked == "true") {
                //console.log(69);
                window.location.href = `/manga/${slug}/${chap}`
            } else if (monney < price) {
                alert('you donot have enough money to buy the manga')
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




async function findbyCategory(id) {
    try {
        window.location.href = `/category/${id}`
    } catch (e) {
        console.log(e);
    }
}

async function comment(user) {
    let title = $('#contentComment').val()
    if (title === undefined) {
        title = ""
    }

    // console.log(157, 'a');
    let MangaID = window.location.href.split('/')[4]
    const form = $("form")[0];
    const formData = new FormData(form);
    formData.append('title', title)
    formData.append('MangaID', MangaID)
    try {
        if (user) {
            if (title.includes('vl', 'lol', 'cho', 'dm')) {
                alert('Comments without characters are not valid')
            } {
                let data = await $.ajax({
                    type: "POST",
                    url: '/comment/createComment',
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                // console.log(data.status);
                if (data.status == 200) {
                    // console.log(data.message)
                    window.location.reload()
                } else {
                    alert("loi")
                }
            }
        } else {
            alert("You need to login to use this feature")
            localStorage.setItem("href", `/manga/${slug}`);
            window.location.href = "/auth/viewLogin"
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

async function mangaLike(id, userID) {
    try {
        if (userID === "") {
            if (confirm('You need to login to use this feature')) {
                localStorage.setItem("href", `/manga/${slug}`);
                window.location.href = '/auth/viewLogin';
            }
        } else {
            let data = await $.ajax({
                type: "POST",
                url: '/manga/updateManga',
                data: { id }
            })
            if (data.status === 200) {
                window.location.reload();
            }
        }
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
    //console.log(name);
    try {
        let data = await $.ajax({
            type: "GET",
            url: `/manga/search?name=${name}`,
        })
        $('.search-result.resultpc').html(data)
    } catch (e) {
        console.log(e);
    }
}


async function review(chap) {
    try {
        let mangaID = window.location.href.split('/')[4]
        console.log(mangaID);
        window.location.href = `/manga/${mangaID}/${chap}/review`
    } catch (e) {
        console.log(e);
    }
}

async function report(id) {
    try {
        let slug = window.location.href.split('/')[4]
        let title = $('#report').val()
        console.log(title);
        let data = await $.ajax({
            url: `/report/createReport`,
            type: 'post',
            data: { title, id, slug }
        })
    } catch (e) {
        console.log(e);
    }
}

async function deleteComment(id, userID, userIDD) {
    try {
        if (userID == userIDD) {
            let data1 = await $.ajax({
                url: `/comment/deleteComment`,
                type: 'delete',
                data: { id }
            })
            console.log(data1);
            if (data1.status == 200) {
                window.location.reload();
            }
        } else {
            alert('you are not the owner of this comment')
        }

    } catch (e) {
        console.log(e);
    }
}


async function reportComment(id) {
    try {
        let data1 = await $.ajax({
            url: `/reportComment/createReportComment`,
            type: 'post',
            data: { id }
        })
        console.log(data1);
        if (data1.status == 200) {
            alert('report success');
        }

    } catch (e) {
        console.log(e);
    }
}
