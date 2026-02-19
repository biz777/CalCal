export type Language = 'en' | 'fr' | 'es'

interface Translations {
  title: string
  subtitle: string
  dailyCalories: string
  target: string
  kcal: string
  consumed: string
  macronutrients: string
  dailyDistribution: string
  protein: string
  carbs: string
  fat: string
  grams: string
  addFood: string
  selectCategory: string
  all: string
  searchPlaceholder: string
  quantity: string
  totalsFor: string
  addMeal: string
  cancel: string
  mealsOfDay: string
  noMeals: string
  startAdding: string
  setupProfile: string
  personalizeExperience: string
  age: string
  weight: string
  height: string
  gender: string
  male: string
  female: string
  activityLevel: string
  sedentary: string
  light: string
  moderate: string
  active: string
  veryActive: string
  goal: string
  loseWeight: string
  maintainWeight: string
  gainWeight: string
  saveProfile: string
  welcomeGuide: string
  learnFeatures: string
  personalizedGoals: string
  personalizedGoalsDesc: string
  trackMeals: string
  trackMealsDesc: string
  visualizeProgress: string
  visualizeProgressDesc: string
  addPhotos: string
  addPhotosDesc: string
  getStarted: string
  weeklyProgress: string
  last7Days: string
  caloriesEvolution: string
  macrosEvolution: string
  calories: string
  noDataYet: string
  startTrackingToSee: string
  addPhoto: string
  takePhoto: string
  uploadPhoto: string
  invalidAge: string
  invalidWeight: string
  invalidHeight: string
  saveError: string
  photoAdded: string
  removePhoto: string
  dropPhoto: string
  profileDesc: string
  save: string
  en: string
  fr: string
  es: string
  gotIt: string
  guideStep1Title: string
  guideStep1Desc: string
  guideStep2Title: string
  guideStep2Desc: string
  guideStep3Title: string
  guideStep3Desc: string
  guideStep4Title: string
  guideStep4Desc: string
  guideStep5Title: string
  guideStep5Desc: string
  guideStep6Title: string
  guideStep6Desc: string
  today: string
  yesterday: string
  noMealsThisDay: string
  startAddingThisDay: string
  mealsOfDate: string
}

const translations: Record<Language, Translations> = {
  en: {
    title: 'Calorie Tracker Pro',
    subtitle: 'Track your macros and reach your goals',
    dailyCalories: 'Daily Calories',
    target: 'Target',
    kcal: 'kcal',
    consumed: 'Consumed',
    macronutrients: 'Macronutrients',
    dailyDistribution: 'Daily Distribution',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    grams: 'g',
    addFood: 'Add Food',
    selectCategory: 'Select a category or search',
    all: 'All',
    searchPlaceholder: 'Search food...',
    quantity: 'Quantity (g)',
    totalsFor: 'Totals for',
    addMeal: 'Add Meal',
    cancel: 'Cancel',
    mealsOfDay: 'Meals of the Day',
    noMeals: 'No meals added yet',
    startAdding: 'Start adding your first meal!',
    setupProfile: 'Set Up Your Profile',
    personalizeExperience: 'Help us personalize your experience',
    age: 'Age (years)',
    weight: 'Weight (kg)',
    height: 'Height (cm)',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    activityLevel: 'Activity Level',
    sedentary: 'Sedentary (little or no exercise)',
    light: 'Light (1-3 days/week)',
    moderate: 'Moderate (3-5 days/week)',
    active: 'Active (6-7 days/week)',
    veryActive: 'Very Active (athlete)',
    goal: 'Goal',
    loseWeight: 'Lose Weight',
    maintainWeight: 'Maintain Weight',
    gainWeight: 'Gain Weight',
    saveProfile: 'Save Profile',
    welcomeGuide: 'Welcome to Calorie Tracker Pro!',
    learnFeatures: 'Everything you can do with the app',
    personalizedGoals: 'Personalized Goals',
    personalizedGoalsDesc: 'Get customized calorie and macro targets based on your profile and goals.',
    trackMeals: 'Track Your Meals',
    trackMealsDesc: 'Easily log your meals with our extensive food database and see your progress.',
    visualizeProgress: 'Visualize Your Progress',
    visualizeProgressDesc: 'See your weekly trends with beautiful charts and stay motivated.',
    addPhotos: 'Add Photos',
    addPhotosDesc: 'Capture your meals with photos to keep a visual diary of your nutrition journey.',
    getStarted: 'Get Started',
    weeklyProgress: 'Weekly Progress',
    last7Days: 'Last 7 days',
    caloriesEvolution: 'Calories Evolution',
    macrosEvolution: 'Macros Evolution',
    calories: 'Calories',
    noDataYet: 'No data yet',
    startTrackingToSee: 'Start tracking your meals to see your progress',
    addPhoto: 'Photo added',
    takePhoto: 'Drop photo here',
    uploadPhoto: 'Click or drag to add photo',
    invalidAge: 'Age must be between 1 and 120 years',
    invalidWeight: 'Weight must be greater than 0',
    invalidHeight: 'Height must be greater than 0',
    saveError: 'Error saving data',
    photoAdded: 'Photo added',
    removePhoto: 'Remove photo',
    dropPhoto: 'Drop the photo here',
    profileDesc: 'Help us personalize your experience',
    save: 'Save',
    en: 'English (US)',
    fr: 'Français',
    es: 'Español',
    gotIt: 'Got it, let\'s go!',
    guideStep1Title: '🎯 Personalized Goals',
    guideStep1Desc: 'Set up your profile (age, weight, height, goal) and get calorie & macro targets calculated just for you. Update it anytime via the profile button.',
    guideStep2Title: '🍽️ Add Foods & Custom Foods',
    guideStep2Desc: 'Browse our food database by category or search. Can\'t find what you need? Create your own custom foods with the "Custom food" button — they appear alongside standard foods.',
    guideStep3Title: '⭐ Favorite Meals',
    guideStep3Desc: 'Click "Create favorite" in your meal list, select one or more foods, give the group a name and save it. Then reuse it in one click from "My Favorites" — with portion multipliers (×½, ×1, ×2...).',
    guideStep4Title: '📅 Daily Navigation',
    guideStep4Desc: 'Browse the last 7 days using the date bar at the top. Days with meals show a green dot. Past days are read-only — only today\'s journal is editable.',
    guideStep5Title: '📊 Charts & Progress',
    guideStep5Desc: 'Click the chart icon (top right) to see your calorie and macro evolution over the last 7 days. A great way to spot trends and stay on track.',
    guideStep6Title: '💾 Backup & Restore',
    guideStep6Desc: 'Use the shield icon (top right) to export all your data as a JSON file. Restore it anytime on any device. Your meals, profile, favorites and custom foods are all included.',
    today: 'Today',
    yesterday: 'Yesterday',
    noMealsThisDay: 'No meals recorded this day',
    startAddingThisDay: 'No data for this day',
    mealsOfDate: 'Meals of'
  },
  fr: {
    title: 'Calorie Tracker Pro',
    subtitle: 'Suivez vos macros et atteignez vos objectifs',
    dailyCalories: 'Calories Quotidiennes',
    target: 'Objectif',
    kcal: 'kcal',
    consumed: 'Consommées',
    macronutrients: 'Macronutriments',
    dailyDistribution: 'Répartition Quotidienne',
    protein: 'Protéines',
    carbs: 'Glucides',
    fat: 'Lipides',
    grams: 'g',
    addFood: 'Ajouter un Aliment',
    selectCategory: 'Sélectionnez une catégorie ou recherchez',
    all: 'Tout',
    searchPlaceholder: 'Rechercher un aliment...',
    quantity: 'Quantité (g)',
    totalsFor: 'Total pour',
    addMeal: 'Ajouter le Repas',
    cancel: 'Annuler',
    mealsOfDay: 'Repas du Jour',
    noMeals: 'Aucun repas ajouté',
    startAdding: 'Commencez à ajouter votre premier repas !',
    setupProfile: 'Configurez Votre Profil',
    personalizeExperience: 'Aidez-nous à personnaliser votre expérience',
    age: 'Âge (ans)',
    weight: 'Poids (kg)',
    height: 'Taille (cm)',
    gender: 'Sexe',
    male: 'Homme',
    female: 'Femme',
    activityLevel: "Niveau d'Activité",
    sedentary: 'Sédentaire (peu ou pas d\'exercice)',
    light: 'Léger (1-3 jours/semaine)',
    moderate: 'Modéré (3-5 jours/semaine)',
    active: 'Actif (6-7 jours/semaine)',
    veryActive: 'Très Actif (athlète)',
    goal: 'Objectif',
    loseWeight: 'Perdre du Poids',
    maintainWeight: 'Maintenir le Poids',
    gainWeight: 'Prendre du Poids',
    saveProfile: 'Enregistrer le Profil',
    welcomeGuide: 'Bienvenue sur Calorie Tracker Pro !',
    learnFeatures: 'Tout ce que vous pouvez faire avec l\'app',
    personalizedGoals: 'Objectifs Personnalisés',
    personalizedGoalsDesc: 'Obtenez des objectifs de calories et macros personnalisés selon votre profil.',
    trackMeals: 'Suivez Vos Repas',
    trackMealsDesc: 'Enregistrez facilement vos repas avec notre base de données complète.',
    visualizeProgress: 'Visualisez Vos Progrès',
    visualizeProgressDesc: 'Consultez vos tendances hebdomadaires avec de beaux graphiques.',
    addPhotos: 'Ajoutez des Photos',
    addPhotosDesc: 'Capturez vos repas en photo pour garder un journal visuel de votre nutrition.',
    getStarted: 'Commencer',
    weeklyProgress: 'Progrès Hebdomadaire',
    last7Days: '7 derniers jours',
    caloriesEvolution: 'Évolution des Calories',
    macrosEvolution: 'Évolution des Macros',
    calories: 'Calories',
    noDataYet: 'Pas encore de données',
    startTrackingToSee: 'Commencez à suivre vos repas pour voir vos progrès',
    addPhoto: 'Photo ajoutée',
    takePhoto: 'Déposez la photo ici',
    uploadPhoto: 'Cliquez ou glissez pour ajouter une photo',
    invalidAge: "L'âge doit être entre 1 et 120 ans",
    invalidWeight: 'Le poids doit être supérieur à 0',
    invalidHeight: 'La taille doit être supérieure à 0',
    saveError: 'Erreur lors de la sauvegarde des données',
    photoAdded: 'Photo ajoutée',
    removePhoto: 'Retirer la photo',
    dropPhoto: 'Déposez la photo ici',
    profileDesc: 'Aidez-nous à personnaliser votre expérience',
    save: 'Enregistrer',
    en: 'English (US)',
    fr: 'Français',
    es: 'Español',
    gotIt: 'Compris, c\'est parti !',
    guideStep1Title: '🎯 Objectifs Personnalisés',
    guideStep1Desc: 'Renseignez votre profil (âge, poids, taille, objectif) et obtenez des cibles de calories et macros calculées pour vous. Modifiez-les à tout moment via le bouton profil.',
    guideStep2Title: '🍽️ Aliments & Aliments Perso',
    guideStep2Desc: 'Parcourez la base d\'aliments par catégorie ou par recherche. Un aliment manquant ? Créez vos propres aliments avec le bouton "Aliment perso" — ils s\'intègrent directement dans la liste.',
    guideStep3Title: '⭐ Repas Favoris',
    guideStep3Desc: 'Cliquez sur "Créer un favori" dans la liste des repas, sélectionnez un ou plusieurs aliments, donnez un nom au groupe et sauvegardez. Réutilisez-le en un clic depuis "Mes Favoris" — avec des multiplicateurs de portion (×½, ×1, ×2...).',
    guideStep4Title: '📅 Navigation par Jour',
    guideStep4Desc: 'Naviguez sur les 7 derniers jours via la barre de dates en haut. Les jours avec des repas affichent un point vert. Les jours passés sont en lecture seule — seul le journal d\'aujourd\'hui est modifiable.',
    guideStep5Title: '📊 Graphiques & Progrès',
    guideStep5Desc: 'Cliquez sur l\'icône graphique (en haut à droite) pour voir l\'évolution de vos calories et macros sur 7 jours. Idéal pour repérer les tendances et rester motivé.',
    guideStep6Title: '💾 Sauvegarde & Restauration',
    guideStep6Desc: 'Utilisez l\'icône bouclier (en haut à droite) pour exporter toutes vos données en fichier JSON. Restaurez-les à tout moment sur n\'importe quel appareil. Repas, profil, favoris et aliments perso sont tous inclus.',
    today: "Aujourd'hui",
    yesterday: 'Hier',
    noMealsThisDay: 'Aucun repas enregistré ce jour',
    startAddingThisDay: 'Pas de données pour ce jour',
    mealsOfDate: 'Repas du'
  },
  es: {
    title: 'Calorie Tracker Pro',
    subtitle: 'Rastrea tus macros y alcanza tus metas',
    dailyCalories: 'Calorías Diarias',
    target: 'Objetivo',
    kcal: 'kcal',
    consumed: 'Consumidas',
    macronutrients: 'Macronutrientes',
    dailyDistribution: 'Distribución Diaria',
    protein: 'Proteínas',
    carbs: 'Carbohidratos',
    fat: 'Grasas',
    grams: 'g',
    addFood: 'Agregar Alimento',
    selectCategory: 'Selecciona una categoría o busca',
    all: 'Todo',
    searchPlaceholder: 'Buscar alimento...',
    quantity: 'Cantidad (g)',
    totalsFor: 'Total para',
    addMeal: 'Agregar Comida',
    cancel: 'Cancelar',
    mealsOfDay: 'Comidas del Día',
    noMeals: 'No hay comidas agregadas',
    startAdding: '¡Comienza a agregar tu primera comida!',
    setupProfile: 'Configura Tu Perfil',
    personalizeExperience: 'Ayúdanos a personalizar tu experiencia',
    age: 'Edad (años)',
    weight: 'Peso (kg)',
    height: 'Altura (cm)',
    gender: 'Género',
    male: 'Masculino',
    female: 'Femenino',
    activityLevel: 'Nivel de Actividad',
    sedentary: 'Sedentario (poco o ningún ejercicio)',
    light: 'Ligero (1-3 días/semana)',
    moderate: 'Moderado (3-5 días/semana)',
    active: 'Activo (6-7 días/semana)',
    veryActive: 'Muy Activo (atleta)',
    goal: 'Meta',
    loseWeight: 'Perder Peso',
    maintainWeight: 'Mantener Peso',
    gainWeight: 'Ganar Peso',
    saveProfile: 'Guardar Perfil',
    welcomeGuide: '¡Bienvenido a Calorie Tracker Pro!',
    learnFeatures: 'Todo lo que puedes hacer con la app',
    personalizedGoals: 'Metas Personalizadas',
    personalizedGoalsDesc: 'Obtén objetivos de calorías y macros personalizados según tu perfil.',
    trackMeals: 'Rastrea Tus Comidas',
    trackMealsDesc: 'Registra fácilmente tus comidas con nuestra amplia base de datos.',
    visualizeProgress: 'Visualiza Tu Progreso',
    visualizeProgressDesc: 'Observa tus tendencias semanales con hermosos gráficos.',
    addPhotos: 'Agrega Fotos',
    addPhotosDesc: 'Captura tus comidas con fotos para llevar un diario visual de tu nutrición.',
    getStarted: 'Comenzar',
    weeklyProgress: 'Progreso Semanal',
    last7Days: 'Últimos 7 días',
    caloriesEvolution: 'Evolución de Calorías',
    macrosEvolution: 'Evolución de Macros',
    calories: 'Calorías',
    noDataYet: 'Aún no hay datos',
    startTrackingToSee: 'Comienza a rastrear tus comidas para ver tu progreso',
    addPhoto: 'Foto agregada',
    takePhoto: 'Suelta la foto aquí',
    uploadPhoto: 'Haz clic o arrastra para agregar foto',
    invalidAge: 'La edad debe estar entre 1 y 120 años',
    invalidWeight: 'El peso debe ser mayor que 0',
    invalidHeight: 'La altura debe ser mayor que 0',
    saveError: 'Error al guardar los datos',
    photoAdded: 'Foto añadida',
    removePhoto: 'Quitar foto',
    dropPhoto: 'Suelta la foto aquí',
    profileDesc: 'Ayúdanos a personalizar tu experiencia',
    save: 'Guardar',
    en: 'English (US)',
    fr: 'Français',
    es: 'Español',
    gotIt: '¡Entendido, vamos!',
    guideStep1Title: '🎯 Metas Personalizadas',
    guideStep1Desc: 'Configura tu perfil (edad, peso, altura, objetivo) y obtén objetivos de calorías y macros calculados para ti. Actualízalos en cualquier momento desde el botón de perfil.',
    guideStep2Title: '🍽️ Alimentos y Alimentos Personalizados',
    guideStep2Desc: '¿No encuentras lo que buscas? Crea tus propios alimentos con el botón "Alimento perso." — aparecen directamente junto a los alimentos estándar.',
    guideStep3Title: '⭐ Comidas Favoritas',
    guideStep3Desc: 'Pulsa "Crear favorito" en la lista de comidas, selecciona uno o varios alimentos, ponle un nombre al grupo y guárdalo. Reutilízalo en un clic desde "Mis Favoritos" — con multiplicadores de porción (×½, ×1, ×2...).',
    guideStep4Title: '📅 Navegación por Día',
    guideStep4Desc: 'Navega por los últimos 7 días con la barra de fechas superior. Los días con comidas muestran un punto verde. Los días pasados son de solo lectura — solo el diario de hoy es editable.',
    guideStep5Title: '📊 Gráficos y Progreso',
    guideStep5Desc: 'Pulsa el ícono de gráfico (arriba a la derecha) para ver la evolución de tus calorías y macros en 7 días. Ideal para detectar tendencias y mantenerse motivado.',
    guideStep6Title: '💾 Copia de Seguridad y Restauración',
    guideStep6Desc: 'Usa el ícono de escudo (arriba a la derecha) para exportar todos tus datos en un archivo JSON. Restáuralos en cualquier momento y en cualquier dispositivo. Comidas, perfil, favoritos y alimentos personalizados incluidos.',
    today: 'Hoy',
    yesterday: 'Ayer',
    noMealsThisDay: 'No hay comidas registradas este día',
    startAddingThisDay: 'No hay datos para este día',
    mealsOfDate: 'Comidas del'
  }
}

export function useTranslation(language: Language): Translations {
  return translations[language] || translations.en
}
