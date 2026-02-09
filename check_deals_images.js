
const https = require('https');

const categoryDeals = {
  'day-trips': [
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Efteling_The_House_of_the_Five_Senses.jpg/1280px-Efteling_The_House_of_the_Five_Senses.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Themenwelt_Berlin.jpg/1280px-Themenwelt_Berlin.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Movie_Park_Germany_Entrance.jpg/1280px-Movie_Park_Germany_Entrance.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Entrance_to_the_Dolfinarium_Harderwijk.JPG/1280px-Entrance_to_the_Dolfinarium_Harderwijk.JPG" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Legoland_Deutschland.jpg/1280px-Legoland_Deutschland.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Sea_Lion_and_Keeper_at_the_Welsh_Mountain_Zoo_-_geograph.org.uk_-_4684996.jpg/1280px-Sea_Lion_and_Keeper_at_the_Welsh_Mountain_Zoo_-_geograph.org.uk_-_4684996.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Lemur_catta_001.jpg/1280px-Lemur_catta_001.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Attractiepark_Slagharen_Kettenkarussell.jpg" }
  ],
  'sauna': [
    { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sauna_Heuvelrug_-_panoramio.jpg/1280px-Sauna_Heuvelrug_-_panoramio.jpg" },
    { image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Amsterdamse-bos-heuvel.jpg/1280px-Amsterdamse-bos-heuvel.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Medicinal_spa_of_Hark%C3%A1ny.jpg/1280px-Medicinal_spa_of_Hark%C3%A1ny.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Valkenburg%2C_Grotestraat08.jpg/1280px-Valkenburg%2C_Grotestraat08.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Sauna_2.jpg/1280px-Sauna_2.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Wijchen%2C_kasteel_Wijchen_RM39629_foto7_2016-04-20_10.08.jpg/1280px-Wijchen%2C_kasteel_Wijchen_RM39629_foto7_2016-04-20_10.08.jpg" }
  ],
  'food': [
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Korean_BBQ.jpg/1280px-Korean_BBQ.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Ribs_and_Fries.jpg/1280px-Ribs_and_Fries.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/1280px-Eq_it-na_pizza-margherita_sep2005_sml.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Buffet_at_Prestige_Oceanfront_Resort_Sooke.jpg/1280px-Buffet_at_Prestige_Oceanfront_Resort_Sooke.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Table_setting_in_a_restaurant.jpg/1280px-Table_setting_in_a_restaurant.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Glazed-Donut.jpg/1280px-Glazed-Donut.jpg" }
  ],
  'museums': [
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/960px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Amsterdam_%28NL%29%2C_Anne-Frank-Huis_--_2015_--_7185.jpg/960px-Amsterdam_%28NL%29%2C_Anne-Frank-Huis_--_2015_--_7185.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Zwolle_-_Bonami_Spelcomputer_Museum_-_Game_Console_Museum.jpg/1280px-Zwolle_-_Bonami_Spelcomputer_Museum_-_Game_Console_Museum.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Museum_van_de_Twintigste_Eeuw_%282025%29.jpg/1280px-Museum_van_de_Twintigste_Eeuw_%282025%29.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rijksmonument-36180.jpg/960px-Rijksmonument-36180.jpg" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Imagen_de_los_canales_conc%C3%A9ntricos_en_%C3%81msterdam.png/960px-Imagen_de_los_canales_conc%C3%A9ntricos_en_%C3%81msterdam.png" }
  ]
};

async function checkUrl(url) {
    return new Promise((resolve) => {
        const options = {
            method: 'HEAD',
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        };
        const req = https.request(url, options, (res) => {
            resolve({ url, status: res.statusCode });
        });
        req.on('error', (e) => resolve({ url, status: 'Error: ' + e.message }));
        req.end();
    });
}

async function run() {
    let allUrls = [];
    for (const cat in categoryDeals) {
        allUrls = allUrls.concat(categoryDeals[cat].map(d => d.image));
    }
    
    console.log(`Checking ${allUrls.length} images...`);
    
    for (const url of allUrls) {
        const res = await checkUrl(url);
        if (res.status !== 200) {
            console.log(`BROKEN: ${res.status} - ${res.url}`);
        } else {
            // console.log(`OK: ${res.url}`);
        }
    }
    console.log('Done.');
}

run();
