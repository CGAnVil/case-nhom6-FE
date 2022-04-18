let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong
function showNameUser(){
    let name = ` <a class="d-block" href="#">${currentUser.username}</a>`
    $(`#name_admin`).html(name)
}
$(document).ready(function (){
    showNameUser();
})

function getAllOrder() {
    $.ajax({
        url: `http://localhost:8080/orders`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (orders) {
            let content = '';
            for (let i = 0; i < orders.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td>${orders[i].user.username}</td>
        <td>${new Date(orders[i].createDate).getUTCDate()}/${new Date(orders[i].createDate).getUTCMonth() + 1}/${new Date(orders[i].createDate).getUTCFullYear()}</td>
        <td>${orders[i].userInfo.phoneNumber}</td>
        <td><a href="/case-nhom6-FE/admin/orderDetail.html?id=${orders[i].id}">xem chi tiết</a></td>
        <td><button class="btn btn-danger" data-target="#delete-order" data-toggle="modal"
                                        type="button" onclick="showDeleteOrder(${orders[i].id})"><i class="fa fa-trash"></i></button></td>
    </tr>`
            }
            $('#order-list-content').html(content);
        }
    })
}


function deleteOrder(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/orders/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllOrder();
            showSuccessMessage('Xóa thành công!');
            // $('#delete-product').hide();
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeleteOrder(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteOrder(${id})" type="button">Xóa</button>`;
    $('#footer-delete').html(content);
}


getAllOrder();