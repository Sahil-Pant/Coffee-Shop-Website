

gsap.registerPlugin(ScrollTrigger);

// Initialize Swiper
const swiper = new Swiper('.menu-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});


const text = new SplitType('.hero h1')
const textp = new SplitType('.hero p')


const tl1 = gsap.timeline({ defaults: { ease: 'power4.inOut' } })

gsap.set('.hero h1', { autoAlpha: 1 })
tl1.from(text.chars, {
    opacity: 0,
    y: 100,
    rotateX: -90,
    stagger: 0.02,
    duration: 1,
    ease: "back.out(1.7)"

});

const tl2 = gsap.timeline({ defaults: { ease: 'power4.inOut' } })

gsap.set('.hero p', { autoAlpha: 1 })
tl1.from(textp.words, {
    opacity: 0,
             y: 50,
             stagger: 0.05,
             duration: 0.8,
             ease: "power4.out(-=0.5)"

});



gsap.from('.section-title', {
    scrollTrigger: {
        trigger: '.section-title',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Cart functionality
let cart = [];
let cartTotal = 0;

window.addToCart = function (button) {
    const product = button.closest('.product');
    const name = product.querySelector('h3').textContent;
    const price = parseInt(product.dataset.price);
    const image = product.querySelector('img').src;

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
        cartTotal += price;
    } else {
        cart.push({ name, price, image, id: Date.now(), quantity: 1 });
        cartTotal += price;
    }

    updateCartUI();

    // Animation for cart icon
    gsap.from('#cart-count', {
        scale: 1.5,
        duration: 0.3
    });

    // Animation for button
    gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
};

window.removeFromCart = function (id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cartTotal -= cart[itemIndex].price * cart[itemIndex].quantity;
        cart.splice(itemIndex, 1);
        updateCartUI();
    }
};

window.updateQuantity = function (id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
            item.quantity = newQuantity;
            cartTotal += item.price * change;
            updateCartUI();
        } else if (newQuantity === 0) {
            removeFromCart(id);
        }
    }
};

window.toggleCart = function () {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
};

window.checkout = function () {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Thank you for your order! Total: ₹' + cartTotal);
    cart = [];
    cartTotal = 0;
    updateCartUI();
    toggleCart();
};

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartTotalElement.textContent = cartTotal;

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)" class="quantity-btn">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="quantity-btn">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-item">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});