let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong
function getAllGenre() {
    $.ajax({
        url: `http://localhost:8080/genres`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + currentUser?.token
        },
        success: function (genres) {
            let content = '';
            for (let i = 0; i < genres.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td>${genres[i].name}</td>
        <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#create-genre" data-toggle="modal"
                                        type="button" onclick="showEditGenre(${genres[i].id})"></i></button></td>
        <td><button class="btn btn-danger" data-target="#delete-genre" data-toggle="modal"
                                        type="button'#genre-list-content'" onclick="showDeleteGenre(${genres[i].id})"><i class="fa fa-trash"></i></button></td>
    </tr>`
            }
            $('#genre-list-content').html(content);
        }
    })
}

function createNewGenre() {
    let name = $('#name').val();
    let genre = {
        name: name
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/genres',
        data: JSON.stringify(genre),
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        success: function () {
            getAllGenre();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi!');
        }
    })
}

function deleteGenre(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/genres/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser?.token
        },
        success: function () {
            getAllGenre();
            showSuccessMessage('Xóa thành công!');
            // $('#delete-product').hide();
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeleteGenre(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteGenre(${id})" type="button">Xóa</button>`;
    $('#footer-delete').html(content);
}

function showEditGenre(id) {
    let title = 'Chỉnh sửa thông tin sản phẩm';
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="editGenre(${id})" type="button">Cập nhật</button>`;
    $('#create-genre-title').html(title);
    $('#create-genre-footer').html(footer);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/genres/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser?.token
        },
        success: function (genre) {
            $('#name').val(genre.name);
        }
    })
}

function editGenre(id) {
    let name = $('#name').val();
    let genre =
        {
            name : namex
        }
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/genres/${id}`,
        data: JSON.stringify(genre),
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        success: function () {
            getAllGenre();
            showSuccessMessage('Sửa thành công!');
        },
        error: function () {
            showErrorMessage('Sửa lỗi!');
        }
    })
}

$(document).ready(function (){
    getAllGenre();
})
