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