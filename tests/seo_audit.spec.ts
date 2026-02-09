import { test, expect } from '@playwright/test';

test.describe('SEO & Google Ads Audit', () => {
  const baseUrl = 'http://localhost:3000';
  const pagesToTest = [
    { type: 'Home', path: '/en' },
    { type: 'Category', path: '/en/category/day-trips' }, // Assuming this exists
    { type: 'Product', path: '/en/deal/101' } // Assuming this exists
  ];

  test('1. Technical SEO Basics', async ({ request }) => {
    // Robots.txt
    const robots = await request.get(`${baseUrl}/robots.txt`);
    console.log(`[SEO] robots.txt status: ${robots.status()}`);
    if (robots.status() !== 200) console.log('! CRITICAL: robots.txt is missing');

    // Sitemap.xml
    const sitemap = await request.get(`${baseUrl}/sitemap.xml`);
    console.log(`[SEO] sitemap.xml status: ${sitemap.status()}`);
    if (sitemap.status() !== 200) console.log('! CRITICAL: sitemap.xml is missing');
  });

  for (const pageInfo of pagesToTest) {
    test(`2. Page Audit: ${pageInfo.type} (${pageInfo.path})`, async ({ page }) => {
      await page.goto(pageInfo.path);
      await page.waitForLoadState('domcontentloaded');

      // --- SEO Checks ---
      
      // Meta Title
      const title = await page.title();
      const titleLength = title.length;
      console.log(`[${pageInfo.type}] Title: "${title}" (Length: ${titleLength})`);
      if (titleLength < 30 || titleLength > 60) console.log(`! WARNING: Title length ideal is 30-60 chars.`);
      if (!title.toLowerCase().includes('trippa')) console.log(`! WARNING: Brand name missing in title.`);

      // Meta Description
      const description = await page.locator('meta[name="description"]').getAttribute('content').catch(() => null);
      console.log(`[${pageInfo.type}] Meta Description: "${description}"`);
      if (!description) console.log(`! CRITICAL: Meta description missing.`);
      else if (description.length < 50 || description.length > 160) console.log(`! WARNING: Description length ideal is 50-160 chars.`);

      // H1 Tag
      const h1Count = await page.locator('h1').count();
      console.log(`[${pageInfo.type}] H1 count: ${h1Count}`);
      if (h1Count === 0) console.log(`! CRITICAL: No H1 tag found.`);
      if (h1Count > 1) console.log(`! WARNING: Multiple H1 tags found.`);
      if (h1Count === 1) console.log(`[${pageInfo.type}] H1 Content: "${await page.locator('h1').innerText()}"`);

      // Viewport (Mobile)
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content').catch(() => null);
      if (!viewport || !viewport.includes('width=device-width')) console.log(`! CRITICAL: Mobile viewport tag missing or incorrect.`);

      // Canonical
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href').catch(() => null);
      if (!canonical) console.log(`! WARNING: Canonical tag missing.`);

      // Schema.org
      const schemaCount = await page.locator('script[type="application/ld+json"]').count();
      console.log(`[${pageInfo.type}] Schema.org scripts found: ${schemaCount}`);

      // Images Alt
      const imagesWithoutAlt = await page.locator('img:not([alt])').count();
      if (imagesWithoutAlt > 0) console.log(`! WARNING: ${imagesWithoutAlt} images missing alt text.`);

      // --- Google Ads Checks ---
      
      // Footer / Legal Links (Only check on Home for brevity, but applies globally)
      if (pageInfo.type === 'Home') {
         const footerText = await page.locator('footer').innerText();
         const hasPrivacy = footerText.toLowerCase().includes('privacy') || await page.locator('a[href*="privacy"]').count() > 0;
         const hasTerms = footerText.toLowerCase().includes('terms') || footerText.toLowerCase().includes('voorwaarden') || await page.locator('a[href*="terms"]').count() > 0;
         const hasContact = footerText.toLowerCase().includes('contact') || await page.locator('a[href*="contact"]').count() > 0;

         console.log(`[Ads] Privacy Policy found: ${hasPrivacy}`);
         console.log(`[Ads] Terms & Conditions found: ${hasTerms}`);
         console.log(`[Ads] Contact info found: ${hasContact}`);

         if (!hasPrivacy) console.log('! CRITICAL (Ads): Privacy Policy link missing.');
         if (!hasTerms) console.log('! CRITICAL (Ads): Terms & Conditions link missing.');
         if (!hasContact) console.log('! CRITICAL (Ads): Contact link missing.');
      }
    });
  }

  test('3. Core Web Vitals (Simulation)', async ({ page }) => {
      await page.goto('/en');
      
      // Basic CLS check simulation (looking for layout shifts - strictly simplified)
      // Playwright CDPSession can be used for real metrics, but for now we look for obvious visual stability
      // Just logging that page loaded without error is a baseline.
      console.log('[CWV] Homepage loaded successfully. Manual Check recommended for LCP/CLS with PageSpeed Insights.');
  });
});
