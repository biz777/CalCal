'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, UtensilsCrossed, User, Info, X, Camera, TrendingUp, ChevronLeft, ChevronRight, Download, UploadCloud, ShieldCheck, Star, ChefHat } from 'lucide-react'
import { getFoodDatabase, getCategories, type Food } from '@/lib/foodDatabase'
import { useTranslation, type Language } from '@/lib/translations'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useDropzone } from 'react-dropzone'
import dbManager from '@/lib/indexedDB'
import { FoodImage } from '@/components/FoodImage'

interface Meal {
  id: string
  food: Food
  quantity: number
  time: string
  photoId?: string
}

interface DayData {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
  meals: Meal[]
}

interface UserProfile {
  age: number
  weight: number
  height: number
  gender: 'male' | 'female'
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goal: 'lose' | 'maintain' | 'gain'
}

// ── Nouveaux types ─────────────────────────────────────────────────────────────

interface FavoriteMeal {
  id: string
  name: string
  meals: Meal[]
  savedAt: string
}

interface CustomFood extends Food {
  isCustom: true
  createdAt: string
}

// ──────────────────────────────────────────────────────────────────────────────

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function getDateOffset(offset: number): string {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return formatDate(d)
}

function formatDisplayDate(dateStr: string, language: Language): string {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString(
    language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US',
    { day: 'numeric', month: 'short' }
  )
}

function safeLocalStorageSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (e) {
    console.error(`❌ localStorage.setItem("${key}") failed:`, e)
    return false
  }
}

function safeLocalStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.error(`❌ localStorage.getItem("${key}") failed:`, e)
    return null
  }
}

export default function Home() {

  const isDataLoaded = useRef(false)

  useEffect(() => {
    const initFoodImages = async () => {
      try {
        const alreadyImported = await dbManager.areTestImagesImported()
        if (!alreadyImported) {
          await dbManager.importTestImages()
        }
      } catch (error) {
        console.error('❌ Erreur initialisation images:', error)
      }
    }
    initFoodImages()
  }, [])

  const [language, setLanguage] = useState<Language>('en')
  const t = useTranslation(language)

  const foodDatabase = useMemo(() => getFoodDatabase(language), [language])
  const categories = useMemo(() => getCategories(language), [language])

  const today = formatDate(new Date())

  const [selectedDate, setSelectedDate] = useState<string>(today)
  const isToday = selectedDate === today

  const [allDaysData, setAllDaysData] = useState<Record<string, Meal[]>>({})
  const [historyData, setHistoryData] = useState<DayData[]>([])

  const meals = allDaysData[selectedDate] || []

  const setMealsForDate = useCallback((date: string, newMeals: Meal[]) => {
    setAllDaysData(prev => ({ ...prev, [date]: newMeals }))
  }, [])

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [quantity, setQuantity] = useState('100')
  const [showProfile, setShowProfile] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [showCharts, setShowCharts] = useState(false)
  const [showBackup, setShowBackup] = useState(false)
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const [loadedPhotos, setLoadedPhotos] = useState<Map<string, string>>(new Map())

  // ── États Favoris ──────────────────────────────────────────────────────────
  const [favorites, setFavorites] = useState<FavoriteMeal[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [showFavoriteModal, setShowFavoriteModal] = useState(false)
  const [favoriteName, setFavoriteName] = useState('')
  const [selectedMealIds, setSelectedMealIds] = useState<Set<string>>(new Set())
  const [selectionMode, setSelectionMode] = useState(false)
  const [favoriteMultipliers, setFavoriteMultipliers] = useState<Record<string, number>>({})

  // ── États Aliments Personnalisés ───────────────────────────────────────────
  const [customFoods, setCustomFoods] = useState<CustomFood[]>([])
  const [showCustomFoodForm, setShowCustomFoodForm] = useState(false)
  const [newCustomFood, setNewCustomFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    category: ''
  })

  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  })

  // ─── Chargement initial ────────────────────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      const savedProfile = safeLocalStorageGet('userProfile')
      const savedLanguage = safeLocalStorageGet('language')
      const savedHistory = safeLocalStorageGet('weekHistory')
      const hasSeenGuide = safeLocalStorageGet('hasSeenGuide')

      if (savedLanguage) setLanguage(savedLanguage as Language)

      if (savedProfile) {
        try {
          setProfile(JSON.parse(savedProfile))
          if (!hasSeenGuide) setShowGuide(true)
        } catch (e) {
          console.error('❌ Impossible de parser le profil sauvegardé', e)
          setShowProfile(true)
        }
      } else {
        setShowProfile(true)
      }

      // Charger TOUS les jours
      const allDays: Record<string, Meal[]> = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('meals_')) {
          const date = key.replace('meals_', '')
          try {
            const raw = safeLocalStorageGet(key)
            if (raw) allDays[date] = validateAndFilterMeals(JSON.parse(raw))
          } catch (e) {
            console.error(`❌ Impossible de parser les repas du ${date}`, e)
          }
        }
      }

      const savedMeals = safeLocalStorageGet('todayMeals')
      const savedDate = safeLocalStorageGet('mealsDate')
      if (savedMeals && savedDate && !allDays[savedDate]) {
        try {
          allDays[savedDate] = JSON.parse(savedMeals)
        } catch {}
      }

      setAllDaysData(allDays)

      // Charger photos
      const allMeals = Object.values(allDays).flat()
      const photoIds = allMeals.filter(m => m.photoId).map(m => m.photoId!)
      if (photoIds.length > 0) {
        try {
          const photos = await dbManager.getPhotos(photoIds)
          setLoadedPhotos(photos)
        } catch (error) {
          console.error('Error loading photos:', error)
        }
      }

      if (savedHistory) {
        try {
          setHistoryData(JSON.parse(savedHistory))
        } catch (e) {
          console.error('❌ Impossible de parser l\'historique', e)
        }
      }

      // ── Charger Favoris ──────────────────────────────────────────────────
      const savedFavorites = safeLocalStorageGet('calcal_favorites')
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites))
        } catch (e) {
          console.error('❌ Impossible de parser les favoris', e)
        }
      }

      // ── Charger Aliments Personnalisés ───────────────────────────────────
      const savedCustomFoods = safeLocalStorageGet('calcal_custom_foods')
      if (savedCustomFoods) {
        try {
          setCustomFoods(JSON.parse(savedCustomFoods))
        } catch (e) {
          console.error('❌ Impossible de parser les aliments perso', e)
        }
      }

      isDataLoaded.current = true
    }

    loadData()
  }, [])

  // ─── Sauvegarde automatique ────────────────────────────────────────────
  useEffect(() => {
    if (!isDataLoaded.current) return

    Object.entries(allDaysData).forEach(([date, dayMeals]) => {
      safeLocalStorageSet(`meals_${date}`, JSON.stringify(dayMeals))
    })

    const newHistory: DayData[] = Object.entries(allDaysData)
      .map(([date, dayMeals]) => {
        const totals = calculateTotals(dayMeals)
        return { date, ...totals, meals: dayMeals }
      })
      .filter(d => d.meals.length > 0)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30)

    setHistoryData(newHistory)
    safeLocalStorageSet('weekHistory', JSON.stringify(newHistory))

    const validPhotoIds = Object.values(allDaysData).flat().filter(m => m.photoId).map(m => m.photoId!)
    dbManager.cleanupOrphanedPhotos(validPhotoIds).catch(console.error)

  }, [allDaysData])

  const calculateTotals = (mealsList: Meal[]) => {
    return mealsList.reduce((acc, meal) => {
      const multiplier = meal.quantity / 100
      return {
        calories: acc.calories + (meal.food.calories * multiplier),
        protein: acc.protein + (meal.food.protein * multiplier),
        carbs: acc.carbs + (meal.food.carbs * multiplier),
        fat: acc.fat + (meal.food.fat * multiplier)
      }
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
  }

  const compressImage = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = document.createElement('img')
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 800
          const MAX_HEIGHT = 800
          let width = img.width
          let height = img.height
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT }
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          resolve(canvas.toDataURL('image/jpeg', 0.7))
        }
        img.onerror = reject
        img.src = e.target?.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }, [])

  const isValidMeal = (meal: any): meal is Meal => {
    return (
      meal &&
      typeof meal.id === 'string' &&
      typeof meal.quantity === 'number' && meal.quantity > 0 &&
      typeof meal.time === 'string' &&
      meal.food &&
      typeof meal.food.name === 'string' &&
      typeof meal.food.calories === 'number' &&
      typeof meal.food.protein === 'number' &&
      typeof meal.food.carbs === 'number' &&
      typeof meal.food.fat === 'number'
    )
  }

  const validateAndFilterMeals = (meals: any[]): Meal[] => {
    if (!Array.isArray(meals)) return []
    return meals.filter(m => {
      const valid = isValidMeal(m)
      if (!valid) console.warn('⚠️ Repas corrompu ignoré:', m)
      return valid
    })
  }

  // ─── Export JSON ───────────────────────────────────────────────────────
  const exportData = () => {
    const backup = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      profile: profile,
      language: language,
      allDaysData: allDaysData,
      historyData: historyData,
      favorites: favorites,
      customFoods: customFoods
    }
    const json = JSON.stringify(backup, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `calcal-backup-${formatDate(new Date())}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ─── Import JSON ───────────────────────────────────────────────────────
  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const raw = event.target?.result as string
        const backup = JSON.parse(raw)

        if (!backup.version || !backup.exportDate) {
          alert(language === 'fr' ? '❌ Fichier invalide : ce n\'est pas un fichier CalCal.' : '❌ Invalid file: this is not a CalCal backup.')
          return
        }

        const cleanedDays: Record<string, Meal[]> = {}
        if (backup.allDaysData && typeof backup.allDaysData === 'object') {
          Object.entries(backup.allDaysData).forEach(([date, meals]) => {
            const cleaned = validateAndFilterMeals(meals as any[])
            if (cleaned.length > 0) cleanedDays[date] = cleaned
          })
        }

        if (backup.profile && typeof backup.profile.age === 'number') {
          setProfile(backup.profile)
          safeLocalStorageSet('userProfile', JSON.stringify(backup.profile))
        }

        if (backup.language) {
          setLanguage(backup.language)
          safeLocalStorageSet('language', backup.language)
        }

        if (backup.favorites && Array.isArray(backup.favorites)) {
          setFavorites(backup.favorites)
          safeLocalStorageSet('calcal_favorites', JSON.stringify(backup.favorites))
        }

        if (backup.customFoods && Array.isArray(backup.customFoods)) {
          setCustomFoods(backup.customFoods)
          safeLocalStorageSet('calcal_custom_foods', JSON.stringify(backup.customFoods))
        }

        setAllDaysData(cleanedDays)
        isDataLoaded.current = true

        const totalMeals = Object.values(cleanedDays).reduce((acc, m) => acc + m.length, 0)
        const msg = language === 'fr'
          ? `✅ Restauration réussie !\n${Object.keys(cleanedDays).length} jours et ${totalMeals} repas importés.`
          : language === 'es'
          ? `✅ Restauración exitosa!\n${Object.keys(cleanedDays).length} días y ${totalMeals} comidas importadas.`
          : `✅ Restore successful!\n${Object.keys(cleanedDays).length} days and ${totalMeals} meals imported.`
        alert(msg)
        setShowBackup(false)
      } catch (err) {
        alert(language === 'fr' ? '❌ Fichier corrompu ou illisible.' : '❌ Corrupted or unreadable file.')
        console.error('Import error:', err)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const calculateDailyCalories = (profile: UserProfile) => {
    const { age, weight, height, gender, activityLevel, goal } = profile
    let bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161
    const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 }
    let tdee = bmr * activityMultipliers[activityLevel]
    if (goal === 'lose') tdee -= 500
    if (goal === 'gain') tdee += 500
    return Math.round(tdee)
  }

  const dailyCalories = calculateDailyCalories(profile)
  const recommendedMacros = {
    protein: Math.round(profile.weight * 2),
    carbs: Math.round(dailyCalories * 0.4 / 4),
    fat: Math.round(dailyCalories * 0.3 / 9)
  }

  const totals = calculateTotals(meals)

  const last7Days = Array.from({ length: 7 }, (_, i) => getDateOffset(-(6 - i)))

  const navigateDay = (direction: 'prev' | 'next') => {
    const currentIndex = last7Days.indexOf(selectedDate)
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedDate(last7Days[currentIndex - 1])
      setSelectionMode(false)
      setSelectedMealIds(new Set())
    } else if (direction === 'next' && currentIndex < last7Days.length - 1) {
      setSelectedDate(last7Days[currentIndex + 1])
      setSelectionMode(false)
      setSelectedMealIds(new Set())
    }
  }

  const getDayLabel = (dateStr: string) => {
    if (dateStr === today) return t.today
    if (dateStr === getDateOffset(-1)) return t.yesterday
    return formatDisplayDate(dateStr, language)
  }

  const hasDataForDay = (dateStr: string) => {
    return (allDaysData[dateStr] || []).length > 0
  }

  const MacroBar = ({ label, current, target, color }: { label: string; current: number; target: number; color: string }) => (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-base text-gray-700">{label}</span>
        <span className="text-base font-bold text-gray-900">{Math.round(current)}{t.grams} / {target}{t.grams}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div className={`${color} h-3 rounded-full transition-all duration-500 shadow-md`} style={{ width: `${Math.min((current / target) * 100, 100)}%` }} />
      </div>
    </div>
  )

  const addMeal = async () => {
    if (!isToday) return
    if (selectedFood && quantity) {
      const mealId = Date.now().toString()
      let photoId: string | undefined = undefined

      if (uploadedPhoto) {
        photoId = `photo_${mealId}`
        try {
          await dbManager.savePhoto(photoId, uploadedPhoto)
          setLoadedPhotos(prev => new Map(prev).set(photoId!, uploadedPhoto))
        } catch (error) {
          console.error('Error saving photo:', error)
          alert('Erreur lors de la sauvegarde de la photo.')
          return
        }
      }

      const newMeal: Meal = {
        id: mealId,
        food: selectedFood,
        quantity: parseFloat(quantity),
        time: new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        photoId
      }

      setMealsForDate(today, [...(allDaysData[today] || []), newMeal])
      setSelectedFood(null)
      setQuantity('100')
      setSearchQuery('')
      setUploadedPhoto(null)
    }
  }

  const deleteMeal = async (id: string) => {
    if (!isToday) return
    const mealToDelete = meals.find(m => m.id === id)
    if (mealToDelete?.photoId) {
      try {
        await dbManager.deletePhoto(mealToDelete.photoId)
        setLoadedPhotos(prev => { const m = new Map(prev); m.delete(mealToDelete.photoId!); return m })
      } catch (error) {
        console.error('Error deleting photo:', error)
      }
    }
    setMealsForDate(today, (allDaysData[today] || []).filter(m => m.id !== id))
  }

  const saveProfile = () => {
    if (profile.age < 1 || profile.age > 150) { alert('Please enter a valid age between 1 and 150'); return }
    if (profile.weight < 20 || profile.weight > 500) { alert('Please enter a valid weight between 20 and 500 kg'); return }
    if (profile.height < 50 || profile.height > 300) { alert('Please enter a valid height between 50 and 300 cm'); return }
    const saved = safeLocalStorageSet('userProfile', JSON.stringify(profile))
    if (!saved) {
      alert('Échec de la sauvegarde du profil. Stockage insuffisant.')
      return
    }
    setHasProfile(true)
    setShowProfile(false)
    setShowGuide(true)
  }

  // ── filteredFoods : merge aliments standard + perso ────────────────────
  const filteredFoods = useMemo(() => {
    const allFoods: Food[] = [...foodDatabase, ...customFoods]
    return allFoods.filter(food => {
      const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory
      const matchesSearch = searchQuery === '' ||
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [foodDatabase, customFoods, selectedCategory, searchQuery])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      try {
        const compressedImage = await compressImage(file)
        setUploadedPhoto(compressedImage)
      } catch (error) {
        alert('Erreur lors du traitement de l\'image.')
      }
    }
  }, [compressImage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  })

  // ── Logique Favoris (groupes) ──────────────────────────────────────────

  const toggleSelectionMode = () => {
    setSelectionMode(v => !v)
    setSelectedMealIds(new Set())
  }

  const toggleMealSelection = (id: string) => {
    setSelectedMealIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const openFavoriteModal = () => {
    if (selectedMealIds.size === 0) return
    const selectedNames = meals.filter(m => selectedMealIds.has(m.id)).map(m => m.food.name)
    setFavoriteName(selectedNames.length === 1 ? selectedNames[0] : '')
    setShowFavoriteModal(true)
  }

  const saveFavorite = () => {
    if (!favoriteName.trim() || selectedMealIds.size === 0) return
    const selectedMeals = meals.filter(m => selectedMealIds.has(m.id))
    const newFavorite: FavoriteMeal = {
      id: Date.now().toString(),
      name: favoriteName.trim(),
      meals: selectedMeals,
      savedAt: new Date().toISOString()
    }
    const updated = [...favorites, newFavorite]
    setFavorites(updated)
    safeLocalStorageSet('calcal_favorites', JSON.stringify(updated))
    setShowFavoriteModal(false)
    setFavoriteName('')
    setSelectedMealIds(new Set())
    setSelectionMode(false)
  }

  const deleteFavorite = (id: string) => {
    const updated = favorites.filter(f => f.id !== id)
    setFavorites(updated)
    safeLocalStorageSet('calcal_favorites', JSON.stringify(updated))
  }

  const addFavoriteToJournal = (fav: FavoriteMeal) => {
    if (!isToday) return
    const multiplier = favoriteMultipliers[fav.id] ?? 1
    const currentMeals = allDaysData[today] || []
    const newMeals = fav.meals.map(m => ({
      ...m,
      id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
      quantity: Math.round(m.quantity * multiplier),
      time: new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    }))
    setMealsForDate(today, [...currentMeals, ...newMeals])
  }

  const MULTIPLIERS = [0.5, 0.75, 1, 1.5, 2]
  const MULTIPLIER_LABELS = ['×½', '×¾', '×1', '×1.5', '×2']

  // ── Logique Aliments Personnalisés ─────────────────────────────────────

  const saveCustomFood = () => {
    const { name, calories, protein, carbs, fat, category } = newCustomFood
    if (!name.trim()) {
      alert(language === 'fr' ? 'Le nom est obligatoire.' : 'Name is required.')
      return
    }
    if (!calories || isNaN(Number(calories)) || Number(calories) < 0) {
      alert(language === 'fr' ? 'Calories invalides.' : 'Invalid calories.')
      return
    }

    const customFood: CustomFood = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      category: category.trim() || (language === 'fr' ? 'Perso' : language === 'es' ? 'Personalizado' : 'Custom'),
      isCustom: true,
      createdAt: new Date().toISOString()
    }

    const updated = [...customFoods, customFood]
    setCustomFoods(updated)
    safeLocalStorageSet('calcal_custom_foods', JSON.stringify(updated))
    setNewCustomFood({ name: '', calories: '', protein: '', carbs: '', fat: '', category: '' })
    setShowCustomFoodForm(false)
  }

  const deleteCustomFood = (id: string) => {
    const updated = customFoods.filter(f => f.id !== id)
    setCustomFoods(updated)
    safeLocalStorageSet('calcal_custom_foods', JSON.stringify(updated))
  }

  // ──────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50">

      {/* ── Guide ── */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full border-2 border-indigo-300 shadow-2xl max-h-[90vh] flex flex-col">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-200">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl text-gray-900 mb-2">{t.welcomeGuide}</CardTitle>
                  <CardDescription className="text-base">{t.learnFeatures}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowGuide(false)} className="hover:bg-indigo-100">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 overflow-y-auto">
              <div className="space-y-4">
                {[
                  { num: 1, bg: 'bg-gradient-to-br from-blue-50 to-blue-100', border: 'border-blue-200', circle: 'bg-blue-500', title: t.guideStep1Title, desc: t.guideStep1Desc },
                  { num: 2, bg: 'bg-gradient-to-br from-green-50 to-green-100', border: 'border-green-200', circle: 'bg-green-500', title: t.guideStep2Title, desc: t.guideStep2Desc },
                  { num: 3, bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100', border: 'border-yellow-200', circle: 'bg-yellow-500', title: t.guideStep3Title, desc: t.guideStep3Desc },
                  { num: 4, bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100', border: 'border-indigo-200', circle: 'bg-indigo-500', title: t.guideStep4Title, desc: t.guideStep4Desc },
                  { num: 5, bg: 'bg-gradient-to-br from-purple-50 to-purple-100', border: 'border-purple-200', circle: 'bg-purple-500', title: t.guideStep5Title, desc: t.guideStep5Desc },
                  { num: 6, bg: 'bg-gradient-to-br from-orange-50 to-orange-100', border: 'border-orange-200', circle: 'bg-orange-500', title: t.guideStep6Title, desc: t.guideStep6Desc },
                ].map(step => (
                  <div key={step.num} className={`flex gap-4 items-start p-4 ${step.bg} rounded-lg border-2 ${step.border}`}>
                    <div className={`${step.circle} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0`}>{step.num}</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={() => { setShowGuide(false); safeLocalStorageSet('hasSeenGuide', 'true') }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 text-base font-semibold shadow-lg">
                {t.gotIt}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Profile ── */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full border-2 border-indigo-300 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-200">
              <CardTitle className="text-2xl text-gray-900">{t.setupProfile}</CardTitle>
              <CardDescription className="text-base">{t.profileDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-base font-semibold">{t.age}</Label>
                  <Input type="number" value={profile.age} onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})} className="mt-2 h-11 text-base border-2" />
                </div>
                <div>
                  <Label className="text-base font-semibold">{t.gender}</Label>
                  <select value={profile.gender} onChange={(e) => setProfile({...profile, gender: e.target.value as 'male' | 'female'})} className="w-full mt-2 h-11 px-3 rounded-md border-2 text-base bg-white">
                    <option value="male">{t.male}</option>
                    <option value="female">{t.female}</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-base font-semibold">{t.weight}</Label>
                  <Input type="number" value={profile.weight} onChange={(e) => setProfile({...profile, weight: parseInt(e.target.value)})} className="mt-2 h-11 text-base border-2" />
                </div>
                <div>
                  <Label className="text-base font-semibold">{t.height}</Label>
                  <Input type="number" value={profile.height} onChange={(e) => setProfile({...profile, height: parseInt(e.target.value)})} className="mt-2 h-11 text-base border-2" />
                </div>
              </div>
              <div>
                <Label className="text-base font-semibold">{t.activityLevel}</Label>
                <select value={profile.activityLevel} onChange={(e) => setProfile({...profile, activityLevel: e.target.value as any})} className="w-full mt-2 h-11 px-3 rounded-md border-2 text-base bg-white">
                  <option value="sedentary">{t.sedentary}</option>
                  <option value="light">{t.light}</option>
                  <option value="moderate">{t.moderate}</option>
                  <option value="active">{t.active}</option>
                  <option value="very_active">{t.veryActive}</option>
                </select>
              </div>
              <div>
                <Label className="text-base font-semibold">{t.goal}</Label>
                <select value={profile.goal} onChange={(e) => setProfile({...profile, goal: e.target.value as any})} className="w-full mt-2 h-11 px-3 rounded-md border-2 text-base bg-white">
                  <option value="lose">{t.loseWeight}</option>
                  <option value="maintain">{t.maintainWeight}</option>
                  <option value="gain">{t.gainWeight}</option>
                </select>
              </div>
              <Button onClick={saveProfile} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 text-base font-semibold shadow-lg">
                {t.save}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Charts ── */}
      {showCharts && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full border-2 border-indigo-300 shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-200 sticky top-0 z-10">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-gray-900">{t.weeklyProgress}</CardTitle>
                  <CardDescription className="text-base">{t.last7Days}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowCharts(false)} className="hover:bg-indigo-100">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historyData.slice().reverse()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="calories" stroke="#8b5cf6" strokeWidth={2} name={t.calories} />
                    <Line type="monotone" dataKey="protein" stroke="#ef4444" strokeWidth={2} name={t.protein} />
                    <Line type="monotone" dataKey="carbs" stroke="#3b82f6" strokeWidth={2} name={t.carbs} />
                    <Line type="monotone" dataKey="fat" stroke="#f59e0b" strokeWidth={2} name={t.fat} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Modal Nommer un Favori ── */}
      {showFavoriteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-sm w-full border-2 border-yellow-300 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 border-b-2 border-yellow-200">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    {language === 'fr' ? 'Ajouter aux Favoris' : language === 'es' ? 'Añadir a Favoritos' : 'Add to Favorites'}
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {language === 'fr' ? 'Donnez un nom à ce repas favori' : language === 'es' ? 'Dale un nombre a este favorito' : 'Give a name to this favorite meal'}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowFavoriteModal(false)} className="hover:bg-yellow-100">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {/* Aperçu des repas sélectionnés */}
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {meals.filter(m => selectedMealIds.has(m.id)).map(m => (
                  <div key={m.id} className="p-2 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-gray-700 flex justify-between">
                    <span className="font-semibold">{m.food.name}</span>
                    <span className="text-gray-500">{m.quantity}g · {Math.round(m.food.calories * m.quantity / 100)} kcal</span>
                  </div>
                ))}
              </div>
              <div>
                <Label className="text-sm font-semibold">
                  {language === 'fr' ? 'Nom du favori' : language === 'es' ? 'Nombre del favorito' : 'Favorite name'}
                </Label>
                <Input
                  value={favoriteName}
                  onChange={e => setFavoriteName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveFavorite()}
                  className="mt-2 h-11 border-2 border-yellow-300 focus:border-yellow-500"
                  placeholder={language === 'fr' ? 'Ex: Mon petit-déjeuner' : language === 'es' ? 'Ej: Mi desayuno' : 'E.g: My breakfast'}
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={saveFavorite} className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 h-11 font-semibold text-white shadow">
                  <Star className="w-4 h-4 mr-2 fill-white" />
                  {language === 'fr' ? 'Sauvegarder' : language === 'es' ? 'Guardar' : 'Save'}
                </Button>
                <Button onClick={() => { setShowFavoriteModal(false) }} variant="outline" className="border-2 h-11">
                  {language === 'fr' ? 'Annuler' : language === 'es' ? 'Cancelar' : 'Cancel'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-7xl">

        {/* ── Modal Sauvegarde / Restauration ── */}
        {showBackup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full border-2 border-green-300 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-green-600" />
                      {language === 'fr' ? 'Sauvegarde & Restauration' : language === 'es' ? 'Copia de seguridad' : 'Backup & Restore'}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {language === 'fr' ? 'Protégez vos données contre toute perte' : language === 'es' ? 'Proteja sus datos' : 'Protect your data against any loss'}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowBackup(false)} className="hover:bg-green-100">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        {language === 'fr' ? '📤 Exporter mes données' : language === 'es' ? '📤 Exportar datos' : '📤 Export my data'}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 mb-3">
                        {language === 'fr'
                          ? 'Télécharge un fichier .json avec tous tes repas, ton profil, tes favoris et aliments perso.'
                          : language === 'es'
                          ? 'Descarga un archivo .json con todas tus comidas, perfil, favoritos y alimentos personalizados.'
                          : 'Downloads a .json file with all your meals, profile, favorites and custom foods. Keep it safe!'}
                      </p>
                      <Button onClick={exportData} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                        <Download className="w-4 h-4 mr-2" />
                        {language === 'fr' ? `Télécharger la sauvegarde` : language === 'es' ? 'Descargar copia' : 'Download backup'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 p-2 rounded-lg">
                      <UploadCloud className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        {language === 'fr' ? '📥 Restaurer mes données' : language === 'es' ? '📥 Restaurar datos' : '📥 Restore my data'}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 mb-3">
                        {language === 'fr'
                          ? '⚠️ Attention : restaurer remplacera toutes tes données actuelles par celles du fichier.'
                          : language === 'es'
                          ? '⚠️ Atención: restaurar reemplazará todos los datos actuales.'
                          : '⚠️ Warning: restoring will replace all your current data with the file\'s data.'}
                      </p>
                      <label className="w-full cursor-pointer">
                        <div className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                          <UploadCloud className="w-4 h-4" />
                          {language === 'fr' ? 'Choisir un fichier de sauvegarde' : language === 'es' ? 'Elegir archivo' : 'Choose backup file'}
                        </div>
                        <input type="file" accept=".json" onChange={importData} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-center text-gray-500">
                  {language === 'fr'
                    ? '💡 Conseil : faites une sauvegarde régulièrement, par exemple chaque semaine.'
                    : language === 'es'
                    ? '💡 Consejo: haga una copia de seguridad regularmente.'
                    : '💡 Tip: make a backup regularly, for example every week.'}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border-2 border-indigo-200">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-base text-gray-600">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {(['en', 'fr', 'es'] as Language[]).map(lang => (
                <Button key={lang} variant={language === lang ? 'default' : 'outline'} onClick={() => { setLanguage(lang); safeLocalStorageSet('language', lang) }} size="sm" className={language === lang ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'border-2'}>
                  {lang === 'en' ? '🇺🇸' : lang === 'fr' ? '🇫🇷' : '🇪🇸'} {t[lang]}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowCharts(true)} className="border-2 hover:border-indigo-400" title={language === 'fr' ? 'Graphiques & Progrès' : language === 'es' ? 'Gráficos & Progreso' : 'Charts & Progress'}>
              <TrendingUp className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowBackup(true)} className="border-2 hover:border-green-400 hover:text-green-600" title={language === 'fr' ? 'Sauvegarde & Restauration' : language === 'es' ? 'Copia de seguridad' : 'Backup & Restore'}>
              <ShieldCheck className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowProfile(true)} className="border-2 hover:border-indigo-400" title={language === 'fr' ? 'Mon Profil' : language === 'es' ? 'Mi Perfil' : 'My Profile'}>
              <User className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowGuide(true)} className="border-2 hover:border-indigo-400" title={language === 'fr' ? 'Guide d\'utilisation' : language === 'es' ? 'Guía de uso' : 'User Guide'}>
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* ── Navigation par jour ── */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-indigo-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDay('prev')}
              disabled={selectedDate === last7Days[0]}
              className="border-2 hover:border-indigo-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2 overflow-x-auto px-2 scrollbar-none" style={{msOverflowStyle:'none', scrollbarWidth:'none'}}>
              {last7Days.map(date => {
                const hasData = hasDataForDay(date)
                const isSelected = date === selectedDate
                return (
                  <button
                    key={date}
                    onClick={() => { setSelectedDate(date); setSelectionMode(false); setSelectedMealIds(new Set()) }}
                    className={`relative flex flex-col items-center px-3 py-2 rounded-xl transition-all min-w-[60px] ${
                      isSelected
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-50 hover:bg-indigo-50 text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <span className="text-xs font-medium">{getDayLabel(date)}</span>
                    {hasData && (
                      <span className={`mt-1 w-2.5 h-2.5 rounded-full shadow-sm ${
                        isSelected ? 'bg-green-300 shadow-green-300/50' : 'bg-green-500 shadow-green-500/50'
                      }`}
                      style={{ boxShadow: isSelected ? '0 0 6px 2px rgba(134,239,172,0.7)' : '0 0 6px 2px rgba(34,197,94,0.6)' }}
                      />
                    )}
                    {!hasData && <span className="mt-1 w-2.5 h-2.5" />}
                  </button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDay('next')}
              disabled={selectedDate === today}
              className="border-2 hover:border-indigo-400"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center text-sm font-semibold text-indigo-700">
            {isToday ? `📅 ${t.today}` : `📅 ${formatDisplayDate(selectedDate, language)}`}
            {!isToday && <span className="ml-2 text-xs text-gray-500">(lecture seule)</span>}
          </div>
        </div>

        {/* ── Calories & Macros ── */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-indigo-300 shadow-xl bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl text-gray-800">{t.dailyCalories}</CardTitle>
              <CardDescription className="text-base font-medium">{t.target}: {dailyCalories} {t.kcal}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-6xl font-bold text-indigo-600">{Math.round(totals.calories)}</div>
                <div className="text-lg text-gray-600 mt-2">{t.consumed}</div>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-4 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-500 shadow-md" style={{ width: `${Math.min((totals.calories / dailyCalories) * 100, 100)}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-300 shadow-xl bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl text-gray-800">{t.macronutrients}</CardTitle>
              <CardDescription className="text-base font-medium">{t.dailyDistribution}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <MacroBar label={t.protein} current={totals.protein} target={recommendedMacros.protein} color="bg-gradient-to-r from-red-500 to-red-600" />
              <MacroBar label={t.carbs} current={totals.carbs} target={recommendedMacros.carbs} color="bg-gradient-to-r from-blue-500 to-blue-600" />
              <MacroBar label={t.fat} current={totals.fat} target={recommendedMacros.fat} color="bg-gradient-to-r from-yellow-500 to-orange-500" />
            </CardContent>
          </Card>
        </div>

        {/* ── Ajouter un aliment (seulement aujourd'hui) ── */}
        {isToday && (
          <Card className="border-2 border-indigo-300 shadow-xl bg-white mb-6">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-800">{t.addFood}</CardTitle>
                  <CardDescription className="text-base">{t.selectCategory}</CardDescription>
                </div>
                {/* ── Bouton Créer aliment perso ── */}
                <Button
                  variant="outline"
                  onClick={() => setShowCustomFoodForm(v => !v)}
                  className="border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 text-purple-700 font-semibold gap-2"
                >
                  <ChefHat className="w-4 h-4" />
                  {language === 'fr' ? '+ Aliment perso' : language === 'es' ? '+ Alimento perso.' : '+ Custom food'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">

              {/* ── Formulaire Aliment Personnalisé ── */}
              {showCustomFoodForm && (
                <div className="p-5 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl border-2 border-purple-300 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-purple-800 flex items-center gap-2">
                      <ChefHat className="w-5 h-5" />
                      {language === 'fr' ? '🥗 Créer un aliment personnalisé' : language === 'es' ? '🥗 Crear alimento personalizado' : '🥗 Create a custom food'}
                    </h3>
                    <button onClick={() => setShowCustomFoodForm(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <Label className="text-sm font-semibold text-purple-700">
                        {language === 'fr' ? 'Nom *' : language === 'es' ? 'Nombre *' : 'Name *'}
                      </Label>
                      <Input
                        value={newCustomFood.name}
                        onChange={e => setNewCustomFood(p => ({...p, name: e.target.value}))}
                        className="mt-1 h-10 border-2 border-purple-200 focus:border-purple-500"
                        placeholder={language === 'fr' ? 'Ex: Ma salade maison' : language === 'es' ? 'Ej: Mi ensalada' : 'E.g: My homemade salad'}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-purple-700">
                        {language === 'fr' ? 'Catégorie' : language === 'es' ? 'Categoría' : 'Category'}
                      </Label>
                      <Input
                        value={newCustomFood.category}
                        onChange={e => setNewCustomFood(p => ({...p, category: e.target.value}))}
                        className="mt-1 h-10 border-2 border-purple-200 focus:border-purple-500"
                        placeholder={language === 'fr' ? 'Ex: Maison' : language === 'es' ? 'Ej: Casero' : 'E.g: Homemade'}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-purple-700">
                        {language === 'fr' ? 'Calories (kcal/100g) *' : language === 'es' ? 'Calorías (kcal/100g) *' : 'Calories (kcal/100g) *'}
                      </Label>
                      <Input
                        type="number" min="0"
                        value={newCustomFood.calories}
                        onChange={e => setNewCustomFood(p => ({...p, calories: e.target.value}))}
                        className="mt-1 h-10 border-2 border-purple-200 focus:border-purple-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-purple-700">{t.protein} (g/100g)</Label>
                      <Input
                        type="number" min="0"
                        value={newCustomFood.protein}
                        onChange={e => setNewCustomFood(p => ({...p, protein: e.target.value}))}
                        className="mt-1 h-10 border-2 border-purple-200 focus:border-purple-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-purple-700">{t.carbs} (g/100g)</Label>
                      <Input
                        type="number" min="0"
                        value={newCustomFood.carbs}
                        onChange={e => setNewCustomFood(p => ({...p, carbs: e.target.value}))}
                        className="mt-1 h-10 border-2 border-purple-200 focus:border-purple-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-purple-700">{t.fat} (g/100g)</Label>
                      <Input
                        type="number" min="0"
                        value={newCustomFood.fat}
                        onChange={e => setNewCustomFood(p => ({...p, fat: e.target.value}))}
                        className="mt-1 h-10 border-2 border-purple-200 focus:border-purple-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={saveCustomFood} className="flex-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 h-10 font-semibold shadow">
                      <Plus className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Créer l\'aliment' : language === 'es' ? 'Crear alimento' : 'Create food'}
                    </Button>
                    <Button onClick={() => setShowCustomFoodForm(false)} variant="outline" className="border-2 h-10">
                      {language === 'fr' ? 'Annuler' : language === 'es' ? 'Cancelar' : 'Cancel'}
                    </Button>
                  </div>
                  {/* Liste des aliments perso existants */}
                  {customFoods.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                        {language === 'fr' ? 'Mes aliments perso' : language === 'es' ? 'Mis alimentos' : 'My custom foods'} ({customFoods.length})
                      </p>
                      {customFoods.map(cf => (
                        <div key={cf.id} className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-purple-200 text-sm">
                          <span className="font-medium text-gray-800">{cf.name}</span>
                          <div className="flex items-center gap-3 text-gray-500">
                            <span>{cf.calories} kcal</span>
                            <button onClick={() => deleteCustomFood(cf.id)} className="text-red-400 hover:text-red-600 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: 'thin', scrollbarColor: '#818cf8 #e0e7ff' }}>
                <Button variant={selectedCategory === 'all' ? 'default' : 'outline'} onClick={() => setSelectedCategory('all')} size="sm" className={selectedCategory === 'all' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md' : 'border-2 hover:border-indigo-300'}>
                  {t.all}
                </Button>
                {categories.map(cat => (
                  <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} onClick={() => setSelectedCategory(cat)} size="sm" className={selectedCategory === cat ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md whitespace-nowrap' : 'whitespace-nowrap border-2 hover:border-indigo-300'}>
                    {cat}
                  </Button>
                ))}
                {/* Badge catégorie Perso si aliments perso existent */}
                {customFoods.length > 0 && (
                  <Button
                    variant={selectedCategory === (language === 'fr' ? 'Perso' : language === 'es' ? 'Personalizado' : 'Custom') ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(language === 'fr' ? 'Perso' : language === 'es' ? 'Personalizado' : 'Custom')}
                    size="sm"
                    className="whitespace-nowrap border-2 border-purple-300 hover:border-purple-500 text-purple-700 hover:bg-purple-50"
                  >
                    🥗 {language === 'fr' ? 'Perso' : language === 'es' ? 'Perso.' : 'Custom'}
                  </Button>
                )}
              </div>

              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value.trim() !== '') setSelectedCategory('all') }}
                className="h-12 text-base border-2 focus:border-indigo-400"
              />

              {!selectedFood && (
                <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
                  {filteredFoods.map((food, index) => (
                    <div key={index} onClick={() => setSelectedFood(food)} className={`p-4 rounded-lg border-2 hover:shadow-md cursor-pointer transition-all ${
                      (food as CustomFood).isCustom
                        ? 'bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-200 hover:border-purple-400'
                        : 'bg-gradient-to-br from-white to-indigo-50 border-gray-200 hover:border-indigo-400'
                    }`}>
                      <div className="flex gap-3 items-start">
                        {!(food as CustomFood).isCustom && (
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                            <FoodImage foodId={food.id || food.name.toLowerCase().replace(/[^a-z0-9]/g, '_')} foodName={food.name} foodCategory={food.category} className="w-full h-full" />
                          </div>
                        )}
                        {(food as CustomFood).isCustom && (
                          <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-purple-200 to-fuchsia-200 flex items-center justify-center">
                            <ChefHat className="w-7 h-7 text-purple-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-lg text-gray-900">{food.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{food.category}</p>
                          {(food as CustomFood).isCustom && (
                            <p className="text-xs text-purple-600 mt-1 font-medium">
                              {language === 'fr' ? '✨ Aliment perso' : language === 'es' ? '✨ Perso.' : '✨ Custom'}
                            </p>
                          )}
                          {food.unit && <p className="text-xs text-indigo-600 mt-1 font-medium">{food.unit}</p>}
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-bold text-indigo-600 text-lg">{food.calories} {t.kcal}</p>
                          <p className="text-gray-500 text-xs mt-1">P:{food.protein}{t.grams} C:{food.carbs}{t.grams} L:{food.fat}{t.grams}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedFood && (
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-400 shadow-lg space-y-4">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{selectedFood.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedFood.category}</p>
                    {selectedFood.unit && <p className="text-sm text-indigo-600 font-medium mt-1">{selectedFood.unit}</p>}
                  </div>

                  <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : uploadedPhoto ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-indigo-400'}`}>
                    <input {...getInputProps()} />
                    {uploadedPhoto ? (
                      <div className="space-y-2">
                        <img src={uploadedPhoto} alt="Preview" className="max-h-32 mx-auto rounded" />
                        <p className="text-sm text-green-600 font-medium">✓ {t.photoAdded}</p>
                        <Button type="button" variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setUploadedPhoto(null) }} className="mt-2">
                          {t.removePhoto}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Camera className="w-8 h-8 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-600">{isDragActive ? t.dropPhoto : t.uploadPhoto}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="qty" className="text-base font-semibold">{t.quantity}</Label>
                      <p className="text-xs text-green-600 font-medium mt-1 mb-2">
                        🟢 {language === 'fr' ? 'Choisissez la quantité souhaitée' : language === 'es' ? 'Elige la cantidad deseada' : 'Choose your desired quantity'}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQuantity(q => Math.max(1, (parseFloat(q) || 0) - 10).toString())}
                          className="w-11 h-11 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold text-xl shadow-md border-2 border-green-600 flex items-center justify-center transition-all select-none"
                        >−</button>
                        <Input
                          id="qty"
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="h-11 text-lg font-bold border-2 border-green-400 focus:border-green-600 text-center w-full"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity(q => ((parseFloat(q) || 0) + 10).toString())}
                          className="w-11 h-11 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold text-xl shadow-md border-2 border-green-600 flex items-center justify-center transition-all select-none"
                        >+</button>
                      </div>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {[50, 100, 150, 200, 250].map(g => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setQuantity(g.toString())}
                            className={`px-2 py-1 rounded-lg text-xs font-semibold border-2 transition-all ${
                              quantity === g.toString()
                                ? 'bg-green-500 text-white border-green-600 shadow'
                                : 'bg-white text-green-700 border-green-300 hover:bg-green-50'
                            }`}
                          >{g}g</button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-gray-700">{t.totalsFor} {quantity}{t.grams}</p>
                      <div className="bg-white p-3 rounded-lg border-2 border-indigo-200 shadow-sm text-sm space-y-1">
                        <p className="text-lg"><span className="font-bold text-indigo-600">{Math.round((selectedFood.calories * parseFloat(quantity || '0')) / 100)} {t.kcal}</span></p>
                        <p className="text-gray-700">{t.protein}: <span className="font-semibold">{Math.round((selectedFood.protein * parseFloat(quantity || '0')) / 100)}{t.grams}</span></p>
                        <p className="text-gray-700">{t.carbs}: <span className="font-semibold">{Math.round((selectedFood.carbs * parseFloat(quantity || '0')) / 100)}{t.grams}</span></p>
                        <p className="text-gray-700">{t.fat}: <span className="font-semibold">{Math.round((selectedFood.fat * parseFloat(quantity || '0')) / 100)}{t.grams}</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={addMeal} className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-12 text-base font-semibold shadow-md" disabled={!quantity}>
                      <Plus className="w-5 h-5 mr-2" />
                      {t.addMeal}
                    </Button>
                    <Button onClick={() => { setSelectedFood(null); setSearchQuery(''); setUploadedPhoto(null) }} variant="outline" className="border-2 hover:bg-gray-100 h-12">
                      {t.cancel}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── Liste des repas ── */}
        <Card className="border-2 border-indigo-300 shadow-xl bg-white mb-6">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-gray-800">
                {isToday ? `${t.mealsOfDay} (${meals.length})` : `${t.mealsOfDate} ${formatDisplayDate(selectedDate, language)} (${meals.length})`}
              </CardTitle>
              {/* ── Bouton mode sélection (seulement aujourd'hui et si repas présents) ── */}
              {isToday && meals.length > 0 && (
                <div className="flex items-center gap-2">
                  {selectionMode && selectedMealIds.size > 0 && (
                    <Button
                      onClick={openFavoriteModal}
                      className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold h-9 px-3 shadow text-sm"
                    >
                      <Star className="w-4 h-4 mr-1 fill-white" />
                      {language === 'fr' ? `Sauvegarder (${selectedMealIds.size})` : language === 'es' ? `Guardar (${selectedMealIds.size})` : `Save (${selectedMealIds.size})`}
                    </Button>
                  )}
                  <Button
                    variant={selectionMode ? 'default' : 'outline'}
                    size="sm"
                    onClick={toggleSelectionMode}
                    className={selectionMode
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white h-9 font-semibold'
                      : 'border-2 border-yellow-300 hover:border-yellow-500 text-yellow-700 hover:bg-yellow-50 h-9 font-semibold gap-1'}
                  >
                    <Star className={`w-4 h-4 ${selectionMode ? '' : 'text-yellow-500'}`} />
                    {selectionMode
                      ? (language === 'fr' ? 'Annuler' : language === 'es' ? 'Cancelar' : 'Cancel')
                      : (language === 'fr' ? 'Créer un favori' : language === 'es' ? 'Crear favorito' : 'Create favorite')}
                  </Button>
                </div>
              )}
            </div>
            {selectionMode && (
              <p className="text-sm text-indigo-600 font-medium mt-2">
                {language === 'fr' ? '☑️ Sélectionnez les aliments à grouper en favori' : language === 'es' ? '☑️ Selecciona los alimentos a agrupar' : '☑️ Select the meals to group as a favorite'}
              </p>
            )}
          </CardHeader>
          <CardContent className="pt-6">
            {meals.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <UtensilsCrossed className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">{isToday ? t.noMeals : t.noMealsThisDay}</p>
                <p className="text-sm mt-2">{isToday ? t.startAdding : t.startAddingThisDay}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {meals.map((meal) => {
                  const multiplier = meal.quantity / 100
                  const photoUrl = meal.photoId ? loadedPhotos.get(meal.photoId) : undefined
                  const isSelected = selectedMealIds.has(meal.id)
                  return (
                    <div
                      key={meal.id}
                      onClick={() => selectionMode && toggleMealSelection(meal.id)}
                      className={`flex items-center gap-4 p-5 rounded-lg border-2 hover:shadow-md transition-all ${
                        selectionMode ? 'cursor-pointer' : ''
                      } ${
                        isSelected
                          ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-400 shadow-md'
                          : 'bg-gradient-to-br from-white to-indigo-50 border-gray-200 hover:border-indigo-400'
                      }`}
                    >
                      {/* Checkbox en mode sélection */}
                      {selectionMode && (
                        <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'bg-yellow-500 border-yellow-500' : 'border-gray-300 bg-white'
                        }`}>
                          {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                      )}
                      {photoUrl && (
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <img src={photoUrl} alt={meal.food.name} className="w-full h-full object-cover rounded-lg shadow" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{meal.food.name}</h3>
                        <div className="flex gap-4 text-sm text-gray-600 mt-2 font-medium">
                          <span>🕐 {meal.time}</span>
                          <span>• ⚖️ {meal.quantity}{t.grams}</span>
                          <span>• P:{Math.round(meal.food.protein * multiplier)}{t.grams}</span>
                          <span>C:{Math.round(meal.food.carbs * multiplier)}{t.grams}</span>
                          <span>L:{Math.round(meal.food.fat * multiplier)}{t.grams}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-indigo-600">{Math.round(meal.food.calories * multiplier)} {t.kcal}</span>
                        {isToday && !selectionMode && (
                          <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); deleteMeal(meal.id) }} className="text-red-500 hover:text-red-700 hover:bg-red-50 border-2 border-transparent hover:border-red-200">
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Section Mes Favoris ── */}
        <Card className="border-2 border-yellow-300 shadow-xl bg-white mb-6">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  {language === 'fr' ? 'Mes Favoris' : language === 'es' ? 'Mis Favoritos' : 'My Favorites'}
                  {favorites.length > 0 && (
                    <span className="ml-1 text-sm font-normal text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  {language === 'fr' ? 'Réutilisez vos repas favoris en un clic' : language === 'es' ? 'Reutiliza tus comidas favoritas con un clic' : 'Reuse your favorite meals in one click'}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFavorites(v => !v)}
                className="text-yellow-600 hover:bg-yellow-100 font-semibold"
              >
                {showFavorites
                  ? (language === 'fr' ? 'Masquer' : language === 'es' ? 'Ocultar' : 'Hide')
                  : (language === 'fr' ? 'Afficher' : language === 'es' ? 'Mostrar' : 'Show')}
              </Button>
            </div>
          </CardHeader>

          {showFavorites && (
            <CardContent className="pt-5">
              {favorites.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-base font-medium">
                    {language === 'fr' ? 'Aucun favori pour l\'instant' : language === 'es' ? 'Sin favoritos por ahora' : 'No favorites yet'}
                  </p>
                  <p className="text-sm mt-1">
                    {language === 'fr' ? 'Utilisez "Créer un favori" dans le journal pour en ajouter' : language === 'es' ? 'Usa "Crear favorito" en el diario para añadir' : 'Use "Create favorite" in the journal to add one'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map(fav => {
                    const multiplier = favoriteMultipliers[fav.id] ?? 1
                    const favTotals = calculateTotals(fav.meals)
                    return (
                      <div key={fav.id} className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-md transition-all">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                              <h4 className="font-bold text-gray-900">{fav.name}</h4>
                              <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                                {fav.meals.length} {language === 'fr' ? 'aliment' : language === 'es' ? 'alimento' : 'item'}{fav.meals.length > 1 ? 's' : ''}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-3">
                              {fav.meals.map(m => `${m.food.name} (${Math.round(m.quantity * multiplier)}g)`).join(' · ')}
                            </p>
                            {/* Totaux avec multiplicateur */}
                            <div className="flex items-center gap-3 flex-wrap mb-3">
                              <span className="text-sm font-bold text-indigo-600">
                                {Math.round(favTotals.calories * multiplier)} kcal
                              </span>
                              <span className="text-xs text-gray-500">
                                P:{Math.round(favTotals.protein * multiplier)}g
                                · C:{Math.round(favTotals.carbs * multiplier)}g
                                · L:{Math.round(favTotals.fat * multiplier)}g
                              </span>
                            </div>
                            {/* Sélecteur de portion ×0.5 / ×0.75 / ×1 / ×1.5 / ×2 */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-semibold text-gray-600 mr-1">
                                {language === 'fr' ? 'Portion :' : language === 'es' ? 'Porción:' : 'Portion:'}
                              </span>
                              {MULTIPLIERS.map((m, i) => (
                                <button
                                  key={m}
                                  onClick={() => setFavoriteMultipliers(prev => ({...prev, [fav.id]: m}))}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 transition-all ${
                                    multiplier === m
                                      ? 'bg-yellow-500 text-white border-yellow-600 shadow'
                                      : 'bg-white text-yellow-700 border-yellow-300 hover:bg-yellow-50'
                                  }`}
                                >
                                  {MULTIPLIER_LABELS[i]}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            {isToday && (
                              <Button
                                onClick={() => addFavoriteToJournal(fav)}
                                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold shadow text-sm h-9 px-3"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                {language === 'fr' ? 'Ajouter' : language === 'es' ? 'Añadir' : 'Add'}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteFavorite(fav.id)}
                              className="text-red-400 hover:text-red-600 hover:bg-red-50 border-2 border-transparent hover:border-red-200 h-9 w-9"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          )}
        </Card>

        <div className="mt-8 text-center text-gray-500 text-sm pb-6">
          <p>{language === 'fr' ? `© ${new Date().getFullYear()} Calorie Tracker Pro - Tous droits réservés` : language === 'es' ? `© ${new Date().getFullYear()} Calorie Tracker Pro - Todos los derechos reservados` : `© ${new Date().getFullYear()} Calorie Tracker Pro - All rights reserved`}</p>
        </div>
      </div>
    </div>
  )
}
