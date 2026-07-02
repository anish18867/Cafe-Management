$(document).ready(function() {
    let menuData = [];
    let currentFilter = 'all';
    let searchQuery = '';
    let currentPage = 1;
    let itemsPerPage = 12;
    let filteredItems = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    let renderTimeout;

    // THROTTLED RENDER (key perf fix)
    function throttledRender(items) {
        filteredItems = items;
        currentPage = 1;
        if (renderTimeout) clearTimeout(renderTimeout);
        renderTimeout = setTimeout(() => renderPage(1), 100);
    }

    // SINGLE RENDER FUNCTION (no recursion/duplication)
    function renderPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = filteredItems.slice(start, end);
        
        let html = '';
        pageItems.forEach(item => {
            if (!item.id) return;
            
            const cartItem = cart[item.id];
            const isWishlisted = JSON.parse(localStorage.getItem('wishlist') || '[]').includes(item.id);
            const rating = parseInt(localStorage.getItem('ratings_' + item.id)) || 0;
            
            const actionHtml = cartItem ? 
                `<div class="qty-ctrl"><button class='minus' data-id="${item.id}">-</button><span>${cartItem.quantity}</span><button class='plus' data-id="${item.id}">+</button></div>` :
                `<button class="add-cart" data-id="${item.id}">Add to Cart</button>`;
            
            const stars = Array(5).fill().map((_,i) => `<span class="star ${i<rating?'filled':''}" data-id="${item.id}" data-rating="${i+1}">★</span>`).join('');
            
            const categoryShort = getCategoryShort(item.category);
            
            html += `
                <div class="col menu-item-card" data-category="${item.category}">
                    <div class="card h-100">
                        <div class="card-img-container">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}" loading="lazy">
                            <button class="wishlist-btn ${isWishlisted?'active':''}" data-id="${item.id}">${isWishlisted?'❤️':'🤍'}</button>
                            <span class="category-badge">${categoryShort}</span>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <div class="star-rating">${stars}</div>
                            <h6 class="price">₹${item.price}</h6>
                            <div class="add">${actionHtml}</div>
                        </div>
                    </div>
                </div>`;
        });
        
        if (end < filteredItems.length) {
            html += `<div class="col-12"><button id="load-more" class="btn btn-primary w-100" data-page="${page+1}">Load More</button></div>`;
        }
        
        $('#menuContainer').html(html);
    }

    function getCategoryShort(cat) {
        const map = {
            'Hot Beverages': 'Hot',
            'Cold Beverages': 'Cold', 
            'Snacks': 'Snacks',
            'Indian Style Hot Beverages': 'Indian Hot',
            'Indian Style Cold Beverages': 'Indian Cold',
            'Indian Snacks (Savory)': 'Indian Snacks',
            'Indian Light Meals': 'Indian Meals',
            'Indian Desserts / Sweets': 'Indian Sweets',
            'Fusion (Indian + Café Style)': 'Fusion'
        };
        return map[cat] || cat;
    }

    // Load JSON async
    async function loadMenu() {
        try {
            const response = await fetch('menu.json');
            menuData = await response.json();
            throttledRender(menuData);
        } catch(e) {
            console.error('Menu load failed', e);
        }
    }

    loadMenu();

    // THROTTLED FILTER/SEARCH
    $('#searchInput').on('input', debounce(function() {
        searchQuery = this.value.toLowerCase();
        throttledRender(menuData.filter(item => 
            item.name.toLowerCase().includes(searchQuery) || 
            item.category.toLowerCase().includes(searchQuery)
        ));
    }, 500));

    $('#categoryFilters .btn').on('click', debounce(function() {
        $('#categoryFilters .btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        throttledRender(menuData.filter(item => currentFilter === 'all' || item.category === currentFilter));
    }, 300));

    // SINGLE EVENT DELEGATION (perf)
    $(document).on('click', '.add-cart, .load-more, .wishlist-btn, .star, .plus, .minus', function(e) {
        const $el = $(this);
        const id = $el.data('id');
        const item = menuData.find(i => i.id === id);
        
        if (!$el.hasClass('load-more') && !item) return;

        if ($el.hasClass('add-cart')) {
            cart[id] = {name: item.name, price: item.price, quantity: 1};
        } else if ($el.hasClass('plus')) {
            cart[id].quantity++;
        } else if ($el.hasClass('minus') && cart[id]) {
            cart[id].quantity--;
            if (cart[id].quantity <= 0) delete cart[id];
        } else if ($el.hasClass('wishlist-btn')) {
            toggleWishlist(id, $el);
        } else if ($el.hasClass('star')) {
            saveRating(id, $el.data('rating'));
        } else if ($el.hasClass('load-more')) {
            renderPage($el.data('page'));
            return;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        updateItemDisplay(id);
    });

    // Util functions
    function debounce(fn, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    function toggleWishlist(id, $btn) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const idx = wishlist.indexOf(id);
        if (idx > -1) {
            wishlist.splice(idx, 1);
            $btn.removeClass('active').html('🤍');
        } else {
            wishlist.push(id);
            $btn.addClass('active').html('❤️');
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    function saveRating(id, rating) {
        localStorage.setItem('ratings_' + id, rating);
        // Stars will rerender on next page
    }

    function updateItemDisplay(id) {
        // Update single item without full rerender
        const $add = $(`[data-id="${id}"]`).closest('.add');
        if (cart[id]) {
            $add.html(`<div class="qty-ctrl"><button class='minus' data-id="${id}">-</button><span>${cart[id].quantity}</span><button class='plus' data-id="${id}">+</button></div>`);
        }
    }

    function updateCartUI() {
        const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        $('#lbltotal').text(`₹${totalPrice}`);
        // Sidebar logic unchanged...
    }

    // Sidebar (unchanged)
    $('.cartsidebar').on('click', function() {
        $('.sidebar').fadeIn(200);
        $(this).hide();
    });
    $('.close').on('click', function() {
        $('.sidebar').fadeOut(200);
        $('.cartsidebar').show();
    });
    
    $('#clear').on('click', function() {
        cart = {};
        localStorage.setItem('cart', '{}');
        updateCartUI();
    });
});
