
const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80";
const dest = path.join(__dirname, 'public', 'images', 'deals', 'drift-course.jpg');

const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => console.log('Downloaded drift-course.jpg'));
  });
}).on('error', function(err) {
  fs.unlink(dest);
  console.error('Error:', err.message);
});
