(() => {
  // ================= Performance Optimization =================
  // Use requestAnimationFrame for better performance
  let rafId = null;
  const throttle = (fn) => {
    return (...args) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        fn(...args);
        rafId = null;
      });
    };
  };

  // ================= Header / Nav =================
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("primary-nav");
  const toggle = document.querySelector(".site-nav__toggle");
  const footerYear = document.getElementById("footer-year");
  const YEAR = new Date().getFullYear();

  if (footerYear) {
    footerYear.textContent = YEAR;
  }

  const setHeaderShadow = () => {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add("site-header--scrolled");
    } else {
      header.classList.remove("site-header--scrolled");
    }
  };

  setHeaderShadow();
  window.addEventListener("scroll", throttle(setHeaderShadow), { passive: true });

  if (toggle && nav) {
    if (!toggle.hasAttribute("aria-label")) {
      toggle.setAttribute("aria-label", "Open menu");
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    };

    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.removeEventListener("keydown", handleEscapeKey);
      // Return focus to toggle button when closing
      toggle.focus();
    };

    const lockNavTransitions = () => {
      if (nav.classList.contains("is-locked")) return;
      nav.classList.add("is-locked");
      requestAnimationFrame(() => {
        nav.classList.remove("is-locked");
      });
    };

    closeNav();

    const handleDocumentClick = (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeNav();
    };

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeNav();
      } else {
        nav.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
        document.addEventListener("keydown", handleEscapeKey);
        // Focus first nav link when opening
        const firstLink = nav.querySelector("a");
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100);
        }
      }
    });

    document.addEventListener("click", handleDocumentClick);

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        closeNav();
        return;
      }

      if (!nav.classList.contains("is-open")) {
        lockNavTransitions();
      }
    });
  }

  // ================= Journey (reveal + "active" row) =================
  const initJourney = () => {
    const rows = document.querySelectorAll(".journey__row");
    if (!rows.length) return;

    // Reveal when ~40% visible
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.4 }
    );

    rows.forEach((r) => io.observe(r));

    // Find row closest to viewport center and mark as active
    let ticking = false;
    const setActive = () => {
      ticking = false;
      let winner = null;
      let best = Infinity;
      const mid = window.innerHeight / 2;

      rows.forEach((r) => {
        const rect = r.getBoundingClientRect();
        const d = Math.abs(rect.top + rect.height / 2 - mid);
        if (d < best) {
          best = d;
          winner = r;
        }
      });

      rows.forEach((r) => r.classList.toggle("is-active", r === winner));
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(setActive);
      }
    };

    // Initial + listeners
    setActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // Respect users who prefer reduced motion (CSS already handles most)
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // Ensure everything visible without waiting for IO on very small viewports
      rows.forEach((r) => r.classList.add("is-visible"));
      setActive();
    }
  };

  // Run Journey when DOM is ready (works even if this script is in <head>)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initJourney);
  } else {
    initJourney();
  }

  // ================= Scroll Reveal Animations =================
  const initScrollReveal = () => {
    // Elements to animate on scroll
    const revealElements = document.querySelectorAll(
      '.card, .pricing-card, .portfolio-tile, .add-on-card, .faq__item, .timeline__item, .section__header, .contact-form-card, .contact-media'
    );

    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger animation slightly for grouped elements
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach((el) => {
      // Set initial state
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      revealObserver.observe(el);
    });

    // Respect reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      revealElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  };

  // ================= Smooth Button Ripple Effect =================
  const initButtonRipple = () => {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  };

  // Add ripple animation to CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ================= Scroll Progress Indicator =================
  const initScrollProgress = () => {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    const updateProgress = throttle(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    });

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call
  };

  // ================= Smooth Anchor Scrolling =================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ================= Image Lazy Load Optimization =================
  const initImageOptimization = () => {
    // Add fade-in effect for lazy-loaded images
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.4s ease-in';

      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });

      // If already loaded (cached)
      if (img.complete) {
        img.style.opacity = '1';
      }
    });
  };

  // ================= Performance: Debounce Resize Events =================
  let resizeTimer;
  const optimizedResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Trigger any resize-dependent updates here
      document.body.classList.add('resize-animation-stopper');
      setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
      }, 400);
    }, 250);
  };

  window.addEventListener('resize', optimizedResize);

  // Add CSS to stop animations during resize
  const resizeStyle = document.createElement('style');
  resizeStyle.textContent = `
    .resize-animation-stopper * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
  `;
  document.head.appendChild(resizeStyle);

  // ================= Smooth FAQ Accordion =================
  const initAccordion = () => {
    const accordionItems = document.querySelectorAll('.accordion__item');

    if (!accordionItems.length) return;

    accordionItems.forEach((item) => {
      const summary = item.querySelector('summary');
      const content = item.querySelector('.accordion__content');

      if (!summary || !content) return;

      // Store original content for smooth animation
      let isAnimating = false;

      summary.addEventListener('click', (e) => {
        if (isAnimating) {
          e.preventDefault();
          return;
        }

        const isOpen = item.hasAttribute('open');

        if (!isOpen) {
          // Opening animation
          isAnimating = true;

          // Close other accordions for cleaner UX (optional)
          accordionItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.hasAttribute('open')) {
              otherItem.removeAttribute('open');
            }
          });

          setTimeout(() => {
            isAnimating = false;
          }, 400);
        } else {
          // Closing animation
          isAnimating = true;
          setTimeout(() => {
            isAnimating = false;
          }, 400);
        }
      });

      // Add keyboard accessibility
      summary.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          summary.click();
        }
      });
    });

    // Add stagger animation on initial load
    accordionItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 100);
    });
  };

  // ================= Initialize All Enhancements =================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initScrollReveal();
      initButtonRipple();
      initScrollProgress();
      initSmoothScroll();
      initImageOptimization();
      initAccordion();
    });
  } else {
    initScrollReveal();
    initButtonRipple();
    initScrollProgress();
    initSmoothScroll();
    initImageOptimization();
    initAccordion();
  }

  // ================= Page Load Performance =================
  window.addEventListener('load', () => {
    // Mark page as fully loaded
    document.body.classList.add('page-loaded');

    // Remove any loading indicators
    const loader = document.querySelector('.page-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 300);
      }, 100);
    }
  });

})();
