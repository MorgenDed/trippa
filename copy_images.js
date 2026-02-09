
const fs = require('fs');
const path = require('path');

const copyFile = (source, target) => {
    const srcPath = path.join(__dirname, 'public', 'images', 'deals', source);
    const destPath = path.join(__dirname, 'public', 'images', 'deals', target);
    
    // Check if source exists
    if (!fs.existsSync(srcPath)) {
        console.error(`Source file not found: ${source}`);
        return;
    }

    fs.copyFile(srcPath, destPath, (err) => {
        if (err) throw err;
        console.log(`${source} -> ${target}`);
    });
};

// Map existing images to new ones for "Nearby" category
copyFile('casino.jpg', 'bowling.jpg');
copyFile('drift-course.jpg', 'karting.jpg');
copyFile('ski-store.jpg', 'trampoline.jpg');
copyFile('photo-course.jpg', 'lasergame.jpg');
copyFile('cinema.jpg', 'escaperoom.jpg');
