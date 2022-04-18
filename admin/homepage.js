let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong
function showNameUser(){
    let name = ` <a class="d-block" href="#">${currentUser.username}</a>`
    $(`#name_user`).html(name)
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

                content += `<li>
\t\t\t\t\t\t<div class="product">
\t\t\t\t\t\t\t<a href="#" class="info">
\t\t\t\t\t\t\t\t<span class="holder">
\t\t\t\t\t\t\t\t\t<img src="http://localhost:8080/image/${books[i].image}" alt="" />
\t\t\t\t\t\t\t\t\t<span class="book-name">${books[i].name}</span>
\t\t\t\t\t\t\t\t\t<span class="author">by ${books[i].author.name}</span>
\t\t\t\t\t\t\t\t\t<span class="genre">${books[i].genre.name}</span>
\t\t\t\t\t\t\t\t\t<span class="price">${books[i].price}</span>
\t\t\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t</a>
\t\t\t\t\t\t\t<a href="#" class="buy-btn">BUY NOW <span class="price"><span class="low">$</span>22<span class="high">00</span></span></a>
\t\t\t\t\t\t</div>
\t\t\t\t\t</li>`
            }
            $(`#${uplink}`).html(content);
        }
    })
    event.preventDefault();
}

function getBookByPage(page) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/books?page=${page}`,
        success: function (data) {
            let content = "";
            let books = data.content;
            for (let i = 0; i < books.length; i++) {
                content += `<li>
						<div class="product">
							<a href="#">
								<img src="http://localhost:8080/image/${books[i].image}" alt="" />
\t\t\t\t\t\t\t\t\t<span class="book-name">${books[i].name}</span>
\t\t\t\t\t\t\t\t\t<span class="author">by ${books[i].author.name}</span>
\t\t\t\t\t\t\t\t\t<span class="genre">${books[i].genre.name}</span>
\t\t\t\t\t\t\t\t\t<span class="price">${books[i].price}</span>
							</a>
						</div>
					</li>`
            }
            $('#all-book').html(content);

            let page = `<button class="btn btn-primary" id="backup" onclick="getBookByPage(${data.pageable.pageNumber}-1)">Previous</button>
            <span>${data.pageable.pageNumber + 1} | ${data.totalPages}</span>
            <button class="btn btn-primary" id="next" onclick="getBookByPage(${data.pageable.pageNumber}+1)">Next</button>`
            $('#book-page').html(page);
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
            }
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
            }

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

function getAllPoem(){
    getAllBookByGenre(4,'poem-list-content')
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
    getAllPoem();
})

$(document).ready(function () {
    getBookByPage();
})






$(document).ready(function () {
    if (currentUser != null) {
    } else {
        location.href = '/case-nhom6-FE/admin/homepage.html'
    }
})

function doLogout() {
    localStorage.removeItem('currentUser');
    location.href = "/case-nhom6-FE/homepage-2/home.html";
}
