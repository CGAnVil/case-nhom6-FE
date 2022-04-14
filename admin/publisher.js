let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong
function showNameUser(){
    let name = ` <a class="d-block" href="#">${currentUser.username}</a>`
    $(`#name_admin`).html(name)
}
$(document).ready(function (){
    showNameUser();
})

function getAllPublisher() {
    $.ajax({
        url: `http://localhost:8080/publishes`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (publishes) {
            let content = '';
            for (let i = 0; i < publishes.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td>${publishes[i].name}</td>
        <td><button class="btn btn-primary"><i class="fa fa-edit" data-target="#create-publisher" data-toggle="modal"
                                        type="button" onclick="showEditPublisher(${publishes[i].id})"></i></button></td>
        <td><button class="btn btn-danger" data-target="#delete-publisher" data-toggle="modal"
                                        type="button" onclick="showDeletePublisher(${publishes[i].id})"><i class="fa fa-trash"></i></button></td>
    </tr>`
            }
            $('#publisher-list-content').html(content);
        }
    })
}

function createNewPublisher() {
    let name = $('#name').val();
    let publisher = {
        name: name
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/publishes',
        data: JSON.stringify(publisher),
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        success: function () {
            getAllPublisher();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi!');
        }
    })
}

function deletePublisher(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/publishes/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllPublisher();
            showSuccessMessage('Xóa thành công!');
            // $('#delete-product').hide();
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeletePublisher(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deletePublisher(${id})" type="button">Xóa</button>`;
    $('#footer-delete').html(content);
}

function showEditPublisher(id) {
    let title = 'Chỉnh sửa thông tin sản phẩm';
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="editPublisher(${id})" type="button">Cập nhật</button>`;
    $('#create-publisher-title').html(title);
    $('#create-publisher-footer').html(footer);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/publishes/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (publisher) {
            $('#name').val(publisher.name);
        }
    })
}

function editPublisher(id) {
    let name = $('#name').val();
    let publisher =
        {
            name : namex
        }
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/publishes/${id}`,
        data: JSON.stringify(publisher),
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        success: function () {
            getAllPublisher();
            showSuccessMessage('Sửa thành công!');
        },
        error: function () {
            showErrorMessage('Sửa lỗi!');
        }
    })
}
getAllPublisher();

