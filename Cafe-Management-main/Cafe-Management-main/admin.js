// Admin Dashboard Logic
$(document).ready(function() {
    initDashboard();
});

function initDashboard() {
    // Tab switching
    $('.nav-link-admin').click(function(e) {
        e.preventDefault();
        $('.nav-link-admin').removeClass('active');
        $(this).addClass('active');
        
        $('.tab-content').hide();
        const targetTab = $(this).data('tab');
        $('#' + targetTab).show();
        
        // Load tab content
        if (targetTab === 'menu-mgmt') loadMenuManagement();
        else if (targetTab === 'orders') loadOrders();
        else if (targetTab === 'users') loadUsers();
        else if (targetTab === 'stats') loadStats();
    });
    
    // Menu Modal
    $('#addMenuItemBtn').click(() => openMenuModal());
    $('#saveMenuBtn').click(() => saveMenuItem());
    
    // Load default tab
    $('#menu-mgmt').show();
    loadMenuManagement();
}

// === MENU MANAGEMENT ===
let menuData = [];

function loadMenuManagement() {
    menuData = JSON.parse(localStorage.getItem('cafe_menu') || localStorage.getItem('menuData') || '[]');
    if (menuData.length === 0) {
        // Fallback to inline data or menu.json
        $.getJSON('menu.json').done(data => {
            menuData = data;
            renderMenuList();
        }).fail(() => renderMenuList());
    } else {
        renderMenuList();
    }
}

function renderMenuList() {
    let html = '';
    menuData.forEach((item, index) => {
        html += `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card dashboard-card h-100">
                    <img src="${item.image || 'images/coffee-default.jpg'}" class="card-img-top" style="height:150px;object-fit:cover;">
                    <div class="card-body">
                        <h6 class="card-title">${item.name}</h6>
                        <p>₹${item.price} | ${item.category}</p>
                        <div class="btn-group w-100">
                            <button class="btn btn-warning btn-sm" onclick="editMenuItem(${index})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteMenuItem(${index})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    if (html === '') html = '<p class="text-muted">No menu items. Add some!</p>';
    $('#menuList').html(html);
}

function openMenuModal(editIndex = -1) {
    $('#menuForm')[0].reset();
    $('#modalTitle').text(editIndex >= 0 ? 'Edit Menu Item' : 'Add Menu Item');
    $('#editId').val(editIndex);
    if (editIndex >= 0) {
        const item = menuData[editIndex];
        $('#itemName').val(item.name);
        $('#itemPrice').val(item.price);
        $('#itemCategory').val(item.category);
        $('#itemImage').val(item.image);
    }
    new bootstrap.Modal(document.getElementById('menuModal')).show();
}

function saveMenuItem() {
    const index = parseInt($('#editId').val());
    const newItem = {
        id: 'item_' + Date.now(),
        name: $('#itemName').val(),
        price: parseFloat($('#itemPrice').val()),
        category: $('#itemCategory').val(),
        image: $('#itemImage').val()
    };
    
    if (index >= 0) {
        menuData[index] = newItem;
    } else {
        menuData.push(newItem);
    }
    
    localStorage.setItem('cafe_menu', JSON.stringify(menuData));
    renderMenuList();
    bootstrap.Modal.getInstance(document.getElementById('menuModal')).hide();
    showToast('Menu item saved!');
    
    // Trigger menu.js reload if open
    if (typeof renderMenu === 'function') renderMenu(menuData);
}

function editMenuItem(index) { openMenuModal(index); }
function deleteMenuItem(index) {
    if (confirm('Delete this item?')) {
        menuData.splice(index, 1);
        localStorage.setItem('cafe_menu', JSON.stringify(menuData));
        renderMenuList();
        showToast('Item deleted');
    }
}

// === ORDERS ===
function loadOrders() {
    const orders = getAllOrders();
    let html = orders.length ? '' : '<p class="text-muted">No orders yet.</p>';
    orders.forEach((order, idx) => {
        let total = 0;
        let itemsHtml = '';
        for (let id in order.items) {
            const item = order.items[id];
            total += item.price * item.quantity;
            itemsHtml += `<li>${item.name} x${item.quantity} (₹${item.price})</li>`;
        }
        html += `
            <div class="card dashboard-card mb-3">
                <div class="card-body">
                    <h6>Order #${idx+1} | ₹${total} | ${order.timestamp}</h6>
                    <ul class="list-unstyled">${itemsHtml}</ul>
                    <button class="btn btn-success btn-sm" onclick="completeOrder(${idx})">Complete</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteOrder(${idx})">Delete</button>
                </div>
            </div>`;
    });
    $('#ordersList').html(html);
}

function getAllOrders() {
    let orders = JSON.parse(localStorage.getItem('cafe_orders') || '[]');
    // Scan for cart data in other keys
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('cart_')) {
            try {
                const cart = JSON.parse(localStorage.getItem(key));
                if (Object.keys(cart).length > 0) {
                    orders.push({
                        items: cart,
                        timestamp: key.replace('cart_', '') || new Date().toLocaleString()
                    });
                }
            } catch(e) {}
        }
    }
    return orders;
}

function completeOrder(idx) {
    const orders = JSON.parse(localStorage.getItem('cafe_orders') || '[]');
    orders.splice(idx, 1);
    localStorage.setItem('cafe_orders', JSON.stringify(orders));
    loadOrders();
    showToast('Order completed!');
}

function deleteOrder(idx) {
    if (confirm('Delete order?')) {
        const orders = JSON.parse(localStorage.getItem('cafe_orders') || '[]');
        orders.splice(idx, 1);
        localStorage.setItem('cafe_orders', JSON.stringify(orders));
        loadOrders();
    }
}

// === USERS ===
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('cafe_users') || '[]');
    let html = users.length ? '' : '<p>No users.</p>';
    users.forEach((user, idx) => {
        html += `
            <div class="card dashboard-card mb-3">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${user.username}</strong><br>
                        <small>${user.email || 'N/A'} | Role: ${user.role || 'user'}</small>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${idx})">Delete</button>
                </div>
            </div>`;
    });
    $('#usersList').html(html);
}

function deleteUser(idx) {
    if (confirm('Delete user?')) {
        const users = JSON.parse(localStorage.getItem('cafe_users') || '[]');
        if (users[idx].username === 'admin') {
            alert('Cannot delete admin!');
            return;
        }
        users.splice(idx, 1);
        localStorage.setItem('cafe_users', JSON.stringify(users));
        loadUsers();
    }
}

// === STATS ===
let salesChart;
function loadStats() {
    const stats = calculateStats();
    renderStatsSummary(stats);
    renderSalesChart(stats);
}

function calculateStats() {
    const orders = getAllOrders();
    let totalRevenue = 0;
    let topItem = { name: '', count: 0 };
    const menuCounts = {};
    
    orders.forEach(order => {
        for (let id in order.items) {
            const item = order.items[id];
            totalRevenue += item.price * item.quantity;
            menuCounts[id] = (menuCounts[id] || 0) + item.quantity;
        }
    });
    
    // Find top item
    for (let id in menuCounts) {
        if (menuCounts[id] > topItem.count) {
            topItem.count = menuCounts[id];
            topItem.name = menuData.find(m => m.id === id)?.name || id;
        }
    }
    
    return { totalRevenue, orderCount: orders.length, topItem, menuCounts };
}

function renderStatsSummary(stats) {
    $('#statsSummary').html(`
        <div class="col-md-3">
            <div class="stat-card p-3">
                <h3>₹${stats.totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card p-3">
                <h3>${stats.orderCount}</h3>
                <p>Total Orders</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card p-3">
                <h3>${stats.topItem.name}</h3>
                <p>Top Item (${stats.topItem.count})</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card p-3">
                <h3>${Object.keys(getAllOrders()[0]?.items || {}).length || 0}</h3>
                <p>Menu Items</p>
            </div>
        </div>
    `);
}

function renderSalesChart(stats) {
    const ctx = document.getElementById('salesChart').getContext('2d');
    if (salesChart) salesChart.destroy();
    
    salesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Revenue', 'Pending Analysis'],
            datasets: [{
                data: [stats.totalRevenue, 1000],
                backgroundColor: ['#D4A574', '#E8B88A']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// === UTILS ===
function showToast(message) {
    const toast = $(`<div class="alert alert-success position-fixed" style="top:20px;right:20px;z-index:9999;">${message}</div>`);
    $('body').append(toast);
    setTimeout(() => toast.fadeOut(), 3000);
}
