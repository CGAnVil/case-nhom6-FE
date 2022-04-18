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
            if (isAdmin(currentUser.roles) === true) {
                location.href = "/case-nhom6-FE/homepage-2/adminHome.html"
            } else if (currentUser.roles[0].authority === "ROLE_USER") {
                location.href = "/case-nhom6-FE/homepage-2/home.html"
            }
        }
    });
}

function isAdmin(roles){
    let isAdmin = false;
    for (let i = 0; i < roles.length; i++) {
        if(roles[i].authority === "ROLE_ADMIN"){
            return isAdmin = true;
        }
    }
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
            location.href = '/case-nhom6-FE/homepage-2/sign-in.html';
        },
        error: function () {
            showErrorMessage('Xảy ra lỗi!')
        }
    })
}
