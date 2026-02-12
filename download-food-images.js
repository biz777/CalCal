const https = require('https');
const fs = require('fs');
const path = require('path');

const foodItems = [
  { id: 'cod', search: 'cod fish fillet' },
  { id: 'sardines_canned', search: 'sardines can' },
  { id: 'salmon_fresh', search: 'fresh salmon fillet' },
  { id: 'trout', search: 'trout fish' },
  { id: 'broccoli', search: 'fresh broccoli' },
  { id: 'spinach', search: 'fresh spinach leaves' },
  { id: 'tomato', search: 'fresh tomato' },
  { id: 'apple', search: 'red apple fruit' },
  { id: 'banana', search: 'banana fruit' },
  { id: 'orange', search: 'orange fruit' },
];

const OUTPUT_DIR = path.join(__dirname, 'public', 'food-images');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function downloadAll() {
  console.log('Debut du telechargement...');
  for (let i = 0; i < foodItems.length; i++) {
    const item = foodItems[i];
    const filepath = path.join(OUTPUT_DIR, item.id + '.jpg');
    if (fs.existsSync(filepath)) { console.log('Existe: ' + item.id); continue; }
    console.log('Telechargement: ' + item.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  console.log('Termine!');
}
downloadAll();
