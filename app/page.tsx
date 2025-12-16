'use client'

import { useState, useEffect, useMemo } from 'react'
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

interface Meal {
  id: string
  food: Food
  quantity: number
  time: string
  photo?: string
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
  
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  })

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    const savedLanguage = localStorage.getItem('language')
    const savedMeals = localStorage.getItem('todayMeals')
    const savedDate = localStorage.getItem('mealsDate')
    const savedHistory = localStorage.getItem('weekHistory')
    const hasSeenGuide = localStorage.getItem('hasSeenGuide')
    const today = new Date().toDateString()
    
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
      setMeals(JSON.parse(savedMeals))
    }
    
    if (savedHistory) {
      setHistoryData(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    if (meals.length > 0) {
      const today = new Date().toDateString()
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
    }
  }, [meals])

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

  const calculateBMR = (): number => {
    if (profile.gender === 'male') {
      return 88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * profile.age)
    } else {
      return 447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * profile.age)
    }
  }

  const calculateTDEE = (): number => {
    const bmr = calculateBMR()
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }
    
    let tdee = bmr * activityMultipliers[profile.activityLevel]
    
    if (profile.goal === 'lose') {
      tdee -= 500
    } else if (profile.goal === 'gain') {
      tdee += 500
    }
    
    return Math.round(tdee)
  }

  const dailyCalories = calculateTDEE()
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

  const addMeal = () => {
    if (selectedFood && quantity) {
      const newMeal: Meal = {
        id: Date.now().toString(),
        food: selectedFood,
        quantity: parseFloat(quantity),
        time: new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        photo: uploadedPhoto || undefined
      }
      setMeals([...meals, newMeal])
      setSelectedFood(null)
      setQuantity('100')
      setSearchQuery('')
      setUploadedPhoto(null)
    }
  }

  const deleteMeal = (id: string) => {
    setMeals(meals.filter(m => m.id !== id))
  }

  const saveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile))
    setHasProfile(true)
    setShowProfile(false)
    localStorage.setItem('hasSeenGuide', 'true')
    setShowGuide(true)
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

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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
                <div className="flex gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{t.personalizedGoals}</h3>
                    <p className="text-gray-700">{t.personalizedGoalsDesc}</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200">
                  <div className="text-3xl">🍽️</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{t.trackMeals}</h3>
                    <p className="text-gray-700">{t.trackMealsDesc}</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-200">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{t.visualizeProgress}</h3>
                    <p className="text-gray-700">{t.visualizeProgressDesc}</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border-2 border-orange-200">
                  <div className="text-3xl">📸</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{t.addPhotos}</h3>
                    <p className="text-gray-700">{t.addPhotosDesc}</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => setShowGuide(false)} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 text-lg font-semibold shadow-lg">
                {t.getStarted}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {showProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full border-2 border-indigo-300 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-200">
              <CardTitle className="text-3xl text-gray-900">{t.setupProfile}</CardTitle>
              <CardDescription className="text-base">{t.personalizeExperience}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-semibold">{t.age}</Label>
                  <Input type="number" value={profile.age} onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})} className="mt-2 h-12 text-lg border-2" />
                </div>
                <div>
                  <Label className="text-base font-semibold">{t.weight}</Label>
                  <Input type="number" value={profile.weight} onChange={(e) => setProfile({...profile, weight: parseFloat(e.target.value)})} className="mt-2 h-12 text-lg border-2" />
                </div>
                <div>
                  <Label className="text-base font-semibold">{t.height}</Label>
                  <Input type="number" value={profile.height} onChange={(e) => setProfile({...profile, height: parseFloat(e.target.value)})} className="mt-2 h-12 text-lg border-2" />
                </div>
                <div>
                  <Label className="text-base font-semibold">{t.gender}</Label>
                  <select value={profile.gender} onChange={(e) => setProfile({...profile, gender: e.target.value as 'male' | 'female'})} className="w-full mt-2 h-12 text-lg border-2 rounded-md px-3 border-gray-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200">
                    <option value="male">{t.male}</option>
                    <option value="female">{t.female}</option>
                  </select>
                </div>
                <div>
                  <Label className="text-base font-semibold">{t.activityLevel}</Label>
                  <select value={profile.activityLevel} onChange={(e) => setProfile({...profile, activityLevel: e.target.value as any})} className="w-full mt-2 h-12 text-lg border-2 rounded-md px-3 border-gray-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200">
                    <option value="sedentary">{t.sedentary}</option>
                    <option value="light">{t.light}</option>
                    <option value="moderate">{t.moderate}</option>
                    <option value="active">{t.active}</option>
                    <option value="very_active">{t.veryActive}</option>
                  </select>
                </div>
                <div>
                  <Label className="text-base font-semibold">{t.goal}</Label>
                  <select value={profile.goal} onChange={(e) => setProfile({...profile, goal: e.target.value as any})} className="w-full mt-2 h-12 text-lg border-2 rounded-md px-3 border-gray-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200">
                    <option value="lose">{t.loseWeight}</option>
                    <option value="maintain">{t.maintainWeight}</option>
                    <option value="gain">{t.gainWeight}</option>
                  </select>
                </div>
              </div>
              <Button onClick={saveProfile} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 text-lg font-semibold shadow-lg">
                {t.saveProfile}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {showCharts && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-indigo-300 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-200 sticky top-0 z-10">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl text-gray-900">{t.weeklyProgress}</CardTitle>
                  <CardDescription className="text-base">{t.last7Days}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowCharts(false)} className="hover:bg-indigo-100">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {historyData.length > 0 ? (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t.caloriesEvolution}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={historyData.slice().reverse()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="date" tick={{fill: '#4b5563'}} tickFormatter={(date) => new Date(date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric' })} />
                        <YAxis tick={{fill: '#4b5563'}} />
                        <Tooltip contentStyle={{backgroundColor: '#f9fafb', border: '2px solid #c7d2fe', borderRadius: '8px'}} />
                        <Legend />
                        <Line type="monotone" dataKey="calories" stroke="#6366f1" strokeWidth={3} name={t.calories} dot={{fill: '#6366f1', r: 5}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t.macrosEvolution}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={historyData.slice().reverse()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="date" tick={{fill: '#4b5563'}} tickFormatter={(date) => new Date(date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric' })} />
                        <YAxis tick={{fill: '#4b5563'}} />
                        <Tooltip contentStyle={{backgroundColor: '#f9fafb', border: '2px solid #c7d2fe', borderRadius: '8px'}} />
                        <Legend />
                        <Line type="monotone" dataKey="protein" stroke="#ef4444" strokeWidth={2} name={t.protein} dot={{fill: '#ef4444', r: 4}} />
                        <Line type="monotone" dataKey="carbs" stroke="#3b82f6" strokeWidth={2} name={t.carbs} dot={{fill: '#3b82f6', r: 4}} />
                        <Line type="monotone" dataKey="fat" stroke="#f59e0b" strokeWidth={2} name={t.fat} dot={{fill: '#f59e0b', r: 4}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium text-gray-500">{t.noDataYet}</p>
                  <p className="text-sm text-gray-400 mt-2">{t.startTrackingToSee}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Hero Header with Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-indigo-300 mb-8">
          <div className="relative h-72 md:h-96">
            <Image 
              src="/salad-bar.webp" 
              alt="Fresh healthy food" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            
            {/* Header Content Overlay */}
            <div className="absolute inset-0 flex flex-col">
              {/* Top Section: Language & Settings */}
              <div className="flex justify-end gap-3 p-4 md:p-6">
                <select value={language} onChange={(e) => { setLanguage(e.target.value as Language); localStorage.setItem('language', e.target.value) }} className="h-10 md:h-12 px-3 md:px-4 border-2 border-white/30 rounded-lg text-sm md:text-base font-semibold bg-white/95 hover:bg-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer shadow-lg">
                  <option value="en">🇺🇸 English (US)</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="es">🇪🇸 Español</option>
                </select>
                <Button onClick={() => setShowCharts(true)} variant="outline" size="icon" className="border-2 border-white/30 bg-white/95 hover:bg-white backdrop-blur-sm w-10 h-10 md:w-12 md:h-12 shadow-lg">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                </Button>
                <Button onClick={() => setShowProfile(true)} variant="outline" size="icon" className="border-2 border-white/30 bg-white/95 hover:bg-white backdrop-blur-sm w-10 h-10 md:w-12 md:h-12 shadow-lg">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                </Button>
                <Button onClick={() => setShowGuide(true)} variant="outline" size="icon" className="border-2 border-white/30 bg-white/95 hover:bg-white backdrop-blur-sm w-10 h-10 md:w-12 md:h-12 shadow-lg">
                  <Info className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                </Button>
              </div>
              
              {/* Center Section: Title */}
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-4 drop-shadow-2xl">
                  {t.title}
                </h1>
                <p className="text-lg md:text-2xl text-white/95 font-medium drop-shadow-lg max-w-2xl">
                  {t.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-indigo-300 shadow-xl bg-gradient-to-br from-white to-indigo-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl text-gray-800">{t.dailyCalories}</CardTitle>
              <CardDescription className="text-base font-medium">{t.target}: {dailyCalories} {t.kcal}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {Math.round(totals.calories)}
                </div>
                <p className="text-gray-600 text-lg font-medium mt-2">{t.consumed}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-4 rounded-full transition-all duration-500 shadow-md"
                  style={{ width: `${Math.min((totals.calories / dailyCalories) * 100, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-300 shadow-xl bg-gradient-to-br from-white to-purple-50">
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
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-base text-gray-900">{food.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{food.category}</p>
                        {food.unit && <p className="text-xs text-indigo-600 mt-1 font-medium">{food.unit}</p>}
                      </div>
                      <div className="text-right text-sm ml-3">
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
                      <p className="text-sm text-green-600 font-medium">✓ {t.addPhoto}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera className="w-8 h-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">{isDragActive ? t.takePhoto : t.uploadPhoto}</p>
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
                  return (
                    <div key={meal.id} className="flex items-center gap-4 p-5 bg-gradient-to-br from-white to-indigo-50 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all">
                      {meal.photo && <img src={meal.photo} alt={meal.food.name} className="w-20 h-20 object-cover rounded-lg shadow" />}
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

        {/* Small footer text */}
        <div className="mt-8 text-center text-gray-500 text-sm pb-6">
          <p>{language === 'fr' ? `© ${new Date().getFullYear()} Calorie Tracker Pro - Tous droits réservés` : language === 'es' ? `© ${new Date().getFullYear()} Calorie Tracker Pro - Todos los derechos reservados` : `© ${new Date().getFullYear()} Calorie Tracker Pro - All rights reserved`}</p>
        </div>
      </div>
    </div>
  )
}
