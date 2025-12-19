// IndexedDB Manager for storing meal photos AND food images
const DB_NAME = 'CalorieTrackerDB'
const DB_VERSION = 2  // ← Augmenté pour ajouter le nouveau store
const PHOTOS_STORE = 'photos'
const FOOD_IMAGES_STORE = 'foodImages'  // ← Nouveau store

interface PhotoRecord {
  id: string
  dataUrl: string
  timestamp: number
}

interface FoodImageRecord {
  foodId: string  // Ex: "roast_chicken", "shrimp", "mussels"
  dataUrl: string  // Image en base64
  timestamp: number
}

// Types pour les aliments (3 langues: EN, FR, ES)
interface Food {
  id: string
  name: string        // Anglais
  nameFr: string      // Français
  nameEs: string      // Espagnol
  calories: number
  protein: number
  carbs: number
  fat: number
  category: string
  unit?: string
}

class IndexedDBManager {
  private db: IDBDatabase | null = null

  // Initialiser la base de données
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        console.error('IndexedDB error:', request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        
        // Créer l'object store pour les photos de repas
        if (!db.objectStoreNames.contains(PHOTOS_STORE)) {
          const photoStore = db.createObjectStore(PHOTOS_STORE, { keyPath: 'id' })
          photoStore.createIndex('timestamp', 'timestamp', { unique: false })
        }

        // Créer l'object store pour les images d'aliments
        if (!db.objectStoreNames.contains(FOOD_IMAGES_STORE)) {
          const foodImageStore = db.createObjectStore(FOOD_IMAGES_STORE, { keyPath: 'foodId' })
          foodImageStore.createIndex('timestamp', 'timestamp', { unique: false })
        }
      }
    })
  }

  // ============= MEAL PHOTOS (existant) =============

  // Sauvegarder une photo de repas
  async savePhoto(id: string, dataUrl: string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PHOTOS_STORE], 'readwrite')
      const store = transaction.objectStore(PHOTOS_STORE)
      
      const photoRecord: PhotoRecord = {
        id,
        dataUrl,
        timestamp: Date.now()
      }

      const request = store.put(photoRecord)

      request.onsuccess = () => resolve()
      request.onerror = () => {
        console.error('Error saving photo:', request.error)
        reject(request.error)
      }
    })
  }

  // Récupérer une photo de repas
  async getPhoto(id: string): Promise<string | null> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PHOTOS_STORE], 'readonly')
      const store = transaction.objectStore(PHOTOS_STORE)
      const request = store.get(id)

      request.onsuccess = () => {
        const record = request.result as PhotoRecord | undefined
        resolve(record ? record.dataUrl : null)
      }
      
      request.onerror = () => {
        console.error('Error getting photo:', request.error)
        reject(request.error)
      }
    })
  }

  // Récupérer plusieurs photos de repas
  async getPhotos(ids: string[]): Promise<Map<string, string>> {
    if (!this.db) await this.init()

    const photos = new Map<string, string>()

    for (const id of ids) {
      try {
        const photo = await this.getPhoto(id)
        if (photo) {
          photos.set(id, photo)
        }
      } catch (error) {
        console.error(`Error loading photo ${id}:`, error)
      }
    }

    return photos
  }

  // Supprimer une photo de repas
  async deletePhoto(id: string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PHOTOS_STORE], 'readwrite')
      const store = transaction.objectStore(PHOTOS_STORE)
      const request = store.delete(id)

      request.onsuccess = () => resolve()
      request.onerror = () => {
        console.error('Error deleting photo:', request.error)
        reject(request.error)
      }
    })
  }

  // Supprimer les photos orphelines
  async cleanupOrphanedPhotos(validIds: string[]): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PHOTOS_STORE], 'readwrite')
      const store = transaction.objectStore(PHOTOS_STORE)
      const request = store.getAllKeys()

      request.onsuccess = () => {
        const allKeys = request.result as string[]
        const orphanedKeys = allKeys.filter(key => !validIds.includes(key))

        orphanedKeys.forEach(key => {
          store.delete(key)
        })

        resolve()
      }

      request.onerror = () => {
        console.error('Error cleaning up photos:', request.error)
        reject(request.error)
      }
    })
  }

  // Supprimer les anciennes photos
  async cleanupOldPhotos(daysToKeep: number = 30): Promise<void> {
    if (!this.db) await this.init()

    const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000)

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PHOTOS_STORE], 'readwrite')
      const store = transaction.objectStore(PHOTOS_STORE)
      const index = store.index('timestamp')
      const request = index.openCursor()

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor) {
          const record = cursor.value as PhotoRecord
          if (record.timestamp < cutoffTime) {
            cursor.delete()
          }
          cursor.continue()
        } else {
          resolve()
        }
      }

      request.onerror = () => {
        console.error('Error cleaning old photos:', request.error)
        reject(request.error)
      }
    })
  }

  // ============= FOOD IMAGES (nouveau) =============

  // Sauvegarder une image d'aliment
  async saveFoodImage(foodId: string, dataUrl: string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([FOOD_IMAGES_STORE], 'readwrite')
      const store = transaction.objectStore(FOOD_IMAGES_STORE)
      
      const imageRecord: FoodImageRecord = {
        foodId,
        dataUrl,
        timestamp: Date.now()
      }

      const request = store.put(imageRecord)

      request.onsuccess = () => {
        console.log(`✅ Food image saved: ${foodId}`)
        resolve()
      }
      request.onerror = () => {
        console.error('Error saving food image:', request.error)
        reject(request.error)
      }
    })
  }

  // Récupérer une image d'aliment
  async getFoodImage(foodId: string): Promise<string | null> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([FOOD_IMAGES_STORE], 'readonly')
      const store = transaction.objectStore(FOOD_IMAGES_STORE)
      const request = store.get(foodId)

      request.onsuccess = () => {
        const record = request.result as FoodImageRecord | undefined
        resolve(record ? record.dataUrl : null)
      }
      
      request.onerror = () => {
        console.error('Error getting food image:', request.error)
        reject(request.error)
      }
    })
  }

  // Récupérer plusieurs images d'aliments
  async getFoodImages(foodIds: string[]): Promise<Map<string, string>> {
    if (!this.db) await this.init()

    const images = new Map<string, string>()

    for (const foodId of foodIds) {
      try {
        const image = await this.getFoodImage(foodId)
        if (image) {
          images.set(foodId, image)
        }
      } catch (error) {
        console.error(`Error loading food image ${foodId}:`, error)
      }
    }

    return images
  }

  // Importer une image depuis /public/food-images/
  async importFoodImageFromPublic(foodId: string, imagePath: string): Promise<void> {
    try {
      // Fetch l'image depuis public/
      const response = await fetch(imagePath)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${imagePath}`)
      }

      const blob = await response.blob()
      
      // Convertir en base64
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })

      // Sauvegarder dans IndexedDB
      await this.saveFoodImage(foodId, dataUrl)
      
      console.log(`✅ Imported image for ${foodId}`)
    } catch (error) {
      console.error(`❌ Failed to import image for ${foodId}:`, error)
      throw error
    }
  }

  // Importer toutes les images de test
  async importTestImages(): Promise<void> {
    console.log('🔄 Importing test food images...')
    
    try {
      await this.importFoodImageFromPublic('roast_chicken', '/food-images/roast_chicken.webp')
      await this.importFoodImageFromPublic('shrimp', '/food-images/shrimp.webp')
      await this.importFoodImageFromPublic('mussels', '/food-images/mussels.jpeg')
      
      console.log('✅ All test images imported successfully!')
    } catch (error) {
      console.error('❌ Error importing test images:', error)
    }
  }

  // Vérifier si les images ont déjà été importées
  async areTestImagesImported(): Promise<boolean> {
    try {
      const roastChicken = await this.getFoodImage('roast_chicken')
      const shrimp = await this.getFoodImage('shrimp')
      const mussels = await this.getFoodImage('mussels')
      
      return !!(roastChicken && shrimp && mussels)
    } catch {
      return false
    }
  }
}

// Instance singleton
const dbManager = new IndexedDBManager()

export default dbManager
