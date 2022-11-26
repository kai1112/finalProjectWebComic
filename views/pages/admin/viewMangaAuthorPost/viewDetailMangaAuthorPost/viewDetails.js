function viewDetailChapter(id) {
  window.location.href = `/chapter/viewDetailChapter/review/${id}`;
}

async function post(id) {
  try {
    let data = await $.ajax({
      type: "POST",
      url: `/chapter/createChapter/${id}`
    })
    if (data.status === 200) {
      window.location.reload();
    }
  } catch (e) {
    console.log(e)
  }
}
async function edichapter(id, status) {
  try {
    console.log(status);
    if (status === 'posted') {
      alert('ban k the edit manga nay')
    } else {
      window.location.href = `/chapter/editChapterAuthor/${id}`;
    }
  } catch (e) {
    console.log(e)
  }
}

async function deleteChapter(id) {
  let mangaId = window.location.href.split("/")[5];
  try {
    let data1 = await $.ajax({
      url: `/reviewChapter/deleteChapter/${id}`,
      type: "DELETE",
      data: {
        id,
      },
    });
    // console.log(data1);
    window.location.href = `/reviewManga/viewDetails/${mangaId}`;
  } catch (error) {
    console.log(error);
  }
}
