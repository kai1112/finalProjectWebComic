//preview img
let imgInp = $('#avatar')[0]
let blah = $('.preview-avatar')[0]
let imgSrc = $('.preview-avatar').attr('src')

let back_imgInp = $('#backgroud_avatar')[0]
let back_blah = $('.preview-backgroud_avatar')[0]
let back_imgSrc = $('.preview-backgroud_avatar').attr('src')
imgInp.onchange = e => {
    const [file] = imgInp.files
    if (file) blah.src = URL.createObjectURL(file)
}

back_imgInp.onchange = e => {
    const [file] = back_imgInp.files
    if (file) back_blah.src = URL.createObjectURL(file)
}

const categoryIdElement = document.querySelector('#selectNode');

let categories = [];
let categoriesID = [];
function handleOption() {
    const showcategory = document.getElementById('showcategory');
    const categorySelected = categoryIdElement.options[categoryIdElement.options.selectedIndex];
    categories.push(categorySelected.text);
    categoriesID.push(categorySelected.id);
    const newcategory = categorySelected.cloneNode(true);
    // console.log(newcategory);

    showcategory.appendChild(newcategory);
    categorySelected.parentNode.removeChild(categorySelected);

    // console.log(categoriesID);
}

function changeCategory(e) {
    categoriesID.forEach((cate, index) => {
        if (cate == e.id) {
            categoriesID.splice(index, 1);
        }
    })
    categoryIdElement.prepend(e);
}

async function createManga() {
    try {
        let name = $("#name").val();
        const form = $("form")[0];
        const formData = new FormData(form);
        let data1 = formData
        data1.append('categoryName', categories)
        data1.append('categoryID', categoriesID)
        if (name.length > 5) {
            let data = await $.ajax({
                url: "/reviewManga/createManga",
                type: "POST",
                data: data1,
                processData: false,
                contentType: false,
            });
            if (data.status == 200) {
                alert("create successful");
                window.location.href = `/reviewManga/viewAllManga`;
            }
        } else {
            alert("you need to enter name greater than 5 characters");
        }
    } catch (e) {
        console.log(e);
    }
}
