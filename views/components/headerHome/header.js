async function search() {
    let name = $('#name').val()
    // console.log(name);
    try {
        let data = await $.ajax({
            type: "GET",
            url: `/manga/search?name=${name}`,
        })
        console.log(data.manga);
        // if (!data.manga) {

        $('.search-result').html(data)
        // } else {
        //     $('.search-result').html(data.manga)
        // }
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

function findCategory(slug) {
    window.location.href = `/category/${slug}`
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

function viewDetails(slug) {
    console.log(slug);
    window.location.href = `/manga/${slug}`
}
