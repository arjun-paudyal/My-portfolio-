# Arjun Paudyal — Personal Portfolio

A modern, professional, fully responsive personal portfolio website.

## Structure
```
arjun-portfolio/
├── index.html      ← Main HTML (SEO-optimised, semantic)
├── style.css       ← All styles (dark/light mode, responsive)
├── script.js       ← Interactions, animations, form validation
└── assets/         ← Place your profile photo here as `profile.jpg`
```

## Features
- ✅ Dark / Light mode toggle (persists via localStorage)
- ✅ Animated typing effect in hero
- ✅ Scroll-reveal animations on all sections
- ✅ Animated skill bars
- ✅ Sticky navbar with active link tracking
- ✅ Mobile-responsive hamburger menu
- ✅ Loading screen animation
- ✅ Contact form with real-time validation
- ✅ Glassmorphism cards
- ✅ Floating profile badge with tech tags
- ✅ Education timeline
- ✅ Subtle parallax orbs
- ✅ SEO meta tags

## Adding Your Profile Photo
Replace the avatar placeholder by editing `index.html`:
Find `.avatar-placeholder` and add an `<img>` tag:
```html
<img src="assets/profile.jpg" alt="Arjun Paudyal" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
```

## Connecting the Contact Form
The form currently simulates submission. To wire it to a real backend:
- Use [Formspree](https://formspree.io) — add `action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag
- Or use [EmailJS](https://emailjs.com) and call `emailjs.send()` inside the submit handler in `script.js`

## Deployment
Drop the three files (plus assets/) into any static host:
- **Netlify** — drag & drop the folder
- **Vercel** — `vercel deploy`
- **GitHub Pages** — push to a `gh-pages` branch
