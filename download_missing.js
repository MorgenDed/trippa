
const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { url: "https://images.unsplash.com/photo-1574457494488-824050d51020?w=800&q=80", name: "drift-course.jpg" },
    { url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80", name: "cinema.jpg" },
    { url: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80", name: "casino.jpg" }
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
    console.log('Downloading missing images...');
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
