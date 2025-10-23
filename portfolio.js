// Texte qui s'écrit (typewriter)
const typewriter = document.querySelector('.typewriter');
const text = "Bienvenue sur mon portfolio !";
let i = 0;

function typeEffect() {
  if (i < text.length) {
    typewriter.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 70);
  }
}
typeEffect();

// GSAP Scroll animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".grid .card", {
  scrollTrigger: {
    trigger: ".grid",
    start: "top 80%",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out"
});

gsap.from(".about-image", {
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 1.5,
  ease: "power3.out"
});

gsap.from(".about-text", {
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 80%",
  },
  x: 100,
  opacity: 0,
  duration: 1.5,
  ease: "power3.out"
});

// Particules animées
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < 120; i++) {
    particlesArray.push(new Particle());
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Animation formulaire contact
gsap.from(".contact-form", {
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 85%",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_g4c0v7r", "template_tcrt9an", this)
    .then(() => {
      gsap.to(".send-btn", {
        scale: 1.2,
        background: "#10b981",
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });
      alert("Message envoyé avec succès !");
      this.reset();
    }, (error) => {
      alert("Erreur lors de l'envoi : " + JSON.stringify(error));
      console.error("EmailJS error:", error);
    });
});
