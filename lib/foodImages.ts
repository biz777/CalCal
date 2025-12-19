/**
 * Food Images Database - Version Images Locales
 * 
 * Ce fichier contient les chemins vers les images locales stockées dans public/food-images/
 * 
 * INSTRUCTIONS :
 * 1. Télécharge les images que tu veux sur ton PC
 * 2. Renomme-les selon l'ID de l'aliment (ex: chicken_breast_skinless.jpg)
 * 3. Place-les dans le dossier public/food-images/
 * 4. L'app affichera automatiquement les images disponibles
 * 
 * FORMAT DES NOMS DE FICHIERS :
 * - Utilise l'ID exact (colonne de gauche)
 * - Extensions acceptées : .jpg, .jpeg, .png, .webp
 * - Exemple : "chicken_breast_skinless.jpg"
 * 
 * CONSEILS :
 * - Pas besoin de tout faire d'un coup !
 * - Commence par les aliments que tu utilises le plus
 * - Les images manquantes afficheront un placeholder automatique
 * - Taille recommandée : 400x400px minimum
 * - Format recommandé : JPG (meilleur compromis qualité/poids)
 */

export interface FoodImage {
  id: string
  imagePath: string
}

// Map des images par ID d'aliment
// Le chemin est relatif au dossier public/
export const foodImages: Record<string, string> = {
  // ============= MEAT & EGGS =============
  "chicken_breast_skinless": "/food-images/chicken_breast_skinless.jpg",
  "chicken_thigh_with_skin": "/food-images/chicken_thigh_with_skin.jpg",
  "turkey_breast": "/food-images/turkey_breast.jpg",
  "beef_ground_5": "/food-images/beef_ground_5.jpg",
  "beef_ground_15": "/food-images/beef_ground_15.jpg",
  "beef_ribeye_steak": "/food-images/beef_ribeye_steak.jpg",
  "pork_chop": "/food-images/pork_chop.jpg",
  "ham_cooked": "/food-images/ham_cooked.jpg",
  "ham_cured": "/food-images/ham_cured.jpg",
  "sausage_pork": "/food-images/sausage_pork.jpg",
  "egg_whole": "/food-images/egg_whole.jpg",
  "egg_white": "/food-images/egg_white.jpg",
  "bacon": "/food-images/bacon.jpg",

  // ============= FISH & SEAFOOD =============
  "salmon_fresh": "/food-images/salmon_fresh.jpg",
  "smoked_salmon": "/food-images/smoked_salmon.jpg",
  "tuna_canned_in_water": "/food-images/tuna_canned_in_water.jpg",
  "tuna_fresh": "/food-images/tuna_fresh.jpg",
  "cod": "/food-images/cod.jpg",
  "sardines_canned": "/food-images/sardines_canned.jpg",
  "shrimp": "/food-images/shrimp.webp",
  "mussels": "/food-images/mussels.jpeg",

  // ============= VEGETABLES =============
  "broccoli": "/food-images/broccoli.jpg",
  "spinach": "/food-images/spinach.jpg",
  "tomato": "/food-images/tomato.jpg",
  "cucumber": "/food-images/cucumber.jpg",
  "carrot": "/food-images/carrot.jpg",
  "bell_pepper": "/food-images/bell_pepper.jpg",
  "zucchini": "/food-images/zucchini.jpg",
  "eggplant": "/food-images/eggplant.jpg",
  "lettuce": "/food-images/lettuce.jpg",
  "onion": "/food-images/onion.jpg",
  "garlic": "/food-images/garlic.jpg",
  "mushrooms": "/food-images/mushrooms.jpg",
  "cauliflower": "/food-images/cauliflower.jpg",
  "green_beans": "/food-images/green_beans.jpg",
  "peas": "/food-images/peas.jpg",
  "corn": "/food-images/corn.jpg",
  "asparagus": "/food-images/asparagus.jpg",
  "celery": "/food-images/celery.jpg",
  "leek": "/food-images/leek.jpg",
  "radish": "/food-images/radish.jpg",
  "cabbage": "/food-images/cabbage.jpg",
  "brussels_sprouts": "/food-images/brussels_sprouts.jpg",
  "artichoke": "/food-images/artichoke.jpg",
  "beetroot": "/food-images/beetroot.jpg",
  "turnip": "/food-images/turnip.jpg",
  "pumpkin": "/food-images/pumpkin.jpg",
  "sweet_potato": "/food-images/sweet_potato.jpg",
  "kale": "/food-images/kale.jpg",
  "chard": "/food-images/chard.jpg",
  "arugula": "/food-images/arugula.jpg",
  "endive": "/food-images/endive.jpg",
  "watercress": "/food-images/watercress.jpg",

  // ============= FRUITS =============
  "apple": "/food-images/apple.jpg",
  "pear": "/food-images/pear.jpg",
  "banana": "/food-images/banana.jpg",
  "orange": "/food-images/orange.jpg",
  "strawberries": "/food-images/strawberries.jpg",
  "grapes": "/food-images/grapes.jpg",
  "kiwi": "/food-images/kiwi.jpg",
  "mango": "/food-images/mango.jpg",
  "pineapple": "/food-images/pineapple.jpg",
  "watermelon": "/food-images/watermelon.jpg",
  "melon": "/food-images/melon.jpg",
  "peach": "/food-images/peach.jpg",
  "nectarine": "/food-images/nectarine.jpg",
  "plum": "/food-images/plum.jpg",
  "apricot": "/food-images/apricot.jpg",
  "cherry": "/food-images/cherry.jpg",
  "blueberries": "/food-images/blueberries.jpg",
  "raspberries": "/food-images/raspberries.jpg",
  "blackberries": "/food-images/blackberries.jpg",
  "lemon": "/food-images/lemon.jpg",
  "lime": "/food-images/lime.jpg",
  "grapefruit": "/food-images/grapefruit.jpg",
  "pomegranate": "/food-images/pomegranate.jpg",
  "fig": "/food-images/fig.jpg",
  "date": "/food-images/date.jpg",
  "prune": "/food-images/prune.jpg",
  "raisin": "/food-images/raisin.jpg",
  "avocado": "/food-images/avocado.jpg",
  "coconut": "/food-images/coconut.jpg",
  "papaya": "/food-images/papaya.jpg",

  // ============= DESSERTS =============
  "yogurt_plain_0_fat": "/food-images/yogurt_plain_0_fat.jpg",
  "yogurt_plain_whole": "/food-images/yogurt_plain_whole.jpg",
  "greek_yogurt_0_fat": "/food-images/greek_yogurt_0_fat.jpg",
  "cottage_cheese_0_fat": "/food-images/cottage_cheese_0_fat.jpg",
  "cottage_cheese_20_fat": "/food-images/cottage_cheese_20_fat.jpg",
  "vanilla_ice_cream": "/food-images/vanilla_ice_cream.jpg",
  "dark_chocolate_70": "/food-images/dark_chocolate_70.jpg",
  "milk_chocolate": "/food-images/milk_chocolate.jpg",
  "cookie": "/food-images/cookie.jpg",
  "brownie": "/food-images/brownie.jpg",

  // ============= DRINKS =============
  "water": "/food-images/water.jpg",
  "coca_cola": "/food-images/coca_cola.jpg",
  "coca_cola_zero": "/food-images/coca_cola_zero.jpg",
  "orange_juice": "/food-images/orange_juice.jpg",
  "whole_milk": "/food-images/whole_milk.jpg",
  "semi_skimmed_milk": "/food-images/semi_skimmed_milk.jpg",
  "skimmed_milk": "/food-images/skimmed_milk.jpg",
  "coffee_black": "/food-images/coffee_black.jpg",
  "tea_unsweetened": "/food-images/tea_unsweetened.jpg",
  "beer": "/food-images/beer.jpg",
  "red_wine": "/food-images/red_wine.jpg",

  // ============= BREAKFAST & SNACKS =============
  "plain_cereal": "/food-images/plain_cereal.jpg",
  "muesli": "/food-images/muesli.jpg",
  "oats": "/food-images/oats.jpg",
  "croissant": "/food-images/croissant.jpg",
  "pain_au_chocolat": "/food-images/pain_au_chocolat.jpg",
  "brioche": "/food-images/brioche.jpg",
  "jam": "/food-images/jam.jpg",
  "honey": "/food-images/honey.jpg",
  "nutella": "/food-images/nutella.jpg",
  "granola_bar": "/food-images/granola_bar.jpg",

  // ============= ADDITIONAL MEAT & EGGS =============
  "chicken_wings": "/food-images/chicken_wings.jpg",
  "turkey_ground": "/food-images/turkey_ground.jpg",
  "duck_breast": "/food-images/duck_breast.jpg",
  "beef_sirloin": "/food-images/beef_sirloin.jpg",
  "beef_tenderloin": "/food-images/beef_tenderloin.jpg",
  "lamb_chop": "/food-images/lamb_chop.jpg",
  "lamb_leg": "/food-images/lamb_leg.jpg",
  "veal_cutlet": "/food-images/veal_cutlet.jpg",
  "pork_loin": "/food-images/pork_loin.jpg",
  "pork_ribs": "/food-images/pork_ribs.jpg",
  "salami": "/food-images/salami.jpg",
  "chorizo": "/food-images/chorizo.jpg",
  "pepperoni": "/food-images/pepperoni.jpg",
  "prosciutto": "/food-images/prosciutto.jpg",
  "turkey_sliced": "/food-images/turkey_sliced.jpg",
  "chicken_liver": "/food-images/chicken_liver.jpg",
  "foie_gras": "/food-images/foie_gras.jpg",
  "quail": "/food-images/quail.jpg",
  "rabbit": "/food-images/rabbit.jpg",
  "venison": "/food-images/venison.jpg",
  "egg_yolk": "/food-images/egg_yolk.jpg",
  "scrambled_eggs": "/food-images/scrambled_eggs.jpg",
  "omelet": "/food-images/omelet.jpg",
  "quiche": "/food-images/quiche.jpg",

  // ============= ADDITIONAL FISH & SEAFOOD =============
  "trout": "/food-images/trout.jpg",
  "sea_bass": "/food-images/sea_bass.jpg",
  "sea_bream": "/food-images/sea_bream.jpg",
  "sole": "/food-images/sole.jpg",
  "mackerel": "/food-images/mackerel.jpg",
  "herring": "/food-images/herring.jpg",
  "anchovy": "/food-images/anchovy.jpg",
  "haddock": "/food-images/haddock.jpg",
  "halibut": "/food-images/halibut.jpg",
  "swordfish": "/food-images/swordfish.jpg",
  "tilapia": "/food-images/tilapia.jpg",
  "catfish": "/food-images/catfish.jpg",
  "pike": "/food-images/pike.jpg",
  "carp": "/food-images/carp.jpg",
  "monkfish": "/food-images/monkfish.jpg",
  "squid": "/food-images/squid.jpg",
  "octopus": "/food-images/octopus.jpg",
  "cuttlefish": "/food-images/cuttlefish.jpg",
  "crab": "/food-images/crab.jpg",
  "lobster": "/food-images/lobster.jpg",
  "crawfish": "/food-images/crawfish.jpg",
  "oysters": "/food-images/oysters.jpg",
  "clams": "/food-images/clams.jpg",
  "scallops": "/food-images/scallops.jpg",
  "sea_urchin": "/food-images/sea_urchin.jpg",
  "caviar": "/food-images/caviar.jpg",
  "smoked_trout": "/food-images/smoked_trout.jpg",
  "smoked_herring": "/food-images/smoked_herring.jpg",
  "tuna_canned_in_oil": "/food-images/tuna_canned_in_oil.jpg",
  "fish_fingers": "/food-images/fish_fingers.jpg",

  // ============= ADDITIONAL VEGETABLES =============
  "potato": "/food-images/potato.jpg",
  "fennel": "/food-images/fennel.jpg",
  "parsnip": "/food-images/parsnip.jpg",
  "celeriac": "/food-images/celeriac.jpg",
  "salsify": "/food-images/salsify.jpg",
  "kohlrabi": "/food-images/kohlrabi.jpg",
  "radicchio": "/food-images/radicchio.jpg",
  "sorrel": "/food-images/sorrel.jpg",
  "dandelion_greens": "/food-images/dandelion_greens.jpg",
  "beet_greens": "/food-images/beet_greens.jpg",
  "mustard_greens": "/food-images/mustard_greens.jpg",
  "collard_greens": "/food-images/collard_greens.jpg",
  "okra": "/food-images/okra.jpg",
  "jicama": "/food-images/jicama.jpg",
  "chayote": "/food-images/chayote.jpg",
  "bamboo_shoots": "/food-images/bamboo_shoots.jpg",
  "bean_sprouts": "/food-images/bean_sprouts.jpg",
  "snow_peas": "/food-images/snow_peas.jpg",
  "snap_peas": "/food-images/snap_peas.jpg",
  "edamame": "/food-images/edamame.jpg",
  "green_pepper": "/food-images/green_pepper.jpg",
  "red_pepper": "/food-images/red_pepper.jpg",
  "yellow_pepper": "/food-images/yellow_pepper.jpg",
  "jalapeno": "/food-images/jalapeno.jpg",
  "chili_pepper": "/food-images/chili_pepper.jpg",
  "habanero": "/food-images/habanero.jpg",
  "ginger": "/food-images/ginger.jpg",
  "turmeric": "/food-images/turmeric.jpg",
  "horseradish": "/food-images/horseradish.jpg",
  "seaweed": "/food-images/seaweed.jpg",

  // ============= STARCHES & GRAINS =============
  "white_rice": "/food-images/white_rice.jpg",
  "brown_rice": "/food-images/brown_rice.jpg",
  "basmati_rice": "/food-images/basmati_rice.jpg",
  "wild_rice": "/food-images/wild_rice.jpg",
  "risotto_rice": "/food-images/risotto_rice.jpg",
  "pasta": "/food-images/pasta.jpg",
  "spaghetti": "/food-images/spaghetti.jpg",
  "penne": "/food-images/penne.jpg",
  "fusilli": "/food-images/fusilli.jpg",
  "tagliatelle": "/food-images/tagliatelle.jpg",
  "lasagna": "/food-images/lasagna.jpg",
  "ravioli": "/food-images/ravioli.jpg",
  "gnocchi": "/food-images/gnocchi.jpg",
  "white_bread": "/food-images/white_bread.jpg",
  "whole_wheat_bread": "/food-images/whole_wheat_bread.jpg",
  "sourdough_bread": "/food-images/sourdough_bread.jpg",
  "rye_bread": "/food-images/rye_bread.jpg",
  "baguette": "/food-images/baguette.jpg",
  "pita_bread": "/food-images/pita_bread.jpg",
  "naan": "/food-images/naan.jpg",
  "tortilla": "/food-images/tortilla.jpg",
  "bagel": "/food-images/bagel.jpg",
  "english_muffin": "/food-images/english_muffin.jpg",
  "croutons": "/food-images/croutons.jpg",
  "breadcrumbs": "/food-images/breadcrumbs.jpg",
  "quinoa": "/food-images/quinoa.jpg",
  "bulgur": "/food-images/bulgur.jpg",
  "couscous": "/food-images/couscous.jpg",
  "polenta": "/food-images/polenta.jpg",
  "barley": "/food-images/barley.jpg",
  "millet": "/food-images/millet.jpg",
  "buckwheat": "/food-images/buckwheat.jpg",
  "amaranth": "/food-images/amaranth.jpg",
  "spelt": "/food-images/spelt.jpg",
  "rye": "/food-images/rye.jpg",
  "semolina": "/food-images/semolina.jpg",
  "cornmeal": "/food-images/cornmeal.jpg",

  // ============= DAIRY =============
  "cheddar_cheese": "/food-images/cheddar_cheese.jpg",
  "mozzarella": "/food-images/mozzarella.jpg",
  "parmesan": "/food-images/parmesan.jpg",
  "gouda": "/food-images/gouda.jpg",
  "brie": "/food-images/brie.jpg",
  "camembert": "/food-images/camembert.jpg",
  "feta": "/food-images/feta.jpg",
  "goat_cheese": "/food-images/goat_cheese.jpg",
  "blue_cheese": "/food-images/blue_cheese.jpg",
  "emmental": "/food-images/emmental.jpg",
  "gruyere": "/food-images/gruyere.jpg",
  "roquefort": "/food-images/roquefort.jpg",
  "comte": "/food-images/comte.jpg",
  "reblochon": "/food-images/reblochon.jpg",
  "munster": "/food-images/munster.jpg",
  "raclette_cheese": "/food-images/raclette_cheese.jpg",
  "cream_cheese": "/food-images/cream_cheese.jpg",
  "mascarpone": "/food-images/mascarpone.jpg",
  "ricotta": "/food-images/ricotta.jpg",
  "burrata": "/food-images/burrata.jpg",
  "paneer": "/food-images/paneer.jpg",
  "halloumi": "/food-images/halloumi.jpg",
  "butter": "/food-images/butter.jpg",
  "margarine": "/food-images/margarine.jpg",
  "sour_cream": "/food-images/sour_cream.jpg",
  "creme_fraiche": "/food-images/creme_fraiche.jpg",
  "heavy_cream": "/food-images/heavy_cream.jpg",
  "whipped_cream": "/food-images/whipped_cream.jpg",

  // ============= NUTS & SEEDS =============
  "almonds": "/food-images/almonds.jpg",
  "walnuts": "/food-images/walnuts.jpg",
  "cashews": "/food-images/cashews.jpg",
  "pistachios": "/food-images/pistachios.jpg",
  "hazelnuts": "/food-images/hazelnuts.jpg",
  "pecans": "/food-images/pecans.jpg",
  "macadamia": "/food-images/macadamia.jpg",
  "brazil_nuts": "/food-images/brazil_nuts.jpg",
  "pine_nuts": "/food-images/pine_nuts.jpg",
  "chestnuts": "/food-images/chestnuts.jpg",
  "peanuts": "/food-images/peanuts.jpg",
  "peanut_butter": "/food-images/peanut_butter.jpg",
  "almond_butter": "/food-images/almond_butter.jpg",
  "sunflower_seeds": "/food-images/sunflower_seeds.jpg",
  "pumpkin_seeds": "/food-images/pumpkin_seeds.jpg",
  "chia_seeds": "/food-images/chia_seeds.jpg",
  "flax_seeds": "/food-images/flax_seeds.jpg",
  "sesame_seeds": "/food-images/sesame_seeds.jpg",
  "poppy_seeds": "/food-images/poppy_seeds.jpg",
  "hemp_seeds": "/food-images/hemp_seeds.jpg",

  // ============= OILS & FATS =============
  "olive_oil": "/food-images/olive_oil.jpg",
  "sunflower_oil": "/food-images/sunflower_oil.jpg",
  "canola_oil": "/food-images/canola_oil.jpg",
  "coconut_oil": "/food-images/coconut_oil.jpg",
  "sesame_oil": "/food-images/sesame_oil.jpg",
  "peanut_oil": "/food-images/peanut_oil.jpg",
  "avocado_oil": "/food-images/avocado_oil.jpg",
  "walnut_oil": "/food-images/walnut_oil.jpg",
  "grapeseed_oil": "/food-images/grapeseed_oil.jpg",
  "corn_oil": "/food-images/corn_oil.jpg",
  "soybean_oil": "/food-images/soybean_oil.jpg",
  "lard": "/food-images/lard.jpg",
  "duck_fat": "/food-images/duck_fat.jpg",
  "ghee": "/food-images/ghee.jpg",

  // ============= PREPARED FOODS =============
  "pizza_margherita": "/food-images/pizza_margherita.jpg",
  "pizza_pepperoni": "/food-images/pizza_pepperoni.jpg",
  "pizza_four_cheese": "/food-images/pizza_four_cheese.jpg",
  "hamburger": "/food-images/hamburger.jpg",
  "cheeseburger": "/food-images/cheeseburger.jpg",
  "hot_dog": "/food-images/hot_dog.jpg",
  "sandwich_ham_cheese": "/food-images/sandwich_ham_cheese.jpg",
  "sandwich_turkey": "/food-images/sandwich_turkey.jpg",
  "sandwich_tuna": "/food-images/sandwich_tuna.jpg",
  "club_sandwich": "/food-images/club_sandwich.jpg",
  "panini": "/food-images/panini.jpg",
  "wrap_chicken": "/food-images/wrap_chicken.jpg",
  "burrito": "/food-images/burrito.jpg",
  "quesadilla": "/food-images/quesadilla.jpg",
  "taco": "/food-images/taco.jpg",
  "nachos": "/food-images/nachos.jpg",
  "french_fries": "/food-images/french_fries.jpg",
  "onion_rings": "/food-images/onion_rings.jpg",
  "chicken_nuggets": "/food-images/chicken_nuggets.jpg",
  "fish_and_chips": "/food-images/fish_and_chips.jpg",
  "fried_chicken": "/food-images/fried_chicken.jpg",
  "grilled_chicken": "/food-images/grilled_chicken.jpg",
  "roast_chicken": "/food-images/roast_chicken.webp",
  "beef_stew": "/food-images/beef_stew.jpg",
  "pot_roast": "/food-images/pot_roast.jpg",
  "meatballs": "/food-images/meatballs.jpg",
  "meatloaf": "/food-images/meatloaf.jpg",
  "shepherds_pie": "/food-images/shepherds_pie.jpg",
  "lasagna_prepared": "/food-images/lasagna_prepared.jpg",
  "spaghetti_bolognese": "/food-images/spaghetti_bolognese.jpg",
  "carbonara": "/food-images/carbonara.jpg",
  "mac_and_cheese": "/food-images/mac_and_cheese.jpg",
  "risotto": "/food-images/risotto.jpg",
  "paella": "/food-images/paella.jpg",
  "fried_rice": "/food-images/fried_rice.jpg",
  "sushi_roll": "/food-images/sushi_roll.jpg",
  "sashimi": "/food-images/sashimi.jpg",
  "tempura": "/food-images/tempura.jpg",
  "ramen": "/food-images/ramen.jpg",
  "pho": "/food-images/pho.jpg",
  "pad_thai": "/food-images/pad_thai.jpg",
  "spring_rolls": "/food-images/spring_rolls.jpg",
  "dumplings": "/food-images/dumplings.jpg",
  "samosa": "/food-images/samosa.jpg",
  "falafel": "/food-images/falafel.jpg",
  "hummus": "/food-images/hummus.jpg",
  "guacamole": "/food-images/guacamole.jpg",
  "salsa": "/food-images/salsa.jpg",
  "coleslaw": "/food-images/coleslaw.jpg",
  "potato_salad": "/food-images/potato_salad.jpg",
  "caesar_salad": "/food-images/caesar_salad.jpg",
  "greek_salad": "/food-images/greek_salad.jpg",
  "caprese_salad": "/food-images/caprese_salad.jpg",
  "soup_tomato": "/food-images/soup_tomato.jpg",
  "soup_chicken": "/food-images/soup_chicken.jpg",
  "soup_vegetable": "/food-images/soup_vegetable.jpg",
  "soup_onion": "/food-images/soup_onion.jpg",
  "soup_mushroom": "/food-images/soup_mushroom.jpg",
  "chili_con_carne": "/food-images/chili_con_carne.jpg",
  "curry_chicken": "/food-images/curry_chicken.jpg",
  "curry_vegetable": "/food-images/curry_vegetable.jpg",
  "stir_fry": "/food-images/stir_fry.jpg",
  "kebab": "/food-images/kebab.jpg",
  "shawarma": "/food-images/shawarma.jpg",
  "gyros": "/food-images/gyros.jpg",

  // ============= FAST FOOD =============
  "big_mac": "/food-images/big_mac.jpg",
  "whopper": "/food-images/whopper.jpg",
  "chicken_sandwich": "/food-images/chicken_sandwich.jpg",
  "fish_sandwich": "/food-images/fish_sandwich.jpg",
  "chicken_tenders": "/food-images/chicken_tenders.jpg",
  "mozzarella_sticks": "/food-images/mozzarella_sticks.jpg",
  "jalapeno_poppers": "/food-images/jalapeno_poppers.jpg",
  "soft_pretzel": "/food-images/soft_pretzel.jpg",
  "churros": "/food-images/churros.jpg",
  "donut": "/food-images/donut.jpg",
  "cinnamon_roll": "/food-images/cinnamon_roll.jpg",
  "muffin_blueberry": "/food-images/muffin_blueberry.jpg",
  "muffin_chocolate": "/food-images/muffin_chocolate.jpg",
  "cupcake": "/food-images/cupcake.jpg",
  "pie_apple": "/food-images/pie_apple.jpg",
  "pie_pumpkin": "/food-images/pie_pumpkin.jpg",
  "cheesecake": "/food-images/cheesecake.jpg",
  "tiramisu": "/food-images/tiramisu.jpg",
  "creme_brulee": "/food-images/creme_brulee.jpg",
  "panna_cotta": "/food-images/panna_cotta.jpg",
  "mousse_chocolate": "/food-images/mousse_chocolate.jpg",
  "pudding": "/food-images/pudding.jpg",
  "flan": "/food-images/flan.jpg",
  "eclair": "/food-images/eclair.jpg",
  "macaron": "/food-images/macaron.jpg",
  "profiteroles": "/food-images/profiteroles.jpg",
}

/**
 * Fonction helper pour obtenir le chemin de l'image d'un aliment
 * Retourne une image placeholder si l'image n'existe pas
 */
export function getFoodImageUrl(foodNameEn: string): string {
  // Convertir le nom anglais en ID (minuscules, espaces -> underscores)
  const foodId = foodNameEn
    .toLowerCase()
    .replace(/[()]/g, '') // Retirer les parenthèses
    .replace(/\s+/g, '_') // Remplacer espaces par underscores
    .replace(/_+/g, '_') // Supprimer les underscores multiples
    .replace(/[^a-z0-9_]/g, '') // Garder seulement lettres, chiffres et underscores

  // Retourner le chemin si défini, sinon placeholder
  return foodImages[foodId] || `https://via.placeholder.com/400x400/e0e7ff/4f46e5?text=${encodeURIComponent(foodNameEn)}`
}

/**
 * Fonction pour vérifier combien d'images sont disponibles
 */
export function getAvailableImagesCount(): number {
  // Dans un environnement de production, cette fonction devrait vérifier
  // si les fichiers existent réellement. Pour l'instant, on compte simplement
  // les entrées qui ne sont pas des placeholders.
  return Object.values(foodImages).filter(path => path.startsWith('/food-images/')).length
}

/**
 * Fonction pour obtenir la liste des aliments avec leur statut d'image
 */
export function getFoodsImageStatus(): Array<{id: string, hasImage: boolean}> {
  return Object.entries(foodImages).map(([id, path]) => ({
    id,
    hasImage: path.startsWith('/food-images/')
  }))
}
