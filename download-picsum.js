const https = require('https');
const fs = require('fs');
const path = require('path');

const foods = ['apple', 'banana', 'orange', 'broccoli', 'tomato'];
const OUTPUT_DIR = path.join(__dirname, 'public', 'food-images');

function download(food, seed) {
  return new Promise((resolve) => {
    const file = path.join(OUTPUT_DIR, food + '.jpg');
    if (fs.existsSync(file)) {
      console.log(`Existe: ${food}`);
      resolve();
      return;
    }

    const url = `https://picsum.photos/seed/${seed}/400/400`;
    console.log(`Téléchargement: ${food}...`);
    
    https.get(url, (res) => {
      const stream = fs.createWriteStream(file);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        console.log(`✅ OK: ${food}`);
        setTimeout(resolve, 500);
      });
    }).on('error', (err) => { console.log(`Erreur: ${err.message}`); resolve(); });
  });
}

async function run() {
  for (let i = 0; i < foods.length; i++) {
    await download(foods[i], `food-${foods[i]}`);
  }
  console.log('Terminé!');
}

run();