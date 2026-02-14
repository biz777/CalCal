'use client'

interface FoodImageProps {
  foodId: string
  foodName: string
  foodCategory: string
  className?: string
}

// Mapping des catégories vers les emojis
const getCategoryEmoji = (category: string): string => {
  // Normaliser la catégorie
  const normalizedCategory = category.toLowerCase()
  
  // Viandes & Œufs
  if (normalizedCategory.includes('meat') || 
      normalizedCategory.includes('viandes') || 
      normalizedCategory.includes('carnes') ||
      normalizedCategory.includes('egg') ||
      normalizedCategory.includes('œuf') ||
      normalizedCategory.includes('huevo')) {
    return '🥩'
  }
  
  // Poissons & Fruits de mer
  if (normalizedCategory.includes('fish') || 
      normalizedCategory.includes('seafood') ||
      normalizedCategory.includes('poisson') ||
      normalizedCategory.includes('pescado') ||
      normalizedCategory.includes('marisco')) {
    return '🐟'
  }
  
  // Légumes
  if (normalizedCategory.includes('vegetable') || 
      normalizedCategory.includes('légume') ||
      normalizedCategory.includes('verdura')) {
    return '🥬'
  }
  
  // Accompagnements (riz, pâtes, pain, etc.)
  if (normalizedCategory.includes('side') || 
      normalizedCategory.includes('accompagnement') ||
      normalizedCategory.includes('acompaña')) {
    return '🍚'
  }
  
  // Fromages
  if (normalizedCategory.includes('cheese') || 
      normalizedCategory.includes('fromage') ||
      normalizedCategory.includes('queso')) {
    return '🧀'
  }
  
  // Fruits
  if (normalizedCategory.includes('fruit')) {
    return '🍎'
  }
  
  // Desserts
  if (normalizedCategory.includes('dessert') || 
      normalizedCategory.includes('postre')) {
    return '🍰'
  }
  
  // Boissons
  if (normalizedCategory.includes('drink') || 
      normalizedCategory.includes('boisson') ||
      normalizedCategory.includes('bebida')) {
    return '🥤'
  }
  
  // Petit déjeuner & Goûter
  if (normalizedCategory.includes('breakfast') || 
      normalizedCategory.includes('snack') ||
      normalizedCategory.includes('petit') ||
      normalizedCategory.includes('goûter') ||
      normalizedCategory.includes('desayuno') ||
      normalizedCategory.includes('merienda')) {
    return '🥐'
  }
  
  // Noix & Graines
  if (normalizedCategory.includes('nut') || 
      normalizedCategory.includes('seed') ||
      normalizedCategory.includes('noix') ||
      normalizedCategory.includes('graine') ||
      normalizedCategory.includes('nuez') ||
      normalizedCategory.includes('semilla')) {
    return '🥜'
  }
  
  // Assaisonnements & Sauces
  if (normalizedCategory.includes('condiment') || 
      normalizedCategory.includes('sauce') ||
      normalizedCategory.includes('assaisonnement') ||
      normalizedCategory.includes('salsa')) {
    return '🧴'
  }
  
  // Par défaut
  return '🍽️'
}

export function FoodImage({ foodId, foodName, foodCategory, className = '' }: FoodImageProps) {
  // Directement utiliser l'emoji basé sur la catégorie
  const emoji = getCategoryEmoji(foodCategory)

  return (
    <div className={`bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center ${className}`}>
      <span className="text-4xl">{emoji}</span>
    </div>
  )
}
