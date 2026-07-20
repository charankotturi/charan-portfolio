(function () {
  'use strict';

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const pops = document.querySelectorAll('.pop');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  pops.forEach((el) => observer.observe(el));

  document.querySelectorAll('.fun-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = '5';
    });
    card.addEventListener('mouseleave', () => {
      card.style.zIndex = '';
    });
  });

  const emailBtn = document.getElementById('emailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const gmailUrl =
        'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=charan.kotturi.linkedin@gmail.com';
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    });
  }
})();
