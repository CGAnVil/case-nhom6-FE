function login() {
    let username = $('#username').val();
    let password = $('#password').val();
    let user = {
        username: username,
        password: password
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/login',
        data: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            location.href = '/case-study-nhom6-FE/admin/homepage.html'
        }
    });
}

function register() {
    let username = $('#user-name').val();
    let password = $('#user-pass').val();
    let confirmPassword = $('#user-repeatpass').val();
    let user = {
        username: username,
        passwordForm: {
            password: password,
            confirmPassword: confirmPassword
        }
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/register',
        data: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            location.href = '/case-nhom6-FE/homepage/sign-in.html';
        },
        error: function () {
            showErrorMessage('Xảy ra lỗi!')
        }
    })
}