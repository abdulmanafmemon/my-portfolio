ABDUL MANAF — PORTFOLIO WEBSITE
================================

HOW TO USE
----------
1. Open "index.html" in your browser to preview the site (Home, About Me,
   Services, Portfolio, FAQs and Contact are all in this ONE file).
2. Replace the placeholder photo at:  static/mypic.jpg
   with your real photo — keep the same filename, or update the <img src>
   in index.html (search for "mypic.jpg", 2 places).
3. The /pages/ folder holds the 24 separate pages that open when someone
   clicks a service, solution, SaaS product or portfolio project
   (7 AI Services + 6 Custom Solutions + 5 SaaS Products + 6 Portfolio
   projects). Each has: title, description, 8 core features, and its own
   contact form.

STRUCTURE
---------
index.html        -> Home / About Me / Services (overview) / Portfolio (overview)
                      / My Process / Core Values / Milestones / FAQs / Contact
css/style.css      -> All styling (blue + light-blue theme, animations)
js/script.js       -> Nav dropdown, mobile menu, tabs, FAQ accordion,
                      scroll reveal animations, counters, and the
                      front-end-only contact form confirmation message
static/mypic.jpg   -> YOUR PHOTO GOES HERE (placeholder included)
pages/*.html       -> The 24 individual service / solution / SaaS /
                      portfolio detail pages

NOTES
-----
- 100% front-end only: pure HTML, CSS and vanilla JS — no backend, no
  database. Contact forms show an on-page "message received" confirmation
  (there's nowhere for the data to go without a backend — connect a form
  service like Formspree, or add a backend later, whenever you're ready).
- WhatsApp: The floating WhatsApp button on every page opens a chat to
  +92 311 2170417. It uses the wa.me link format, so it works instantly
  with no setup.
- Twitter and Instagram links in the footer are placeholders
  (https://twitter.com/ and https://instagram.com/) — replace with your
  real profile URLs whenever you have them.
- Fully responsive: tested breakpoints at 1080px, 960px (mobile nav
  kicks in) and 640px.
