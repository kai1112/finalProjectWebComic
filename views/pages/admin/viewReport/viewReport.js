async function changeStatus(id) {
    try {
        let data = await $.ajax({
            url: "/report/updateReport",
            type: "POST",
            data: {
                id
            }
        })
        if (data.status === 200) {
            alert(data.message)
            window.location.reload()
        }
    } catch (err) {
        console.log(err);
    }
}