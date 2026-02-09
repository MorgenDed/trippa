
const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    // Workshops
    { url: "https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?w=800&q=80", name: "vaarbewijs.jpg" },
    { url: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80", name: "golf-course.jpg" },
    { url: "https://images.unsplash.com/photo-1552155634-315f6068222d?w=800&q=80", name: "drift-course.jpg" },
    { url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", name: "photo-course.jpg" },

    // Auto
    { url: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80", name: "carwash-bp.jpg" },
    { url: "https://images.unsplash.com/photo-1605218427368-35b8612809d3?w=800&q=80", name: "car-interior.jpg" },
    { url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80", name: "ski-store.jpg" },
    { url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80", name: "car-wax.jpg" },

    // Night Out
    { url: "https://images.unsplash.com/photo-1517604931442-710c8ed63fe9?w=800&q=80", name: "cinema.jpg" },
    { url: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=800&q=80", name: "pathe-thuis.jpg" },
    { url: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80", name: "comedy-club.jpg" },
    { url: "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=800&q=80", name: "casino.jpg" },

    // Hotels
    { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", name: "hotel-moment.jpg" },
    { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", name: "fletcher.jpg" },
    { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80", name: "preston-palace.jpg" },
    { url: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80", name: "roompot.jpg" },

    // Products
    { url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80", name: "wine-box.jpg" },
    { url: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&q=80", name: "wine-tasting.jpg" },
    { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80", name: "canvas-print.jpg" },
    { url: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80", name: "socks.jpg" }
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
    console.log('Starting downloads...');
    for (const img of images) {
        try {
            await downloadImage(img.url, img.name);
        } catch (e) {
            console.error(e.message);
        }
    }
    console.log('All done!');
}

run();
