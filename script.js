/**
 * A.C.E — Neobrutalism Minimalism Theme
 * Script: Scroll animations, navbar behavior, form handling
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===================== SCROLL REVEAL ANIMATIONS =====================
  // Uses IntersectionObserver for performant scroll-triggered animations
  const revealElements = document.querySelectorAll('.reveal-child');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Optionally unobserve after reveal for performance
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  // ===================== NAVBAR SCROLL EFFECT =====================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  const handleNavbarScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();


  // ===================== MOBILE MENU TOGGLE =====================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let isMenuOpen = false;

  const toggleMobileMenu = () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('hidden', !isMenuOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen.toString());

    // Animate hamburger to X
    const svg = mobileMenuBtn.querySelector('svg');
    if (isMenuOpen) {
      svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
    } else {
      svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
    }
  };

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMobileMenu();
      }
    });
  });


  // ===================== SMOOTH SCROLL FOR ANCHOR LINKS =====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const navHeight = document.getElementById('navbar').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    });
  });




  // ===================== AUTO-DETECT ACTIVE NAV LINK =====================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    const href = btn.getAttribute('href');
    if (href === currentPage) {
      btn.classList.add('bg-brutal', 'text-white');
    }
  });


  // ===================== TILT EFFECT ON CARDS =====================
  const cards = document.querySelectorAll('.group');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(-2px) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});