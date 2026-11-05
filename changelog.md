# Changelog

## Released (2026-11-05)

### Navbar

- Show the full navigation from 768px, so tablets no longer get the phone menu.
- Make the header height responsive: 64px on phones and tablets, 80px from 1024px, and 52px on short landscape screens.
- Enlarge the menu button to a 44×44px tap target and label it for screen readers.
- Fit the mobile menu to short screens, using two columns in landscape.
- Close the mobile menu and unlock the page when the screen rotates past the breakpoint or the browser goes back.
- Fix the mobile menu collapsing because `backdrop-blur` on the header changed how it was positioned.
- Keep the navigation clear of the logo and Contact button at widths from 280px to 2560px.

### Fictional business details

- Replace all company details with fictional ones in `lib/site.ts` and `data/`: address, phone numbers, team, clients, quotes, company story, warranty terms and manufacturing details.
- Use 555-01XX phone numbers, `example.com` rep emails and an invalid `00000` ZIP code, so that nothing can reach a real business.
- Replace the 66 real representatives with 20 fictional ones.
- Remove the Google map, social media links, press and awards lists, and links to the company's website.
- Send form emails from Resend's test sender instead of the company's domain. Set `EMAIL_FROM` to use a verified domain.
- Point canonical URLs and the sitemap at the Vercel URL. Set `NEXT_PUBLIC_SITE_URL` to override it.
- Add a footer note saying that the site's names, contact details and projects are fictional.

### Added

- Pages: Manufacturing, Sustainability, Careers, Warranty, FAQs, Privacy Policy, Terms of Use and Accessibility.
- Custom 404 and error pages, `sitemap.xml`, `robots.txt`, a favicon and per-page titles, descriptions and canonical URLs.
- Admin draft preview at `/admin/blog/[id]/preview`.
- Security headers, including a Content Security Policy in production.
- `.env.example` and an `npm run typecheck` script.

### Changed

- Redesign the site with a new palette, Cormorant Garamond headings, new layouts and reduced-motion support.
- Rewrite the 6 journal articles, which previously held placeholder text.
- Replace the broken coverage map with a state tile grid that filters representatives.
- Replace the products sidebar with category filters. Price sorting stays, and the price slider is removed.
- Render product and article pages on the server. Unknown URLs now return a real 404.
- Show drafts in the admin only. The public journal reads from `data/blog.ts`.

### Fixed

- Forms reported success when an email failed to send. They now show an error, and the enquiry is sent before the visitor's confirmation.
- Admin login could be bypassed by editing `localStorage`. Access is now checked on the server with a signed, httpOnly cookie.
- Admin create and edit pages redirected logged-in users away.
- 22 broken footer links, and broken images on the About, Journal and article pages.
- Fonts were not applied, because the CSS used the wrong font names.
- "Explore Collections", "Watch Video" and other buttons did nothing.
- "Link copied" and draft-saved messages never appeared.
- Article dates could show the wrong day depending on the visitor's time zone.
- Pages overflowed sideways on phones.
- Empty optional env vars could break the build and enquiry delivery.

### Security

- Remove the hardcoded admin passwords. Login is disabled until `ADMIN_CREDENTIALS_USERNAME` and `ADMIN_CREDENTIALS_PASSWORD` are set.
- Rate-limit logins and form submissions.
- Validate form input, escape it in emails, add a spam honeypot, and remove visitor text from confirmation emails.

### Removed

- Unused `calendar`, `chart` and `resizable` UI components and their packages.
- `npm audit fix --force` from the npm scripts.
- The `lint` script, because `typescript-eslint` doesn't support TypeScript 7 yet.
- "Find Nearest Location", and TikTok and WhatsApp sharing.
- `styles/globals.css` and the old US map components.

### Known issues

- Admin drafts are saved in the browser only. Publishing from the admin needs a database.
- Rate limits are per server instance, so they slow abuse but aren't a hard limit.
- `.env.local` and `.next/` are tracked in git. Remove them from tracking and rotate the secrets.
- Newsletter signups are emailed to the site owner but not stored in a subscriber list.
- Real email delivery hasn't been tested.
