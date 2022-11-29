async function post(id) {
    try {
        let price = $('#price').val()
        console.log(price);
        let data = await $.ajax({
            url: `/manga/createManga/${id}`,
            type: "POST",
            data: {
                price
            }
        })
        if (data.status === 200) {
            alert(data.message);
            window.location.reload();
        }
    } catch (e) {
        console.log(e)
    }
}

async function edit(id, status) {
    try {
        console.log(status);
        if (status === 'posted') {
            alert('you canot edit this manga')
        } else {
            window.location.href = `/manga/editMangaAuthor/${id}`
        }
    } catch (e) {
        console.log(e)
    }
}

async function viewDetails(id) {
    window.location.href = `/manga/viewDetailsAuthor/${id}`
}

// async function searchMangaByAuthor(name) {
//     try {
//         console.log(name);
//         window.location.href = `/manga/viewByAuthorName/${name}`
//     } catch (e) {
//         console.log(e);
//     }
// }