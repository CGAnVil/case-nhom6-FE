// let currentUser = localStorage.getItem('currentUser');
// currentUser = JSON.parse(currentUser);

// hiển thị và phân trang
function getAuthorByPage(page) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/authors?page=${page}`,
        success: function (data) {
            let content = "";
            let authors = data.content;
            for (let i = 0; i < authors.length; i++) {
                content += `<tr>
                    <td>${i + 1}</td>
                    <td><a href="${authors[i].wiki}">${authors[i].name}</a></td>
                    <td>${authors[i].dateBirth}</td>
                    <td>${authors[i].dateDeath}</td>
                    <td>${authors[i].quantityBook}</td>
                    <td>${authors[i].nationality}</td>
                    <td><img src="http://localhost:8080/image/${authors[i].image}" width="100" height="100"></td> 
                   <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#create-author" data-toggle="modal"                                        
            type="button" onclick="showEditAuthor(${authors[i].id})"></i></button></td>
            <td><button class="btn btn-danger" data-target="#delete-author" data-toggle="modal"
                                        type="button" onclick="showDeleteAuthor(${authors[i].id})"><i class="fa fa-trash"></i></button></td>
                </tr>`
            }
            $('#author-list-content').html(content);
            let page = `<button class="btn btn-primary" id="backup" onclick="getAuthorByPage(${data.pageable.pageNumber}-1)">Previous</button>
            <span>${data.pageable.pageNumber + 1} | ${data.totalPages}</span>
            <button class="btn btn-primary" id="next" onclick="getAuthorByPage(${data.pageable.pageNumber}+1)">Next</button>`
            $('#author-page').html(page);
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
// tạo mới
function createNewAuthor(){
    let name = $('#name').val();
    let dateBirth = $('#dateBirth').val();
    let dateDeath = $('#dateDeath').val();
    let quantityBook = $('#quantityBook').val();
    let nationality = $('#nationality').val();
    let wiki= $('#wiki').val();
    let image = $('#image');
    let author = new FormData();
    author.append('name', name);
    author.append('dateBirth', dateBirth);
    author.append('dateDeath', dateDeath);
    author.append('quantityBook', quantityBook);
    author.append('nationality',nationality)
    author.append('wiki',wiki);
    author.append('image', image.prop('files')[0])
    $.ajax({
        type:'POST',
        url: 'http://localhost:8080/authors',
        data: author,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            getAuthorByPage();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi!');
        }

    })
}

// hien form tao moi
function showCreateAuthor(){
    let title = "Thêm Thông Tin Tác Giả";
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                  <button class="btn btn-primary" onclick="createNewAuthor()" type="button">Tạo mới</button>`
    $(`#create-author-footer`).html(footer);
    $(`#create-author-title`).html(title);
    $(`#name`).val(null);
    $(`#dateBirth`).val(null);
    $(`#dateDeath`).val(null);
    $(`#quantityBook`).val(null);
    $(`#nationality`).val(null);
    $(`#wiki`).val(null);
    $('#image-edit').html(null);
}

// show delete
function showDeleteAuthor(id){
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteAuthor(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`
    $('#footer-delete').html(content);
}

function deleteAuthor(id){
    $.ajax({
        type :"DELETE",
        url :`http://localhost:8080/authors/${id}`,
        success: function (){
            getAuthorByPage();
            showSuccessMessage("xoa t/hanh cong")
        },
        error: function (){
            showErrorMessage("xoa that bai");
        }

    })
}

// show edit
function showEditAuthor(id){
    let title = "Chỉnh sửa thông tin sản Phẩm";
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="EditAuthor(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Cập nhật</button>`

    $('#create-author-title').html(title);
    $('#create-author-footer').html(footer);

    $.ajax({
        type : "GET",
        url : `http://localhost:8080/authors/${id}`,
        success : function (author){
            let imageEdit = `<img src="http://localhost:8080/${author.image}" height="100" width="100">`
            $('#image-edit').html(imageEdit);
            $(`#name`).val(author.name);
            $(`#dateBirth`).val(author.dateBirth);
            $(`#dateDeath`).val(author.dateDeath);
            $(`#quantityBook`).val(author.quantityBook);
            $(`#nationality`).val(author.nationality);
            $(`#wiki`).val(author.wiki);
        }
    })
}

//edit author
function EditAuthor(id){
    let name = $('#name').val();
    let dateBirth = $('#dateBirth').val();
    let dateDeath = $('#dateDeath').val();
    let quantityBook = $('#quantityBook').val();
    let nationality = $('#nationality').val();
    let wiki= $('#wiki').val();
    let image = $('#image');
    let author = new FormData();
    author.append('name', name);
    author.append('dateBirth', dateBirth);
    author.append('dateDeath', dateDeath);
    author.append('quantityBook', quantityBook);
    author.append('nationality',nationality)
    author.append('wiki',wiki);
    author.append('image', image.prop('files')[0])
    $.ajax({
        type:'POST',
        url: `http://localhost:8080/authors/${id}`,
        data: author,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            getAuthorByPage();
            showSuccessMessage('Sửa thành công!');
        },
        error: function () {
            showErrorMessage('Sửa lỗi!');
        }

    })

}
getAuthorByPage();

$(document).ready(function (){
    getAuthorByPage(0);
})