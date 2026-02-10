// ============================================
// MENU MOBILE
// ============================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// SLIDER HERO
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-controls .prev');
const nextBtn = document.querySelector('.slider-controls .next');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Event listeners para os botões
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play do slider (muda a cada 5 segundos)
setInterval(nextSlide, 5000);

// ============================================
// GALERIAS DE FOTOS (UMA POR VEZ)
// ============================================
class Gallery {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.gallery-slide');
        this.prevBtn = container.querySelector('.gallery-prev');
        this.nextBtn = container.querySelector('.gallery-next');
        this.indicators = container.querySelectorAll('.indicator');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Event listeners para os botões
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Event listeners para os indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Inicia o auto-play
        this.startAutoPlay();
        
        // Para o auto-play quando o mouse está sobre a galeria
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showSlide(index) {
        // Remove active de todos
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Garante que o índice está dentro dos limites
        if (index >= this.slides.length) {
            this.currentIndex = 0;
        } else if (index < 0) {
            this.currentIndex = this.slides.length - 1;
        } else {
            this.currentIndex = index;
        }
        
        // Ativa o slide e indicador atual
        this.slides[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex].classList.add('active');
    }
    
    next() {
        this.showSlide(this.currentIndex + 1);
    }
    
    prev() {
        this.showSlide(this.currentIndex - 1);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoPlay() {
        // Auto-play: muda a cada 4 segundos
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 4000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Inicializa todas as galerias
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainers = document.querySelectorAll('.gallery-container');
    galleryContainers.forEach(container => {
        new Gallery(container);
    });
});

// ============================================
// SCROLL SUAVE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// HEADER FIXO COM MUDANÇA DE COR NO SCROLL
// ============================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(44, 44, 44, 1)';
    } else {
        header.style.background = 'rgba(44, 44, 44, 0.95)';
    }
});

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Pega os valores do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Pega o nome do serviço selecionado
    const serviceText = document.getElementById('service').selectedOptions[0].text;
    
    // Monta a mensagem para o WhatsApp
    const whatsappMessage = `*Novo contato do site Criee Fotografia*%0A%0A` +
        `*Nome:* ${encodeURIComponent(name)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Telefone:* ${encodeURIComponent(phone)}%0A` +
        `*Tipo de Ensaio:* ${encodeURIComponent(serviceText)}%0A` +
        `*Mensagem:* ${encodeURIComponent(message)}`;
    
    // Abre o WhatsApp com a mensagem
    const whatsappNumber = '5563984672057'; // SUBSTITUIR pelo número real
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    
    // Limpa o formulário
    contactForm.reset();
    
    // Mostra mensagem de sucesso
    alert('Redirecionando para o WhatsApp! Complete o envio da mensagem por lá.');
});

// ============================================
// ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Adiciona animação aos blocos de serviço
document.querySelectorAll('.service-block').forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(30px)';
    block.style.transition = 'all 0.8s ease';
    observer.observe(block);
});

// Adiciona animação aos depoimentos
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ============================================
// PREVENÇÃO DE ENVIO VAZIO DO FORMULÁRIO
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.classList.add('error');
    });
    
    input.addEventListener('input', function() {
        this.classList.remove('error');
    });
});

// Adiciona estilo para campos com erro
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #ff4444 !important;
        animation: shake 0.5s;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// ============================================
// LOADING DAS IMAGENS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Se a imagem já estiver carregada (cache)
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        }
    });
});

// ============================================
// SUPORTE A TECLADO NAS GALERIAS
// ============================================
document.addEventListener('keydown', (e) => {
    // Detecta se alguma galeria está visível na tela
    const galleries = document.querySelectorAll('.gallery-container');
    
    galleries.forEach(gallery => {
        const rect = gallery.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowLeft') {
                gallery.querySelector('.gallery-prev').click();
            } else if (e.key === 'ArrowRight') {
                gallery.querySelector('.gallery-next').click();
            }
        }
    });
});

console.log('Criee Fotografia - Site carregado com sucesso!');
console.log('Galerias inicializadas: ', document.querySelectorAll('.gallery-container').length);