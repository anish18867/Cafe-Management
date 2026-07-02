// Simple Demo Authentication System using localStorage

// Demo users for testing
const DEMO_USERS = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' },
    { username: 'test', password: 'test123', role: 'user' }
];

// Initialize users in localStorage if not exists
function initAuth() {
    if (!localStorage.getItem('cafe_users')) {
        localStorage.setItem('cafe_users', JSON.stringify(DEMO_USERS));
    }
    if (!localStorage.getItem('cafe_current_user')) {
        localStorage.setItem('cafe_current_user', null);
    }
}

// Login function
function login(username, password) {
    initAuth();
    const users = JSON.parse(localStorage.getItem('cafe_users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('cafe_current_user', JSON.stringify(user));
        return { success: true, user: user };
    }
    return { success: false, message: 'Invalid username or password' };
}

// Register function
function register(username, email, password) {
    initAuth();
    const users = JSON.parse(localStorage.getItem('cafe_users')) || [];
    
    // Check if user exists
    if (users.find(u => u.username === username)) {
        return { success: false, message: 'Username already exists' };
    }
    
    // Add new user
    users.push({ username, email, password });
    localStorage.setItem('cafe_users', JSON.stringify(users));
    
    // Auto login after registration
    localStorage.setItem('cafe_current_user', JSON.stringify({ username, email }));
    return { success: true, user: { username, email } };
}

// Logout function
function logout() {
    localStorage.setItem('cafe_current_user', null);
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('cafe_current_user'));
}

// Check if user is logged in
function isLoggedIn() {
    const user = localStorage.getItem('cafe_current_user');
    return user !== null && user !== 'null';
}

// Check if current user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Initialize on load
initAuth();

// Export functions for use in HTML
window.auth = {
    login,
    register,
    logout,
    getCurrentUser,
    isLoggedIn,
    isAdmin
};
