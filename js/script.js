document.addEventListener('DOMContentLoaded', () => {

    // NAVEGAÇÃO SPA
    const navLinks = document.querySelectorAll('.nav-link, .nav-trigger');
    const sections = document.querySelectorAll('.page-section');
    const sidebar = document.getElementById('sidebar');

    function navigateToSection(targetId) {
        sections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === targetId);
        });

        if (sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetSection = link.getAttribute('data-section') || link.getAttribute('data-target');
            if (targetSection) {
                e.preventDefault();
                navigateToSection(targetSection);
            }
        });
    });

    // MENU DROPDOWN
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.toggle('open');
        });
    });

    // MENU MOBILE TOGGLE
    const mobileToggle = document.getElementById('mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }

    // SLIDER
    const slides = document.querySelectorAll('.slide-item');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        function showSlide(index) {
            slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
            currentSlide = index;
        }
        if (nextBtn) nextBtn.addEventListener('click', () => showSlide((currentSlide + 1) % slides.length));
        if (prevBtn) prevBtn.addEventListener('click', () => showSlide((currentSlide - 1 + slides.length) % slides.length));
    }

    // ACESSIBILIDADE: FONTE E ALTO CONTRASTE
    let currentScale = 1;
    const btnIncrease = document.getElementById('btn-increase-font');
    const btnDecrease = document.getElementById('btn-decrease-font');
    const btnContrast = document.getElementById('btn-toggle-contrast');

    if (btnIncrease) {
        btnIncrease.addEventListener('click', () => {
            if (currentScale < 1.3) {
                currentScale += 0.05;
                document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
            }
        });
    }

    if (btnDecrease) {
        btnDecrease.addEventListener('click', () => {
            if (currentScale > 0.85) {
                currentScale -= 0.05;
                document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
            }
        });
    }

    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
    }
});

// GALERIA DE FOTOS 2025 ---------

document.addEventListener('DOMContentLoaded', () => {
    
    // CONFIGURAÇÃO DA GALERIA ALEATÓRIA LOCAL
    const TOTAL_FOTOS_PASTA = 25;  // Quantidade total de fotos salvas na pasta
    const FOTOS_POR_EXIBICAO = 10; // Quantas fotos serão sorteadas por acesso
    const wrapper = document.getElementById('slider-wrapper2025');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    if (wrapper) {
        // 1. Gera uma lista de 1 a TOTAL_FOTOS_PASTA
        const numerosDisponiveis = Array.from({ length: TOTAL_FOTOS_PASTA }, (_, i) => i + 1);
        
        // 2. Embaralha a lista aleatoriamente (Algoritmo Fisher-Yates)
        for (let i = numerosDisponiveis.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numerosDisponiveis[i], numerosDisponiveis[j]] = [numerosDisponiveis[j], numerosDisponiveis[i]];
        }

        // 3. Pega apenas a quantidade definida em FOTOS_POR_EXIBICAO
        const fotosSorteadas = numerosDisponiveis.slice(0, FOTOS_POR_EXIBICAO);

        // 4. Injeta as fotos no HTML
        wrapper.innerHTML = '';
        fotosSorteadas.forEach((numero, index) => {
            const figure = document.createElement('figure');
            figure.className = `slide-item ${index === 0 ? 'active' : ''}`;
            figure.innerHTML = `
                <img src="images/crope2025/foto${numero}.jpg" alt="Foto do evento ${numero}" loading="lazy">
                <figcaption>CROPE 2025</figcaption>
            `;
            wrapper.appendChild(figure);
        });

        // 5. Lógica de controle de navegação do Slider
        let currentSlide = 0;
        const slides = wrapper.querySelectorAll('.slide-item');

        function showSlide(index) {
            slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
            currentSlide = index;
        }

        if (nextBtn) nextBtn.addEventListener('click', () => showSlide((currentSlide + 1) % slides.length));
        if (prevBtn) prevBtn.addEventListener('click', () => showSlide((currentSlide - 1 + slides.length) % slides.length));

        // Transição automática a cada 5 segundos
        setInterval(() => {
            showSlide((currentSlide + 1) % slides.length);
        }, 5000);
    }
});



// GALERIA DE FOTOS 2026 ---------

document.addEventListener('DOMContentLoaded', () => {
    
    // CONFIGURAÇÃO DA GALERIA ALEATÓRIA LOCAL
    const TOTAL_FOTOS_PASTA = 1;  // Quantidade total de fotos salvas na pasta
    const FOTOS_POR_EXIBICAO = 1; // Quantas fotos serão sorteadas por acesso
    const wrapper = document.getElementById('slider-wrapper2026');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    if (wrapper) {
        // 1. Gera uma lista de 1 a TOTAL_FOTOS_PASTA
        const numerosDisponiveis = Array.from({ length: TOTAL_FOTOS_PASTA }, (_, i) => i + 1);
        
        // 2. Embaralha a lista aleatoriamente (Algoritmo Fisher-Yates)
        for (let i = numerosDisponiveis.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numerosDisponiveis[i], numerosDisponiveis[j]] = [numerosDisponiveis[j], numerosDisponiveis[i]];
        }

        // 3. Pega apenas a quantidade definida em FOTOS_POR_EXIBICAO
        const fotosSorteadas = numerosDisponiveis.slice(0, FOTOS_POR_EXIBICAO);

        // 4. Injeta as fotos no HTML
        wrapper.innerHTML = '';
        fotosSorteadas.forEach((numero, index) => {
            const figure = document.createElement('figure');
            figure.className = `slide-item ${index === 0 ? 'active' : ''}`;
            figure.innerHTML = `
                <img src="images/crope2026/foto${numero}.jpg" alt="Foto do evento ${numero}" loading="lazy">
                <figcaption>CROPE 2026</figcaption>
            `;
            wrapper.appendChild(figure);
        });

        // 5. Lógica de controle de navegação do Slider
        let currentSlide = 0;
        const slides = wrapper.querySelectorAll('.slide-item');

        function showSlide(index) {
            slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
            currentSlide = index;
        }

        if (nextBtn) nextBtn.addEventListener('click', () => showSlide((currentSlide + 1) % slides.length));
        if (prevBtn) prevBtn.addEventListener('click', () => showSlide((currentSlide - 1 + slides.length) % slides.length));

        // Transição automática a cada 5 segundos
        setInterval(() => {
            showSlide((currentSlide + 1) % slides.length);
        }, 5000);
    }
});