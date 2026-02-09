
const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { url: "https://images.unsplash.com/photo-1538515535564-96798150a006?w=800&q=80", name: "bowling.jpg" },
    { url: "https://images.unsplash.com/photo-1574765706566-574f0c439343?w=800&q=80", name: "karting.jpg" },
    { url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80", name: "lasergame.jpg" },
    { url: "https://images.unsplash.com/photo-1536480527376-7871b69512d7?w=800&q=80", name: "trampoline.jpg" },
    { url: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=800&q=80", name: "escaperoom.jpg" }
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
    console.log('Downloading nearby images...');
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
