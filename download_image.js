
const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://images.trvl-media.com/lodging/117000000/116590000/116587300/116587288/cf2b0dd0.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill";
const dest = path.join(__dirname, 'public', 'images', 'deals', 'thermen-berendonck.jpg');

const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => console.log('Download completed'));
  });
}).on('error', function(err) {
  fs.unlink(dest);
  console.error('Error downloading image:', err.message);
});
