async function createChapter() {
  let title = $("#title").val();
  let content = $("#content").val();
  let id = window.location.href.split("/")[5];
  // console.log(id);
  let data1 = await $.ajax({
    url: `/reviewChapter/createChapter/${id}`,
    type: "POST",
    data: {
      title,
      content,
    },
  });
  // console.log(15, data1);
  if (data1.status == 200) {
    alert("create successful");
    window.location.href = `/reviewManga/viewdetails/${id}`;
  } else {
    console.log("create failed");
  }
}
