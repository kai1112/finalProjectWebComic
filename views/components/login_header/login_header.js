

function type_search(type) {
    if ($(`.field${type}`).val() != "")
        $(`.result${type}`).css({ 'display': 'flex' })
    else
        $(`.result${type}`).css({ 'display': 'none' })
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

async function search() {
    let name = $('#name').val()
    console.log(name);
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


async function history() {
    try {
        let data = await $.ajax({
            type: "GET",
            url: `/history/viewHistory`
        })
        //console.log(69, data);
        if (data.status === 403) {
            if (confirm(data.message)) {
                window.location.href = `/auth/viewLogin`
            }
        } else {
            window.location.href = `/history/viewHistory`
        }
    } catch (e) {
        console.log(e);
    }
}

async function logout() {
    try {
        let a = await $.ajax({
            url: "/user/logout",
            type: "GET"
        })
    } catch (e) {
        console.log(e);
    }

}


