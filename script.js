// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the page
  initializePage();

  // Add scroll animations
  addScrollAnimations();

  // Add video event listeners
  setupVideoEvents();

  // Add button hover effects
  addButtonEffects();
});

function initializePage() {
  // Add loading animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease-in-out";
    document.body.style.opacity = "1";
  }, 100);

  // Create additional floating hearts dynamically
  createFloatingHearts();
}

function createFloatingHearts() {
  const heartsContainer = document.querySelector(".hearts-container");

  // Create additional hearts for more dynamic effect
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 8 + "s";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    heartsContainer.appendChild(heart);
  }
}

function addScrollAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all cards
  const cards = document.querySelectorAll(
    ".message-card, .promise-card, .final-card, .video-container"
  );
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    observer.observe(card);
  });
}

function setupVideoEvents() {
  const video = document.getElementById("apologyVideo");

  if (video) {
    // Add play event
    video.addEventListener("play", function () {
      // Add special effect when video starts
      document.body.style.filter = "brightness(1.1)";
      setTimeout(() => {
        document.body.style.filter = "brightness(1)";
      }, 1000);
    });

    // Add ended event
    video.addEventListener("ended", function () {
      // Show special message when video ends
      showVideoEndMessage();
    });

    // Add error handling
    video.addEventListener("error", function () {
      console.log("Video could not be loaded");
    });
  }
}

function showVideoEndMessage() {
  // Create a temporary message
  const message = document.createElement("div");
  message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 107, 157, 0.95);
            color: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            z-index: 1000;
            font-family: 'Dancing Script', cursive;
            font-size: 1.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <p>Thank you for watching my message... ❤️</p>
            <p style="font-size: 1rem; margin-top: 10px;">I hope you can see how much I care...</p>
        </div>
    `;

  document.body.appendChild(message);

  // Remove after 3 seconds
  setTimeout(() => {
    message.style.transition = "opacity 0.5s ease-out";
    message.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(message);
    }, 500);
  }, 3000);
}

function addButtonEffects() {
  const buttons = document.querySelectorAll(".love-btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      // Add heart particles effect
      createHeartParticles(this);
    });

    button.addEventListener("click", function (e) {
      e.preventDefault();
      // Add click ripple effect
      createRippleEffect(e, this);
    });
  });
}

function createHeartParticles(button) {
  const rect = button.getBoundingClientRect();

  for (let i = 0; i < 3; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 1000;
            animation: heartParticle 1s ease-out forwards;
        `;

    document.body.appendChild(heart);

    setTimeout(() => {
      document.body.removeChild(heart);
    }, 1000);
  }
}

function createRippleEffect(event, button) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

  button.appendChild(ripple);

  setTimeout(() => {
    button.removeChild(ripple);
  }, 600);
}

// Love overlay function
function showLove() {
  const overlay = document.getElementById("loveOverlay");

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes heartParticle {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${
                  Math.random() * 100 - 50
                }px, -100px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Scroll to top to ensure overlay is visible
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // Show overlay with animation
  overlay.classList.add("show");

  // Add confetti effect
  createConfetti();

  // Remove the timer - overlay will stay until user clicks "Huh!" button
}

// Hide love overlay function
function hideLove() {
  const overlay = document.getElementById("loveOverlay");
  overlay.classList.remove("show");
}

function createConfetti() {
  const colors = ["#ff6b9d", "#ff8fab", "#667eea", "#764ba2", "#ffd700"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 999;
            animation: confettiFall 3s linear forwards;
        `;

    document.body.appendChild(confetti);

    setTimeout(() => {
      if (document.body.contains(confetti)) {
        document.body.removeChild(confetti);
      }
    }, 3000);
  }

  // Add confetti animation CSS
  const confettiStyle = document.createElement("style");
  confettiStyle.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(confettiStyle);
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Add touch support for mobile
document.addEventListener("touchstart", function () {}, { passive: true });

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.classList.contains("love-btn")) {
      showLove();
    }
  }
});

// Add page visibility API for better mobile experience
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.animationPlayState = "paused";
  } else {
    // Resume animations when page becomes visible
    document.body.style.animationPlayState = "running";
  }
});

// Add loading screen
window.addEventListener("load", function () {
  // Remove any loading indicators
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.remove();
    }, 500);
  }

  // Start floating hearts animation
  const hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart, index) => {
    heart.style.animationDelay = `${index * 0.5}s`;
  });
});

// Add responsive video handling
function handleVideoResponsive() {
  const video = document.getElementById("apologyVideo");
  if (video) {
    // Ensure video is responsive on all devices
    video.style.maxWidth = "100%";
    video.style.height = "auto";
  }
}

// Call responsive handler
handleVideoResponsive();

// Add window resize handler
window.addEventListener("resize", function () {
  handleVideoResponsive();
});
