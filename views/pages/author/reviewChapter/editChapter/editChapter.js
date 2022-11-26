async function editChapter(id) {
    let title = $('#title').val();
    let content = $('#content').val();
    try {
        let data = await $.ajax({
            type: 'POST',
            url: `/reviewChapter/editChapter/${id}`
        })
    } catch (e) {
        console.log(e);
    }
} 