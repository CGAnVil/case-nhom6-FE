let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong
function showNameUser(){
    let name = ` <a class="d-block" href="#">${currentUser.username}</a>`
    $(`#name_admin`).html(name)
}
$(document).ready(function (){
    showNameUser();
})

function getAllBookByGenre(genreId,uplink) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/homepage/${genreId}`,
        success: function (data) {
            let content = "";
            let books = data;
            for (let i = 0; i < books.length; i++) {

                content += `<div class="book-content" >
                <img src="http://localhost:8080/image/${books[i].image}" width="250" height="350">
                <p>${books[i].name}</p>
                <p><a href="${books[i].author.wiki}" target="_blank">${books[i].author.name}</a></p>
                <p>${books[i].price}</p>
                <button>thêm vào giỏ hàng</button>
                            </div>`
            }
            $(`#${uplink}`).html(content);
        }
    })
    event.preventDefault();
}


function getAllNovel(){
    getAllBookByGenre(2,'novel-list-content');
}

function getAllStory(){
    getAllBookByGenre(1,'story-list-content');
}

function getAllHistoric(){
    getAllBookByGenre(3,'historic-list-content');
}




$(document).ready(function () {
    getAllNovel();
})
$(document).ready(function () {
    getAllStory()
})

$(document).ready(function () {
    getAllHistoric();
})





$(document).ready(function () {
    if (currentUser != null) {
    } else {
        location.href = '/case-nhom6-FE/admin/homepage.html'
    }
})
