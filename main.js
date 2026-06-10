document.addEventListener('DOMContentLoaded', () => {
  // 1. PRELOADER LOGIC
  const preloader = document.getElementById('preloader');
  const plText = document.getElementById('pl-text');
  const plBar = document.getElementById('pl-bar');

  const bootText = '> initializing KHALIL.OS...';
  let i = 0;

  function typeBootText() {
    if (i < bootText.length) {
      plText.textContent += bootText.charAt(i);
      i++;
      setTimeout(typeBootText, 30);
    }
  }

  // Start boot typing
  typeBootText();

  // Animate progress bar (CSS transitions handle the smooth fill)
  setTimeout(() => {
    plBar.style.width = '100%';
  }, 100);

  // Finish preloader after 1.8s
  setTimeout(() => {
    preloader.classList.add('split');
    setTimeout(() => {
      document.body.classList.add('loaded');
      preloader.style.display = 'none';
      initAfterLoad();
    }, 1000); // 1s for split animation
  }, 1800);

  // 2. CUSTOM CURSOR
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    // Dot follows immediately
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

  // Lerp for the ring
  function animateCursor() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    ring.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states
  const interactables = document.querySelectorAll('a, button, input');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });

  // 3. CONTINUOUS EFFECTS
  // Scroll Indicator Fade
  const scrollInd = document.getElementById('scroll-indicator');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      scrollInd.classList.add('hidden');
    } else {
      scrollInd.classList.remove('hidden');
    }
  });

  // Hero Parallax / Radial Gradient shift + Nexus BG Parallax
  const heroLeft = document.querySelector('.hero-left');
  const insightBg = document.getElementById('insight-bg');

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // max travel
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    // Slight shift on the cluster
    const cluster = document.getElementById('hero-orb-cluster');
    if (cluster) {
      cluster.style.transform = `translate(${x * -1}px, ${y * -1}px)`;
    }

    // Nexus background drift
    if (insightBg) {
      insightBg.style.transform = `translate(${x}px, ${y}px)`;
    }
  });

  // Card Glow Sweep Logic
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 4. SCROLL REVEALS & STAT COUNT-UPS
  const observerArgs = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // Count up stats
        const counters = entry.target.querySelectorAll('.count-up');
        counters.forEach(counter => {
          if (!counter.dataset.counted) {
            countUp(counter);
            counter.dataset.counted = 'true';
          }
        });

        // Trigger terminal boot if it's the terminal window
        if (entry.target.id === 'terminal-window' && !entry.target.dataset.booted) {
          entry.target.dataset.booted = 'true';
          setTimeout(() => initTerminal(), 600);
        }

        obs.unobserve(entry.target);
      }
    });
  }, observerArgs);

  document.querySelectorAll('.scroll-observe, .scroll-card').forEach(el => {
    observer.observe(el);
  });

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const easeOutQuad = t => t * (2 - t);

    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const current = Math.round(target * progress);
      el.innerText = current;

      if (frame >= totalFrames) {
        clearInterval(counter);
        el.innerText = target;
      }
    }, frameRate);
  }

  // 5. TERMINAL LOGIC
  const termView = document.getElementById('terminal-view');
  const termOut = document.getElementById('terminal-out');
  const termTyped = document.getElementById('terminal-typed');
  const termInputReal = document.getElementById('terminal-input-real');

  let isTyping = false;
  let focusCaptured = false;

  // Auto-focus terminal on click
  termView.addEventListener('click', () => {
    termInputReal.focus();
    focusCaptured = true;
  });

  // Link real input to display span
  termInputReal.addEventListener('input', (e) => {
    termTyped.textContent = e.target.value;
  });

  // Handle Commands
  termInputReal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = termInputReal.value.trim();
      termInputReal.value = '';
      termTyped.textContent = '';

      if (cmd) {
        processCommand(cmd);
      } else {
        appendOutput(`khalil@nexus:~$ \n`);
      }
    }
  });

  const commands = {
    'ls projects':
      `> /projects
  ├── MGV Platform    [Hackathon Management · Next.js · REST API]
  ├── E-commerce      [Web Platform · React · Node.js]
  └── Chat App        [Real-time Messaging · Socket.io]\n`,
    'ls skills':
      `> /skills
  ├── Node.js            ████████████ 95%
  ├── React & Next.js    ██████████░░ 85%
  ├── TypeScript         ██████████░░ 85%
  ├── PostgreSQL         █████████░░░ 80%
  └── Python             ████████░░░░ 75%\n`,
    khalil:
      `> Touil Khalil
> Role: Backend Developer
> Education: Licence Informatique — USTHB, Algiers (2022–2025)
> Stack: Node.js · NestJS · PostgreSQL · React · TypeScript · Socket.io
> Experience:
    Jun–Sep 2025  DZ Travel         [Next.js · TypeScript · Blog section]
    Jul–Aug 2025  Univer Delivery   [Node.js · Express · Anomaly mgmt]
> GitHub: github.com/khalil-t
> LinkedIn: linkedin.com/in/khalil-touil\n`,
    whoiskhalil:
      `> Touil Khalil
> Role: Backend Developer
> Education: Licence Informatique — USTHB, Algiers (2022–2025)
> Stack: Node.js · NestJS · PostgreSQL · React · TypeScript · Socket.io
> Experience:
    Jun–Sep 2025  DZ Travel         [Next.js · TypeScript · Blog section]
    Jul–Aug 2025  Univer Delivery   [Node.js · Express · Anomaly mgmt]
> GitHub: github.com/khalil-t
> LinkedIn: linkedin.com/in/khalil-touil\n`,
    'sudo print --cv': 'TRIGGER_PRINT',
    clear: 'CLEAR',
    help:
      `> Available commands:
  whoiskhalil     — Display Khalil's profile & stack
  khalil          — Alias for whoiskhalil
  ls projects     — List all projects
  ls skills       — Show skill proficiency
  sudo print --cv — Generate & download Khalil's PDF resume
  clear           — Clear terminal
  help            — Show this message\n`
  };

  function initTerminal() {
    isTyping = true;
    termInputReal.disabled = true;
    const bootSeq = `> System initialized.\n> Welcome to KHALIL.OS terminal v2.5.0\n> Type 'help' to see available commands.\n\n`;
    typeTerminalText(bootSeq, () => {
      isTyping = false;
      termInputReal.disabled = false;
    });
  }

  function appendOutput(html) {
    const div = document.createElement('div');
    div.innerText = html;
    div.innerHTML = div.innerHTML.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
    termOut.appendChild(div);
    termView.scrollTop = termView.scrollHeight;
  }

  function processCommand(cmd) {
    if (isTyping) return;

    // Echo the command
    const div = document.createElement('div');
    div.innerHTML = `khalil@nexus:~$ ${cmd}`.replace(/ /g, '&nbsp;') + '<br>';
    termOut.appendChild(div);
    termView.scrollTop = termView.scrollHeight;

    const c = cmd.toLowerCase().replace(/\s+/g, ' ').trim();
    let response = commands[c];

    if (!response) {
      response = `> command not found: ${c}. Type 'help' for available commands.\n`;
    }

    if (response === 'CLEAR') {
      termOut.innerHTML = '';
      return;
    }

    if (response === 'TRIGGER_PRINT') {
      isTyping = true;
      termInputReal.disabled = true;

      const printSeq = `> [SUDO] password for khalil: ········\n> Authenticating...\n> ✓ Access granted.\n> Generating PDF resume...\n> ████████████████████ 100%\n> ✓ Resume compiled: khalil_touil_cv.pdf\n> Initiating download...\n`;

      typeTerminalText(printSeq, () => {
        isTyping = false;
        termInputReal.disabled = false;
        if (typeof window.triggerPdfEngine === 'function') {
          window.triggerPdfEngine();
        }
      }, 20);
      return;
    }

    isTyping = true;
    termInputReal.disabled = true;
    typeTerminalText(response, () => {
      isTyping = false;
      termInputReal.disabled = false;
      if (focusCaptured) {
        termInputReal.focus();
      }
    });
  }

  function typeTerminalText(text, callback, speed = 30) {
    let charIndex = 0;

    const tempEl = document.createElement('span');
    termOut.appendChild(tempEl);

    const interval = setInterval(() => {
      if (charIndex < text.length) {
        const char = text.charAt(charIndex);
        if (char === '\n') {
          tempEl.appendChild(document.createElement('br'));
        } else if (char === ' ') {
          tempEl.innerHTML += '&nbsp;';
        } else {
          tempEl.appendChild(document.createTextNode(char));
        }
        termView.scrollTop = termView.scrollHeight;
        charIndex++;
      } else {
        clearInterval(interval);
        const gap = document.createElement('div');
        gap.style.height = '12px';
        termOut.appendChild(gap);
        termView.scrollTop = termView.scrollHeight;
        if (callback) callback();
      }
    }, speed);
  }

  function initAfterLoad() { }
});

