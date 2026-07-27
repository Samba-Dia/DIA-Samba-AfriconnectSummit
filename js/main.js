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
// Ajoute ou retire la classe "scrolled"
// lorsque l'utilisateur fait défiler la page
window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
// selection du boutton menu et des liens
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");
// Ouvre ou ferme le menu sur mobile
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Animation

// Sélection de tous les éléments à animer
const hiddenElements = document.querySelectorAll(".hidden");
// Création de l'observateur
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Si l'élément est visible
        if (entry.isIntersecting) {
              // Ajoute la classe "show"
            entry.target.classList.add("show");
        }
    });
});
// Observation de chaque élément
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

// Sélection des boutons de filtre
const filterButtons = document.querySelectorAll(".filter-btn");
// Sélection de toutes les cartes d'intervenants
const speakerCards = document.querySelectorAll(".speaker-card");
// Ajout d'un événement sur chaque bouton
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
          // Retire la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        // Active le bouton sélectionné
        button.classList.add("active");
         // Récupère la catégorie choisie
        const filter = button.dataset.filter;
        // Affiche ou masque les cartes selon la catégorie
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

// Sélection du formulaire
const form = document.getElementById("contactForm");
// Vérifie que le formulaire existe
if (form) {
    // Déclenche la validation lors de la soumission
    form.addEventListener("submit", function (e) {
        e.preventDefault();
         // Récupération des champs du formulaire
        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const telephone = document.getElementById("telephone");
        const message = document.getElementById("message");
        const success = document.getElementById("form-success");
        // Réinitialisation des messages d'erreur
        const errors = document.querySelectorAll(".error-message");
        errors.forEach(error => error.textContent = "");
        success.hidden = true;
        let valide = true;
        // Vérification du nom
        if (nom.value.trim() === "") {
            nom.nextElementSibling.textContent = "Veuillez saisir votre nom.";
            valide = false;
        }
        // Vérification de l'adresse e-mail
        if (!email.value.includes("@")) {
            email.nextElementSibling.textContent = "Adresse e-mail invalide.";
            valide = false;
        }
         // Vérification du numéro de téléphone
        if (telephone.value.trim().length < 9) {
            telephone.nextElementSibling.textContent = "Numéro de téléphone invalide.";
            valide = false;
        }
         // Vérification du message
        if (message.value.trim().length < 10) {
            message.nextElementSibling.textContent = "Le message doit contenir au moins 10 caractères.";
            valide = false;
        }
        // Affiche un message de succès si tout est valide
        if (valide) {
            success.hidden = false;
            success.textContent = "Votre formulaire a été envoyé avec succès !";
            form.reset();
        }
    });
}
// Boutton de retour en haut

// Sélection du bouton
const topBtn = document.getElementById("topBtn");
// Vérifie que le bouton existe
if (topBtn) {
    // Affiche ou masque le bouton selon la position du scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    });
    // Remonte la page avec une animation fluide
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Animation des compteurs

// Sélection de tous les compteurs
const counters = document.querySelectorAll(".counter");
// Création d'un observateur pour détecter
// l'apparition des compteurs à l'écran
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
         // Vérifie si le compteur est visible
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.target;
            let count = 0;
            const increment = target / 100;
             // Animation du compteur
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
            // Arrête l'observation après l'animation
            counterObserver.unobserve(counter);
        }
    });
});
// Lance l'observation de chaque compteur
counters.forEach(counter => {
    counterObserver.observe(counter);
});


// COMPTE À REBOURS

// Sélection des éléments du compte à rebours
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
// Vérifie que les éléments existent
if (days && hours && minutes && seconds) {

    // Date de l'événement : 10 août 2026 à 09h00
    const targetDate = new Date(2026, 7, 10, 9, 0, 0).getTime();
    // Fonction de mise à jour du compte à rebours
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
         // Si l'événement est terminé
        if (distance <= 0) {
            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";
            clearInterval(timer);
            return;
        }
         // Calcul des jours, heures, minutes et secondes
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
         // Mise à jour de l'affichage
        days.textContent = String(d).padStart(2, "0");
        hours.textContent = String(h).padStart(2, "0");
        minutes.textContent = String(m).padStart(2, "0");
        seconds.textContent = String(s).padStart(2, "0");
    }
    // Première mise à jour
    updateCountdown();
    // Mise à jour automatique chaque seconde
    const timer = setInterval(updateCountdown, 1000);
}