const CORRECT_PASSWORD = "1506";
const MAX_ATTEMPTS = 3;
let correctAttempts = 0;

document.getElementById('submitPassword').addEventListener('click', checkPassword);
document.getElementById('passwordInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

document.getElementById('mysteryGiftRedirect').addEventListener('click', () => {
    alert("Sorry for reusing a previous gift! Please use rayswarnalee@gmail.com 💝");
    window.location.href = "https://sites.google.com/view/my5t3ry/mystery-gift/";
});

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;
    
    if (password === CORRECT_PASSWORD) {
        correctAttempts++;
        
        if (correctAttempts >= MAX_ATTEMPTS) {
            // Add fade out animation for password screen
            document.getElementById('passwordScreen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('passwordScreen').classList.add('hidden');
                document.getElementById('mainContent').classList.remove('hidden');
                // Fade in main content
                setTimeout(() => {
                    document.getElementById('mainContent').style.opacity = '1';
                }, 100);
            }, 500);
            
            // Start heart animation after access granted
            startHeartAnimation();
        } else {
            // Still show "wrong password" even if correct
            passwordInput.value = '';
            passwordInput.placeholder = `Wrong password, ${MAX_ATTEMPTS - correctAttempts} attempts left`;
            passwordInput.classList.add('shake');
            setTimeout(() => {
                passwordInput.classList.remove('shake');
            }, 500);
        }
    } else {
        // Actually wrong password
        passwordInput.value = '';
        passwordInput.placeholder = `Wrong password, ${MAX_ATTEMPTS - correctAttempts} attempts left`;
        passwordInput.classList.add('shake');
        setTimeout(() => {
            passwordInput.classList.remove('shake');
        }, 500);
    }
}

const quotes = [
    "Do or Die",
    "Don't forget to rest in the midst of your hustle. 🌿",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. ❤️ [ok gpt gave this quote, but seriously? she'll fail...noob gpt]",
    "Every test in our life makes us bitter or better, every problem comes to make us or break us. 📚 [proceeds to get better by writing code in paper instead of ide]",
    "Don't watch the clock; do what it does. Keep going. 💪 [uffff gpt high on motivation]",
    "Keep chasing your dreams. ✨",
    "You've got this! One question at a time. 📖",
    "Study like you're in love with education. ❤️📚[or me?(jk, there's a question mark for a reason)]",
    "Believe you can and you're halfway there. 🌟",
];

// Update the animation cleanup
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    
    const sizeFactor = Math.random();
    heart.style.setProperty('--size-factor', sizeFactor);
    
    // Constrain the random positions
    heart.style.left = `${Math.random() * 90}vw`;
    heart.style.top = `${Math.random() * 90}vh`;
    
    // Reduce movement range
    const moveX = (Math.random() - 0.5) * 200;
    const moveY = -(Math.random() * 300); // Reduce upward movement
    heart.style.setProperty('--move-x', `${moveX}px`);
    heart.style.setProperty('--move-y', `${moveY}px`);
    
    document.querySelector('.hearts-container').appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 6000);
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✨';
    
    const sizeFactor = Math.random();
    sparkle.style.setProperty('--size-factor', sizeFactor);
    
    // Constrain the random positions
    sparkle.style.left = `${Math.random() * 90}vw`;
    sparkle.style.top = `${Math.random() * 90}vh`;
    
    // Reduce movement range
    const moveX = (Math.random() - 0.5) * 200;
    const moveY = (Math.random() - 0.5) * 200;
    sparkle.style.setProperty('--move-x', `${moveX}px`);
    sparkle.style.setProperty('--move-y', `${moveY}px`);
    
    document.querySelector('.sparkles').appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 4000);
}

// Add this new function
function createFloatingImage() {
    const image = document.createElement('img');
    image.className = 'floating-image';
    
    // Add random size class
    const sizeClass = Math.random() < 0.3 ? 'small' : Math.random() > 0.7 ? 'large' : '';
    if (sizeClass) {
        image.classList.add(sizeClass);
    }
    
    // Random image selection (1-5)
    const imageNumber = Math.floor(Math.random() * 5) + 1;
    image.src = `images/${imageNumber}.jpg`;
    
    const sizeFactor = Math.random();
    image.style.setProperty('--size-factor', sizeFactor);
    
    // Random starting position
    image.style.left = `${Math.random() * 90}vw`;
    image.style.top = `${Math.random() * 90}vh`;
    
    // Random movement
    const moveX = (Math.random() - 0.5) * 300;
    const moveY = -(Math.random() * 400 + 200);
    image.style.setProperty('--move-x', `${moveX}px`);
    image.style.setProperty('--move-y', `${moveY}px`);
    
    document.querySelector('.images-container').appendChild(image);
    
    setTimeout(() => {
        if (image.parentNode) {
            image.parentNode.removeChild(image);
        }
    }, 5000);
}

// Quote generation
document.getElementById('generateQuote').addEventListener('click', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Remove visible class first
    quoteDisplay.classList.remove('visible');
    
    // Update content after a small delay
    setTimeout(() => {
        quoteDisplay.textContent = randomQuote;
        quoteDisplay.classList.add('visible');
    }, 300);
});

// Remove the existing intervals at the top level
// Only keep the ones in startHeartAnimation

// Reduce animation frequency
function startHeartAnimation() {
    // Initial burst
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createHeart();
            createSparkle();
            createFloatingImage();
        }, i * 200);
    }
    
    // Regular intervals
    setInterval(createHeart, 800);
    setInterval(createSparkle, 1000);
    setInterval(createFloatingImage, 1200);
}