$(document).ready(function () {
    // FULL INLINE DATA - all 47 items from menu.json for guaranteed display
    const fullMenuData = [
        {"id":"i1","name":"Hot Coffee","price":80,"category":"Hot Beverages","image":"https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=300&h=300&fit=crop"},
        {"id":"i2","name":"Black Coffee","price":80,"category":"Hot Beverages","image":"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=300&h=300&fit=crop"},
        {"id":"i3","name":"Hazelnut Cold Coffee","price":125,"category":"Cold Beverages","image":"https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=300&h=300&fit=crop"},
        {"id":"i4","name":"Chocolate Cold Coffee","price":125,"category":"Cold Beverages","image":"https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=300&h=300&fit=crop"},
        {"id":"i5","name":"Caramel Cold Coffee","price":125,"category":"Cold Beverages","image":"https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=300&h=300&fit=crop"},
        {"id":"i6","name":"Classic Cold Coffee","price":100,"category":"Cold Beverages","image":"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=300&h=300&fit=crop"},
        {"id":"i7","name":"Iced Americano","price":160,"category":"Cold Beverages","image":"https://images.unsplash.com/photo-1551046710-2342eff6a673?q=80&w=300&h=300&fit=crop"},
        {"id":"i8","name":"Maggie","price":30,"category":"Snacks","image":"https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=300&h=300&fit=crop"},
        {"id":"i9","name":"Cappuccino","price":120,"category":"Hot Beverages","image":"https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=300&h=300&fit=crop"},
        {"id":"i10","name":"Latte","price":140,"category":"Hot Beverages","image":"https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=300&h=300&fit=crop"},
        {"id":"i11","name":"Mocha","price":150,"category":"Hot Beverages","image":"https://images.unsplash.com/photo-1546041821-1d5a2c526c4e?q=80&w=300&h=300&fit=crop"},
        {"id":"i12","name":"Espresso","price":90,"category":"Hot Beverages","image":"https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=300&h=300&fit=crop"},
        {"id":"i13","name":"Vanilla Cold Coffee","price":130,"category":"Cold Beverages","image":"https://images.unsplash.com/photo-1553244849-f4b1d0b06a53?q=80&w=300&h=300&fit=crop"},
        {"id":"i14","name":"Mint Cold Coffee","price":135,"category":"Cold Beverages","image":"https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=300&h=300&fit=crop"},
        {"id":"i15","name":"Oreo Shake","price":145,"category":"Cold Beverages","image":"https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=300&h=300&fit=crop"},
        {"id":"i16","name":"Vegetable Maggie","price":50,"category":"Snacks","image":"https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=300&h=300&fit=crop"},
        {"id":"i17","name":"Cheese Maggie","price":60,"category":"Snacks","image":"https://images.unsplash.com/photo-1606103920295-972888a6ce84?q=80&w=300&h=300&fit=crop"},
        {"id":"i18","name":"Sandwich","price":80,"category":"Snacks","image":"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=300&h=300&fit=crop"},
        {"id":"i19","name":"French Fries","price":70,"category":"Snacks","image":"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=300&h=300&fit=crop"},
        {"id":"i20","name":"Garlic Bread","price":60,"category":"Snacks","image":"https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?q=80&w=300&h=300&fit=crop"},
        {"id":"ind1","name":"Masala Chai","price":30,"category":"Indian Style Hot Beverages","image":"https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=300&h=300&fit=crop"},
        {"id":"ind2","name":"Elaichi (Cardamom) Chai","price":35,"category":"Indian Style Hot Beverages","image":"https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=300&h=300&fit=crop"},
        {"id":"ind3","name":"Adrak (Ginger) Chai","price":35,"category":"Indian Style Hot Beverages","image":"https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=300&h=300&fit=crop"},
        {"id":"ind4","name":"Cutting Chai","price":25,"category":"Indian Style Hot Beverages","image":"https://images.unsplash.com/photo-1542124948-dc391252a940?q=80&w=300&h=300&fit=crop"},
        {"id":"ind5","name":"Filter Coffee (South Indian)","price":40,"category":"Indian Style Hot Beverages","image":"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300&h=300&fit=crop"},
        {"id":"ind6","name":"Badam Milk (Hot)","price":50,"category":"Indian Style Hot Beverages","image":"https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=300&h=300&fit=crop"},
        {"id":"ind7","name":"Turmeric Milk (Haldi Doodh)","price":45,"category":"Indian Style Hot Beverages","image":"https://images.unsplash.com/photo-1614167739025-5c3d29c6d00f?q=80&w=300&h=300&fit=crop"},
        {"id":"ind8","name":"Kashmiri Kahwa","price":60,"category":"Indian Style Hot Beverages","image":"https://images.unsplash.com/photo-1584448082637-23d7d3283848?q=80&w=300&h=300&fit=crop"},
        {"id":"ind9","name":"Sweet Lassi","price":40,"category":"Indian Style Cold Beverages","image":"https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=300&h=300&fit=crop"},
        {"id":"ind10","name":"Salted Lassi","price":35,"category":"Indian Style Cold Beverages","image":"https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=300&h=300&fit=crop"},
        {"id":"ind11","name":"Mango Lassi","price":55,"category":"Indian Style Cold Beverages","image":"https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=300&h=300&fit=crop"},
        {"id":"ind12","name":"Rose Milk","price":45,"category":"Indian Style Cold Beverages","image":"https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=300&h=300&fit=crop"},
        {"id":"ind13","name":"Buttermilk (Chaas)","price":30,"category":"Indian Style Cold Beverages","image":"https://images.unsplash.com/photo-1601050690114-9733f6de2b7f?q=80&w=300&h=300&fit=crop"},
        {"id":"ind14","name":"Thandai","price":50,"category":"Indian Style Cold Beverages","image":"https://images.unsplash.com/photo-1551446339-1e7455144dc0?q=80&w=300&h=300&fit=crop"},
        {"id":"ind15","name":"Cold Badam Milk","price":55,"category":"Indian Style Cold Beverages","image":"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=300&h=300&fit=crop"},
        {"id":"ind16","name":"Samosa (Veg)","price":25,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=300&h=300&fit=crop"},
        {"id":"ind17","name":"Samosa (Paneer)","price":35,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1626128154727-5389558c6595?q=80&w=300&h=300&fit=crop"},
        {"id":"ind18","name":"Kachori","price":25,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=300&h=300&fit=crop"},
        {"id":"ind19","name":"Vada Pav","price":30,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=300&h=300&fit=crop"},
        {"id":"ind20","name":"Pav Bhaji","price":80,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1626132647523-66dbeac34534?q=80&w=300&h=300&fit=crop"},
        {"id":"ind21","name":"Dhokla","price":50,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1589301760014-d929f3979db5?q=80&w=300&h=300&fit=crop"},
        {"id":"ind22","name":"Khaman","price":45,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1630404384362-1c8f9f2f9d8c?q=80&w=300&h=300&fit=crop"},
        {"id":"ind23","name":"Aloo Tikki","price":40,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=300&h=300&fit=crop"},
        {"id":"ind24","name":"Paneer Pakora","price":60,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=300&h=300&fit=crop"},
        {"id":"ind25","name":"Onion Pakora","price":35,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=300&h=300&fit=crop"},
        {"id":"ind26","name":"Bread Pakora","price":40,"category":"Indian Snacks (Savory)","image":"https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=300&h=300&fit=crop"},
        {"id":"ind27","name":"Chole Bhature","price":100,"category":"Indian Light Meals","image":"https://images.unsplash.com/photo-1626132647523-66dbeac34534?q=80&w=300&h=300&fit=crop"},
        {"id":"ind28","name":"Puri Bhaji","price":90,"category":"Indian Light Meals","image":"https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=300&h=300&fit=crop"},
        {"id":"ind29","name":"Veg Pulao","price":120,"category":"Indian Light Meals","image":"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=300&h=300&fit=crop"},
        {"id":"ind30","name":"Rajma Chawal","price":130,"category":"Indian Light Meals","image":"https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=300&h=300&fit=crop"},
        {"id":"ind31","name":"Paneer Butter Masala with Naan","price":180,"category":"Indian Light Meals","image":"https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=300&h=300&fit=crop"},
        {"id":"ind32","name":"Masala Dosa","price":100,"category":"Indian Light Meals","image":"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=300&h=300&fit=crop"},
        {"id":"ind33","name":"Idli Sambar","price":80,"category":"Indian Light Meals","image":"https://images.unsplash.com/photo-1589301760014-d929f3979db5?q=80&w=300&h=300&fit=crop"},
        {"id":"ind34","name":"Upma","price":70,"category":"Indian Light Meals","image":"https://images.unsplash.com/photo-1630404384362-1c8f9f2f9d8c?q=80&w=300&h=300&fit=crop"},
        {"id":"ind35","name":"Gulab Jamun","price":40,"category":"Indian Desserts / Sweets","image":"https://images.unsplash.com/photo-1626128154727-5389558c6595?q=80&w=300&h=300&fit=crop"},
        {"id":"ind36","name":"Rasgulla","price":45,"category":"Indian Desserts / Sweets","image":"https://images.unsplash.com/photo-1597393557895-6e6f9958681f?q=80&w=300&h=300&fit=crop"},
        {"id":"ind37","name":"Jalebi","price":50,"category":"Indian Desserts / Sweets","image":"https://images.unsplash.com/photo-1626128154727-5389558c6595?q=80&w=300&h=300&fit=crop"},
        {"id":"ind38","name":"Kaju Katli","price":80,"category":"Indian Desserts / Sweets","image":"https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=300&h=300&fit=crop"},
        {"id":"ind39","name":"Gajar Halwa","price":60,"category":"Indian Desserts / Sweets","image":"https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=300&h=300&fit=crop"},
        {"id":"ind40","name":"Rasmalai","price":70,"category":"Indian Desserts / Sweets","image":"https://images.unsplash.com/photo-1597393557895-6e6f9958681f?q=80&w=300&h=300&fit=crop"},
        {"id":"ind41","name":"Shrikhand","price":55,"category":"Indian Desserts / Sweets","image":"https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=300&h=300&fit=crop"},
        {"id":"ind42","name":"Masala Maggi","price":50,"category":"Fusion (Indian + Café Style)","image":"https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=300&h=300&fit=crop"},
        {"id":"ind43","name":"Tandoori Paneer Sandwich","price":90,"category":"Fusion (Indian + Café Style)","image":"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=300&h=300&fit=crop"},
        {"id":"ind44","name":"Bombay Grilled Sandwich","price":80,"category":"Fusion (Indian + Café Style)","image":"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=300&h=300&fit=crop"},
        {"id":"ind45","name":"Peri Peri Fries (Indian Spice Style)","price":85,"category":"Fusion (Indian + Café Style)","image":"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=300&h=300&fit=crop"},
        {"id":"ind46","name":"Chai Latte","price":80,"category":"Fusion (Indian + Café Style)","image":"https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=300&h=300&fit=crop"},
        {"id":"ind47","name":"Elaichi Cappuccino","price":90,"category":"Fusion (Indian + Café Style)","image":"https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=300&h=300&fit=crop"}
    ];
    
let menuData = fullMenuData;  // Use all 47 items
    let currentFilter = 'all';
    let searchQuery = '';
    let debounceTimer;
    
    // Pagination state
    let currentPage = 1;
    let itemsPerPage = 12;
    let filteredItems = [];

    // Debounce function for search
    function debounce(func, delay) {
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }

    function safeParse(key, defaultValue) {
        try {
            const val = localStorage.getItem(key);
            if (val === null || val === 'null' || val === 'undefined') return defaultValue;
            return JSON.parse(val);
        } catch (e) {
            console.error("Error parsing " + key + " from localStorage:", e);
            return defaultValue;
        }
    }

    let cart = safeParse("cart", {});

// Initial setup - DEBUG with fallback render first
    console.log('=== MENU.JS STARTING ===');
    console.log('jQuery loaded?', typeof $ !== 'undefined');
    // Remove initial console logs for prod perf
    renderMenu(fullMenuData);
    updateCartUI();
    $(".sidebar").hide();
    // JSON load disabled - full data already inline
    // setTimeout(() => {
    //     console.log('Loading FULL menu.json after 1s...');
    //     loadMenu();
    // }, 1000);

    // Load Menu from JSON
async function loadMenu() {
        console.log("Loading menu.json...");
        $('#menuContainer').html('<div class="col-12 text-center p-5"><div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div><h4 class="text-white mt-3">Loading menu...</h4></div>');
        
        try {
            // Try jQuery first
            const data = await $.getJSON('menu.json');
            console.log("jQuery getJSON success:", data.length, "items");
            menuData = Array.isArray(data) ? data : [];
            renderMenu(menuData);
        } catch (jqError) {
            console.warn("jQuery getJSON failed:", jqError);
            console.log("Trying native fetch fallback...");
            try {
                const response = await fetch('menu.json');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                console.log("Native fetch success:", data.length, "items");
                menuData = Array.isArray(data) ? data : [];
                renderMenu(menuData);
            } catch (fetchError) {
                console.error("Both jQuery and fetch failed:", fetchError);
                $('#menuContainer').html('<div class="col-12 text-center p-5 text-danger"><h3>Failed to load menu</h3><p>Please check console for details or refresh.</p></div>');
                renderMenu([]);
            }
        }
    }

function renderMenu(items) {
        filteredItems = items;  // Store full filtered list
        currentPage = 1;  // Reset to first page on filter/search
        
        const start = 0;
        const end = itemsPerPage;
        const pageItems = items.slice(start, end);
        
        if (!Array.isArray(pageItems) || pageItems.length === 0) {
            $('#menuContainer').html('<div class="col-12 text-center p-5"><h3 class="text-warning">No menu items match your search/filter</h3><p>Try adjusting your search or filters.</p></div>');
            return;
        }

        renderMenuPage(pageItems);

        const wishlist = safeParse('wishlist', []);
        let html = '';
        console.log("Starting HTML generation for page", currentPage);

        pageItems.forEach((item, index) => {
            if (!item || !item.id) return;

            let cartItem = cart[item.id];
            let actionHtml = '';
            const isWishlisted = wishlist.includes(item.id);
            const rating = parseInt(localStorage.getItem('ratings_' + item.id)) || 0;

            if (cartItem && cartItem.quantity > 0) {
                actionHtml = `
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <button id='minus${item.id}' class='btn btn-sm minus'>-</button>
                        <span id='val${item.id}' class="quantity-display fw-bold">${cartItem.quantity}</span>
                        <button id='plus${item.id}' class='btn btn-sm plus'>+</button>
                    </div>`;
            } else {
                actionHtml = `<button id="${item.id}" class="btn btn-primary cart w-100">Add to Cart</button>`;
            }

            // Generate stars HTML
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                starsHtml += `<span class="star ${i <= rating ? 'filled' : ''}" data-rating="${i}" data-item="${item.id}">★</span>`;
            }

            // Determine category display text
            let categoryDisplay = item.category;
            if (item.category === "Hot Beverages") categoryDisplay = "Hot";
            else if (item.category === "Cold Beverages") categoryDisplay = "Cold";
            else if (item.category === "Snacks") categoryDisplay = "Snacks";
            else if (item.category === "Indian Style Hot Beverages") categoryDisplay = "Indian Hot";
            else if (item.category === "Indian Style Cold Beverages") categoryDisplay = "Indian Cold";
            else if (item.category === "Indian Snacks (Savory)") categoryDisplay = "Indian Snacks";
            else if (item.category === "Indian Light Meals") categoryDisplay = "Indian Meals";
            else if (item.category === "Indian Desserts / Sweets") categoryDisplay = "Indian Sweets";
            else if (item.category === "Fusion (Indian + Café Style)") categoryDisplay = "Fusion";

            html += `
                <div class="col menu-item-card" data-category="${item.category}" style="animation-delay: 0.05s">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="card-img-container">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;" loading="lazy" onerror="this.src='images/coffee-default.jpg'">
                            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-item-id="${item.id}">
                                ${isWishlisted ? '❤️' : '🤍'}
                            </button>
                            <span class="category-badge">${categoryDisplay}</span>
                        </div>
                        <div class="card-body text-center">
                            <h5 class="card-title fw-bold" id="item${item.id}">${item.name}</h5>
                            <div class="star-rating mb-2" id="rating-${item.id}">
                                ${starsHtml}
                            </div>
                            <h6 class="price" id="price${item.id}">Rs.${item.price}</h6>
                            <div id="r${item.id}" class="add">
                                ${actionHtml}
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        
        // Check if more pages exist
        const hasMorePages = filteredItems.length > currentPage * itemsPerPage;
        
        if (hasMorePages) {
            html += `
                <div class="col-12 text-center mt-4">
                    <button id="loadMoreBtn" class="btn btn-primary btn-lg">Load More Items (Page ${currentPage + 1})</button>
                </div>`;
        }
        
        console.log("Generated HTML length:", html.length, "Has more pages:", hasMorePages);
        $('#menuContainer').html(html);
        console.log("HTML set to container. Items should now be visible.");
        
        // Load More button handler
        $(document).off('click', '#loadMoreBtn').on('click', '#loadMoreBtn', function() {
            currentPage++;
            renderCurrentPage();
        });
        
        // Render current page without resetting
        function renderCurrentPage() {
            const start = (currentPage - 1) * itemsPerPage;
            const end = currentPage * itemsPerPage;
            const pageItems = filteredItems.slice(start, end);
            renderMenuPage(pageItems);
        }
        
        // Separate function for rendering just the page items (no pagination reset)
        function renderMenuPage(pageItems) {
            const wishlist = safeParse('wishlist', []);
            let html = '';
            
            pageItems.forEach((item, index) => {
                if (!item || !item.id) return;
                // ... (reuse existing item HTML generation logic - but call it here)
                let cartItem = cart[item.id];
                let actionHtml = '';
                const isWishlisted = wishlist.includes(item.id);
                const rating = parseInt(localStorage.getItem('ratings_' + item.id)) || 0;

                if (cartItem && cartItem.quantity > 0) {
                    actionHtml = `
                        <div class="d-flex align-items-center justify-content-center gap-2">
                            <button id='minus${item.id}' class='btn btn-sm minus'>-</button>
                            <span id='val${item.id}' class="quantity-display fw-bold">${cartItem.quantity}</span>
                            <button id='plus${item.id}' class='btn btn-sm plus'>+</button>
                        </div>`;
                } else {
                    actionHtml = `<button id="${item.id}" class="btn btn-primary cart w-100">Add to Cart</button>`;
                }

                // Generate stars HTML
                let starsHtml = '';
                for (let i = 1; i <= 5; i++) {
                    starsHtml += `<span class="star ${i <= rating ? 'filled' : ''}" data-rating="${i}" data-item="${item.id}">★</span>`;
                }

                // Determine category display text
                let categoryDisplay = item.category;
                if (item.category === "Hot Beverages") categoryDisplay = "Hot";
                else if (item.category === "Cold Beverages") categoryDisplay = "Cold";
                else if (item.category === "Snacks") categoryDisplay = "Snacks";
                else if (item.category === "Indian Style Hot Beverages") categoryDisplay = "Indian Hot";
                else if (item.category === "Indian Style Cold Beverages") categoryDisplay = "Indian Cold";
                else if (item.category === "Indian Snacks (Savory)") categoryDisplay = "Indian Snacks";
                else if (item.category === "Indian Light Meals") categoryDisplay = "Indian Meals";
                else if (item.category === "Indian Desserts / Sweets") categoryDisplay = "Indian Sweets";
                else if (item.category === "Fusion (Indian + Café Style)") categoryDisplay = "Fusion";

                html += `
                    <div class="col menu-item-card" data-category="${item.category}" style="animation-delay: ${index * 0.05}s">
                        <div class="card h-100 shadow-sm border-0">
                            <div class="card-img-container">
                                <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;" loading="lazy" onerror="this.src='images/coffee-default.jpg'">
                                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-item-id="${item.id}">
                                    ${isWishlisted ? '❤️' : '🤍'}
                                </button>
                                <span class="category-badge">${categoryDisplay}</span>
                            </div>
                            <div class="card-body text-center">
                                <h5 class="card-title fw-bold" id="item${item.id}">${item.name}</h5>
                                <div class="star-rating mb-2" id="rating-${item.id}">
                                    ${starsHtml}
                                </div>
                                <h6 class="price" id="price${item.id}">Rs.${item.price}</h6>
                                <div id="r${item.id}" class="add">
                                    ${actionHtml}
                                </div>
                            </div>
                        </div>
                    </div>`;
            });
            
            const hasMorePages = filteredItems.length > currentPage * itemsPerPage;
            if (hasMorePages) {
                html += `
                    <div class="col-12 text-center mt-4">
                        <button id="loadMoreBtn" class="btn btn-primary btn-lg">Load More Items (Page ${currentPage + 1})</button>
                    </div>`;
            }
            
            $('#menuContainer').html(html);
            
            // Re-bind event listeners after render
            $('.wishlist-btn').off('click').on('click', function() {
                const itemId = $(this).data('item-id');
                toggleWishlist(itemId, $(this));
            });
            
            $('.star').off('click').on('click', function() {
                const itemId = $(this).data('item');
                const rating = $(this).data('rating');
                saveRating(itemId, rating);
            });
            
            $('.star').off('mouseenter mouseleave').hover(function() {
                const itemId = $(this).data('item');
                const rating = $(this).data('rating');
                highlightStars(itemId, rating);
            }, function() {
                const itemId = $(this).data('item');
                const currentRating = parseInt(localStorage.getItem('ratings_' + itemId)) || 0;
                highlightStars(itemId, currentRating);
            });
        }
        
        // Add event listeners for wishlist buttons
        $('.wishlist-btn').off('click').on('click', function() {
            const itemId = $(this).data('item-id');
            toggleWishlist(itemId, $(this));
        });
        
        // Add event listeners for star ratings
        $('.star').off('click').on('click', function() {
            const itemId = $(this).data('item');
            const rating = $(this).data('rating');
            saveRating(itemId, rating);
        });
        
        $('.star').off('mouseenter mouseleave').hover(function() {
            const itemId = $(this).data('item');
            const rating = $(this).data('rating');
            highlightStars(itemId, rating);
        }, function() {
            const itemId = $(this).data('item');
            const currentRating = parseInt(localStorage.getItem('ratings_' + itemId)) || 0;
            highlightStars(itemId, currentRating);
        });
    }

    // Update only the cart quantity display (prevents blinking)
    function updateCartQuantityDisplay(itemId) {
        const cartItem = cart[itemId];
        const container = $(`#r${itemId}`);
        
        if (cartItem && cartItem.quantity > 0) {
            const displayElement = $(`#val${itemId}`);
            displayElement.addClass('updating');
            setTimeout(() => displayElement.removeClass('updating'), 300);
        }
    }

    // Wishlist Functions
    function toggleWishlist(itemId, btnElement) {
        let wishlist = safeParse('wishlist', []);
        const index = wishlist.indexOf(itemId);
        
        if (index > -1) {
            wishlist.splice(index, 1);
            btnElement.html('🤍');
            btnElement.removeClass('active');
        } else {
            wishlist.push(itemId);
            btnElement.html('❤️');
            btnElement.addClass('active');
            showToast('Added to wishlist! ❤️');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // Rating Functions
    function saveRating(itemId, rating) {
        localStorage.setItem('ratings_' + itemId, rating);
        
        // Update UI
        const container = $(`#rating-${itemId}`);
        container.find('.star').each(function(index) {
            if (index < rating) {
                $(this).addClass('filled');
            } else {
                $(this).removeClass('filled');
            }
        });
        
        showToast('Rating saved! ⭐');
    }

    function highlightStars(itemId, rating) {
        const container = $(`#rating-${itemId}`);
        container.find('.star').each(function(index) {
            if (index < rating) {
                $(this).css('color', '#ffd700');
            } else {
                $(this).css('color', '#ddd');
            }
        });
    }

    // Toast Notification
    function showToast(message) {
        $('.toast-notification').remove();
        const toast = $(`<div class="toast-notification">${message}</div>`);
        $('body').append(toast);
        setTimeout(() => { 
            toast.css('opacity', '0');
            setTimeout(() => { toast.remove(); }, 300); 
        }, 2500);
    }

    // Get filtered items
    function getFilteredItems() {
        return menuData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
            return matchesSearch && matchesFilter;
        });
    }

    // Search functionality with debounce
    const debouncedSearch = debounce(function() {
        searchQuery = $('#searchInput').val();
        renderMenu(getFilteredItems());
    }, 300);
    
    // Initial call in renderMenu uses pageItems, subsequent load more uses renderCurrentPage

    $('#searchInput').on('input', function() {
        debouncedSearch();
    });

    // Filter functionality
    $('#categoryFilters .btn').on('click', function() {
        $('#categoryFilters .btn').removeClass('active');
        $(this).addClass('active');
        
        currentFilter = $(this).data('filter');
        renderMenu(getFilteredItems());
    });

    // Add to cart - update only quantity display
    $(document).on("click", ".cart", function () {
        const id = $(this).attr("id");
        const item = menuData.find(i => i.id === id);
        
        if (item) {
            cart[id] = {
                name: item.name,
                price: item.price,
                quantity: 1
            };
            updateCartUI();
            updateSingleCartDisplay(id);
            showToast('Added to cart! 🛒');
        }
    });

    // Update single item's cart display without re-rendering whole menu
    function updateSingleCartDisplay(itemId) {
        const cartItem = cart[itemId];
        const container = $(`#r${itemId}`);
        const item = menuData.find(i => i.id === itemId);
        
        if (!item) return;
        
        if (cartItem && cartItem.quantity > 0) {
            container.html(`
                <div class="d-flex align-items-center justify-content-center gap-2">
                    <button id='minus${itemId}' class='btn btn-sm minus'>-</button>
                    <span id='val${itemId}' class="quantity-display fw-bold">${cartItem.quantity}</span>
                    <button id='plus${itemId}' class='btn btn-sm plus'>+</button>
                </div>`);
            
            // Animate the quantity display
            const displayElement = $(`#val${itemId}`);
            displayElement.addClass('updating');
            setTimeout(() => displayElement.removeClass('updating'), 300);
        }
    }

    // Plus button handler
    $(document).on("click", ".plus", function() {
        const id = $(this).attr("id").replace('plus', '');
        if (cart[id]) {
            cart[id].quantity += 1;
            updateCartUI();
            updateCartQuantityDisplay(id);
        }
    });

    // Minus button handler
    $(document).on("click", ".minus", function() {
        const id = $(this).attr("id").replace('minus', '');
        if (cart[id] && cart[id].quantity > 0) {
            cart[id].quantity -= 1;
            
            if (cart[id].quantity === 0) {
                delete cart[id];
                // Show add to cart button
                const item = menuData.find(i => i.id === id);
                if (item) {
                    $(`#r${id}`).html(`<button id="${id}" class="btn btn-primary cart w-100">Add to Cart</button>`);
                }
            } else {
                updateCartQuantityDisplay(id);
            }
            
            updateCartUI();
        }
    });

    // Cart Sidebar UI
    $(".cartsidebar").click(function () {
        $(".sidebar").show(300);
        $(this).hide();
    });
    
    $(".close").click(function () {
        $(".sidebar").hide(300);
        $(".cartsidebar").show();
    });

    // Clear cart
    $("#clear").click(function() {
        cart = {};
        updateCartUI();
        renderMenu(getFilteredItems());
    });

    // Remove item from cart
    $(document).on("click", ".remove", function() {
        const id = $(this).attr("id").replace('remove', '');
        delete cart[id];
        updateCartUI();
        
        // Reset to "Add to Cart" button
        const item = menuData.find(i => i.id === id);
        if (item) {
            $(`#r${id}`).html(`<button id="${id}" class="btn btn-primary cart w-100">Add to Cart</button>`);
        }
    });

    function updateCartUI() {
        localStorage.setItem('cart', JSON.stringify(cart));
        
        if (Object.keys(cart).length === 0) {
            $('#divempty').show();
            $('#divcart').hide();
        } else {
            $('#divempty').hide();
            $('#divcart').show();
            
            let html = '';
            let total = 0;
            for (let id in cart) {
                const item = cart[id];
                total += item.price * item.quantity;
                html += `
                    <div class="row mb-3 align-items-center cart-item">
                        <div class="col-6">
                            <div class="fw-bold text-dark">${item.name}</div>
                            <small class="text-muted">Rs.${item.price} x ${item.quantity}</small>
                        </div>
                        <div class="col-4 text-end">
                            <span class="fw-bold text-dark">Rs.${item.price * item.quantity}</span>
                        </div>
                        <div class="col-2 text-end">
                            <button class="btn btn-sm text-danger remove" id="remove${id}">
                                <i class='bx bx-trash-alt'></i>
                            </button>
                        </div>
                    </div>
                    <hr class="my-2 text-dark">`;
            }
            $('#cartcontainer').html(html);
            $('#lbltotal').text(total);
        }
    }
});
