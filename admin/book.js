function getBookByPage(page) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/books?page=${page}`,
        success: function (data) {
            let content = "";
            let books = data.content;
            for (let i = 0; i < books.length; i++) {
                content += `<tr>
                    <td>${i + 1}</td>
                    <td>${books[i].name}</td>
                    <td>${books[i].price}</td>                  
                    <td>${books[i].genre.name}</td>
                    <td>${books[i].author.name}</td>
                    <td>${books[i].releaseYear}</td>
                    <td>${books[i].republish}</td>
                    <td>${books[i].publisher.name}</td>
                    <td><img src="http://localhost:8080/image/${books[i].image}" width="100" height="100"></td> 
                   <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#create-book" data-toggle="modal"                                        
            type="button" onclick="showEditBook(${books[i].id})"></i></button></td>
            <td><button class="btn btn-danger" data-target="#delete-book" data-toggle="modal"
                                        type="button" onclick="showDeleteBook(${books[i].id})"><i class="fa fa-trash"></i></button></td>
                </tr>`
            }
            $('#book-list-content').html(content);
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


function findBookByName(page){
    let q = $('#q').val()
    $.ajax({
        type : "GET",
        url : `http://localhost:8080/books?q=${q}&page=${page}`,
        success: function (data) {
            let content = "";
            let books = data.content;
            for (let i = 0; i < books.length; i++) {
                content += `<tr>
                    <td>${i + 1}</td>
                    <td>${books[i].name}</td>
                    <td>${books[i].price}</td>                  
                    <td>${books[i].genre.name}</td>
                    <td>${books[i].author.name}</td>
                    <td>${books[i].releaseYear}</td>
                    <td>${books[i].republish}</td>
                    <td>${books[i].publisher.name}</td>
                    <td><img src="http://localhost:8080/image/${books[i].image}" width="100" height="100"></td> 
                   <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#create-book" data-toggle="modal"                                        
            type="button" onclick="showEditBook(${books[i].id})"></i></button></td>
            <td><button class="btn btn-danger" data-target="#delete-book" data-toggle="modal"
                                        type="button" onclick="showDeleteBook(${books[i].id})"><i class="fa fa-trash"></i></button></td>
                </tr>`
            }
            $('#book-list-content').html(content);
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




function showCreateBook() {
    let title = "Thêm Thông Tin Sách";
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                  <button class="btn btn-primary" onclick=" createNewBook()" type="button" data-dismiss="modal">Tạo mới</button>`
    $(`#create-book-footer`).html(footer);
    $(`#create-book-title`).html(title);
    $(`#name`).val(null);
    $(`#price`).val(null);
    $(`#releaseYear`).val(null);
    $(`#republish`).val(null);
    $('#image-edit').html(null);
    drawAuthor();
    drawGenre();
    drawPublisher();
}


function createNewBook(){
    let name = $('#name').val();
    let price = $('#price').val();
    let genre = $('#genre').val();
    let author = $('#author').val();
    let releaseYear = $('#releaseYear').val();
    let republish= $('#republish').val();
    let publisher= $('#publisher').val();
    let image = $('#image');
    let book = new FormData();
    book.append('name', name);
    book.append('price', price);
    book.append('genre', genre);
    book.append('author', author);
    book.append('releaseYear', releaseYear);
    book.append('republish',republish)
    book.append('publisher',publisher);
    book.append('image', image.prop('files')[0])
    $.ajax({
        type:'POST',
        url: 'http://localhost:8080/books',
        data: book,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            getBookByPage();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi!');
        }

    })
}


function showDeleteBook(id){
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteBook(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`
    $('#footer-delete').html(content);
}


function deleteBook(id){
    $.ajax({
        type :"DELETE",
        url :`http://localhost:8080/books/${id}`,
        success: function (){
            getBookByPage();
            showSuccessMessage("xoa thanh cong")
        },
        error: function (){
            showErrorMessage("xoa that bai");
        }

    })
}



function showEditBook(id){
    let title = "Chỉnh sửa thông tin";
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="EditBook(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Cập nhật</button>`

    $('#create-book-title').html(title);
    $('#create-book-footer').html(footer);

    $.ajax({
        type : "GET",
        url : `http://localhost:8080/books/${id}`,
        success : function (book){
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/authors',
                success: function (authors) {
                    authors = authors.content;
                    let content = "";
                    for (let i = 0; i < authors.length; i++) {
                        if (authors[i].id === book.author.id) {
                            content += `<option value="${authors[i].id}" selected>${authors[i].name}</option>`
                        }else {
                            content += `<option value="${authors[i].id}">${authors[i].name}</option>`
                        }
                    }
                    $('#author').html(content);
                }
            });
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/genres',
                success: function (genres) {
                    let content = "";
                    for (let i = 0; i < genres.length; i++) {
                        if (genres[i].id === book.genre.id) {
                            content += `<option value="${genres[i].id}" selected>${genres[i].name}</option>`
                        }else {
                            content += `<option value="${genres[i].id}">${genres[i].name}</option>`
                        }
                    }
                    $('#genre').html(content);
                }
            });
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/publishes',
                success: function (publishes) {
                    let content = "";
                    for (let i = 0; i < publishes.length; i++) {
                        if (publishes[i].id === book.publisher.id) {
                            content += `<option value="${publishes[i].id}" selected>${publishes[i].name}</option>`
                        }else {
                            content += `<option value="${publishes[i].id}">${publishes[i].name}</option>`
                        }
                    }
                    $('#publisher').html(content);
                }
            });
            let imageEdit = `<img src="http://localhost:8080/image/${book.image}" height="100" width="100">`
            $('#image-edit').html(imageEdit);
            $(`#name`).val(book.name);
            $(`#price`).val(book.price);
            $(`#releaseYear`).val(book.releaseYear);
            $(`#republish`).val(book.republish);
        }
    })
}


function EditBook(id){
    let name = $('#name').val();
    let price = $('#price').val();
    let genre = $('#genre').val();
    let author = $('#author').val();
    let releaseYear = $('#releaseYear').val();
    let republish= $('#republish').val();
    let publisher= $('#publisher').val();
    let image = $('#image');
    let book = new FormData();
    book.append('name', name);
    book.append('price', price);
    book.append('genre', genre);
    book.append('author', author);
    book.append('releaseYear', releaseYear);
    book.append('republish',republish)
    book.append('publisher',publisher);
    book.append('image', image.prop('files')[0])
    $.ajax({
        type:'POST',
        url: `http://localhost:8080/books/${id}`,
        data: book,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            getBookByPage();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi!');
        }

    })
}

function drawPublisher(){
    $.ajax({
        type : "GET",
        url : 'http://localhost:8080/publishes',
        success: function (publishes){
            let content = `<option>Chọn Nhà Xuất Bản</option>`
            for (let publishing  of publishes){
                content += `<option value="${publishing.id}">${publishing.name}</option>`
            }

            $(`#publisher`).html(content);

        }
    })
}





function drawGenre(){
    $.ajax({
        type : "GET",
        url : 'http://localhost:8080/genres',
        success: function (genres){
            let content = `<option>Chọn Thể Loại</option>`
            for (let genre of genres){
                content += `<option value="${genre.id}">${genre.name}</option>`
            }

            $(`#genre`).html(content);

        }
    })
}


function drawAuthor(){
    $.ajax({
        type : "GET",
        url : 'http://localhost:8080/authors',
        success: function (authors){
            authors = authors.content;
            let content = `<option>Chọn Tác Giả</option>`
            for (let author of authors){
                content += `<option value="${author.id}">${author.name}</option>`
            }

            $(`#author`).html(content);

        }
    })
}









$(document).ready(function () {
    getBookByPage(0);
})