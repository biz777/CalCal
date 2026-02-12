const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 't2aKBeOHHyyl7tLbr37n5zxOjt7pcmhphVUOfwp2j9ly9Ha09oL2xUv8';
const OUTPUT_DIR = path.join(__dirname, 'public', 'food-images');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Liste des aliments prioritaires avec leurs termes de recherche
const foods = [
  { id: 'cod', search: 'cod fish' },
  { id: 'sardines_canned', search: 'sardines' },
  { id: 'tuna_fresh', search: 'tuna steak' },
  { id: 'trout', search: 'trout fish' },
  { id: 'sea_bass', search: 'sea bass' },
  { id: 'broccoli', search: 'broccoli' },
  { id: 'spinach', search: 'spinach' },
  { id: 'tomato', search: 'tomato' },
  { id: 'cucumber', search: 'cucumber' },
  { id: 'carrot', search: 'carrot' },
  { id: 'bell_pepper', search: 'bell pepper' },
  { id: 'zucchini', search: 'zucchini' },
  { id: 'eggplant', search: 'eggplant' },
  { id: 'lettuce', search: 'lettuce' },
  { id: 'onion', search: 'onion' },
  { id: 'garlic', search: 'garlic' },
  { id: 'mushrooms', search: 'mushrooms' },
  { id: 'cauliflower', search: 'cauliflower' },
  { id: 'green_beans', search: 'green beans' },
  { id: 'peas', search: 'peas' },
  { id: 'corn', search: 'corn' },
  { id: 'asparagus', search: 'asparagus' },
  { id: 'potato', search: 'potato' },
  { id: 'sweet_potato', search: 'sweet potato' },
  { id: 'avocado', search: 'avocado' },
  { id: 'apple', search: 'apple' },
  { id: 'banana', search: 'banana' },
  { id: 'orange', search: 'orange' },
  { id: 'strawberries', search: 'strawberries' },
  { id: 'grapes', search: 'grapes' },
  { id: 'kiwi', search: 'kiwi fruit' },
  { id: 'mango', search: 'mango' },
  { id: 'pineapple', search: 'pineapple' },
  { id: 'watermelon', search: 'watermelon' },
  { id: 'blueberries', search: 'blueberries' },
  { id: 'raspberries', search: 'raspberries' },
  { id: 'lemon', search: 'lemon' },
  { id: 'yogurt_plain_0_fat', search: 'yogurt bowl' },
  { id: 'greek_yogurt_0_fat', search: 'greek yogurt' },
  { id: 'vanilla_ice_cream', search: 'vanilla ice cream' },
  { id: 'dark_chocolate_70', search: 'dark chocolate' },
  { id: 'milk_chocolate', search: 'chocolate bar' },
  { id: 'cookie', search: 'chocolate chip cookie' },
  { id: 'water', search: 'water glass' },
  { id: 'orange_juice', search: 'orange juice' },
  { id: 'whole_milk', search: 'milk glass' },
  { id: 'coffee_black', search: 'black coffee' },
  { id: 'tea_unsweetened', search: 'tea cup' },
  { id: 'white_rice', search: 'white rice' },
  { id: 'brown_rice', search: 'brown rice' },
  { id: 'pasta', search: 'pasta' },
  { id: 'white_bread', search: 'bread' },
  { id: 'quinoa', search: 'quinoa' },
  { id: 'oats', search: 'oatmeal' },
  { id: 'almonds', search: 'almonds' },
  { id: 'walnuts', search: 'walnuts' },
  { id: 'peanut_butter', search: 'peanut butter' },
  { id: 'olive_oil', search: 'olive oil' },
  { id: 'butter', search: 'butter' }
];

function searchPexels(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.pexels.com',
      path: `/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      headers: {
        'Authorization': API_KEY
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.photos && json.photos.length > 0) {
            resolve(json.photos[0].src.medium); // URL de l'image
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const stream = fs.createWriteStream(filepath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve();
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function downloadAll() {
  console.log(`\n🚀 Début du téléchargement de ${foods.length} images via Pexels...\n`);
  
  let downloaded = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < foods.length; i++) {
    const food = foods[i];
    const filepath = path.join(OUTPUT_DIR, `${food.id}.jpg`);

    if (fs.existsSync(filepath)) {
      console.log(`[${i+1}/${foods.length}] ⏭️  Existe déjà: ${food.id}`);
      skipped++;
      continue;
    }

    try {
      console.log(`[${i+1}/${foods.length}] 🔍 Recherche: ${food.search}...`);
      const imageUrl = await searchPexels(food.search);
      
      if (imageUrl) {
        await downloadImage(imageUrl, filepath);
        console.log(`[${i+1}/${foods.length}] ✅ Téléchargé: ${food.id}`);
        downloaded++;
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause 1s
      } else {
        console.log(`[${i+1}/${foods.length}] ❌ Pas d'image trouvée: ${food.id}`);
        errors++;
      }
    } catch (error) {
      console.log(`[${i+1}/${foods.length}] ❌ Erreur: ${food.id} - ${error.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ TERMINÉ !');
  console.log('='.repeat(50));
  console.log(`📥 Téléchargées: ${downloaded}`);
  console.log(`⏭️  Déjà présentes: ${skipped}`);
  console.log(`❌ Erreurs: ${errors}`);
  console.log(`📁 Dossier: ${OUTPUT_DIR}`);
  console.log('='.repeat(50));
}

downloadAll();