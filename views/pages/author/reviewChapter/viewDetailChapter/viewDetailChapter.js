async function paginationChapter(page, limit, id) {
    console.log(id)
    try {
        const data = await $.ajax({
            url: `/reviewChapter/paginationChapter/${id}?page=${page}&limit=${limit}`,
            type: "GET",
        });
        $(".paginationChapter").html(data);
    } catch (error) {
        console.log(error);
    }
}