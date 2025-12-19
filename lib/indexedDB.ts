// IndexedDB Manager for storing meal photos
const DB_NAME = 'CalorieTrackerDB'
const DB_VERSION = 1
const PHOTOS_STORE = 'photos'

interface PhotoRecord {
  id: string
  dataUrl: string
  timestamp: number
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
        
        // Créer l'object store pour les photos si il n'existe pas
        if (!db.objectStoreNames.contains(PHOTOS_STORE)) {
          const photoStore = db.createObjectStore(PHOTOS_STORE, { keyPath: 'id' })
          photoStore.createIndex('timestamp', 'timestamp', { unique: false })
        }
      }
    })
  }

  // Sauvegarder une photo
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

  // Récupérer une photo
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

  // Récupérer plusieurs photos
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

  // Supprimer une photo
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

  // Supprimer les photos orphelines (photos qui n'ont plus de repas associé)
  async cleanupOrphanedPhotos(validIds: string[]): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PHOTOS_STORE], 'readwrite')
      const store = transaction.objectStore(PHOTOS_STORE)
      const request = store.getAllKeys()

      request.onsuccess = () => {
        const allKeys = request.result as string[]
        const orphanedKeys = allKeys.filter(key => !validIds.includes(key))

        // Supprimer les photos orphelines
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

  // Supprimer les anciennes photos (plus de 30 jours)
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
}

// Instance singleton
const dbManager = new IndexedDBManager()

export default dbManager
