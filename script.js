/**
 * A.C.E — Neobrutalism Minimalism Theme
 * Script: Component injection, scroll animations, navbar behavior, dark mode
 */

// ===================== DARK MODE =====================

function getPreferredTheme() {
  const stored = localStorage.getItem('ace-theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('ace-theme', theme);
}

// Apply theme immediately to prevent flash (runs before DOMContentLoaded)
applyTheme(getPreferredTheme());

// ===================== SHARED COMPONENTS =====================

const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'about.html', label: 'About' },
  { href: 'hardware.html', label: 'Hardware' },
  { href: 'docs.html', label: 'Features' },
  { href: 'contact.html', label: 'Contact' },
  { href: 'sideranacio.html', label: 'Community' },
];

function buildNavbar() {
  const navLinks = NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="nav-btn">${l.label}</a>`
  ).join('\n        ');

  const mobileLinks = NAV_LINKS.map(
    (l) => `<a href="${l.href}" class="nav-btn w-full text-center">${l.label}</a>`
  ).join('\n        ');

  return `
  <nav id="navbar" class="fixed top-0 left-0 w-full z-50 bg-white border-b-[3px] border-black transition-all duration-300">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="index.html" class="flex items-center gap-2 group">
        <img src="src/assets/LOGO1.svg" alt="A.C.E Logo" class="h-10 w-10 rounded-xl object-cover mix-blend-multiply border-2 border-black bg-white group-hover:scale-110 transition-transform duration-200" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <div class="h-10 w-10 rounded-xl border-2 border-black bg-accent text-white font-bold text-lg items-center justify-center hidden">A</div>
        <span class="font-bold text-lg tracking-tight">A.C.E</span>
      </a>
      <div class="hidden md:flex items-center gap-2">
        ${navLinks}
      </div>
      <div class="flex items-center gap-2">
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
          <svg class="icon-moon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          <svg class="icon-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
        </button>
        <button id="mobile-menu-btn" class="md:hidden w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200" aria-expanded="false" aria-label="Toggle navigation menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="hidden md:hidden border-t-[3px] border-black bg-white">
      <div class="px-6 py-4 flex flex-col gap-2">
        ${mobileLinks}
      </div>
    </div>
  </nav>`;
}

function buildFooter() {
  const footerLinks = NAV_LINKS.map(
    (l) => `<li><a href="${l.href}" class="text-gray-400 hover:text-white transition-colors duration-200">${l.label}</a></li>`
  ).join('\n            ');

  return `
  <footer class="bg-brutal text-white border-t-[3px] border-black">
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-3 gap-12 mb-12">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-10 h-10 rounded-xl border-2 border-white/30 bg-accent flex items-center justify-center font-bold text-lg">A</div>
            <span class="font-bold text-xl tracking-tight">A.C.E</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed max-w-xs">Your personal academic companion. Designed to help students stay organised, plan effectively, and learn smarter.</p>
        </div>
        <div>
          <h4 class="font-bold text-sm tracking-widest uppercase mb-4 text-gray-300">Links</h4>
          <ul class="space-y-2 text-sm">
            ${footerLinks}
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm tracking-widest uppercase mb-4 text-gray-300">Connect</h4>
          <div class="flex gap-3">
            <a href="https://github.com/coolboy17289" target="_blank" rel="noopener noreferrer" class="w-10 h-10 border-2 border-white/20 flex items-center justify-center hover:bg-white hover:text-brutal transition-all duration-200 text-gray-400" aria-label="GitHub">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-gray-500 text-sm">&copy; 2026 A.C.E. All rights reserved.</p>
        <p class="text-gray-500 text-xs font-mono">Built with &hearts; by Lihan Badenhorst</p>
      </div>
    </div>
  </footer>`;
}

// ===================== COMPONENT INJECTION =====================

document.addEventListener('DOMContentLoaded', () => {
  // Inject navbar
  const navbarSlot = document.getElementById('navbar-slot');
  if (navbarSlot) {
    navbarSlot.outerHTML = buildNavbar();
  }

  // Inject footer
  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) {
    footerSlot.outerHTML = buildFooter();
  }

  // ===================== DARK MODE TOGGLE =====================
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('ace-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ===================== SCROLL REVEAL ANIMATIONS =====================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal-child').forEach((el) => revealObserver.observe(el));

  // ===================== NAVBAR SCROLL EFFECT =====================
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
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
    mobileMenuBtn.setAttribute('aria-expanded', String(isMenuOpen));

    const svg = mobileMenuBtn.querySelector('svg');
    svg.innerHTML = isMenuOpen
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
  };

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => { if (isMenuOpen) toggleMobileMenu(); });
  });

  // ===================== SMOOTH SCROLL FOR ANCHOR LINKS =====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = navbar.offsetHeight;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - navHeight,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // ===================== AUTO-DETECT ACTIVE NAV LINK =====================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    if (btn.getAttribute('href') === currentPage) {
      btn.classList.add('bg-brutal', 'text-white');
    }
  });

  // ===================== TILT EFFECT ON CARDS =====================
  document.querySelectorAll('.group').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const rotateX = (e.clientY - rect.top - rect.height / 2) / 20;
      const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(-2px) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
});
