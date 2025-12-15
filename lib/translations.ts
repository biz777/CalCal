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
    learnFeatures: 'Learn about the features',
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
    uploadPhoto: 'Click or drag to add photo'
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
    learnFeatures: 'Découvrez les fonctionnalités',
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
    uploadPhoto: 'Cliquez ou glissez pour ajouter une photo'
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
    learnFeatures: 'Conoce las funcionalidades',
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
    uploadPhoto: 'Haz clic o arrastra para agregar foto'
  }
}

export function useTranslation(language: Language): Translations {
  return translations[language] || translations.en
}
