// Dark-mode

const themeBtn = document.getElementById("theme-btn");
const body = document.body;
const icon = themeBtn.querySelector("i");

// Vérifier si un thème est déjà enregistré
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
}

// Changement du thème
themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {
        localStorage.setItem("theme", "light");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }
});

// navbar dynamique

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Animation

const hiddenElements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});
hiddenElements.forEach(element => {
    observer.observe(element);
});

// onglets du programme

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Retirer la classe active des boutons
        tabButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-selected", "false");
        });
        // Masquer tous les contenus
        tabContents.forEach(content => {
            content.classList.remove("active");
        });
        // Activer le bouton cliqué
        button.classList.add("active");
        button.setAttribute("aria-selected", "true");
        // Afficher le contenu correspondant
        const target = document.getElementById(button.getAttribute("aria-controls"));
        if (target) {
            target.classList.add("active");
        }
    });
});

// Filtrage des intervenants

const filterButtons = document.querySelectorAll(".filter-btn");
const speakerCards = document.querySelectorAll(".speaker-card");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        speakerCards.forEach(card => {
            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// validation formulaire

const form = document.getElementById("contactForm");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const telephone = document.getElementById("telephone");
        const message = document.getElementById("message");
        const success = document.getElementById("form-success");
        const errors = document.querySelectorAll(".error-message");
        errors.forEach(error => error.textContent = "");
        success.hidden = true;
        let valide = true;
        if (nom.value.trim() === "") {
            nom.nextElementSibling.textContent = "Veuillez saisir votre nom.";
            valide = false;
        }
        if (!email.value.includes("@")) {
            email.nextElementSibling.textContent = "Adresse e-mail invalide.";
            valide = false;
        }
        if (telephone.value.trim().length < 9) {
            telephone.nextElementSibling.textContent = "Numéro de téléphone invalide.";
            valide = false;
        }
        if (message.value.trim().length < 10) {
            message.nextElementSibling.textContent = "Le message doit contenir au moins 10 caractères.";
            valide = false;
        }
        if (valide) {
            success.hidden = false;
            success.textContent = "Votre formulaire a été envoyé avec succès !";
            form.reset();
        }
    });
}
// Boutton de retour en haut

const topBtn = document.getElementById("topBtn");
if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    });
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Animation des compteurs

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.target;
            let count = 0;
            const increment = target / 100;
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    counter.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
});
counters.forEach(counter => {
    counterObserver.observe(counter);
});


// COMPTE À REBOURS

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
if (days && hours && minutes && seconds) {

    // Date de l'événement : 10 août 2026 à 09h00
    const targetDate = new Date(2026, 7, 10, 9, 0, 0).getTime();
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance <= 0) {
            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";
            clearInterval(timer);
            return;
        }
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        days.textContent = String(d).padStart(2, "0");
        hours.textContent = String(h).padStart(2, "0");
        minutes.textContent = String(m).padStart(2, "0");
        seconds.textContent = String(s).padStart(2, "0");
    }
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
}