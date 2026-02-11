/* ============================================
   BETA KINESIOLOGÍA POSTURAL
   JavaScript optimizado y minimalista
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================

  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      this.setAttribute('aria-expanded', !isExpanded);
      this.classList.toggle('active');
      navMenu.classList.toggle('active');

      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Cerrar menú al hacer click en un link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignorar links vacíos o solo "#"
      if (!href || href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================

  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
    }

    lastScroll = currentScroll;
  });

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;

            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }

            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  // ============================================
  // FAQ ACCORDION ACCESSIBILITY
  // ============================================

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const summary = item.querySelector('summary');

    if (summary) {
      summary.addEventListener('click', function () {
        // Opcional: cerrar otros items al abrir uno nuevo
        // faqItems.forEach(otherItem => {
        //   if (otherItem !== item && otherItem.hasAttribute('open')) {
        //     otherItem.removeAttribute('open');
        //   }
        // });
      });
    }
  });

  // ============================================
  // WHATSAPP TRACKING (opcional - Analytics)
  // ============================================

  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  whatsappLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Aquí puedes integrar Google Analytics o Facebook Pixel
      // Ejemplo con Google Analytics 4:
      // gtag('event', 'whatsapp_click', {
      //   'event_category': 'Contact',
      //   'event_label': this.textContent.trim()
      // });

      console.log('WhatsApp click:', this.href);
    });
  });

  // ============================================
  // FORMULARIO DE CONTACTO (si se agrega en el futuro)
  // ============================================

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validación básica
      const formData = new FormData(this);
      let isValid = true;

      for (let [key, value] of formData.entries()) {
        if (!value.trim()) {
          isValid = false;
          break;
        }
      }

      if (isValid) {
        // Aquí enviarías los datos al servidor
        console.log('Formulario válido - enviar datos');

        // Mostrar mensaje de éxito
        alert('¡Gracias por contactarnos! Te responderemos pronto.');
        this.reset();
      } else {
        alert('Por favor completa todos los campos');
      }
    });
  }

  // ============================================
  // PERFORMANCE: Preload critical resources
  // ============================================

  // Precargar imágenes críticas en segundo plano
  function preloadImage(url) {
    const img = new Image();
    img.src = url;
  }

  // Ejemplo: precargar imagen del hero si no está en viewport inicial
  // preloadImage('images/hero-kinesio.jpg');

  // ============================================
  // DETECTAR SI EL USUARIO ESTÁ EN MOBILE
  // ============================================

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  if (isMobile()) {
    document.body.classList.add('is-mobile');
  }

  // ============================================
  // ANIMACIÓN DE ENTRADA (Scroll Reveal)
  // ============================================

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Aplicar a elementos que queremos animar
    document
      .querySelectorAll('.service-card, .condition-card, .testimonial-card')
      .forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        revealObserver.observe(el);
      });
  }

  // CSS para la clase 'revealed'
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // GOOGLE MAPS LAZY LOAD
  // ============================================

  const mapIframe = document.querySelector('.contact-map iframe');

  if (mapIframe && 'IntersectionObserver' in window) {
    const mapObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && mapIframe.dataset.src) {
            mapIframe.src = mapIframe.dataset.src;
            mapIframe.removeAttribute('data-src');
            mapObserver.unobserve(mapIframe);
          }
        });
      },
      {
        rootMargin: '200px',
      }
    );

    // Si el iframe tiene data-src, observarlo
    if (mapIframe.dataset.src) {
      mapObserver.observe(mapIframe);
    }
  }

  // ============================================
  // STICKY WHATSAPP BUTTON - Show/Hide on Scroll
  // ============================================

  const stickyWhatsapp = document.querySelector('.whatsapp-sticky');

  if (stickyWhatsapp) {
    let lastScrollPosition = 0;
    let ticking = false;

    window.addEventListener('scroll', function () {
      lastScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (lastScrollPosition > 300) {
            stickyWhatsapp.style.opacity = '1';
            stickyWhatsapp.style.pointerEvents = 'auto';
          } else {
            stickyWhatsapp.style.opacity = '0';
            stickyWhatsapp.style.pointerEvents = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ============================================
  // CONSOLE MESSAGE (Branding)
  // ============================================

  console.log(
    '%c🏥 BETA Kinesiología Postural',
    'font-size: 20px; font-weight: bold; color: #2C5F7C;'
  );
  console.log(
    '%cWeb desarrollada con tecnología premium para máxima conversión',
    'font-size: 12px; color: #666;'
  );
  console.log(
    '%c¿Necesitás un sitio así para tu clínica? Contactanos 💪',
    'font-size: 12px; color: #00A896;'
  );
})();

// ============================================
// SERVICE WORKER (PWA - Opcional)
// ============================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    // navigator.registerServiceWorker('/sw.js')
    //   .then(reg => console.log('Service Worker registrado'))
    //   .catch(err => console.log('Error al registrar SW:', err));
  });
}
