// async function edit(id) {
//     window.location.href = `/reviewManga/editManga/${id}`
// }



// async function delette(id) {
//     try {
//         let data = await $.ajax({
//             url: `/reviewManga/deleteManga/${id}`,
//             type: "DELETE",
//             data: {
//                 id,
//             },
//         });
//         console.log(data);
//         if (data.status === 200) {
//             alert('delette successfully')
//             window.location.reload();
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }