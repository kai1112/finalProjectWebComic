async function changeStatus(id) {
    try {
        let data = await $.ajax({
            url: "/user/changeStatus",
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
async function giftpoints(id, index) {
    try {
        // console.log(index);
        let idMoney = "money" + index
        // console.log(idMoney)
        let money = $(`#${idMoney}`).val();
        // console.log(money, id)
        let data = await $.ajax({
            url: '/user/giftPoint',
            type: "POST",
            data: {
                money,
                id
            }
        })
        if (data.status === 200) {
            alert(data.message)
            window.location.reload();
        }
    } catch (err) {
        console.log(err);
    }
}

async function removepoints(id, index) {
    try {
        // console.log(index);
        let idMoney = "money" + index
        // console.log(idMoney)
        let money = $(`#${idMoney}`).val();
        // console.log(money, id)
        let data = await $.ajax({
            url: '/user/removePoint',
            type: "POST",
            data: {
                money,
                id
            }
        })
        if (data.status === 200) {
            alert(data.message)
            window.location.reload();
        }
    } catch (err) {
        console.log(err);
    }
}



async function searchUser() {
    try {
        let username = $('#searchUser').val()

        console.log(username);
        if (username == '') {
            window.location.href = `/user/getAllUsers`
        } else {
            window.location.href = `/user/findUserByName/${username}`
        }

    } catch (err) {
        console.log(err)
    }

}

async function pagination(page, limit) {
    try {
        const data = await $.ajax({
            url: `/user/getPaginationUser?page=${page}&limit=${limit}`,
            type: "GET",
        });
        $(".pagination").html(data);
    } catch (e) {
        console.log(e)
    }
}
