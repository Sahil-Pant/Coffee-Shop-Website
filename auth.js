

// Tab switching functionality
const tabs = document.querySelectorAll('.auth-tab');
const forms = document.querySelectorAll('.auth-form');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetForm = tab.dataset.tab;
        
        // Update active states
        tabs.forEach(t => t.classList.remove('active'));
        forms.forEach(f => f.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${targetForm}Form`).classList.add('active');
        
        // Animate form transition
        gsap.from(`#${targetForm}Form`, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Form animations on load
gsap.from('.auth-box', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power2.out'
});

// Form submission handling
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Add your login logic here
    console.log('Login attempt:', { email, password });
    
    // Animation for button click
    gsap.to(e.target.querySelector('.auth-button'), {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Add your signup logic here
    console.log('Signup attempt:', { name, email, password });
    
    // Animation for button click
    gsap.to(e.target.querySelector('.auth-button'), {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
});

// Input animations
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            borderColor: '#4a3429',
            duration: 0.3
        });
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            gsap.to(input, {
                borderColor: '#ddd',
                duration: 0.3
            });
        }
    });
});