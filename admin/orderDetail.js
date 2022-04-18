let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong
function showNameUser(){
    let name = ` <a class="d-block" href="#">${currentUser.username}</a>`
    $(`#name_admin`).html(name)
}
$(document).ready(function (){
    showNameUser();
})
let idOrder = new URL(location.href).searchParams.get("id");

function getAllOrderDetail() {
    $.ajax({
        url: `http://localhost:8080/order-details?id=${idOrder}`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (orderDetail) {
            let content = '';
            for (let i = 0; i < orderDetail.length; i++) {
                content += `<tr>
        <td>${i + 1}</td>
        <td>${orderDetail[i].order.user.username}</td>
        <td>${orderDetail[i].book.name}</td>
        <td>${orderDetail[i].amount}</td>
        <td>${new Date(orderDetail[i].order.createDate).getUTCDate()}/${new Date(orderDetail[i].order.createDate).getUTCMonth() + 1}/${new Date(orderDetail[i].order.createDate).getUTCFullYear()}</td>
        <td>${orderDetail[i].order.userInfo.address}</td>
        <td>${orderDetail[i].order.userInfo.phoneNumber}</td>
        <td><button class="btn btn-danger" data-target="#delete-orderDetail" data-toggle="modal"
                                        type="button" onclick="showDeleteOrderDetail(${orderDetail[i].id})"><i class="fa fa-trash"></i></button></td>
    </tr>`
            }
            $('#orderDetail-list-content').html(content);
        }
    })
}


function deleteOrderDetail(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/order-details/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllOrderDetail();
            showSuccessMessage('Xóa thành công!');
            // $('#delete-product').hide();
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeleteOrderDetail(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteOrderDetail(${id})" type="button">Xóa</button>`;
    $('#footer-delete').html(content);
}


getAllOrderDetail();
