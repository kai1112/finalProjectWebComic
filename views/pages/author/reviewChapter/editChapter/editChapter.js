async function editChapter(id) {
    let title = $('#title').val();
    let content = $('#content').val();
    try {
        let data = await $.ajax({
            type: 'POST',
            url: `/reviewChapter/editChapter/${id}`,
            data: { title, content }
        })
        if (data.status == 200) {
            alert(data.message);
            window.location.reload()
        }
    } catch (e) {
        console.log(e);
    }
} 