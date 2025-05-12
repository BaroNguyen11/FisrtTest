function initAuthSystem() {
    updateUserUI();
    document.getElementById("registerBtn")?.addEventListener("click", handleRegister);
    document.getElementById("loginBtn")?.addEventListener("click", handleLogin);
    document.getElementById("confirmLogoutBtn")?.addEventListener("click", handleLogout);
    window.addEventListener('storage', function() {
        updateUserUI();
    });
}

function updateUserUI() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const userIconContainer = document.getElementById("userIconContainer");
    const logoutIcon = document.getElementById("logoutIcon");
    if (!userIconContainer) return;
    if (user) {
        userIconContainer.innerHTML = `
            <div class="user-menu position-relative">
                <img src="${user.avatar || '../img/login.png'}" id="avatar" 
                     class="avatar-img rounded-circle" style="width:30px; height:30px; cursor:pointer;">
                <ul id="userDropdown" class="userDropdown">
                    <li class="dropdown-item text-dark">Xin chào, <strong>${user.username}</strong></li>
                    <li class="dropdown-item"><a href="../html/me.html" class="dropdown-link fs-5">Hồ sơ</a></li>
                    <li class="dropdown-item"><a href="../html/cart.html" class="dropdown-link fs-5">Đơn hàng</a></li>
                    <li class="dropdown-item" id="logoutOption"><a href="#" class="dropdown-link logout-link fs-5 text-danger">Đăng xuất</a></li>
                </ul>
            </div>
        `;
       
        setupDropdownEvents();
    } else {
        userIconContainer.innerHTML = `
            <i class="fas fa-user user-icon " data-bs-toggle="modal" data-bs-target="#loginModal"></i>
        `;
    }
}

function setupDropdownEvents() {
    const avatar = document.getElementById("avatar");
    const dropdown = document.getElementById("userDropdown");
    const logoutOption = document.getElementById("logoutOption");
    if (!avatar || !dropdown || !logoutOption) return;
    avatar.addEventListener("click", function(e) {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });
    dropdown.addEventListener("click", function(e) {
        e.stopPropagation();
    });
    logoutOption.addEventListener("click", function(e) {
        e.preventDefault();
        bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmLogoutModal')).show();
    });
    document.addEventListener("click", function() {
        dropdown.classList.remove("show");
    });
}

function handleRegister() {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = document.getElementById("regEmail").value.trim();
    if (!username || !password || !confirmPassword || !email) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
    }
    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp");
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Email không hợp lệ");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.username === username)) {
        alert("Tên đăng nhập đã tồn tại");
        return;
    }
    const newUser = { 
        username, 
        password, 
        email,
        avatar: '../img/login.png',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
    updateUserUI();
    alert("Đăng ký thành công!");
}

function handleLogin() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!username || !password) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        alert("Sai tên đăng nhập hoặc mật khẩu");
        return;
    }
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    updateUserUI();
    alert("Đăng nhập thành công!");
}

function handleLogout() {
    localStorage.removeItem("loggedInUser");
    bootstrap.Modal.getInstance(document.getElementById('confirmLogoutModal')).hide();
    updateUserUI();
}

document.addEventListener('DOMContentLoaded', initAuthSystem);

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (loggedInUser) {
        updateUserUI();
        
    }
});
document.querySelector('a[href="../html/cart.html"]')?.addEventListener('click', function(e) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        e.preventDefault(); 
        bootstrap.Modal.getOrCreateInstance(document.getElementById('loginModal')).show();
        alert("Vui lòng đăng nhập để xem giỏ hàng");
    }
});