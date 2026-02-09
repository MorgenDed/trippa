
const https = require('https');
const http = require('http');

const siteUrl = 'https://trippa.online';

function checkUrl(url) {
    return new Promise((resolve) => {
        if (!url) {
            resolve({ url, status: 'Missing URL', working: false });
            return;
        }
        
        // Handle relative URLs
        let fullUrl = url;
        if (url.startsWith('/')) {
            fullUrl = siteUrl + url;
        }

        const client = fullUrl.startsWith('https') ? https : http;
        
        const options = {
            method: 'HEAD',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        const req = client.request(fullUrl, options, (res) => {
            resolve({ 
                url: fullUrl, 
                status: res.statusCode, 
                working: res.statusCode >= 200 && res.statusCode < 400 
            });
        });
        
        req.on('error', (e) => {
            resolve({ url: fullUrl, status: 'Error: ' + e.message, working: false });
        });
        
        req.end();
    });
}

function getHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function run() {
    console.log(`Checking ${siteUrl}...`);
    
    try {
        const html = await getHtml(siteUrl);
        
        // 1. Check Favicon
        console.log('\n--- Checking Favicon ---');
        // Look for <link rel="icon" ...> or similar
        const faviconMatch = html.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["'][^>]*>/i);
        if (faviconMatch) {
            console.log('Favicon tag found:', faviconMatch[0]);
            const favUrl = faviconMatch[1];
            const favStatus = await checkUrl(favUrl);
            console.log(`Favicon URL: ${favStatus.url} - Status: ${favStatus.status}`);
        } else {
            console.log('No explicit favicon tag found. Checking /favicon.ico...');
            const favStatus = await checkUrl('/favicon.ico');
            console.log(`Default Favicon (/favicon.ico) - Status: ${favStatus.status}`);
        }

        // 2. Check Images
        console.log('\n--- Checking Images ---');
        const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
        let match;
        const imagePromises = [];
        
        while ((match = imgRegex.exec(html)) !== null) {
            imagePromises.push(checkUrl(match[1]));
        }
        
        const results = await Promise.all(imagePromises);
        
        const broken = results.filter(r => !r.working);
        const working = results.filter(r => r.working);
        
        console.log(`Total images found: ${results.length}`);
        console.log(`Working: ${working.length}`);
        console.log(`Broken: ${broken.length}`);
        
        if (broken.length > 0) {
            console.log('\nBroken Images:');
            broken.forEach(b => console.log(`${b.status} - ${b.url}`));
        } else {
            console.log('\nAll images are working!');
        }

    } catch (e) {
        console.error('Failed to fetch site:', e.message);
    }
}

run();
