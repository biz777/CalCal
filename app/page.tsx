'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, UtensilsCrossed, User, Settings, Info, X, Camera, Upload, TrendingUp } from 'lucide-react'
import { getFoodDatabase, getCategories, type Food } from '@/lib/foodDatabase'
import { useTranslation, type Language } from '@/lib/translations'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import dbManager from '@/lib/indexedDB'

interface Meal {
  id: string
  food: Food
  quantity: number
  time: string
  photoId?: string  // Changed from photo?: string to photoId?: string
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

export default function Home() {
 export default function Home() {
 
  // Initialiser les images d'aliments au premier lancement
  useEffect(() => {
    const initFoodImages = async () => {
      try {
        const alreadyImported = await dbManager.areTestImagesImported()
        
        if (!alreadyImported) {
          console.log('🔄 Premier lancement - import des images...')
          await dbManager.importTestImages()
          console.log('✅ Images prêtes dans IndexedDB!')
        } else {
          console.log('✅ Images déjà dans IndexedDB')
        }
      } catch (error) {
        console.error('❌ Erreur initialisation images:', error)
      }
    }

    initFoodImages()
  }, [])

  const [language, setLanguage] = useState<Language>('en')
  const t = useTranslation(language)
  
  // Memoize food database and categories to prevent unnecessary recalculations
  const foodDatabase = useMemo(() => getFoodDatabase(language), [language])
  const categories = useMemo(() => getCategories(language), [language])
  
  const [meals, setMeals] = useState<Meal[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [quantity, setQuantity] = useState('100')
  const [showProfile, setShowProfile] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [showCharts, setShowCharts] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const [historyData, setHistoryData] = useState<DayData[]>([])
  const [loadedPhotos, setLoadedPhotos] = useState<Map<string, string>>(new Map())
  
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  })

  useEffect(() => {
    const loadData = async () => {
      const savedProfile = localStorage.getItem('userProfile')
      const savedLanguage = localStorage.getItem('language')
      const savedMeals = localStorage.getItem('todayMeals')
      const savedDate = localStorage.getItem('mealsDate')
      const savedHistory = localStorage.getItem('weekHistory')
      const hasSeenGuide = localStorage.getItem('hasSeenGuide')
      const today = new Date().toISOString().split('T')[0]
      
      if (savedLanguage) {
        setLanguage(savedLanguage as Language)
      }
      
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile))
        setHasProfile(true)
        if (!hasSeenGuide) {
          setShowGuide(true)
        }
      } else {
        setShowProfile(true)
      }
      
      if (savedMeals && savedDate === today) {
        const parsedMeals: Meal[] = JSON.parse(savedMeals)
        setMeals(parsedMeals)
        
        // Charger les photos depuis IndexedDB
        const photoIds = parsedMeals
          .filter(meal => meal.photoId)
          .map(meal => meal.photoId!)
        
        if (photoIds.length > 0) {
          try {
            const photos = await dbManager.getPhotos(photoIds)
            setLoadedPhotos(photos)
          } catch (error) {
            console.error('Error loading photos from IndexedDB:', error)
          }
        }
      }
      
      if (savedHistory) {
        setHistoryData(JSON.parse(savedHistory))
      }
    }
    
    loadData()
  }, [])

  useEffect(() => {
    if (meals.length > 0) {
      const today = new Date().toISOString().split('T')[0]
      localStorage.setItem('todayMeals', JSON.stringify(meals))
      localStorage.setItem('mealsDate', today)
      
      const totals = calculateTotals(meals)
      const todayData: DayData = {
        date: today,
        calories: totals.calories,
        protein: totals.protein,
        carbs: totals.carbs,
        fat: totals.fat,
        meals: meals
      }
      
      const updatedHistory = [...historyData.filter(d => d.date !== today), todayData]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 7)
      
      setHistoryData(updatedHistory)
      localStorage.setItem('weekHistory', JSON.stringify(updatedHistory))
      
      // Nettoyer les photos orphelines
      const validPhotoIds = meals.filter(m => m.photoId).map(m => m.photoId!)
      dbManager.cleanupOrphanedPhotos(validPhotoIds).catch(error => {
        console.error('Error cleaning up orphaned photos:', error)
      })
    }
  }, [meals, historyData])

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

  // Fonction pour compresser l'image
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
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          
          // Compression en JPEG avec qualité 0.7
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7)
          resolve(compressedDataUrl)
        }
        img.onerror = reject
        img.src = e.target?.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }, [])

  const calculateDailyCalories = (profile: UserProfile) => {
    const { age, weight, height, gender, activityLevel, goal } = profile
    let bmr
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }
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
    if (selectedFood && quantity) {
      const mealId = Date.now().toString()
      let photoId: string | undefined = undefined
      
      // Si une photo est uploadée, la sauvegarder dans IndexedDB
      if (uploadedPhoto) {
        photoId = `photo_${mealId}`
        try {
          await dbManager.savePhoto(photoId, uploadedPhoto)
          // Ajouter la photo au state local pour affichage immédiat
          setLoadedPhotos(prev => new Map(prev).set(photoId!, uploadedPhoto))
        } catch (error) {
          console.error('Error saving photo to IndexedDB:', error)
          alert('Erreur lors de la sauvegarde de la photo. Veuillez réessayer.')
          return
        }
      }
      
      const newMeal: Meal = {
        id: mealId,
        food: selectedFood,
        quantity: parseFloat(quantity),
        time: new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        photoId: photoId
      }
      setMeals([...meals, newMeal])
      setSelectedFood(null)
      setQuantity('100')
      setSearchQuery('')
      setUploadedPhoto(null)
    }
  }

  const deleteMeal = async (id: string) => {
    const mealToDelete = meals.find(m => m.id === id)
    
    // Supprimer la photo d'IndexedDB si elle existe
    if (mealToDelete?.photoId) {
      try {
        await dbManager.deletePhoto(mealToDelete.photoId)
        setLoadedPhotos(prev => {
          const newMap = new Map(prev)
          newMap.delete(mealToDelete.photoId!)
          return newMap
        })
      } catch (error) {
        console.error('Error deleting photo from IndexedDB:', error)
      }
    }
    
    setMeals(meals.filter(m => m.id !== id))
  }

  const saveProfile = () => {
    // Validation
    if (profile.age < 1 || profile.age > 150) {
      alert('Please enter a valid age between 1 and 150')
      return
    }
    if (profile.weight < 20 || profile.weight > 500) {
      alert('Please enter a valid weight between 20 and 500 kg')
      return
    }
    if (profile.height < 50 || profile.height > 300) {
      alert('Please enter a valid height between 50 and 300 cm')
      return
    }

    try {
      localStorage.setItem('userProfile', JSON.stringify(profile))
      setHasProfile(true)
      setShowProfile(false)
      setShowGuide(true)
    } catch (error) {
      console.error('Failed to save profile:', error)
      alert('Failed to save profile. Please try again.')
    }
  }
  
  const filteredFoods = useMemo(() => {
    return foodDatabase.filter(food => {
      const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory
      const matchesSearch = searchQuery === '' || 
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [foodDatabase, selectedCategory, searchQuery])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      try {
        const compressedImage = await compressImage(file)
        setUploadedPhoto(compressedImage)
      } catch (error) {
        console.error('Error compressing image:', error)
        alert('Erreur lors du traitement de l\'image. Veuillez réessayer.')
      }
    }
  }, [compressImage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50">
      {showGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full border-2 border-indigo-300 shadow-2xl">
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
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="flex gap-4 items-start p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">{t.guideStep1Title}</h4>
                    <p className="text-gray-700 leading-relaxed">{t.guideStep1Desc}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                  <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">{t.guideStep2Title}</h4>
                    <p className="text-gray-700 leading-relaxed">{t.guideStep2Desc}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                  <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">{t.guideStep3Title}</h4>
                    <p className="text-gray-700 leading-relaxed">{t.guideStep3Desc}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
                  <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">{t.guideStep4Title}</h4>
                    <p className="text-gray-700 leading-relaxed">{t.guideStep4Desc}</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => { setShowGuide(false); localStorage.setItem('hasSeenGuide', 'true') }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 text-base font-semibold shadow-lg">
                {t.gotIt}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

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

      <div className="container mx-auto px-4 py-6 max-w-7xl">
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
              <Button variant={language === 'en' ? 'default' : 'outline'} onClick={() => { setLanguage('en'); localStorage.setItem('language', 'en') }} size="sm" className={language === 'en' ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'border-2'}>
                🇺🇸 {t.en}
              </Button>
              <Button variant={language === 'fr' ? 'default' : 'outline'} onClick={() => { setLanguage('fr'); localStorage.setItem('language', 'fr') }} size="sm" className={language === 'fr' ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'border-2'}>
                🇫🇷 {t.fr}
              </Button>
              <Button variant={language === 'es' ? 'default' : 'outline'} onClick={() => { setLanguage('es'); localStorage.setItem('language', 'es') }} size="sm" className={language === 'es' ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'border-2'}>
                🇪🇸 {t.es}
              </Button>
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowCharts(true)} className="border-2 hover:border-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowProfile(true)} className="border-2 hover:border-indigo-400">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowGuide(true)} className="border-2 hover:border-indigo-400">
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </div>

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

        <Card className="border-2 border-indigo-300 shadow-xl bg-white mb-6">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-2xl text-gray-800">{t.addFood}</CardTitle>
            <CardDescription className="text-base">{t.selectCategory}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100" style={{ scrollbarWidth: 'thin', scrollbarColor: '#818cf8 #e0e7ff' }}>
              <style jsx>{`div::-webkit-scrollbar{height:8px}div::-webkit-scrollbar-track{background:#e0e7ff;border-radius:10px}div::-webkit-scrollbar-thumb{background:#818cf8;border-radius:10px}div::-webkit-scrollbar-thumb:hover{background:#6366f1}`}</style>
              <Button variant={selectedCategory === 'all' ? 'default' : 'outline'} onClick={() => setSelectedCategory('all')} size="sm" className={selectedCategory === 'all' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md' : 'border-2 hover:border-indigo-300'}>
                {t.all}
              </Button>
              {categories.map(cat => (
                <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} onClick={() => setSelectedCategory(cat)} size="sm" className={selectedCategory === cat ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md whitespace-nowrap' : 'whitespace-nowrap border-2 hover:border-indigo-300'}>
                  {cat}
                </Button>
              ))}
            </div>

            <Input 
              placeholder={t.searchPlaceholder} 
              value={searchQuery} 
              onChange={(e) => {
                setSearchQuery(e.target.value)
                if (e.target.value.trim() !== '') {
                  setSelectedCategory('all')
                }
              }} 
              className="h-12 text-base border-2 focus:border-indigo-400" 
            />

            {!selectedFood && (
              <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
                {filteredFoods.map((food, index) => (
                  <div key={index} onClick={() => setSelectedFood(food)} className="p-4 bg-gradient-to-br from-white to-indigo-50 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all">
                    <div className="flex gap-3 items-start">
                      {food.imageUrl && (
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img 
                            src={food.imageUrl} 
                            alt={food.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback si l'image ne charge pas
                              e.currentTarget.src = `https://via.placeholder.com/64x64/e0e7ff/4f46e5?text=${encodeURIComponent(food.name.charAt(0))}`
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-base text-gray-900">{food.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{food.category}</p>
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
                      <p className="text-sm text-green-600 font-medium">✓ {t.photoAdded || 'Photo ajoutée'}</p>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setUploadedPhoto(null)
                        }}
                        className="mt-2"
                      >
                        {t.removePhoto || 'Retirer la photo'}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera className="w-8 h-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">{isDragActive ? (t.dropPhoto || 'Déposez la photo ici') : (t.uploadPhoto || 'Cliquez ou déposez une photo')}</p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="qty" className="text-base font-semibold">{t.quantity}</Label>
                    <Input id="qty" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-2 h-12 text-lg border-2" />
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

        <Card className="border-2 border-indigo-300 shadow-xl bg-white mb-6">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-2xl text-gray-800">{t.mealsOfDay} ({meals.length})</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {meals.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <UtensilsCrossed className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">{t.noMeals}</p>
                <p className="text-sm mt-2">{t.startAdding}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {meals.map((meal) => {
                  const multiplier = meal.quantity / 100
                  const photoUrl = meal.photoId ? loadedPhotos.get(meal.photoId) : undefined
                  return (
                    <div key={meal.id} className="flex items-center gap-4 p-5 bg-gradient-to-br from-white to-indigo-50 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all">
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
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-indigo-600">{Math.round(meal.food.calories * multiplier)} {t.kcal}</span>
                        <Button variant="ghost" size="icon" onClick={() => deleteMeal(meal.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 border-2 border-transparent hover:border-red-200">
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-gray-500 text-sm pb-6">
          <p>{language === 'fr' ? `© ${new Date().getFullYear()} Calorie Tracker Pro - Tous droits réservés` : language === 'es' ? `© ${new Date().getFullYear()} Calorie Tracker Pro - Todos los derechos reservados` : `© ${new Date().getFullYear()} Calorie Tracker Pro - All rights reserved`}</p>
        </div>
      </div>
    </div>
  )
}
