
async function delete1(id) {
    try {
        let data1 = await $.ajax({
            url: `/comment/deleteComment`,
            type: 'delete',
            data: { id }
        })
        if (data1.status == 200) {
            alert('delete comment successfully')
            window.location.reload();
        }
    } catch (e) {
        console.log(e);
    }
}