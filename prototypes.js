// ============================================
// PROTOTYPES.JS - JavaScript adapté au portfolio
// ============================================

// Données des projets - REMPLACEZ LES URLs PAR VOS VRAIS LIENS FIGMA
const projects = [
    {
        id: 1,
        title: "E-commerce Dashboard",
        description: "Interface moderne pour la gestion d'une boutique en ligne avec analytics et gestion des produits.",
        tags: ["UI/UX", "Dashboard", "Analytics"],
        desktopUrl: "https://www.figma.com/embed?embed_host=share&url=VOTRE_LIEN_FIGMA_DESKTOP_1",
        mobileUrl: "https://www.figma.com/design/KJg5G3Sk6ikH0DtfblWhxO/Vitrine?node-id=3-3&m=dev&t=55JCc7dX17Z1ywCh-1"
    },
    {
        id: 2,
        title: "Application Fitness",
        description: "App mobile complète pour le suivi d'entraînement sportif et de nutrition quotidienne.",
        tags: ["Mobile", "Health", "UI Design"],
        desktopUrl: "https://www.figma.com/embed?embed_host=share&url=VOTRE_LIEN_FIGMA_DESKTOP_2",
        mobileUrl: "https://www.figma.com/embed?embed_host=share&url=VOTRE_LIEN_FIGMA_MOBILE_2"
    },
    {
        id: 3,
        title: "Portfolio Créatif",
        description: "Site portfolio moderne et responsive pour photographe professionnel avec galerie dynamique.",
        tags: ["Web Design", "Portfolio", "Responsive"],
        desktopUrl: "https://www.figma.com/embed?embed_host=share&url=VOTRE_LIEN_FIGMA_DESKTOP_3",
        mobileUrl: "https://www.figma.com/embed?embed_host=share&url=VOTRE_LIEN_FIGMA_MOBILE_3"
    }
];

// Variables globales
let selectedProject = null;
let currentDevice = 'desktop';
let isFullscreen = false;

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    setupEventListeners();
});

// ============================================
// RENDU DES PROJETS
// ============================================

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    
    projects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-item';
    
    card.innerHTML = `
        <div class="project-image" style="background: linear-gradient(135deg, var(--accent), #0288d1); display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/>
                <path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>
            </svg>
        </div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openModal(project));
    card.style.cursor = 'pointer';
    
    return card;
}

// ============================================
// GESTION DU MODAL
// ============================================

function openModal(project) {
    selectedProject = project;
    currentDevice = 'desktop';
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const browserUrl = document.getElementById('browserUrl');
    
    // Mettre à jour le contenu
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    browserUrl.textContent = project.title.toLowerCase().replace(/\s+/g, '-') + '.figma';
    
    // Mettre à jour les tags
    modalTags.innerHTML = project.tags.map(tag => 
        `<span class="modal-tag">${tag}</span>`
    ).join('');
    
    // Charger l'iframe
    loadIframe('desktop');
    
    // Afficher le modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Réinitialiser les boutons
    updateDeviceButtons();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedProject = null;
    isFullscreen = false;
    
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.remove('fullscreen');
    
    // Vider les iframes
    document.getElementById('desktopIframe').src = '';
    document.getElementById('mobileIframe').src = '';
}

// ============================================
// GESTION DES DEVICES
// ============================================

function switchDevice(device) {
    if (currentDevice === device) return;
    
    currentDevice = device;
    
    const desktopFrame = document.getElementById('desktopFrame');
    const mobileFrame = document.getElementById('mobileFrame');
    
    if (device === 'desktop') {
        desktopFrame.classList.remove('hidden');
        mobileFrame.classList.add('hidden');
    } else {
        desktopFrame.classList.add('hidden');
        mobileFrame.classList.remove('hidden');
    }
    
    loadIframe(device);
    updateDeviceButtons();
}

function updateDeviceButtons() {
    const desktopBtn = document.getElementById('desktopBtn');
    const mobileBtn = document.getElementById('mobileBtn');
    
    desktopBtn.classList.remove('active');
    mobileBtn.classList.remove('active');
    
    if (currentDevice === 'desktop') {
        desktopBtn.classList.add('active');
    } else {
        mobileBtn.classList.add('active');
    }
}

function loadIframe(device) {
    if (!selectedProject) return;
    
    const iframe = device === 'desktop' 
        ? document.getElementById('desktopIframe')
        : document.getElementById('mobileIframe');
    
    const url = device === 'desktop' 
        ? selectedProject.desktopUrl 
        : selectedProject.mobileUrl;
    
    // Afficher un message si l'URL n'est pas configurée
    if (url.includes('VOTRE_LIEN_FIGMA')) {
        iframe.srcdoc = `
            <html>
                <body style="display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #04d28d, #0288d1); color: white; text-align: center; padding: 20px;">
                    <div>
                        <h2 style="font-size: 2rem; margin-bottom: 1rem;">🎨 Prototype ${device === 'desktop' ? 'Desktop' : 'Mobile'}</h2>
                        <p style="font-size: 1.2rem; opacity: 0.9;">Configurez votre lien Figma dans prototypes.js</p>
                        <p style="font-size: 0.9rem; margin-top: 1rem; opacity: 0.7;">Remplacez "VOTRE_LIEN_FIGMA" par votre URL</p>
                    </div>
                </body>
            </html>
        `;
    } else {
        iframe.src = url;
    }
}

// ============================================
// PLEIN ÉCRAN
// ============================================

function toggleFullscreen() {
    isFullscreen = !isFullscreen;
    const modalContent = document.querySelector('.modal-content');
    
    if (isFullscreen) {
        modalContent.classList.add('fullscreen');
    } else {
        modalContent.classList.remove('fullscreen');
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Bouton fermer
    const closeBtn = document.getElementById('closeBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Clic en dehors du modal
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Touche Échap pour fermer
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && selectedProject) {
            closeModal();
        }
    });
    
    // Boutons device
    const desktopBtn = document.getElementById('desktopBtn');
    const mobileBtn = document.getElementById('mobileBtn');
    
    if (desktopBtn) {
        desktopBtn.addEventListener('click', () => switchDevice('desktop'));
    }
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => switchDevice('mobile'));
    }
    
    // Bouton plein écran
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
}

console.log('✅ Prototypes.js chargé - Portfolio Anaëlle TELLIER');
