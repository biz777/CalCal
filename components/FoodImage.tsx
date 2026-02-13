'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import dbManager from '@/lib/indexedDB'

interface FoodImageProps {
  foodId: string
  foodName: string
  className?: string
}

export function FoodImage({ foodId, foodName, className = '' }: FoodImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Essayer de charger l'image depuis IndexedDB
        const imageData = await dbManager.getPhoto(`food_${foodId}`)
        if (imageData) {
          setImageSrc(imageData)
        }
      } catch (error) {
        console.log(`Image non trouvée pour ${foodId}`)
      } finally {
        setLoading(false)
      }
    }

    loadImage()
  }, [foodId])

  if (loading) {
    return (
      <div className={`bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center ${className}`}>
        <span className="text-2xl">🍽️</span>
      </div>
    )
  }

  if (!imageSrc) {
    // Image par défaut si pas d'image trouvée
    return (
      <div className={`bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center ${className}`}>
        <span className="text-2xl">🍽️</span>
      </div>
    )
  }

  return (
    <img 
      src={imageSrc} 
      alt={foodName} 
      className={`object-cover ${className}`}
    />
  )
}
