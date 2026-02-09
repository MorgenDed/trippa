
const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://www.tripper.nl/assets/img/favicon/apple-icon-180x180.png";
const destIcon = path.join(__dirname, 'public', 'favicon.ico');
const destApple = path.join(__dirname, 'public', 'apple-touch-icon.png');
// Also update the source-logo.png which might be used elsewhere
const destLogo = path.join(__dirname, 'public', 'source-logo.png');

const download = (dest) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(() => console.log('Downloaded to ' + dest));
      });
    });
};

download(destIcon);
download(destApple);
download(destLogo);
