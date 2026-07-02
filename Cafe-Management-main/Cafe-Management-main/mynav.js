$(document).ready(function(){
    $(".nav-item.dropdown").hover(function(){
        $(".dropdown-menu").stop(true, true).show(300);
    },
    function(){
        $(".dropdown-menu").stop(true, true).hide(300);
    });

    // Handle authentication state in navbar
    function updateNavbar() {
        const currentUser = localStorage.getItem('cafe_current_user');
        const navRight = $('.navbar-nav.navbar-right');
        
        if (currentUser && currentUser !== 'null') {
            const user = JSON.parse(currentUser);
            
            // Remove Login and Sign Up links
            navRight.find('a[href="login.html"], a[href="signup.html"]').parent().remove();
            
            // Add User info, Admin link if admin, and Logout
            let adminLink = '';
            if (user.role === 'admin') {
                adminLink = `
                    <li class="nav-item">
                        <a href="admin.html" class="nav-link" style="color:gold; font-weight:bold;">👑 Admin Dashboard</a>
                    </li>`;
            }
            navRight.append(`
                <li class="nav-item">
                    <span class="nav-link" style="color:rgba(255, 255, 255);">👤 ${user.username} ${user.role === 'admin' ? '(Admin)' : ''}</span>
                </li>
                ${adminLink}
                <li class="nav-item">
                    <a href="#" id="logoutBtn" class="nav-link" style="color:rgba(255, 255, 255);">Logout</a>
                </li>
            `);
            
            $('#logoutBtn').click(function(e) {
                e.preventDefault();
                localStorage.setItem('cafe_current_user', null);
                window.location.href = 'index.html';
            });
        }
    }

    updateNavbar();
});