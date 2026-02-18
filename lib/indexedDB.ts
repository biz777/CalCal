
// IndexedDB Manager for storing meal photos AND food images
const DB_NAME = 'CalorieTrackerDB'
const DB_VERSION = 2
const PHOTOS_STORE = 'photos'
const FOOD_IMAGES_STORE = 'foodImages'

interface PhotoRecord {
  id: string
  dataUrl: string
  timestamp: number
}

interface FoodImageRecord {
  foodId: string
  dataUrl: string
  timestamp: number
}

interface Food {
  id: string
  name: string
  nameFr: string
  nameEs: string
  calories: number
  protein: number
  carbs: number
  fat: number
  category: string
  unit?: string
}

class IndexedDBManager {
  private db: IDBDatabase | null = null
  private initPromise: Promise<void> | null = null  // ✅ FIX: évite les initialisations parallèles

  async init(): Promise<void> {
    // ✅ FIX: Si une initialisation est déjà en cours, on attend celle-là plutôt d'en lancer une nouvelle
    if (this.initPromise) return this.initPromise
    if (this.db) return

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        console.error('IndexedDB error:', request.error)
        this.initPromise = null
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result

        // ✅ FIX: détecter si la DB se ferme de façon inattendue
        this.db.onclose = () => {
          console.warn('⚠️ IndexedDB connection closed unexpectedly, will reinitialize on next access')
          this.db = null
          this.initPromise = null
        }

        this.db.onerror = (event) => {
          console.error('IndexedDB runtime error:', event)
        }

        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        if (!db.objectStoreNames.contains(PHOTOS_STORE)) {
          const photoStore = db.createObjectStore(PHOTOS_STORE, { keyPath: 'id' })
          photoStore.createIndex('timestamp', 'timestamp', { unique: false })
        }

        if (!db.objectStoreNames.contains(FOOD_IMAGES_STORE)) {
          const foodImageStore = db.createObjectStore(FOOD_IMAGES_STORE, { keyPath: 'foodId' })
          foodImageStore.createIndex('timestamp', 'timestamp', { unique: false })
        }
      }
    })

    return this.initPromise
  }

  // ============= MEAL PHOTOS =============

  async savePhoto(id: string, dataUrl: string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PHOTOS_STORE], 'readwrite')
      const store = transaction.objectStore(PHOTOS_STORE)

      const photoRecord: PhotoRecord = { id, dataUrl, timestamp: Date.now() }
      const request = store.put(photoRecord)

      request.onsuccess = () => resolve()
      request.onerror = () => {
        console.error('Error saving photo:', request.error)
        reject(request.error)
      }
    })
  }

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

  async getPhotos(ids: string[]): Promise<Map<string, string>> {
    if (!this.db) await this.init()

    const photos = new Map<string, string>()
    for (const id of ids) {
      try {
        const photo = await this.getPhoto(id)
        if (photo) photos.set(id, photo)
      } catch (error) {
        console.error(`Error loading photo ${id}:`, error)
      }
    }
    return photos
  }

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

  async cleanupOrphanedPhotos(validIds: string[]): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PHOTOS_STORE], 'readwrite')
      const store = transaction.objectStore(PHOTOS_STORE)
      const request = store.getAllKeys()

      request.onsuccess = () => {
        const allKeys = request.result as string[]
        const orphanedKeys = allKeys.filter(key => !validIds.includes(key))
        orphanedKeys.forEach(key => store.delete(key))
        resolve()
      }
      request.onerror = () => {
        console.error('Error cleaning up photos:', request.error)
        reject(request.error)
      }
    })
  }

  async cleanupOldPhotos(daysToKeep: number = 30): Promise<void> {
    if (!this.db) await this.init()

    const cutoffTime = Date.now() - daysToKeep * 24 * 60 * 60 * 1000

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PHOTOS_STORE], 'readwrite')
      const store = transaction.objectStore(PHOTOS_STORE)
      const index = store.index('timestamp')
      const request = index.openCursor()

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor) {
          const record = cursor.value as PhotoRecord
          if (record.timestamp < cutoffTime) cursor.delete()
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

  // ============= FOOD IMAGES =============

  async saveFoodImage(foodId: string, dataUrl: string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([FOOD_IMAGES_STORE], 'readwrite')
      const store = transaction.objectStore(FOOD_IMAGES_STORE)

      const imageRecord: FoodImageRecord = { foodId, dataUrl, timestamp: Date.now() }
      const request = store.put(imageRecord)

      request.onsuccess = () => resolve()
      request.onerror = () => {
        console.error('Error saving food image:', request.error)
        reject(request.error)
      }
    })
  }

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

  async getFoodImages(foodIds: string[]): Promise<Map<string, string>> {
    if (!this.db) await this.init()

    const images = new Map<string, string>()
    for (const foodId of foodIds) {
      try {
        const image = await this.getFoodImage(foodId)
        if (image) images.set(foodId, image)
      } catch (error) {
        console.error(`Error loading food image ${foodId}:`, error)
      }
    }
    return images
  }

  async importFoodImageFromPublic(foodId: string, imagePath: string): Promise<void> {
    try {
      const response = await fetch(imagePath)
      if (!response.ok) throw new Error(`Failed to fetch ${imagePath}`)

      const blob = await response.blob()
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })

      await this.saveFoodImage(foodId, dataUrl)
    } catch (error) {
      console.error(`❌ Failed to import image for ${foodId}:`, error)
      throw error
    }
  }

  async importTestImages(): Promise<void> {
    console.log('🔄 Importing food images...')

    const imagesToImport = [
      // MEAT & POULTRY
      { id: 'bacon', path: '/food-images/bacon.jpg' },
      { id: 'beef_ground_15', path: '/food-images/beef_ground_15.jpg' },
      { id: 'beef_ground_5', path: '/food-images/beef_ground_5.jpg' },
      { id: 'beef_ribeye_steak', path: '/food-images/beef_ribeye_steak.jpg' },
      { id: 'beef_sirloin', path: '/food-images/beef_sirloin.jpg' },
      { id: 'beef_tenderloin', path: '/food-images/beef_tenderloin.jpg' },
      { id: 'chicken_breast_skinless', path: '/food-images/chicken_breast_skinless.webp' },
      { id: 'chicken_liver', path: '/food-images/chicken_liver.jpg' },
      { id: 'chicken_thigh_with_skin', path: '/food-images/chicken_thigh_with_skin.jpg' },
      { id: 'chicken_wings', path: '/food-images/chicken_wings.jpg' },
      { id: 'chorizo', path: '/food-images/chorizo.jpg' },
      { id: 'duck_breast', path: '/food-images/duck_breast.jpg' },
      { id: 'foie_gras', path: '/food-images/foie_gras.jpg' },
      { id: 'ham_cooked', path: '/food-images/ham_cooked.jpg' },
      { id: 'ham_cured', path: '/food-images/ham_cured.jpg' },
      { id: 'lamb_chop', path: '/food-images/lamb_chop.jpg' },
      { id: 'lamb_leg', path: '/food-images/lamb_leg.jpg' },
      { id: 'pepperoni', path: '/food-images/pepperoni.jpg' },
      { id: 'pork_chop', path: '/food-images/pork_chop.jpg' },
      { id: 'pork_loin', path: '/food-images/pork_loin.jpg' },
      { id: 'pork_ribs', path: '/food-images/pork_ribs.jpg' },
      { id: 'prosciutto', path: '/food-images/prosciutto.jpg' },
      { id: 'quail', path: '/food-images/quail.jpg' },
      { id: 'rabbit', path: '/food-images/rabbit.jpg' },
      { id: 'salami', path: '/food-images/salami.jpg' },
      { id: 'sausage_pork', path: '/food-images/sausage_pork.jpg' },
      { id: 'turkey_breast', path: '/food-images/turkey_breast.jpg' },
      { id: 'turkey_ground', path: '/food-images/turkey_ground.jpg' },
      { id: 'veal_cutlet', path: '/food-images/veal_cutlet.jpg' },
      // EGGS
      { id: 'egg_white', path: '/food-images/egg_white.jpg' },
      { id: 'egg_whole', path: '/food-images/egg_whole.jpg' },
      // SEAFOOD
      { id: 'mussels', path: '/food-images/mussels.jpeg' },
      { id: 'shrimp', path: '/food-images/shrimp.webp' },
    ]

    let imported = 0
    let failed = 0

    for (const img of imagesToImport) {
      try {
        await this.importFoodImageFromPublic(img.id, img.path)
        imported++
      } catch {
        failed++
      }
    }

    // ✅ FIX: Marquer l'import comme terminé dans localStorage pour ne jamais re-importer inutilement
    localStorage.setItem('foodImagesImported_v1', Date.now().toString())
    console.log(`✅ Import terminé: ${imported} réussies, ${failed} échouées sur ${imagesToImport.length} total`)
  }

  // ✅ FIX CRITIQUE: Vérifier un ID qui existe vraiment dans la liste d'import
  // + double vérification avec le flag localStorage pour éviter les re-imports inutiles
  async areTestImagesImported(): Promise<boolean> {
    // Vérification rapide via localStorage d'abord (évite d'ouvrir IndexedDB pour rien)
    const importFlag = localStorage.getItem('foodImagesImported_v1')
    if (!importFlag) return false

    // Vérification en base pour s'assurer que les données sont vraiment là
    try {
      // ✅ FIX: 'bacon' et 'shrimp' existent bien dans imagesToImport (contrairement à 'roast_chicken' qui était vérifié avant!)
      const bacon = await this.getFoodImage('bacon')
      const shrimp = await this.getFoodImage('shrimp')
      return !!(bacon && shrimp)
    } catch {
      return false
    }
  }
}

const dbManager = new IndexedDBManager()
export default dbManager
