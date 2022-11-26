async function Create() {
    let category = $('#Category').val();
    let description = $('#Description').val();
    console.log(description, category);
    try {
        if (category.length > 4) {

            let data = await $.ajax({
                url: '/category/create',
                type: 'POST',
                data: {
                    category, description
                }
            })
            if (data.status == 200) {
                alert('Success')
                // window.location.href = '/author/getAllAuthor'
            }
        } else {
            alert('category need  > 4 characters')
        }
    } catch (e) {
        console.log(e);
    }
}
