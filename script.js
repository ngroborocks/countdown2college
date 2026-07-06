/* ============================================================
   COUNTDOWN TO COLLEGE — BEHAVIOR
   Plain vanilla JS. No dependencies, no build step.

   You should not need to edit this file to change the words
   on the site — edit content.js instead. This file reads
   content.js and injects it into the page, falling back to
   built-in defaults for anything left blank.
   ============================================================ */

(function () {
  'use strict';

  var CONTENT = window.C2C_CONTENT || {};

  /* ---------- Built-in fallbacks -------------------------------
     Used whenever a field in content.js is missing or blank, so
     the site always renders something sensible.                 */
  var DEFAULTS = {
    links: {
      guidePdf: 'public/guide.pdf',
      parentPacket: 'public/parent-packet.pdf',
      studentPacket: 'public/student-packet.pdf',
      signupFormEmbed: '',
      email: 'hello@countdowntocollege.org'
    },
    paths: {
      panelCta: 'Full details in the guide',
      grades: {
        7: {
          title: 'The quiet head start',
          items: [
            'Get on the advanced math track — it quietly decides which doors are open in 11th grade.',
            'Try everything: clubs, sports, instruments, code, art. Sampling widely now beats guessing later.',
            "Build study habits while the stakes are low — they're much harder to build in 9th.",
            'Parents: learn how course pathways work in your district before the 8th-grade forms come home.'
          ]
        },
        8: {
          title: 'Decisions that lock in',
          items: [
            "Take Algebra I (or beyond). It's the single class that unlocks calculus by senior year.",
            'Start narrowing "everything" down to the two or three interests you actually love.',
            'Sit down with your counselor and map all four years of high school courses — on paper.',
            "Ask older students what they wish they'd known in 8th grade. Then actually do it."
          ]
        },
        9: {
          title: 'It counts now',
          items: [
            'Your GPA starts on day one — every grade from here forward is on the transcript colleges read.',
            'Take honors classes wherever you can genuinely handle them. Rigor is half the story.',
            'Join 2–3 activities you could imagine sticking with for four years.',
            'Start a résumé doc today and add to it every month. Future-you says thanks.'
          ]
        },
        10: {
          title: 'Raise the ceiling',
          items: [
            'Take your first AP and prove you can handle college-level work.',
            'Start PSAT practice now — junior-year October comes faster than you think.',
            'Go from member to contributor: run something, build something, fix something.',
            'Summers matter now. Plan one that shows initiative — a program, a project, a job.'
          ]
        },
        11: {
          title: 'The year that counts double',
          items: [
            'This is the hardest year on the transcript — schedule it like it matters, because it does.',
            'The October PSAT is the National Merit test. Prep before it, not after.',
            'Take the SAT or ACT in spring, so there is room to retake in fall.',
            "Step into leadership, and invest in the two teachers who'll write your recommendations."
          ]
        },
        12: {
          title: 'Land the plane',
          items: [
            'Draft your essays in summer, before homework competes for your best hours.',
            'Submit applications and the FAFSA early — early files get calmer decisions.',
            'Treat scholarships like a part-time job: keep applying all year, not just once.',
            "In spring, compare offers, not names. The best deal often isn't the biggest logo."
          ]
        }
      }
    },
    webinars: {
      sessions: [
        {
          title: 'Countdown 101: The Middle School Head Start',
          date: 'Date coming soon',
          time: '',
          where: 'Zoom — link sent after signup',
          audience: 'Parents & students',
          blurb: 'The decisions before 9th grade that quietly shape the application — and how to get each one right.'
        }
      ]
    },
    footer: {
      socials: []
    }
  };

  /* ---------- Tiny helpers ---------- */
  function isBlank(v) {
    if (v === undefined || v === null) return true;
    if (typeof v === 'string') return v.trim() === '';
    if (Array.isArray(v)) return v.length === 0;
    return false;
  }

  function dig(obj, path) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur === undefined || cur === null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  /* Value from content.js, else from DEFAULTS, else fallback arg. */
  function get(path, fallback) {
    var v = dig(CONTENT, path);
    if (isBlank(v)) v = dig(DEFAULTS, path);
    if (isBlank(v)) v = fallback;
    return v;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null && text !== '') node.textContent = text;
    return node;
  }

  var reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     1. TEXT BINDINGS
     The HTML already contains sensible default copy. Anything
     set (non-blank) in content.js overrides it here.
     ============================================================ */
  function applyBindings() {
    var bound = document.querySelectorAll('[data-bind]');
    for (var i = 0; i < bound.length; i++) {
      var v = dig(CONTENT, bound[i].getAttribute('data-bind'));
      if (!isBlank(v) && typeof v === 'string') bound[i].textContent = v;
    }

    var hrefs = document.querySelectorAll('[data-bind-href]');
    for (var j = 0; j < hrefs.length; j++) {
      var href = get(hrefs[j].getAttribute('data-bind-href'), '');
      if (!isBlank(href)) hrefs[j].setAttribute('href', href);
    }

    /* Lists: rebuild children only when content.js supplies a
       non-empty array; otherwise the static HTML stands. */
    var lists = document.querySelectorAll('[data-list]');
    for (var k = 0; k < lists.length; k++) {
      var container = lists[k];
      var items = dig(CONTENT, container.getAttribute('data-list'));
      if (!Array.isArray(items)) continue;
      var clean = items.filter(function (s) { return !isBlank(s); });
      if (clean.length === 0) continue;
      var childTag = container.tagName === 'UL' || container.tagName === 'OL' ? 'li' : 'p';
      container.textContent = '';
      clean.forEach(function (text) {
        container.appendChild(el(childTag, '', text));
      });
    }
  }

  /* ============================================================
     2. THE COUNTDOWN (hero) + GRADE STATE
     Applications "open" October 1 of senior fall. Pick a grade,
     see the clock. The same grade selection drives the
     "Pick your path" panels further down the page.
     ============================================================ */
  var GRADES = [7, 8, 9, 10, 11, 12];
  var state = { grade: 7 };
  var timerInterval = null;
  var lastUnits = { days: null, hours: null, mins: null, secs: null };

  function gradeLabel(g) { return g + 'th'; }

  /* School year the selected grade refers to: from July onward we
     assume the upcoming school year (a "rising" student). */
  function schoolYearStart(now) {
    return now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
  }

  function applicationDate(grade, now) {
    var seniorFallYear = schoolYearStart(now) + (12 - grade);
    return new Date(seniorFallYear, 9, 1, 0, 0, 0); // October 1
  }

  function addYears(date, years) {
    var d = new Date(date.getTime());
    d.setFullYear(d.getFullYear() + years);
    return d;
  }

  /* Split (target - now) into full years + days/hours/mins/secs. */
  function breakdown(target, now) {
    if (target.getTime() - now.getTime() <= 0) return null;
    var years = target.getFullYear() - now.getFullYear();
    var probe = addYears(now, years);
    if (probe.getTime() > target.getTime()) {
      years--;
      probe = addYears(now, years);
    }
    var rem = target.getTime() - probe.getTime();
    return {
      years: years,
      days: Math.floor(rem / 86400000),
      hours: Math.floor(rem / 3600000) % 24,
      mins: Math.floor(rem / 60000) % 60,
      secs: Math.floor(rem / 1000) % 60
    };
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function setUnit(id, key, value) {
    var node = document.getElementById(id);
    if (!node) return;
    var text = pad(value);
    if (node.textContent !== text) {
      node.textContent = text;
      if (!reducedMotion && lastUnits[key] !== null) {
        node.classList.remove('tick');
        void node.offsetWidth; // restart the animation
        node.classList.add('tick');
      }
    }
    lastUnits[key] = value;
  }

  function renderCountdown(announce) {
    var bigNum = document.getElementById('timer-big-num');
    var bigUnit = document.getElementById('timer-big-unit');
    var label = document.getElementById('timer-label');
    var units = document.getElementById('timer-units');
    var sr = document.getElementById('timer-sr');
    if (!bigNum || !bigUnit || !label || !units) return;

    var now = new Date();
    var target = applicationDate(state.grade, now);
    var b = breakdown(target, now);
    var labelText = get('hero.timerLabel', 'until college applications open');

    if (!b) {
      /* A 12th grader after October 1 — the window is open. */
      bigNum.textContent = 'GO';
      bigUnit.textContent = '';
      label.textContent = 'Application season is open. Every week counts now.';
      units.style.display = 'none';
      if (announce && sr) {
        sr.textContent = 'For a student in ' + gradeLabel(state.grade) +
          ' grade, application season is already open.';
      }
      return;
    }

    units.style.display = '';
    var daysBox = document.getElementById('t-days');
    var daysUnitWrap = daysBox ? daysBox.parentElement : null;

    if (b.years >= 1) {
      bigNum.textContent = String(b.years);
      bigUnit.textContent = b.years === 1 ? 'year' : 'years';
      if (daysUnitWrap) daysUnitWrap.style.display = '';
      setUnit('t-days', 'days', b.days);
    } else {
      /* Less than a year out: days become the headline number. */
      bigNum.textContent = String(b.days);
      bigUnit.textContent = b.days === 1 ? 'day' : 'days';
      if (daysUnitWrap) daysUnitWrap.style.display = 'none';
      lastUnits.days = b.days;
    }
    label.textContent = labelText;
    setUnit('t-hours', 'hours', b.hours);
    setUnit('t-mins', 'mins', b.mins);
    setUnit('t-secs', 'secs', b.secs);

    if (announce && sr) {
      sr.textContent = 'For a student in ' + gradeLabel(state.grade) +
        ' grade: about ' +
        (b.years >= 1
          ? b.years + (b.years === 1 ? ' year' : ' years') + ' and ' + b.days + ' days'
          : b.days + ' days') +
        ' until college applications open.';
      if (!reducedMotion) {
        bigNum.classList.remove('tick');
        void bigNum.offsetWidth;
        bigNum.classList.add('tick');
      }
    }
  }

  function startTimer() {
    renderCountdown(true);
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(function () { renderCountdown(false); }, 1000);
  }

  /* ---------- Shared grade selection (chips + path tabs) ---------- */
  function setGrade(grade, announce) {
    state.grade = grade;
    try { localStorage.setItem('c2c-grade', String(grade)); } catch (e) { /* private mode etc. */ }

    var chips = document.querySelectorAll('#grade-chips .chip');
    for (var i = 0; i < chips.length; i++) {
      chips[i].setAttribute('aria-pressed', String(Number(chips[i].dataset.grade) === grade));
    }
    var tabs = document.querySelectorAll('#path-tabs .path-tab');
    for (var j = 0; j < tabs.length; j++) {
      var selected = Number(tabs[j].dataset.grade) === grade;
      tabs[j].setAttribute('aria-selected', String(selected));
      tabs[j].tabIndex = selected ? 0 : -1;
    }
    var panels = document.querySelectorAll('#path-panels .path-panel');
    for (var k = 0; k < panels.length; k++) {
      panels[k].hidden = Number(panels[k].dataset.grade) !== grade;
    }
    renderCountdown(announce !== false);
  }

  function buildGradeChips() {
    var wrap = document.getElementById('grade-chips');
    if (!wrap) return;
    GRADES.forEach(function (g) {
      var chip = el('button', 'chip', gradeLabel(g));
      chip.type = 'button';
      chip.dataset.grade = String(g);
      chip.setAttribute('aria-pressed', 'false');
      chip.setAttribute('aria-label', gradeLabel(g) + ' grade');
      chip.addEventListener('click', function () { setGrade(g); });
      wrap.appendChild(chip);
    });
  }

  /* ============================================================
     3. PICK YOUR PATH — tabs and panels
     ============================================================ */
  function gradeData(g) {
    var fromContent = dig(CONTENT, 'paths.grades.' + g) || {};
    var fromDefault = DEFAULTS.paths.grades[g];
    var items = Array.isArray(fromContent.items)
      ? fromContent.items.filter(function (s) { return !isBlank(s); })
      : [];
    return {
      title: !isBlank(fromContent.title) ? fromContent.title : fromDefault.title,
      items: items.length ? items : fromDefault.items
    };
  }

  function buildPathWidget() {
    var tabsWrap = document.getElementById('path-tabs');
    var panelsWrap = document.getElementById('path-panels');
    if (!tabsWrap || !panelsWrap) return;

    var guideHref = get('links.guidePdf', 'public/guide.pdf');
    var ctaText = get('paths.panelCta', 'Full details in the guide');

    GRADES.forEach(function (g) {
      var data = gradeData(g);

      var tab = el('button', 'path-tab', gradeLabel(g));
      tab.type = 'button';
      tab.id = 'path-tab-' + g;
      tab.dataset.grade = String(g);
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('aria-controls', 'path-panel-' + g);
      tab.setAttribute('aria-label', gradeLabel(g) + ' grade');
      tab.tabIndex = -1;
      tab.addEventListener('click', function () { setGrade(g); });
      tabsWrap.appendChild(tab);

      var panel = el('div', 'path-panel');
      panel.id = 'path-panel-' + g;
      panel.dataset.grade = String(g);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'path-tab-' + g);
      panel.tabIndex = 0;
      panel.hidden = true;

      var title = el('h3', 'path-panel-title');
      title.appendChild(el('span', 'path-panel-grade', gradeLabel(g) + ' grade: '));
      title.appendChild(document.createTextNode(data.title));
      panel.appendChild(title);

      var list = el('ol', 'path-items');
      data.items.slice(0, 4).forEach(function (text, idx) {
        var li = el('li');
        li.appendChild(el('span', 'path-item-num', String(idx + 1)));
        li.appendChild(el('span', '', text));
        list.appendChild(li);
      });
      panel.appendChild(list);

      var cta = el('a', 'btn btn-primary', ctaText);
      cta.href = guideHref;
      panel.appendChild(cta);

      panelsWrap.appendChild(panel);
    });

    /* Roving-tabindex keyboard support on the tablist */
    tabsWrap.addEventListener('keydown', function (e) {
      var keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (keys.indexOf(e.key) === -1) return;
      e.preventDefault();
      var idx = GRADES.indexOf(state.grade);
      if (e.key === 'ArrowLeft') idx = (idx - 1 + GRADES.length) % GRADES.length;
      if (e.key === 'ArrowRight') idx = (idx + 1) % GRADES.length;
      if (e.key === 'Home') idx = 0;
      if (e.key === 'End') idx = GRADES.length - 1;
      setGrade(GRADES[idx]);
      var next = document.getElementById('path-tab-' + GRADES[idx]);
      if (next) next.focus();
    });
  }

  /* ============================================================
     4. WEBINARS — session cards + signup embed
     ============================================================ */
  function buildSessions() {
    var wrap = document.getElementById('webinar-sessions');
    if (!wrap) return;
    var sessions = get('webinars.sessions', []);
    if (!Array.isArray(sessions) || sessions.length === 0) return;

    sessions.forEach(function (s) {
      if (isBlank(s.title)) return;
      var card = el('article', 'card session-card');
      if (!isBlank(s.date)) card.appendChild(el('p', 'session-date-badge', s.date));
      card.appendChild(el('h3', '', s.title));

      var meta = el('ul', 'session-meta');
      [['Time', s.time], ['Where', s.where], ['Who', s.audience]].forEach(function (pair) {
        if (isBlank(pair[1])) return;
        var li = el('li');
        li.appendChild(el('span', 'meta-key', pair[0]));
        li.appendChild(el('span', '', pair[1]));
        meta.appendChild(li);
      });
      if (meta.children.length) card.appendChild(meta);

      if (!isBlank(s.blurb)) card.appendChild(el('p', 'session-blurb', s.blurb));
      wrap.appendChild(card);
    });
  }

  function buildSignupEmbed() {
    var wrap = document.getElementById('signup-embed');
    if (!wrap) return;
    var url = get('links.signupFormEmbed', '');
    var email = get('links.email', 'hello@countdowntocollege.org');

    var isPlaceholder = isBlank(url) || url.indexOf('YOUR_FORM_ID') !== -1;
    if (isPlaceholder) {
      var box = el('div', 'signup-placeholder');
      box.appendChild(el('p', '',
        'Signup form coming right here. Until then, grab a seat by email — one line is plenty.'));
      var mail = el('a', 'btn btn-primary', 'Email us to sign up');
      mail.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Webinar signup');
      box.appendChild(mail);
      wrap.appendChild(box);
      return;
    }

    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = 'Webinar signup form';
    iframe.loading = 'lazy';
    wrap.appendChild(iframe);
  }

  /* ============================================================
     5. ABOUT — founder photo (if provided)
     ============================================================ */
  function buildPortrait() {
    var photo = get('about.founderPhoto', '');
    if (isBlank(photo)) return;
    var wrap = document.getElementById('about-portrait');
    var placeholder = wrap && wrap.querySelector('.portrait-placeholder');
    if (!placeholder) return;
    var img = document.createElement('img');
    img.src = photo;
    img.alt = 'Portrait of ' + get('about.founderName', 'the founder');
    img.width = 448; img.height = 448;
    wrap.replaceChild(img, placeholder);
  }

  /* ============================================================
     6. FOOTER — socials + email + counselor mailto
     ============================================================ */
  function buildFooter() {
    var email = get('links.email', 'hello@countdowntocollege.org');

    var counselor = document.getElementById('counselor-email');
    if (counselor) {
      counselor.href = 'mailto:' + email + '?subject=' +
        encodeURIComponent('School visit request');
    }

    var list = document.getElementById('footer-socials');
    if (!list) return;
    list.textContent = '';

    var socials = get('footer.socials', []);
    (Array.isArray(socials) ? socials : []).forEach(function (s) {
      if (isBlank(s.url) || isBlank(s.label)) return;
      var li = el('li');
      var a = el('a', '', s.label);
      a.href = s.url;
      a.rel = 'noopener';
      a.target = '_blank';
      if (!isBlank(s.handle)) a.appendChild(el('span', 'social-handle', s.handle));
      li.appendChild(a);
      list.appendChild(li);
    });

    var emailLi = el('li');
    var emailA = el('a', '', email);
    emailA.href = 'mailto:' + email;
    emailLi.appendChild(emailA);
    list.appendChild(emailLi);
  }

  /* ============================================================
     7. NAV, SCROLL STATE, REVEAL ANIMATIONS
     ============================================================ */
  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    /* close the mobile menu after choosing a destination */
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    var header = document.querySelector('.site-header');
    var onScroll = function () {
      if (header) header.classList.toggle('scrolled', window.scrollY > 4);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      for (var i = 0; i < targets.length; i++) targets[i].classList.add('in');
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    for (var j = 0; j < targets.length; j++) observer.observe(targets[j]);
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    applyBindings();
    buildGradeChips();
    buildPathWidget();
    buildSessions();
    buildSignupEmbed();
    buildPortrait();
    buildFooter();
    initNav();
    initReveal();

    var savedGrade = 7;
    try {
      var stored = Number(localStorage.getItem('c2c-grade'));
      if (GRADES.indexOf(stored) !== -1) savedGrade = stored;
    } catch (e) { /* storage unavailable */ }
    setGrade(savedGrade, false);
    renderCountdown(true); // one announcement for screen readers on load
    startTimer();

    document.documentElement.setAttribute('data-c2c-ready', '1');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
