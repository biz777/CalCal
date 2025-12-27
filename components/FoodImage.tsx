import { useState, useEffect } from 'react'
import dbManager from '@/lib/indexedDB'

interface FoodImageProps {
  foodId: string
  foodName: string
  className?: string
}

export function FoodImage({ foodId, foodName, className = '' }: FoodImageProps) {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await dbManager.getFoodImage(foodId)
        
        if (image) {
          setImageUrl(image)
        } else {
          setImageUrl('')
        }
      } catch (error) {
        console.error(`Error loading image for ${foodId}:`, error)
        setImageUrl('')
      } finally {
        setLoading(false)
      }
    }

    loadImage()
  }, [foodId])

  if (loading) {
    return (
      <div className={`bg-indigo-100 flex items-center justify-center ${className}`}>
        <span className="text-indigo-600 font-bold text-2xl">
          {foodName.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  if (imageUrl) {
    return (
      <img 
        src={imageUrl} 
        alt={foodName}
        className={`object-cover ${className}`}
      />
    )
  }

  return (
    <div className={`bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center ${className}`}>
      <span className="text-indigo-600 font-bold text-2xl">
        {foodName.charAt(0).toUpperCase()}
      </span>
    </div>
  )
}
