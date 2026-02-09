
const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80";
const dest = path.join(__dirname, 'public', 'images', 'deals', 'car-interior.jpg');

const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => console.log('Downloaded car-interior.jpg'));
  });
}).on('error', function(err) {
  fs.unlink(dest);
  console.error('Error:', err.message);
});
