async function authorCreateManga() {
    window.location.href = "/reviewManga/createManga"
}

async function edit(id) {
    window.location.href = `/reviewManga/editManga/${id}`
}

async function viewDetails(id) {
    window.location.href = `/reviewManga/viewDetails/${id}`
}

async function delette(id) {
    try {
        let data = await $.ajax({
            url: `/reviewManga/deleteManga/${id}`,
            type: "DELETE",
            data: {
                id,
            },
        });
        console.log(data);
        if (data.status === 200) {
            alert('delette successfully')
            window.location.reload();
        }
    } catch (e) {
        console.log(e);
    }
}

async function searchByCategory(name) {
    try {
        console.log(name);
        window.location.href = `/reviewManga/viewByCategory/${name}`
    } catch (e) {
        console.log(e);
    }
}