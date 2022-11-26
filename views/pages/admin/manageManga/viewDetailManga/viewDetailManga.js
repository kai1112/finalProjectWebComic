function viewDetailChapter(id) {
    window.location.href = `/chapter/viewDetailChapter/${id}`;
}

async function edichapter(id) {
    window.location.href = `/chapter/editChapter/${id}`;
}

async function deleteChapter(id) {
    let mangaId = window.location.href.split("/")[5];
    try {
        let data1 = await $.ajax({
            url: `/chapter/deleteChapter/${id}`,
            type: "DELETE",
            data: {
                id,
            },
        });
        // console.log(data1);
        window.location.href = `/manga/viewDetailManga/${mangaId}`;
    } catch (error) {
        console.log(error);
    }
}
