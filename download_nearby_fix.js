
const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { url: "https://images.unsplash.com/photo-1596726569181-7f71128c6423?w=800&q=80", name: "bowling.jpg" },
    { url: "https://images.unsplash.com/photo-1505521377774-103a8cc49715?w=800&q=80", name: "karting.jpg" },
    { url: "https://images.unsplash.com/photo-1529895088232-e0c504d60375?w=800&q=80", name: "trampoline.jpg" }
];

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const dest = path.join(__dirname, 'public', 'images', 'deals', filename);
        const file = fs.createWriteStream(dest);
        
        const request = https.get(url, function(response) {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', function() {
                file.close(() => {
                    console.log(`Downloaded ${filename}`);
                    resolve();
                });
            });
        });
        
        request.on('error', function(err) {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

async function run() {
    console.log('Downloading missing nearby images...');
    for (const img of images) {
        try {
            await downloadImage(img.url, img.name);
        } catch (e) {
            console.error(e.message);
        }
    }
    console.log('Done!');
}

run();
