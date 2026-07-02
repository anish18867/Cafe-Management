// Theme Management - Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('cafeTheme') || 'light';
    applyTheme(savedTheme);
    
    // Create theme toggle button if it doesn't exist
    createThemeToggle();
    
    // Add smooth animations
    initAnimations();
});

function createThemeToggle() {
    // Check if toggle already exists
    if (document.getElementById('theme-toggle')) return;
    
    const nav = document.querySelector('.navbar-nav');
    if (!nav) return;
    
    const themeItem = document.createElement('li');
    themeItem.className = 'nav-item';
    themeItem.innerHTML = `
        <button id="theme-toggle" class="nav-link btn-link" style="background:none;border:none;cursor:pointer;color:rgba(255,255,255);">
            <span id="theme-icon">🌙</span>
        </button>
    `;
    nav.appendChild(themeItem);
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('cafeTheme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

function applyTheme(theme) {
    localStorage.setItem('cafeTheme', theme);
    
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (document.getElementById('theme-icon')) {
            document.getElementById('theme-icon').textContent = '☀️';
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (document.getElementById('theme-icon')) {
            document.getElementById('theme-icon').textContent = '🌙';
        }
    }
}

// Smooth Animations
function initAnimations() {
    // Add fade-in animation to elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Add hover animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.classList.add('hover-animate');
    });
}

// Wishlist Management
const WishlistManager = {
    getWishlist() {
        return JSON.parse(localStorage.getItem('wishlist')) || [];
    },
    
    saveWishlist(wishlist) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    },
    
    addItem(itemId) {
        const wishlist = this.getWishlist();
        if (!wishlist.includes(itemId)) {
            wishlist.push(itemId);
            this.saveWishlist(wishlist);
            this.updateWishlistUI();
            return true;
        }
        return false;
    },
    
    removeItem(itemId) {
        let wishlist = this.getWishlist();
        wishlist = wishlist.filter(id => id !== itemId);
        this.saveWishlist(wishlist);
        this.updateWishlistUI();
    },
    
    isInWishlist(itemId) {
        return this.getWishlist().includes(itemId);
    },
    
    updateWishlistUI() {
        const wishlistButtons = document.querySelectorAll('.wishlist-btn');
        const wishlist = this.getWishlist();
        
        wishlistButtons.forEach(btn => {
            const itemId = btn.dataset.itemId;
            if (wishlist.includes(itemId)) {
                btn.classList.add('active');
                btn.innerHTML = '❤️';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '🤍';
            }
        });
    }
};

// Ratings Management
const RatingsManager = {
    getRatings() {
        return JSON.parse(localStorage.getItem('ratings')) || {};
    },
    
    saveRating(itemId, rating) {
        const ratings = this.getRatings();
        ratings[itemId] = rating;
        localStorage.setItem('ratings', JSON.stringify(ratings));
        this.updateRatingUI(itemId);
    },
    
    getRating(itemId) {
        const ratings = this.getRatings();
        return ratings[itemId] || 0;
    },
    
    updateRatingUI(itemId) {
        const ratingContainer = document.getElementById(`rating-${itemId}`);
        if (!ratingContainer) return;
        
        const rating = this.getRating(itemId);
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsHTML += `<span class="star ${i <= rating ? 'filled' : ''}" data-rating="${i}" data-item="${itemId}">★</span>`;
        }
        ratingContainer.innerHTML = starsHTML;
        
        // Add click handlers
        ratingContainer.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', function() {
                const itemId = this.dataset.item;
                const rating = parseInt(this.dataset.rating);
                RatingsManager.saveRating(itemId, rating);
            });
            
            star.addEventListener('mouseenter', function() {
                const itemId = this.dataset.item;
                const rating = parseInt(this.dataset.rating);
                highlightStars(itemId, rating);
            });
        });
    }
};

function highlightStars(itemId, rating) {
    const container = document.getElementById(`rating-${itemId}`);
    if (!container) return;
    
    container.querySelectorAll('.star').forEach((star, index) => {
        star.classList.toggle('filled', index < rating);
    });
}

// Special Offers
const OffersManager = {
    offers: [
        { title: "🎉 Summer Sale!", desc: "Get 20% off on all Cold Coffees", code: "SUMMER20" },
        { title: "☕ Happy Hours", desc: "Buy 2 Get 1 Free on Hot Coffee", code: "HAPPYHOUR" },
        { title: "🎂 Birthday Special", desc: "10% off on your birthday month", code: "BDAY10" }
    ],
    
    getRandomOffer() {
        const randomIndex = Math.floor(Math.random() * this.offers.length);
        return this.offers[randomIndex];
    },
    
    displayOffer() {
        const offer = this.getRandomOffer();
        const banner = document.getElementById('special-offer-banner');
        if (banner) {
            banner.innerHTML = `
                <div class="offer-content">
                    <span class="offer-title">${offer.title}</span>
                    <span class="offer-desc">${offer.desc}</span>
                    <span class="offer-code">Code: ${offer.code}</span>
                </div>
            `;
            banner.classList.add('show');
        }
    },
    
    dismissOffer() {
        const banner = document.getElementById('special-offer-banner');
        if (banner) {
            banner.classList.remove('show');
        }
    }
};

// Menu Search
const MenuSearch = {
    searchItems(query) {
        const items = document.querySelectorAll('.menu-item-row');
        query = query.toLowerCase();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';
        });
    },
    
    filterCategory(category) {
        const items = document.querySelectorAll('.menu-item-row');
        
        items.forEach(item => {
            if (category === 'all') {
                item.style.display = '';
            } else {
                const itemCategory = item.dataset.category;
                item.style.display = itemCategory === category ? '' : 'none';
            }
        });
    }
};

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize wishlist UI
    WishlistManager.updateWishlistUI();
    
    // Initialize ratings UI
    const ratings = RatingsManager.getRatings();
    for (const itemId in ratings) {
        RatingsManager.updateRatingUI(itemId);
    }
    
    // Show special offer on home page
    if (document.getElementById('special-offer-banner')) {
        OffersManager.displayOffer();
    }
    
    // Initialize search if on menu page
    const searchInput = document.getElementById('menu-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            MenuSearch.searchItems(this.value);
        });
    }
});
