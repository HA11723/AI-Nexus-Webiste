// Loading Screen Management
document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector(".loading-screen");
  const loadingProgress = document.querySelector(".loading-progress");

  // Simulate loading progress
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }, 500);
    }
    loadingProgress.style.width = progress + "%";
  }, 100);
});

// Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".particles, .grid-overlay"
  );

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Intersection Observer for Animations
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

// Observe elements for animation
document
  .querySelectorAll(
    ".service-card, .stat, .contact-item, .tech-item, .pricing-card, .testimonial-card, .blog-card"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// 3D Card Tilt Effect
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  });
});

// Technology Progress Bars Animation
const techObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector(".progress-bar");
        const progress = progressBar.getAttribute("data-progress");

        setTimeout(() => {
          progressBar.style.width = progress + "%";
        }, 500);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".tech-item").forEach((item) => {
  techObserver.observe(item);
});

// Pricing Card Hover Effects
document.querySelectorAll(".pricing-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    if (card.classList.contains("featured")) {
      card.style.transform = "scale(1.05)";
    } else {
      card.style.transform = "translateY(0) scale(1)";
    }
  });
});

// Testimonial Slider
class TestimonialSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".testimonial-card");
    this.dots = document.querySelectorAll(".dot");
    this.totalSlides = this.slides.length;

    this.init();
  }

  init() {
    this.showSlide(0);
    this.setupEventListeners();
    this.startAutoPlay();
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - index) * 100}%)`;
      slide.style.opacity = i === index ? "1" : "0.5";
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    this.currentSlide = index;
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(next);
  }

  prevSlide() {
    const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(prev);
  }

  setupEventListeners() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.showSlide(index);
        this.resetAutoPlay();
      });
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    const slider = document.querySelector(".testimonials-slider");

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe();
    });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.resetAutoPlay();
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
}

// Initialize testimonial slider
new TestimonialSlider();

// Blog Card Hover Effects
document.querySelectorAll(".blog-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const overlay = card.querySelector(".blog-overlay");
    overlay.style.opacity = "1";
  });

  card.addEventListener("mouseleave", () => {
    const overlay = card.querySelector(".blog-overlay");
    overlay.style.opacity = "0";
  });
});

// Particle System
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "1";

    document.querySelector(".hero-background").appendChild(this.canvas);
    this.resize();
    this.init();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize Particle System
new ParticleSystem();

// Typing Effect for Hero Title
class TypeWriter {
  constructor(element, text, speed = 100) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.currentText = "";
    this.currentIndex = 0;
    this.isDeleting = false;
  }

  type() {
    if (this.isDeleting) {
      this.currentText = this.text.substring(0, this.currentText.length - 1);
    } else {
      this.currentText = this.text.substring(0, this.currentText.length + 1);
    }

    this.element.textContent = this.currentText;

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.currentText === this.text) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === "") {
      this.isDeleting = false;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typing effect after loading
setTimeout(() => {
  const heroTitle = document.querySelector(".hero-title .highlight");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = "";
    const typeWriter = new TypeWriter(heroTitle, originalText, 150);
    typeWriter.type();
  }
}, 2000);

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  }

  updateCounter();
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.textContent);
          animateCounter(stat, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stats").forEach((stats) => {
  statsObserver.observe(stats);
});

// Form Handling
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Add loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      submitBtn.textContent = "Message Sent!";
      submitBtn.style.background =
        "linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// Mouse Trail Effect
class MouseTrail {
  constructor() {
    this.trail = [];
    this.maxTrailLength = 20;
    this.init();
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      this.trail.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      });

      if (this.trail.length > this.maxTrailLength) {
        this.trail.shift();
      }

      this.draw();
    });
  }

  draw() {
    // Remove existing trail elements
    document.querySelectorAll(".mouse-trail").forEach((el) => el.remove());

    this.trail.forEach((point, index) => {
      const trailElement = document.createElement("div");
      trailElement.className = "mouse-trail";
      trailElement.style.position = "fixed";
      trailElement.style.left = point.x + "px";
      trailElement.style.top = point.y + "px";
      trailElement.style.width = "4px";
      trailElement.style.height = "4px";
      trailElement.style.background = "rgba(0, 212, 255, 0.3)";
      trailElement.style.borderRadius = "50%";
      trailElement.style.pointerEvents = "none";
      trailElement.style.zIndex = "9999";
      trailElement.style.transform = "translate(-50%, -50%)";
      trailElement.style.opacity = index / this.trail.length;

      document.body.appendChild(trailElement);

      setTimeout(() => {
        if (trailElement.parentNode) {
          trailElement.remove();
        }
      }, 100);
    });
  }
}

// Initialize mouse trail
new MouseTrail();

// Scroll Progress Indicator
const createScrollProgress = () => {
  const progressBar = document.createElement("div");
  progressBar.style.position = "fixed";
  progressBar.style.top = "0";
  progressBar.style.left = "0";
  progressBar.style.width = "0%";
  progressBar.style.height = "3px";
  progressBar.style.background =
    "linear-gradient(90deg, #00d4ff, #7b2ff7, #ff0080)";
  progressBar.style.zIndex = "10000";
  progressBar.style.transition = "width 0.1s ease";

  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });
};

createScrollProgress();

// Magnetic Effect for Buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

// Glitch Effect for Service Icons
document.querySelectorAll(".service-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.style.animation = "glitch 0.3s ease";
  });

  icon.addEventListener("animationend", () => {
    icon.style.animation = "iconFloat 3s ease-in-out infinite";
  });
});

// Add glitch animation to CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Dynamic Background Color Change
let hue = 200;
setInterval(() => {
  hue = (hue + 1) % 360;
  document.documentElement.style.setProperty(
    "--primary-color",
    `hsl(${hue}, 100%, 60%)`
  );
}, 50);

// Service Card Hover Effects
document.querySelectorAll(".service-card").forEach((card) => {
  const wrapper = card.querySelector(".card-3d-wrapper");

  card.addEventListener("mouseenter", () => {
    wrapper.style.transform = "rotateY(180deg) scale(1.05)";
  });

  card.addEventListener("mouseleave", () => {
    wrapper.style.transform = "rotateY(0deg) scale(1)";
  });
});

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(5, 5, 5, 0.98)";
    navbar.style.backdropFilter = "blur(30px)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
    navbar.style.backdropFilter = "blur(20px)";
  }
});

// Smooth reveal animation for sections
const revealSections = () => {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.pageYOffset;

    if (scrollY + windowHeight > sectionTop + sectionHeight * 0.3) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
};

// Initialize section animations
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "all 0.8s ease";
});

window.addEventListener("scroll", revealSections);
revealSections(); // Initial check

// Add floating elements to hero section
const createFloatingElements = () => {
  const hero = document.querySelector(".hero");

  for (let i = 0; i < 5; i++) {
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.width = "2px";
    element.style.height = "2px";
    element.style.background = "rgba(0, 212, 255, 0.6)";
    element.style.borderRadius = "50%";
    element.style.animation = `float ${3 + i}s ease-in-out infinite`;
    element.style.left = Math.random() * 100 + "%";
    element.style.top = Math.random() * 100 + "%";
    element.style.pointerEvents = "none";

    hero.appendChild(element);
  }
};

// Add floating animation
const floatingStyle = document.createElement("style");
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(floatingStyle);

createFloatingElements();

// Performance optimization
let ticking = false;
function updateOnScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      revealSections();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", updateOnScroll);

// Enhanced Pricing Interactions
document.querySelectorAll(".pricing-card .btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // Create ripple effect
    const ripple = document.createElement("div");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255, 255, 255, 0.3)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.left = "50%";
    ripple.style.top = "50%";
    ripple.style.width = "20px";
    ripple.style.height = "20px";
    ripple.style.marginLeft = "-10px";
    ripple.style.marginTop = "-10px";

    btn.style.position = "relative";
    btn.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Blog Card Reading Progress
document.querySelectorAll(".blog-card").forEach((card) => {
  const link = card.querySelector(".blog-link");

  link.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.02)";
  });

  link.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Technology Item Shine Effect
document.querySelectorAll(".tech-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const shine = item.querySelector("::before");
    if (shine) {
      shine.style.left = "100%";
    }
  });
});

// Testimonial Card Parallax
document.querySelectorAll(".testimonial-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// Enhanced Loading Screen
const enhanceLoadingScreen = () => {
  const nodes = document.querySelectorAll(".node");
  nodes.forEach((node, index) => {
    node.addEventListener("animationend", () => {
      setTimeout(() => {
        node.style.animation = "nodePulse 2s infinite";
      }, index * 100);
    });
  });
};

enhanceLoadingScreen();
