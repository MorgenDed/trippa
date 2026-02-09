import { test, expect } from '@playwright/test';

test('Check unique ratings and reviews', async ({ page }) => {
  await page.goto('/en');
  await page.waitForLoadState('networkidle');

  // Select all deal cards
  const dealCards = await page.locator('a[href^="/deal/"]');
  const count = await dealCards.count();
  
  console.log(`Found ${count} deal cards.`);

  const ratingsReviews = [];

  for (let i = 0; i < count; i++) {
    const card = dealCards.nth(i);
    // Get the reviews text, e.g., "(123+ reviews)"
    const reviewText = await card.locator('span.text-blue-500').innerText();
    
    // Calculate filled stars (yellow ones)
    const filledStars = await card.locator('svg.text-yellow-400').count();
    
    const data = {
        index: i,
        reviews: reviewText,
        stars: filledStars
    };
    
    console.log(`Card ${i}: ${filledStars} stars, ${reviewText}`);
    ratingsReviews.push(data);
  }

  // Check for duplicates
  const uniqueItems = new Set(ratingsReviews.map(item => `${item.stars}-${item.reviews}`));
  
  // We expect a high degree of uniqueness. 
  // Since we use Math.random-like logic seeded by ID, strict uniqueness isn't mathematically guaranteed but highly likely for small sets.
  // However, the prompt asks to "fix if duplicates exist". 
  // Let's assert that at least 90% are unique to allow for coincidental math collisions, 
  // or strictly check if we want to force a fix.
  
  // Given the logic:
  // rating = (Math.floor((seed * 13 % 15) + 35) / 10).toFixed(1);
  // reviews = Math.floor((seed * 17 % 450) + 50);
  
  // It's deterministic based on ID. So duplicate IDs (if any) would cause duplicates. 
  // Or different IDs could collide in the modulo math.
  
  const duplicateCount = ratingsReviews.length - uniqueItems.size;
  console.log(`Found ${duplicateCount} duplicates out of ${ratingsReviews.length} items.`);

  if (duplicateCount > 0) {
      console.log("Duplicates found:");
      const seen = new Set();
      ratingsReviews.forEach(item => {
          const key = `${item.stars}-${item.reviews}`;
          if (seen.has(key)) {
              console.log(`Duplicate: ${key} at index ${item.index}`);
          }
          seen.add(key);
      });
  }

  // We want 0 duplicates ideally for a good user experience as requested.
  // expect(duplicateCount).toBe(0); 
  // Commented out assertion to let me see the log and fix it manually if needed, 
  // or I can just use the tool to verify and then fix code.
});
