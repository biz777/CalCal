// Multilingual Food Database (per 100g)
export interface Food {
  name: string
  category: string
  calories: number
  protein: number // Protein in grams
  carbs: number   // Carbs in grams
  fat: number     // Fat in grams
  fiber?: number  // Fiber in grams
  unit?: string   // Unit (e.g., "1 unit ≈ 50g")
}

export type Language = 'en' | 'fr' | 'es'

interface FoodTranslations {
  name: Record<Language, string>
  category: Record<Language, string>
  unit?: Record<Language, string>
}

// Food data with multilingual support
const foodTranslations: (Omit<Food, 'name' | 'category' | 'unit'> & FoodTranslations)[] = [
  // ============= MEAT & EGGS =============
  { name: { en: "Chicken (breast, skinless)", fr: "Poulet (blanc, sans peau)", es: "Pollo (pechuga, sin piel)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: { en: "Chicken (thigh, with skin)", fr: "Poulet (cuisse, avec peau)", es: "Pollo (muslo, con piel)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 229, protein: 26, carbs: 0, fat: 13 },
  { name: { en: "Turkey (breast)", fr: "Dinde (blanc)", es: "Pavo (pechuga)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 135, protein: 30, carbs: 0, fat: 0.7 },
  { name: { en: "Beef (ground 5%)", fr: "Bœuf (steak haché 5%)", es: "Carne molida (5%)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 137, protein: 21, carbs: 0, fat: 5 },
  { name: { en: "Beef (ground 15%)", fr: "Bœuf (steak haché 15%)", es: "Carne molida (15%)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 250, protein: 17, carbs: 0, fat: 15 },
  { name: { en: "Beef (ribeye steak)", fr: "Bœuf (entrecôte)", es: "Carne (chuletón)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 291, protein: 26, carbs: 0, fat: 20 },
  { name: { en: "Pork (chop)", fr: "Porc (côtelette)", es: "Cerdo (chuleta)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 242, protein: 28, carbs: 0, fat: 14 },
  { name: { en: "Ham (cooked)", fr: "Jambon blanc", es: "Jamón cocido" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 145, protein: 19, carbs: 1.2, fat: 5 },
  { name: { en: "Ham (cured)", fr: "Jambon cru", es: "Jamón serrano" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 268, protein: 24, carbs: 0.5, fat: 18 },
  { name: { en: "Sausage (pork)", fr: "Saucisse de Toulouse", es: "Salchicha de cerdo" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 330, protein: 15, carbs: 1, fat: 30 },
  { name: { en: "Egg (whole)", fr: "Œuf entier", es: "Huevo entero" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 155, protein: 13, carbs: 1.1, fat: 11, unit: { en: "1 egg ≈ 60g", fr: "1 œuf ≈ 60g", es: "1 huevo ≈ 60g" } },
  { name: { en: "Egg white", fr: "Blanc d'œuf", es: "Clara de huevo" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 52, protein: 11, carbs: 0.7, fat: 0.2 },
  { name: { en: "Bacon", fr: "Bacon", es: "Tocino" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 541, protein: 37, carbs: 1.4, fat: 42 },

  // ============= FISH & SEAFOOD =============
  { name: { en: "Salmon (fresh)", fr: "Saumon (frais)", es: "Salmón (fresco)" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 208, protein: 20, carbs: 0, fat: 13 },
  { name: { en: "Smoked salmon", fr: "Saumon fumé", es: "Salmón ahumado" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 117, protein: 18, carbs: 0, fat: 4.5 },
  { name: { en: "Tuna (canned, in water)", fr: "Thon (en conserve, au naturel)", es: "Atún (enlatado, al natural)" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 116, protein: 26, carbs: 0, fat: 0.8 },
  { name: { en: "Tuna (fresh)", fr: "Thon (frais)", es: "Atún (fresco)" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 144, protein: 23, carbs: 0, fat: 5 },
  { name: { en: "Cod", fr: "Cabillaud", es: "Bacalao" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 82, protein: 18, carbs: 0, fat: 0.7 },
  { name: { en: "Sardines (canned)", fr: "Sardines (en conserve)", es: "Sardinas (enlatadas)" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 208, protein: 25, carbs: 0, fat: 11 },
  { name: { en: "Shrimp", fr: "Crevettes", es: "Camarones" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
  { name: { en: "Mussels", fr: "Moules", es: "Mejillones" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 86, protein: 12, carbs: 3.7, fat: 2.2 },

  // ============= VEGETABLES =============
  { name: { en: "Broccoli", fr: "Brocoli", es: "Brócoli" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6 },
  { name: { en: "Spinach", fr: "Épinards", es: "Espinacas" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
  { name: { en: "Tomato", fr: "Tomate", es: "Tomate" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 },
  { name: { en: "Cucumber", fr: "Concombre", es: "Pepino" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5 },
  { name: { en: "Carrot", fr: "Carotte", es: "Zanahoria" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8 },
  { name: { en: "Zucchini", fr: "Courgette", es: "Calabacín" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1 },
  { name: { en: "Bell pepper", fr: "Poivron", es: "Pimiento" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1 },
  { name: { en: "Lettuce", fr: "Salade verte", es: "Lechuga" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3 },
  { name: { en: "Green beans", fr: "Haricots verts", es: "Judías verdes" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 31, protein: 1.8, carbs: 7, fat: 0.2, fiber: 2.7 },
  { name: { en: "Mushrooms", fr: "Champignons", es: "Champiñones" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1 },
  { name: { en: "Onion", fr: "Oignon", es: "Cebolla" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 },
  { name: { en: "Avocado", fr: "Avocat", es: "Aguacate" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 },

  // ============= SIDES =============
  { name: { en: "White rice (cooked)", fr: "Riz blanc (cuit)", es: "Arroz blanco (cocido)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: { en: "Basmati rice (cooked)", fr: "Riz basmati (cuit)", es: "Arroz basmati (cocido)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 121, protein: 3, carbs: 25, fat: 0.4 },
  { name: { en: "Brown rice (cooked)", fr: "Riz complet (cuit)", es: "Arroz integral (cocido)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8 },
  { name: { en: "Pasta (cooked)", fr: "Pâtes (cuites)", es: "Pasta (cocida)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  { name: { en: "Whole wheat pasta (cooked)", fr: "Pâtes complètes (cuites)", es: "Pasta integral (cocida)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 124, protein: 5.3, carbs: 23, fat: 1.3, fiber: 3.2 },
  { name: { en: "Potato (cooked)", fr: "Pommes de terre (cuites)", es: "Patata (cocida)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 86, protein: 1.7, carbs: 20, fat: 0.1, fiber: 1.8 },
  { name: { en: "Sweet potato (cooked)", fr: "Patate douce (cuite)", es: "Batata (cocida)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 90, protein: 2, carbs: 21, fat: 0.2, fiber: 3.3 },
  { name: { en: "Quinoa (cooked)", fr: "Quinoa (cuit)", es: "Quinoa (cocida)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 120, protein: 4.4, carbs: 21, fat: 1.9, fiber: 2.8 },
  { name: { en: "Couscous (cooked)", fr: "Couscous (cuit)", es: "Cuscús (cocido)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 112, protein: 3.8, carbs: 23, fat: 0.2 },
  { name: { en: "White bread", fr: "Pain blanc", es: "Pan blanco" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 265, protein: 9, carbs: 49, fat: 3.2, unit: { en: "1 slice ≈ 30g", fr: "1 tranche ≈ 30g", es: "1 rebanada ≈ 30g" } },
  { name: { en: "Whole wheat bread", fr: "Pain complet", es: "Pan integral" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 247, protein: 13, carbs: 41, fat: 3.4, fiber: 7, unit: { en: "1 slice ≈ 30g", fr: "1 tranche ≈ 30g", es: "1 rebanada ≈ 30g" } },
  { name: { en: "Sandwich bread", fr: "Pain de mie", es: "Pan de molde" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 266, protein: 8.4, carbs: 49, fat: 3.3, unit: { en: "1 slice ≈ 25g", fr: "1 tranche ≈ 25g", es: "1 rebanada ≈ 25g" } },
  { name: { en: "Lentils (cooked)", fr: "Lentilles (cuites)", es: "Lentejas (cocidas)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8 },
  { name: { en: "Chickpeas (cooked)", fr: "Pois chiches (cuits)", es: "Garbanzos (cocidos)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6 },

  // ============= CONDIMENTS & SAUCES =============
  { name: { en: "Olive oil", fr: "Huile d'olive", es: "Aceite de oliva" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 884, protein: 0, carbs: 0, fat: 100 },
  { name: { en: "Butter", fr: "Beurre", es: "Mantequilla" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 717, protein: 0.9, carbs: 0.1, fat: 81 },
  { name: { en: "Mayonnaise", fr: "Mayonnaise", es: "Mayonesa" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 680, protein: 1.2, carbs: 0.6, fat: 75 },
  { name: { en: "Ketchup", fr: "Ketchup", es: "Ketchup" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 112, protein: 1.2, carbs: 25, fat: 0.3 },
  { name: { en: "Mustard", fr: "Moutarde", es: "Mostaza" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 66, protein: 4.4, carbs: 5.6, fat: 3.3 },
  { name: { en: "Soy sauce", fr: "Sauce soja", es: "Salsa de soja" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 53, protein: 6, carbs: 5, fat: 0.1 },
  { name: { en: "Balsamic vinegar", fr: "Vinaigre balsamique", es: "Vinagre balsámico" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 88, protein: 0.5, carbs: 17, fat: 0 },

  // ============= CHEESE =============
  { name: { en: "Emmental", fr: "Emmental", es: "Emmental" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 382, protein: 28, carbs: 1.4, fat: 29 },
  { name: { en: "Comté", fr: "Comté", es: "Comté" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 409, protein: 27, carbs: 0, fat: 33 },
  { name: { en: "Camembert", fr: "Camembert", es: "Camembert" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 299, protein: 20, carbs: 0.5, fat: 24 },
  { name: { en: "Goat cheese (fresh)", fr: "Chèvre frais", es: "Queso de cabra (fresco)" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 210, protein: 13, carbs: 2.5, fat: 17 },
  { name: { en: "Mozzarella", fr: "Mozzarella", es: "Mozzarella" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 280, protein: 18, carbs: 2.2, fat: 22 },
  { name: { en: "Parmesan", fr: "Parmesan", es: "Parmesano" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 431, protein: 38, carbs: 4.1, fat: 29 },
  { name: { en: "Feta", fr: "Feta", es: "Queso feta" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 264, protein: 14, carbs: 4.1, fat: 21 },

  // ============= FRUITS =============
  { name: { en: "Apple", fr: "Pomme", es: "Manzana" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, unit: { en: "1 apple ≈ 180g", fr: "1 pomme ≈ 180g", es: "1 manzana ≈ 180g" } },
  { name: { en: "Banana", fr: "Banane", es: "Plátano" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, unit: { en: "1 banana ≈ 120g", fr: "1 banane ≈ 120g", es: "1 plátano ≈ 120g" } },
  { name: { en: "Orange", fr: "Orange", es: "Naranja" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, unit: { en: "1 orange ≈ 130g", fr: "1 orange ≈ 130g", es: "1 naranja ≈ 130g" } },
  { name: { en: "Strawberries", fr: "Fraises", es: "Fresas" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 32, protein: 0.7, carbs: 8, fat: 0.3, fiber: 2 },
  { name: { en: "Grapes", fr: "Raisin", es: "Uvas" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9 },
  { name: { en: "Kiwi", fr: "Kiwi", es: "Kiwi" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 61, protein: 1.1, carbs: 15, fat: 0.5, fiber: 3, unit: { en: "1 kiwi ≈ 70g", fr: "1 kiwi ≈ 70g", es: "1 kiwi ≈ 70g" } },
  { name: { en: "Mango", fr: "Mangue", es: "Mango" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6 },
  { name: { en: "Pineapple", fr: "Ananas", es: "Piña" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 50, protein: 0.5, carbs: 13, fat: 0.1, fiber: 1.4 },

  // ============= DESSERTS =============
  { name: { en: "Yogurt (plain, 0% fat)", fr: "Yaourt nature 0%", es: "Yogur natural 0%" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 56, protein: 5.3, carbs: 7.7, fat: 0.2 },
  { name: { en: "Yogurt (plain, whole)", fr: "Yaourt nature entier", es: "Yogur natural entero" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3 },
  { name: { en: "Greek yogurt (0% fat)", fr: "Yaourt grec 0%", es: "Yogur griego 0%" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  { name: { en: "Cottage cheese (0% fat)", fr: "Fromage blanc 0%", es: "Requesón 0%" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 44, protein: 7.5, carbs: 4, fat: 0.2 },
  { name: { en: "Cottage cheese (20% fat)", fr: "Fromage blanc 20%", es: "Requesón 20%" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 96, protein: 6.8, carbs: 3.7, fat: 6 },
  { name: { en: "Vanilla ice cream", fr: "Glace vanille", es: "Helado de vainilla" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 207, protein: 3.5, carbs: 24, fat: 11 },
  { name: { en: "Dark chocolate (70%)", fr: "Chocolat noir 70%", es: "Chocolate negro 70%" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 598, protein: 7.8, carbs: 45, fat: 43, unit: { en: "1 square ≈ 10g", fr: "1 carré ≈ 10g", es: "1 cuadrado ≈ 10g" } },
  { name: { en: "Milk chocolate", fr: "Chocolat au lait", es: "Chocolate con leche" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 535, protein: 7.6, carbs: 59, fat: 30, unit: { en: "1 square ≈ 10g", fr: "1 carré ≈ 10g", es: "1 cuadrado ≈ 10g" } },
  { name: { en: "Cookie", fr: "Cookie", es: "Galleta" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 502, protein: 5.6, carbs: 64, fat: 24, unit: { en: "1 cookie ≈ 25g", fr: "1 cookie ≈ 25g", es: "1 galleta ≈ 25g" } },
  { name: { en: "Brownie", fr: "Brownie", es: "Brownie" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 466, protein: 6, carbs: 51, fat: 27 },

  // ============= DRINKS =============
  { name: { en: "Water", fr: "Eau", es: "Agua" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 0, protein: 0, carbs: 0, fat: 0 },
  { name: { en: "Coca-Cola", fr: "Coca-Cola", es: "Coca-Cola" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 42, protein: 0, carbs: 10.6, fat: 0 },
  { name: { en: "Coca-Cola Zero", fr: "Coca-Cola Zero", es: "Coca-Cola Zero" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 0.3, protein: 0, carbs: 0, fat: 0 },
  { name: { en: "Orange juice", fr: "Jus d'orange", es: "Jugo de naranja" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 45, protein: 0.7, carbs: 10, fat: 0.2 },
  { name: { en: "Whole milk", fr: "Lait entier", es: "Leche entera" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
  { name: { en: "Semi-skimmed milk", fr: "Lait demi-écrémé", es: "Leche semidesnatada" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 46, protein: 3.3, carbs: 4.8, fat: 1.5 },
  { name: { en: "Skimmed milk", fr: "Lait écrémé", es: "Leche desnatada" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 34, protein: 3.4, carbs: 5, fat: 0.1 },
  { name: { en: "Coffee (black)", fr: "Café (noir)", es: "Café (negro)" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 2, protein: 0.3, carbs: 0, fat: 0 },
  { name: { en: "Tea (unsweetened)", fr: "Thé (sans sucre)", es: "Té (sin azúcar)" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 1, protein: 0, carbs: 0.3, fat: 0 },
  { name: { en: "Beer", fr: "Bière", es: "Cerveza" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 43, protein: 0.5, carbs: 3.6, fat: 0 },
  { name: { en: "Red wine", fr: "Vin rouge", es: "Vino tinto" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 85, protein: 0.1, carbs: 2.6, fat: 0 },

  // ============= BREAKFAST & SNACKS =============
  { name: { en: "Plain cereal", fr: "Céréales nature", es: "Cereales naturales" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 379, protein: 8, carbs: 84, fat: 1.5 },
  { name: { en: "Muesli", fr: "Muesli", es: "Muesli" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 366, protein: 9.7, carbs: 66, fat: 6.3, fiber: 7.7 },
  { name: { en: "Oats", fr: "Flocons d'avoine", es: "Avena" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 10 },
  { name: { en: "Croissant", fr: "Croissant", es: "Croissant" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 406, protein: 8, carbs: 46, fat: 21, unit: { en: "1 croissant ≈ 50g", fr: "1 croissant ≈ 50g", es: "1 croissant ≈ 50g" } },
  { name: { en: "Pain au chocolat", fr: "Pain au chocolat", es: "Napolitana de chocolate" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 414, protein: 7.4, carbs: 47, fat: 22, unit: { en: "1 pastry ≈ 65g", fr: "1 pain au choc ≈ 65g", es: "1 napolitana ≈ 65g" } },
  { name: { en: "Brioche", fr: "Brioche", es: "Brioche" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 375, protein: 8, carbs: 53, fat: 14 },
  { name: { en: "Jam", fr: "Confiture", es: "Mermelada" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 278, protein: 0.4, carbs: 69, fat: 0.1 },
  { name: { en: "Honey", fr: "Miel", es: "Miel" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 304, protein: 0.3, carbs: 82, fat: 0 },
  { name: { en: "Nutella", fr: "Nutella", es: "Nutella" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 539, protein: 6.3, carbs: 57, fat: 31 },
  { name: { en: "Granola bar", fr: "Barre de céréales", es: "Barra de cereales" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 471, protein: 6.9, carbs: 65, fat: 20, unit: { en: "1 bar ≈ 25g", fr: "1 barre ≈ 25g", es: "1 barra ≈ 25g" } },

  // ============= ADDITIONAL MEAT & EGGS =============
  { name: { en: "Chicken (wings)", fr: "Poulet (ailes)", es: "Pollo (alitas)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 203, protein: 30, carbs: 0, fat: 8.1 },
  { name: { en: "Turkey (ground)", fr: "Dinde (hachée)", es: "Pavo (molido)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 149, protein: 20, carbs: 0, fat: 7 },
  { name: { en: "Duck (breast)", fr: "Canard (magret)", es: "Pato (pechuga)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 337, protein: 19, carbs: 0, fat: 28 },
  { name: { en: "Beef (sirloin)", fr: "Bœuf (faux-filet)", es: "Carne (solomillo)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 271, protein: 27, carbs: 0, fat: 17 },
  { name: { en: "Beef (tenderloin)", fr: "Bœuf (filet)", es: "Carne (lomo)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 227, protein: 26, carbs: 0, fat: 13 },
  { name: { en: "Lamb (chop)", fr: "Agneau (côtelette)", es: "Cordero (chuleta)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 294, protein: 25, carbs: 0, fat: 21 },
  { name: { en: "Lamb (leg)", fr: "Agneau (gigot)", es: "Cordero (pierna)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 258, protein: 26, carbs: 0, fat: 16 },
  { name: { en: "Pork (tenderloin)", fr: "Porc (filet mignon)", es: "Cerdo (solomillo)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 143, protein: 26, carbs: 0, fat: 3.5 },
  { name: { en: "Pork (ribs)", fr: "Porc (travers)", es: "Cerdo (costillas)" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 361, protein: 27, carbs: 0, fat: 27 },
  { name: { en: "Prosciutto", fr: "Jambon de Parme", es: "Prosciutto" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 237, protein: 27, carbs: 0, fat: 14 },
  { name: { en: "Chorizo", fr: "Chorizo", es: "Chorizo" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 455, protein: 24, carbs: 2, fat: 38 },
  { name: { en: "Salami", fr: "Salami", es: "Salami" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 407, protein: 23, carbs: 1.2, fat: 34 },
  { name: { en: "Rabbit", fr: "Lapin", es: "Conejo" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 173, protein: 33, carbs: 0, fat: 3.5 },
  { name: { en: "Veal", fr: "Veau", es: "Ternera" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 172, protein: 31, carbs: 0, fat: 4.3 },
  { name: { en: "Liver (beef)", fr: "Foie de bœuf", es: "Hígado de res" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 175, protein: 27, carbs: 5, fat: 4.9 },
  { name: { en: "Liver (chicken)", fr: "Foie de volaille", es: "Hígado de pollo" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 167, protein: 25, carbs: 0.9, fat: 6.5 },
  { name: { en: "Egg yolk", fr: "Jaune d'œuf", es: "Yema de huevo" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 322, protein: 16, carbs: 3.6, fat: 27 },
  { name: { en: "Scrambled eggs", fr: "Œufs brouillés", es: "Huevos revueltos" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 149, protein: 10, carbs: 2, fat: 11 },
  { name: { en: "Pastrami", fr: "Pastrami", es: "Pastrami" }, category: { en: "Meat & Eggs", fr: "Viandes & Œufs", es: "Carnes y Huevos" }, calories: 154, protein: 24, carbs: 3, fat: 5 },

  // ============= ADDITIONAL FISH & SEAFOOD =============
  { name: { en: "Haddock", fr: "Aiglefin", es: "Eglefino" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 87, protein: 19, carbs: 0, fat: 0.6 },
  { name: { en: "Sea bass", fr: "Bar", es: "Lubina" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 97, protein: 18, carbs: 0, fat: 2.0 },
  { name: { en: "Sea bream", fr: "Daurade", es: "Dorada" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 115, protein: 19, carbs: 0, fat: 3.8 },
  { name: { en: "Trout", fr: "Truite", es: "Trucha" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 119, protein: 20, carbs: 0, fat: 3.5 },
  { name: { en: "Mackerel", fr: "Maquereau", es: "Caballa" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 205, protein: 19, carbs: 0, fat: 14 },
  { name: { en: "Herring", fr: "Hareng", es: "Arenque" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 158, protein: 18, carbs: 0, fat: 9 },
  { name: { en: "Anchovy", fr: "Anchois", es: "Anchoa" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 131, protein: 20, carbs: 0, fat: 4.8 },
  { name: { en: "Sole", fr: "Sole", es: "Lenguado" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 70, protein: 15, carbs: 0, fat: 0.5 },
  { name: { en: "Halibut", fr: "Flétan", es: "Halibut" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 91, protein: 19, carbs: 0, fat: 1.3 },
  { name: { en: "Swordfish", fr: "Espadon", es: "Pez espada" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 144, protein: 20, carbs: 0, fat: 6.7 },
  { name: { en: "Prawns", fr: "Gambas", es: "Gambas" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 106, protein: 22, carbs: 0.9, fat: 1.7 },
  { name: { en: "Crab", fr: "Crabe", es: "Cangrejo" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 97, protein: 19, carbs: 0.5, fat: 1.5 },
  { name: { en: "Lobster", fr: "Homard", es: "Langosta" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 89, protein: 19, carbs: 0, fat: 0.9 },
  { name: { en: "Oysters", fr: "Huîtres", es: "Ostras" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 68, protein: 7, carbs: 3.9, fat: 2.5 },
  { name: { en: "Clams", fr: "Palourdes", es: "Almejas" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 74, protein: 13, carbs: 2.6, fat: 1 },
  { name: { en: "Scallops", fr: "Coquilles Saint-Jacques", es: "Vieiras" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 88, protein: 17, carbs: 2.4, fat: 0.8 },
  { name: { en: "Squid", fr: "Calamar", es: "Calamar" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 92, protein: 16, carbs: 3.1, fat: 1.4 },
  { name: { en: "Octopus", fr: "Poulpe", es: "Pulpo" }, category: { en: "Fish & Seafood", fr: "Poissons", es: "Pescados y Mariscos" }, calories: 82, protein: 15, carbs: 2.2, fat: 1 },

  // ============= ADDITIONAL VEGETABLES =============
  { name: { en: "Kale", fr: "Chou kale", es: "Col rizada" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 49, protein: 4.3, carbs: 9, fat: 0.9, fiber: 2 },
  { name: { en: "Cherry tomatoes", fr: "Tomates cerises", es: "Tomates cherry" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 },
  { name: { en: "Eggplant", fr: "Aubergine", es: "Berenjena" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 25, protein: 1, carbs: 6, fat: 0.2, fiber: 3 },
  { name: { en: "Red bell pepper", fr: "Poivron rouge", es: "Pimiento rojo" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1 },
  { name: { en: "Romaine lettuce", fr: "Laitue romaine", es: "Lechuga romana" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 17, protein: 1.2, carbs: 3.3, fat: 0.3, fiber: 2.1 },
  { name: { en: "Arugula", fr: "Roquette", es: "Rúcula" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 25, protein: 2.6, carbs: 3.7, fat: 0.7, fiber: 1.6 },
  { name: { en: "Asparagus", fr: "Asperges", es: "Espárragos" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, fiber: 2.1 },
  { name: { en: "Portobello mushrooms", fr: "Champignons portobello", es: "Champiñones portobello" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 22, protein: 2.1, carbs: 3.9, fat: 0.4, fiber: 1.3 },
  { name: { en: "Red onion", fr: "Oignon rouge", es: "Cebolla morada" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 },
  { name: { en: "Garlic", fr: "Ail", es: "Ajo" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 149, protein: 6.4, carbs: 33, fat: 0.5, fiber: 2.1 },
  { name: { en: "Leek", fr: "Poireau", es: "Puerro" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 61, protein: 1.5, carbs: 14, fat: 0.3, fiber: 1.8 },
  { name: { en: "Cabbage", fr: "Chou", es: "Col" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, fiber: 2.5 },
  { name: { en: "Red cabbage", fr: "Chou rouge", es: "Col lombarda" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 31, protein: 1.4, carbs: 7.4, fat: 0.2, fiber: 2.1 },
  { name: { en: "Brussels sprouts", fr: "Choux de Bruxelles", es: "Coles de Bruselas" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 43, protein: 3.4, carbs: 9, fat: 0.3, fiber: 3.8 },
  { name: { en: "Cauliflower", fr: "Chou-fleur", es: "Coliflor" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2 },
  { name: { en: "Beetroot", fr: "Betterave", es: "Remolacha" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 43, protein: 1.6, carbs: 9.6, fat: 0.2, fiber: 2.8 },
  { name: { en: "Celery", fr: "Céleri", es: "Apio" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 16, protein: 0.7, carbs: 3, fat: 0.2, fiber: 1.6 },
  { name: { en: "Radish", fr: "Radis", es: "Rábano" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 16, protein: 0.7, carbs: 3.4, fat: 0.1, fiber: 1.6 },
  { name: { en: "Turnip", fr: "Navet", es: "Nabo" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 28, protein: 0.9, carbs: 6.4, fat: 0.1, fiber: 1.8 },
  { name: { en: "Artichoke", fr: "Artichaut", es: "Alcachofa" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 47, protein: 3.3, carbs: 11, fat: 0.2, fiber: 5.4 },
  { name: { en: "Corn (sweet)", fr: "Maïs doux", es: "Maíz dulce" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 86, protein: 3.3, carbs: 19, fat: 1.4, fiber: 2 },
  { name: { en: "Peas (green)", fr: "Petits pois", es: "Guisantes" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 81, protein: 5, carbs: 14, fat: 0.4, fiber: 5.7 },
  { name: { en: "Pumpkin", fr: "Citrouille", es: "Calabaza" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 26, protein: 1, carbs: 6.5, fat: 0.1, fiber: 0.5 },
  { name: { en: "Butternut squash", fr: "Courge butternut", es: "Calabaza butternut" }, category: { en: "Vegetables", fr: "Légumes", es: "Verduras" }, calories: 45, protein: 1, carbs: 12, fat: 0.1, fiber: 2 },

  // ============= ADDITIONAL SIDES & GRAINS =============
  { name: { en: "Wild rice (cooked)", fr: "Riz sauvage (cuit)", es: "Arroz salvaje (cocido)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 101, protein: 4, carbs: 21, fat: 0.3, fiber: 1.8 },
  { name: { en: "Jasmine rice (cooked)", fr: "Riz jasmin (cuit)", es: "Arroz jazmín (cocido)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 129, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: { en: "Spaghetti (cooked)", fr: "Spaghetti (cuits)", es: "Espagueti (cocido)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 158, protein: 5.8, carbs: 31, fat: 0.9 },
  { name: { en: "Baked potato", fr: "Pomme de terre au four", es: "Patata asada" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 93, protein: 2.5, carbs: 21, fat: 0.1, fiber: 2.2 },
  { name: { en: "Mashed potatoes", fr: "Purée de pommes de terre", es: "Puré de patatas" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 83, protein: 2, carbs: 17, fat: 1.2 },
  { name: { en: "French fries", fr: "Frites", es: "Papas fritas" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 312, protein: 3.4, carbs: 41, fat: 15 },
  { name: { en: "Bulgur (cooked)", fr: "Boulgour (cuit)", es: "Bulgur (cocido)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 83, protein: 3.1, carbs: 19, fat: 0.2, fiber: 4.5 },
  { name: { en: "Polenta (cooked)", fr: "Polenta (cuite)", es: "Polenta (cocida)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 70, protein: 1.7, carbs: 15, fat: 0.6 },
  { name: { en: "Rye bread", fr: "Pain de seigle", es: "Pan de centeno" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 259, protein: 8.5, carbs: 48, fat: 3.3, fiber: 5.8 },
  { name: { en: "Baguette", fr: "Baguette", es: "Baguette" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 272, protein: 9.3, carbs: 55, fat: 1.6 },
  { name: { en: "Sourdough bread", fr: "Pain au levain", es: "Pan de masa madre" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 289, protein: 9.4, carbs: 56, fat: 2.7 },
  { name: { en: "Pita bread", fr: "Pain pita", es: "Pan pita" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 275, protein: 9.1, carbs: 55, fat: 1.2 },
  { name: { en: "Naan bread", fr: "Pain naan", es: "Pan naan" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 262, protein: 7.5, carbs: 45, fat: 5 },
  { name: { en: "Black beans (cooked)", fr: "Haricots noirs (cuits)", es: "Frijoles negros (cocidos)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 132, protein: 8.9, carbs: 24, fat: 0.5, fiber: 8.7 },
  { name: { en: "Kidney beans (cooked)", fr: "Haricots rouges (cuits)", es: "Frijoles rojos (cocidos)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 127, protein: 8.7, carbs: 23, fat: 0.5, fiber: 6.4 },
  { name: { en: "White beans (cooked)", fr: "Haricots blancs (cuits)", es: "Judías blancas (cocidas)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 139, protein: 9.7, carbs: 25, fat: 0.4, fiber: 6.3 },
  { name: { en: "Pinto beans (cooked)", fr: "Haricots pinto (cuits)", es: "Frijoles pintos (cocidos)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 143, protein: 9, carbs: 26, fat: 0.7, fiber: 9 },
  { name: { en: "Fava beans (cooked)", fr: "Fèves (cuites)", es: "Habas (cocidas)" }, category: { en: "Sides", fr: "Accompagnements", es: "Acompañamientos" }, calories: 110, protein: 7.6, carbs: 20, fat: 0.4, fiber: 5.5 },

  // ============= ADDITIONAL CONDIMENTS & SAUCES =============
  { name: { en: "Vegetable oil", fr: "Huile végétale", es: "Aceite vegetal" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 884, protein: 0, carbs: 0, fat: 100 },
  { name: { en: "Coconut oil", fr: "Huile de coco", es: "Aceite de coco" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 862, protein: 0, carbs: 0, fat: 100 },
  { name: { en: "Sesame oil", fr: "Huile de sésame", es: "Aceite de sésamo" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 884, protein: 0, carbs: 0, fat: 100 },
  { name: { en: "Margarine", fr: "Margarine", es: "Margarina" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 717, protein: 0.2, carbs: 0.9, fat: 80 },
  { name: { en: "Light mayonnaise", fr: "Mayonnaise allégée", es: "Mayonesa ligera" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 321, protein: 1.1, carbs: 15, fat: 28 },
  { name: { en: "Dijon mustard", fr: "Moutarde de Dijon", es: "Mostaza de Dijon" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 66, protein: 4.4, carbs: 5.6, fat: 3.3 },
  { name: { en: "Teriyaki sauce", fr: "Sauce teriyaki", es: "Salsa teriyaki" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 89, protein: 2.8, carbs: 15, fat: 0.6 },
  { name: { en: "BBQ sauce", fr: "Sauce barbecue", es: "Salsa barbacoa" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 160, protein: 1, carbs: 33, fat: 2.2 },
  { name: { en: "Hot sauce", fr: "Sauce piquante", es: "Salsa picante" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 12, protein: 0.5, carbs: 2.1, fat: 0.2 },
  { name: { en: "Salsa", fr: "Salsa", es: "Salsa" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 36, protein: 1.5, carbs: 7, fat: 0.6 },
  { name: { en: "Pesto", fr: "Pesto", es: "Pesto" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 388, protein: 5.4, carbs: 7.5, fat: 37 },
  { name: { en: "Tomato sauce", fr: "Sauce tomate", es: "Salsa de tomate" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 29, protein: 1.3, carbs: 6.7, fat: 0.1 },
  { name: { en: "Ranch dressing", fr: "Sauce ranch", es: "Aderezo ranch" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 458, protein: 0.5, carbs: 5.9, fat: 48 },
  { name: { en: "Caesar dressing", fr: "Sauce Caesar", es: "Aderezo César" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 520, protein: 2.2, carbs: 6, fat: 54 },
  { name: { en: "Vinaigrette", fr: "Vinaigrette", es: "Vinagreta" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 267, protein: 0.2, carbs: 14, fat: 24 },
  { name: { en: "Apple cider vinegar", fr: "Vinaigre de cidre", es: "Vinagre de manzana" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 21, protein: 0, carbs: 0.9, fat: 0 },
  { name: { en: "Hummus", fr: "Houmous", es: "Hummus" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 166, protein: 8, carbs: 14, fat: 10, fiber: 6 },
  { name: { en: "Guacamole", fr: "Guacamole", es: "Guacamole" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 150, protein: 2, carbs: 9, fat: 14, fiber: 6 },
  { name: { en: "Tahini", fr: "Tahini", es: "Tahini" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 595, protein: 17, carbs: 21, fat: 54 },
  { name: { en: "Sour cream", fr: "Crème fraîche", es: "Crema agria" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 193, protein: 2.4, carbs: 4.6, fat: 19 },
  { name: { en: "Heavy cream", fr: "Crème liquide", es: "Nata" }, category: { en: "Condiments & Sauces", fr: "Assaisonnements & Sauces", es: "Condimentos y Salsas" }, calories: 340, protein: 2.1, carbs: 2.8, fat: 36 },

  // ============= ADDITIONAL CHEESE =============
  { name: { en: "Gruyère", fr: "Gruyère", es: "Gruyère" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 413, protein: 30, carbs: 0.4, fat: 32 },
  { name: { en: "Brie", fr: "Brie", es: "Brie" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 334, protein: 21, carbs: 0.5, fat: 28 },
  { name: { en: "Roquefort", fr: "Roquefort", es: "Roquefort" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 369, protein: 22, carbs: 2, fat: 31 },
  { name: { en: "Goat cheese (aged)", fr: "Chèvre sec", es: "Queso de cabra (curado)" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 452, protein: 30, carbs: 2.2, fat: 36 },
  { name: { en: "Mozzarella (low-fat)", fr: "Mozzarella (light)", es: "Mozzarella (baja en grasa)" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 254, protein: 24, carbs: 3.1, fat: 16 },
  { name: { en: "Pecorino", fr: "Pecorino", es: "Pecorino" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 387, protein: 26, carbs: 3.6, fat: 30 },
  { name: { en: "Ricotta", fr: "Ricotta", es: "Ricotta" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 174, protein: 11, carbs: 3, fat: 13 },
  { name: { en: "Mascarpone", fr: "Mascarpone", es: "Mascarpone" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 429, protein: 7.6, carbs: 3, fat: 44 },
  { name: { en: "Cheddar", fr: "Cheddar", es: "Cheddar" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 403, protein: 25, carbs: 1.3, fat: 33 },
  { name: { en: "Cream cheese", fr: "Fromage à la crème", es: "Queso crema" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 342, protein: 5.9, carbs: 5.5, fat: 34 },
  { name: { en: "Blue cheese", fr: "Fromage bleu", es: "Queso azul" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 353, protein: 21, carbs: 2.3, fat: 29 },
  { name: { en: "Provolone", fr: "Provolone", es: "Provolone" }, category: { en: "Cheese", fr: "Fromages", es: "Quesos" }, calories: 351, protein: 25, carbs: 2.1, fat: 27 },

  // ============= ADDITIONAL FRUITS =============
  { name: { en: "Green apple", fr: "Pomme verte", es: "Manzana verde" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
  { name: { en: "Clementine", fr: "Clémentine", es: "Clementina" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 47, protein: 0.9, carbs: 12, fat: 0.2, fiber: 1.7 },
  { name: { en: "Grapefruit", fr: "Pamplemousse", es: "Pomelo" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 42, protein: 0.8, carbs: 11, fat: 0.1, fiber: 1.6 },
  { name: { en: "Lemon", fr: "Citron", es: "Limón" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 29, protein: 1.1, carbs: 9, fat: 0.3, fiber: 2.8 },
  { name: { en: "Lime", fr: "Citron vert", es: "Lima" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 30, protein: 0.7, carbs: 11, fat: 0.2, fiber: 2.8 },
  { name: { en: "Blueberries", fr: "Myrtilles", es: "Arándanos" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4 },
  { name: { en: "Raspberries", fr: "Framboises", es: "Frambuesas" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 52, protein: 1.2, carbs: 12, fat: 0.7, fiber: 6.5 },
  { name: { en: "Blackberries", fr: "Mûres", es: "Moras" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 43, protein: 1.4, carbs: 10, fat: 0.5, fiber: 5.3 },
  { name: { en: "Cranberries", fr: "Canneberges", es: "Arándanos rojos" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 46, protein: 0.4, carbs: 12, fat: 0.1, fiber: 4.6 },
  { name: { en: "Grapes (red)", fr: "Raisin rouge", es: "Uvas rojas" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9 },
  { name: { en: "Watermelon", fr: "Pastèque", es: "Sandía" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 30, protein: 0.6, carbs: 8, fat: 0.2, fiber: 0.4 },
  { name: { en: "Cantaloupe", fr: "Melon", es: "Melón" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 34, protein: 0.8, carbs: 8, fat: 0.2, fiber: 0.9 },
  { name: { en: "Honeydew melon", fr: "Melon miel", es: "Melón dulce" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 36, protein: 0.5, carbs: 9, fat: 0.1, fiber: 0.8 },
  { name: { en: "Peach", fr: "Pêche", es: "Durazno" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 39, protein: 0.9, carbs: 10, fat: 0.3, fiber: 1.5 },
  { name: { en: "Nectarine", fr: "Nectarine", es: "Nectarina" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 44, protein: 1.1, carbs: 11, fat: 0.3, fiber: 1.7 },
  { name: { en: "Apricot", fr: "Abricot", es: "Albaricoque" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 48, protein: 1.4, carbs: 11, fat: 0.4, fiber: 2 },
  { name: { en: "Plum", fr: "Prune", es: "Ciruela" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 46, protein: 0.7, carbs: 11, fat: 0.3, fiber: 1.4 },
  { name: { en: "Pear", fr: "Poire", es: "Pera" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 57, protein: 0.4, carbs: 15, fat: 0.1, fiber: 3.1 },
  { name: { en: "Cherry", fr: "Cerise", es: "Cereza" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 63, protein: 1.1, carbs: 16, fat: 0.2, fiber: 2.1 },
  { name: { en: "Pomegranate", fr: "Grenade", es: "Granada" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 83, protein: 1.7, carbs: 19, fat: 1.2, fiber: 4 },
  { name: { en: "Fig (fresh)", fr: "Figue fraîche", es: "Higo fresco" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 74, protein: 0.8, carbs: 19, fat: 0.3, fiber: 2.9 },
  { name: { en: "Dates", fr: "Dattes", es: "Dátiles" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 277, protein: 1.8, carbs: 75, fat: 0.2, fiber: 6.7 },
  { name: { en: "Raisins", fr: "Raisins secs", es: "Pasas" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 299, protein: 3.1, carbs: 79, fat: 0.5, fiber: 3.7 },
  { name: { en: "Prunes (dried)", fr: "Pruneaux", es: "Ciruelas pasas" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 240, protein: 2.2, carbs: 64, fat: 0.4, fiber: 7.1 },
  { name: { en: "Coconut (fresh)", fr: "Noix de coco", es: "Coco fresco" }, category: { en: "Fruits", fr: "Fruits", es: "Frutas" }, calories: 354, protein: 3.3, carbs: 15, fat: 33, fiber: 9 },

  // ============= NUTS & SEEDS (NEW CATEGORY) =============
  { name: { en: "Almonds", fr: "Amandes", es: "Almendras" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12 },
  { name: { en: "Walnuts", fr: "Noix", es: "Nueces" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7 },
  { name: { en: "Cashews", fr: "Noix de cajou", es: "Anacardos" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 553, protein: 18, carbs: 30, fat: 44, fiber: 3.3 },
  { name: { en: "Hazelnuts", fr: "Noisettes", es: "Avellanas" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 628, protein: 15, carbs: 17, fat: 61, fiber: 9.7 },
  { name: { en: "Pistachios", fr: "Pistaches", es: "Pistachos" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 560, protein: 20, carbs: 28, fat: 45, fiber: 10 },
  { name: { en: "Pecans", fr: "Noix de pécan", es: "Nueces pecanas" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 691, protein: 9.2, carbs: 14, fat: 72, fiber: 9.6 },
  { name: { en: "Macadamia nuts", fr: "Noix de macadamia", es: "Nueces de macadamia" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 718, protein: 7.9, carbs: 14, fat: 76, fiber: 8.6 },
  { name: { en: "Brazil nuts", fr: "Noix du Brésil", es: "Nueces de Brasil" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 656, protein: 14, carbs: 12, fat: 66, fiber: 7.5 },
  { name: { en: "Pine nuts", fr: "Pignons de pin", es: "Piñones" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 673, protein: 14, carbs: 13, fat: 68, fiber: 3.7 },
  { name: { en: "Peanuts", fr: "Cacahuètes", es: "Cacahuetes" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 567, protein: 26, carbs: 16, fat: 49, fiber: 8.5 },
  { name: { en: "Peanut butter", fr: "Beurre de cacahuète", es: "Mantequilla de maní" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 588, protein: 25, carbs: 20, fat: 50, fiber: 6 },
  { name: { en: "Almond butter", fr: "Beurre d'amande", es: "Mantequilla de almendras" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 614, protein: 21, carbs: 21, fat: 56, fiber: 12 },
  { name: { en: "Sunflower seeds", fr: "Graines de tournesol", es: "Semillas de girasol" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 584, protein: 21, carbs: 20, fat: 51, fiber: 8.6 },
  { name: { en: "Pumpkin seeds", fr: "Graines de courge", es: "Semillas de calabaza" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 559, protein: 30, carbs: 11, fat: 49, fiber: 6 },
  { name: { en: "Chia seeds", fr: "Graines de chia", es: "Semillas de chía" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 486, protein: 17, carbs: 42, fat: 31, fiber: 34 },
  { name: { en: "Flax seeds", fr: "Graines de lin", es: "Semillas de lino" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 534, protein: 18, carbs: 29, fat: 42, fiber: 27 },
  { name: { en: "Hemp seeds", fr: "Graines de chanvre", es: "Semillas de cáñamo" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 553, protein: 32, carbs: 9, fat: 49, fiber: 4 },
  { name: { en: "Sesame seeds", fr: "Graines de sésame", es: "Semillas de sésamo" }, category: { en: "Nuts & Seeds", fr: "Noix & Graines", es: "Nueces y Semillas" }, calories: 573, protein: 18, carbs: 23, fat: 50, fiber: 12 },

  // ============= ADDITIONAL DESSERTS =============
  { name: { en: "Greek yogurt (whole)", fr: "Yaourt grec entier", es: "Yogur griego entero" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 97, protein: 9, carbs: 3.9, fat: 5 },
  { name: { en: "Chocolate ice cream", fr: "Glace chocolat", es: "Helado de chocolate" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 216, protein: 3.8, carbs: 28, fat: 11 },
  { name: { en: "Strawberry ice cream", fr: "Glace fraise", es: "Helado de fresa" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 192, protein: 3.2, carbs: 27, fat: 8 },
  { name: { en: "Dark chocolate (85%)", fr: "Chocolat noir 85%", es: "Chocolate negro 85%" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 599, protein: 10, carbs: 28, fat: 52 },
  { name: { en: "White chocolate", fr: "Chocolat blanc", es: "Chocolate blanco" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 539, protein: 5.9, carbs: 59, fat: 32 },
  { name: { en: "Chocolate chip cookie", fr: "Cookie aux pépites de chocolat", es: "Galleta con chispas de chocolate" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 502, protein: 5.6, carbs: 64, fat: 24 },
  { name: { en: "Cheesecake", fr: "Cheesecake", es: "Tarta de queso" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 321, protein: 5.5, carbs: 26, fat: 23 },
  { name: { en: "Tiramisu", fr: "Tiramisu", es: "Tiramisú" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 240, protein: 4.5, carbs: 31, fat: 11 },
  { name: { en: "Apple pie", fr: "Tarte aux pommes", es: "Tarta de manzana" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 237, protein: 2, carbs: 34, fat: 11 },
  { name: { en: "Blueberry muffin", fr: "Muffin aux myrtilles", es: "Muffin de arándanos" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 313, protein: 5.3, carbs: 54, fat: 9 },
  { name: { en: "Donut", fr: "Donut", es: "Dona" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 452, protein: 4.9, carbs: 51, fat: 25 },
  { name: { en: "Cupcake", fr: "Cupcake", es: "Cupcake" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 305, protein: 3.6, carbs: 48, fat: 11 },
  { name: { en: "Panna cotta", fr: "Panna cotta", es: "Panna cotta" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 160, protein: 2.8, carbs: 18, fat: 9 },
  { name: { en: "Crème brûlée", fr: "Crème brûlée", es: "Crema catalana" }, category: { en: "Desserts", fr: "Desserts", es: "Postres" }, calories: 263, protein: 4, carbs: 22, fat: 18 },

  // ============= ADDITIONAL DRINKS =============
  { name: { en: "Sprite", fr: "Sprite", es: "Sprite" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 42, protein: 0, carbs: 11, fat: 0 },
  { name: { en: "Apple juice", fr: "Jus de pomme", es: "Jugo de manzana" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 46, protein: 0.1, carbs: 11, fat: 0.1 },
  { name: { en: "Grapefruit juice", fr: "Jus de pamplemousse", es: "Jugo de pomelo" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 39, protein: 0.5, carbs: 9, fat: 0.1 },
  { name: { en: "Tomato juice", fr: "Jus de tomate", es: "Jugo de tomate" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 17, protein: 0.8, carbs: 4.2, fat: 0.1 },
  { name: { en: "Almond milk", fr: "Lait d'amande", es: "Leche de almendras" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 17, protein: 0.6, carbs: 1.5, fat: 1.1 },
  { name: { en: "Soy milk", fr: "Lait de soja", es: "Leche de soja" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 54, protein: 3.3, carbs: 6.3, fat: 1.8 },
  { name: { en: "Oat milk", fr: "Lait d'avoine", es: "Leche de avena" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 47, protein: 1, carbs: 7.6, fat: 1.5 },
  { name: { en: "Coconut milk", fr: "Lait de coco", es: "Leche de coco" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 230, protein: 2.3, carbs: 6, fat: 24 },
  { name: { en: "Green tea", fr: "Thé vert", es: "Té verde" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 1, protein: 0, carbs: 0, fat: 0 },
  { name: { en: "Hot chocolate", fr: "Chocolat chaud", es: "Chocolate caliente" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 77, protein: 3.5, carbs: 10, fat: 2.3 },
  { name: { en: "Latte", fr: "Latte", es: "Café con leche" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 54, protein: 3.1, carbs: 4.9, fat: 2.3 },
  { name: { en: "Cappuccino", fr: "Cappuccino", es: "Cappuccino" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 33, protein: 1.8, carbs: 2.8, fat: 1.3 },
  { name: { en: "White wine", fr: "Vin blanc", es: "Vino blanco" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 82, protein: 0.1, carbs: 2.6, fat: 0 },
  { name: { en: "Rosé wine", fr: "Vin rosé", es: "Vino rosado" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 83, protein: 0.1, carbs: 2.5, fat: 0 },
  { name: { en: "Champagne", fr: "Champagne", es: "Champán" }, category: { en: "Drinks", fr: "Boissons", es: "Bebidas" }, calories: 76, protein: 0.2, carbs: 1.4, fat: 0 },

  // ============= ADDITIONAL BREAKFAST =============
  { name: { en: "Bagel", fr: "Bagel", es: "Bagel" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 257, protein: 10, carbs: 49, fat: 1.7 },
  { name: { en: "English muffin", fr: "Muffin anglais", es: "Muffin inglés" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 221, protein: 8.5, carbs: 43, fat: 2 },
  { name: { en: "Pancakes", fr: "Pancakes", es: "Panqueques" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 227, protein: 6.4, carbs: 28, fat: 10 },
  { name: { en: "Waffles", fr: "Gaufres", es: "Waffles" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 291, protein: 7.9, carbs: 33, fat: 15 },
  { name: { en: "French toast", fr: "Pain perdu", es: "Torrijas" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 156, protein: 6.8, carbs: 17, fat: 6.7 },
  { name: { en: "Maple syrup", fr: "Sirop d'érable", es: "Jarabe de arce" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 260, protein: 0, carbs: 67, fat: 0.1 },
  { name: { en: "Peanut butter & jelly sandwich", fr: "Sandwich beurre de cacahuète et confiture", es: "Sándwich de mantequilla de maní y mermelada" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 326, protein: 12, carbs: 48, fat: 11 },
  { name: { en: "Chocolate spread", fr: "Pâte à tartiner chocolat", es: "Crema de chocolate" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 539, protein: 6.3, carbs: 57, fat: 31 },
  { name: { en: "Corn flakes", fr: "Corn flakes", es: "Corn flakes" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 357, protein: 7.9, carbs: 84, fat: 0.4 },
  { name: { en: "Rice crisps", fr: "Rice krispies", es: "Rice krispies" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 381, protein: 6.9, carbs: 87, fat: 0.9 },
  { name: { en: "Protein bar", fr: "Barre protéinée", es: "Barra de proteína" }, category: { en: "Breakfast & Snacks", fr: "Petit déjeuner, Goûter", es: "Desayuno y Merienda" }, calories: 350, protein: 20, carbs: 40, fat: 10 },
]

// Generate the food database for a specific language
export function getFoodDatabase(language: Language): Food[] {
  return foodTranslations.map(item => ({
    name: item.name[language],
    category: item.category[language],
    calories: item.calories,
    protein: item.protein,
    carbs: item.carbs,
    fat: item.fat,
    ...(item.fiber !== undefined && { fiber: item.fiber }),
    ...(item.unit && { unit: item.unit[language] })
  }))
}

// Get categories for a specific language
export function getCategories(language: Language): string[] {
  const categorySet = new Set<string>()
  foodTranslations.forEach(item => {
    categorySet.add(item.category[language])
  })
  return Array.from(categorySet)
}

// Default export for backwards compatibility (French)
export const foodDatabase = getFoodDatabase('fr')
export const categories = getCategories('fr')
