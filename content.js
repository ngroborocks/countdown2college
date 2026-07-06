/* ============================================================
   COUNTDOWN TO COLLEGE — SITE CONTENT
   ============================================================
   This is the ONLY file you need to edit to change the words
   on the website. Open it in any text editor (Notepad works),
   change the text between the quotes, save, refresh the page.

   Rules of thumb:
   - Keep the quotes. "Like this" — only change what's inside.
   - Keep the commas at the end of lines.
   - If you leave any field as "" (empty), the site quietly
     falls back to its built-in default text. Nothing breaks.
   - Don't rename the words on the LEFT of the colons.
   ============================================================ */

window.C2C_CONTENT = {

  /* ---------- GENERAL / LINKS ------------------------------
     The three PDFs live in the /public folder. Drop your files
     there with these exact names and the links just work.   */
  links: {
    guidePdf: "public/guide.pdf",               // the free guide
    parentPacket: "public/parent-packet.pdf",   // parent packet
    studentPacket: "public/student-packet.pdf", // student packet

    // Google Form for webinar signups.
    // Get this from your form: Send > < > (embed) > copy the src URL.
    // Until you replace YOUR_FORM_ID, the site shows a tidy
    // placeholder instead of a broken form.
    signupFormEmbed: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true",

    email: "hello@countdowntocollege.org"       // shown in footer + counselor card
  },

  /* ---------- HERO ---------------------------------------- */
  hero: {
    badge: "Student-founded · Free for families",
    headline: "The countdown to college started in 7th grade.",
    subhead: "Most students find out what their dream school requires when it's too late to build it. We make sure you find out first.",
    primaryCta: "Get the free guide",
    secondaryCta: "Join a webinar",
    timerLabel: "until college applications open",
    gradePrompt: "I'm in…"
  },

  /* ---------- THE PROBLEM ---------------------------------
     Three stat cards. "stat" is the big number/phrase,
     "headline" is the bold line, "body" is the small print. */
  problem: {
    heading: "The application is built years before it's submitted.",
    intro: "Nobody hides the requirements. But nobody hands them to you in 7th grade, either — and that's when the clock actually starts.",
    cards: [
      {
        stat: "8th grade",
        headline: "Course tracks lock in early.",
        body: "The math class you pick at 13 decides whether calculus — and the majors that expect it — is even on the menu at 17."
      },
      {
        stat: "75%",
        headline: "of the GPA story ends junior year.",
        body: "By the time most families start paying attention, most of the transcript colleges will actually read is already written."
      },
      {
        stat: "One October",
        headline: "morning decides National Merit.",
        body: "The junior-year PSAT is the National Merit qualifier. Most families hear about it for the first time in 12th grade."
      }
    ]
  },

  /* ---------- THE FREE GUIDE ------------------------------- */
  guide: {
    heading: "One guide. The whole runway.",
    intro: "Everything we wish someone had put in our hands in middle school, in one free PDF. No email wall, no upsell.",
    bullets: [
      "A grade-by-grade timeline from 7th through 12th — what to do, and when it stops being possible",
      "Admit profiles by tier, so you know what 'competitive' actually looks like in numbers",
      "Pathways by intended major — the courses and projects each direction expects",
      "The parent playbook: the five moments only a parent can own"
    ],
    cta: "Download the free guide",
    finePrint: "Free PDF · No signup required",
    /* The mock document cover shown next to the bullets */
    coverTitle: "The Countdown Guide",
    coverSubtitle: "Grades 7–12 · What to do, and when",
    coverBadge: "Free · 2026 Edition"
  },

  /* ---------- PICK YOUR PATH -------------------------------
     Four action items per grade. Keep them short and direct.
     "title" is the little nickname for that year.            */
  paths: {
    heading: "Pick your grade. See your move.",
    intro: "Tap where you are right now. These are the four things that matter most this year — the full plan is in the guide.",
    panelCta: "Full details in the guide",
    grades: {
      "7": {
        title: "The quiet head start",
        items: [
          "Get on the advanced math track — it quietly decides which doors are open in 11th grade.",
          "Try everything: clubs, sports, instruments, code, art. Sampling widely now beats guessing later.",
          "Build study habits while the stakes are low — they're much harder to build in 9th.",
          "Parents: learn how course pathways work in your district before the 8th-grade forms come home."
        ]
      },
      "8": {
        title: "Decisions that lock in",
        items: [
          "Take Algebra I (or beyond). It's the single class that unlocks calculus by senior year.",
          "Start narrowing “everything” down to the two or three interests you actually love.",
          "Sit down with your counselor and map all four years of high school courses — on paper.",
          "Ask older students what they wish they'd known in 8th grade. Then actually do it."
        ]
      },
      "9": {
        title: "It counts now",
        items: [
          "Your GPA starts on day one — every grade from here forward is on the transcript colleges read.",
          "Take honors classes wherever you can genuinely handle them. Rigor is half the story.",
          "Join 2–3 activities you could imagine sticking with for four years.",
          "Start a résumé doc today and add to it every month. Future-you says thanks."
        ]
      },
      "10": {
        title: "Raise the ceiling",
        items: [
          "Take your first AP and prove you can handle college-level work.",
          "Start PSAT practice now — junior-year October comes faster than you think.",
          "Go from member to contributor: run something, build something, fix something.",
          "Summers matter now. Plan one that shows initiative — a program, a project, a job."
        ]
      },
      "11": {
        title: "The year that counts double",
        items: [
          "This is the hardest year on the transcript — schedule it like it matters, because it does.",
          "The October PSAT is the National Merit test. Prep before it, not after.",
          "Take the SAT or ACT in spring, so there's room to retake in fall.",
          "Step into leadership, and invest in the two teachers who'll write your recommendations."
        ]
      },
      "12": {
        title: "Land the plane",
        items: [
          "Draft your essays in summer, before homework competes for your best hours.",
          "Submit applications and the FAFSA early — early files get calmer decisions.",
          "Treat scholarships like a part-time job: keep applying all year, not just once.",
          "In spring, compare offers, not names. The best deal often isn't the biggest logo."
        ]
      }
    }
  },

  /* ---------- FOR PARENTS / FOR STUDENTS ------------------- */
  audiences: {
    heading: "Two packets. Two jobs.",
    parent: {
      badge: "For parents",
      headline: "There are five moments only a parent can own. Know them.",
      body: "Course-track meetings, testing signups, financial aid, the money conversation. The parent packet tells you exactly when your move comes — years in advance.",
      cta: "Download the parent packet"
    },
    student: {
      badge: "For students",
      headline: "Nobody is coming to plan this for you. Here's the cheat sheet.",
      body: "One page per grade. What to take, what to join, what to skip, and the deadlines nobody announces. Stick it inside your locker door.",
      cta: "Download the student packet"
    }
  },

  /* ---------- WEBINARS & SCHOOL VISITS ---------------------
     Add or remove sessions freely — the page adjusts. Dates
     are plain text, so write them however you like.          */
  webinars: {
    heading: "Learn it live.",
    intro: "Free sessions for families, run by students who just went through it. Bring questions — that's the point.",
    signupHeading: "Save a seat",
    signupNote: "Pick any session — we'll send the Zoom link and reminders by email.",
    sessions: [
      {
        title: "Countdown 101: The Middle School Head Start",
        date: "Thursday, August 20, 2026",
        time: "7:00–8:00 PM ET",
        where: "Zoom — link sent after signup",
        audience: "Parents & students · Grades 6–9",
        blurb: "The five decisions before 9th grade that quietly shape the application — and how to get each one right."
      },
      {
        title: "Junior Year War Room",
        date: "Wednesday, September 9, 2026",
        time: "7:00–8:00 PM ET",
        where: "Zoom — link sent after signup",
        audience: "Parents & students · Grades 10–11",
        blurb: "PSAT and National Merit, test timelines, leadership, recommendations. The year that counts double, planned out loud."
      }
    ],
    counselor: {
      heading: "Are you a counselor?",
      body: "We'll present at your school, free — an assembly, a parent night, or a single advisory period. Tell us what your students need.",
      cta: "Email us about a visit"
    }
  },

  /* ---------- ABOUT / OUR STORY ---------------------------- */
  about: {
    heading: "Built by the kid who found out too late.",
    founderName: "Founder Name",          // ← your name here
    founderRole: "Founder, Countdown to College",
    founderPhoto: "",                     // e.g. "public/founder.jpg" — leave "" for the placeholder
    story: [
      "I grew up dreaming about MIT. I had the poster, the hoodie, the campus tour saved on YouTube.",
      "What I didn't have was the information. When I finally read what admitted students had actually done — the math track chosen in middle school, the years of building, the October test I'd never heard of — I was already a senior. The countdown had been running since 7th grade. Nobody told me it started.",
      "Countdown to College exists so that never happens to another family. Everything we make is free, built by students, and designed to reach you while there's still time on the clock."
    ]
  },

  /* ---------- FOOTER --------------------------------------- */
  footer: {
    tagline: "Know the requirements before it's too late.",
    copyright: "Countdown to College © 2026",
    disclaimer: "General information, not individual advice — always verify with each college and your counselor.",
    /* Social links. Set url: "" to hide one. */
    socials: [
      { label: "Instagram", handle: "@countdown2college", url: "https://instagram.com/countdown2college" },
      { label: "TikTok",    handle: "@countdown2college", url: "https://tiktok.com/@countdown2college" },
      { label: "YouTube",   handle: "Countdown to College", url: "https://youtube.com/@countdown2college" }
    ]
  }
};
