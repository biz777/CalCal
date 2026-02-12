const https = require('https');
const fs = require('fs');
const path = require('path');

const foods = [
  'cod', 'sardines_canned', 'salmon_fresh', 'smoked_salmon', 'tuna_canned_in_water', 
  'tuna_fresh', 'trout', 'sea_bass', 'sea_bream', 'sole', 'mackerel', 'herring',
  'broccoli', 'spinach', 'tomato', 'cucumber', 'carrot', 'bell_pepper', 'zucchini',
  'eggplant', 'lettuce', 'onion', 'garlic', 'mushrooms', 'cauliflower', 'green_beans',
  'peas', 'corn', 'asparagus', 'celery', 'leek', 'radish', 'cabbage', 'brussels_sprouts',
  'artichoke', 'beetroot', 'turnip', 'pumpkin', 'sweet_potato', 'kale', 'arugula', 'potato',
  'apple', 'pear', 'banana', 'orange', 'strawberries', 'grapes', 'kiwi', 'mango',
  'pineapple', 'watermelon', 'melon', 'peach', 'nectarine', 'plum', 'apricot', 'cherry',
  'blueberries', 'raspberries', 'blackberries', 'lemon', 'lime', 'grapefruit', 'pomegranate',
  'yogurt_plain_0_fat', 'greek_yogurt_0_fat', 'cottage_cheese_0_fat', 'vanilla_ice_cream',
  'dark_chocolate_70', 'milk_chocolate', 'cookie', 'brownie',
  'water', 'coca_cola', 'orange_juice', 'whole_milk', 'coffee_black', 'tea_unsweetened',
  'plain_cereal', 'muesli', 'oats', 'croissant', 'brioche', 'jam', 'honey',
  'white_rice', 'brown_rice', 'pasta', 'white_bread', 'quinoa', 'couscous',
  'emmental', 'camembert', 'mozzarella', 'parmesan', 'feta', 'brie',
  'olive_oil', 'butter', 'almonds', 'walnuts', 'cashews', 'peanuts', 'peanut_butter'
];

const OUTPUT_DIR = path.join(__dirname, 'public', 'food-images');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function download(food, i) {
  return new Promise((resolve) => {
    const file = path.join(OUTPUT_DIR, food + '.jpg');
    if (fs.existsSync(file)) {
      console.log(`[${i+1}/${foods.length}] Existe: ${food}`);
      resolve();
      return;
    }

    const query = food.replace(/_/g, ' ');
    const url = `https://source.unsplash.com/400x400/?${query},food`;
    
    console.log(`[${i+1}/${foods.length}] Téléchargement: ${food}...`);
    
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (imgRes) => {
          const stream = fs.createWriteStream(file);
          imgRes.pipe(stream);
          stream.on('finish', () => {
            stream.close();
            console.log(`[${i+1}/${foods.length}] OK: ${food}`);
            setTimeout(resolve, 1200);
          });
        }).on('error', () => { console.log(`ERREUR: ${food}`); resolve(); });
      }
    }).on('error', () => { console.log(`ERREUR: ${food}`); resolve(); });
  });
}

async function downloadAll() {
  console.log(`\nDébut téléchargement de ${foods.length} images...\n`);
  for (let i = 0; i < foods.length; i++) {
    await download(foods[i], i);
  }
  console.log('\n✅ TERMINÉ!\n');
}

downloadAll();