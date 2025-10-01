/**
 * Serviço de armazenamento persistente usando localStorage
 * Fornece uma interface robusta para gerenciar dados no navegador
 */
class PersistentStorageService {
  constructor(prefix = 'e2ecommerce_') {
    this.prefix = prefix
    this.isAvailable = this.checkAvailability()
  }

  /**
   * Verifica se o localStorage está disponível
   */
  checkAvailability() {
    try {
      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      console.warn('localStorage não está disponível:', e)
      return false
    }
  }

  /**
   * Gera a chave com prefixo
   */
  getKey(key) {
    return `${this.prefix}${key}`
  }

  /**
   * Salva um valor no localStorage
   */
  set(key, value) {
    if (!this.isAvailable) {
      console.warn('Storage não disponível, dados não foram salvos')
      return false
    }

    try {
      const serializedValue = JSON.stringify({
        value,
        timestamp: Date.now(),
        version: '1.0'
      })
      localStorage.setItem(this.getKey(key), serializedValue)
      return true
    } catch (error) {
      console.error('Erro ao salvar no storage:', error)
      return false
    }
  }

  /**
   * Recupera um valor do localStorage
   */
  get(key, defaultValue = null) {
    if (!this.isAvailable) {
      return defaultValue
    }

    try {
      const item = localStorage.getItem(this.getKey(key))
      
      if (item === null) {
        return defaultValue
      }

      const parsed = JSON.parse(item)
      
      // Verifica se é um objeto com nossa estrutura
      if (parsed && typeof parsed === 'object' && 'value' in parsed) {
        return parsed.value
      }
      
      // Fallback para dados antigos sem estrutura
      return parsed
    } catch (error) {
      console.error('Erro ao ler do storage:', error)
      return defaultValue
    }
  }

  /**
   * Remove um item do localStorage
   */
  remove(key) {
    if (!this.isAvailable) {
      return false
    }

    try {
      localStorage.removeItem(this.getKey(key))
      return true
    } catch (error) {
      console.error('Erro ao remover do storage:', error)
      return false
    }
  }

  /**
   * Limpa todos os dados do aplicativo
   */
  clear() {
    if (!this.isAvailable) {
      return false
    }

    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
      return true
    } catch (error) {
      console.error('Erro ao limpar storage:', error)
      return false
    }
  }

  /**
   * Obtém todos os dados do aplicativo
   */
  getAll() {
    if (!this.isAvailable) {
      return {}
    }

    try {
      const data = {}
      const keys = Object.keys(localStorage)
      
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const cleanKey = key.replace(this.prefix, '')
          data[cleanKey] = this.get(cleanKey)
        }
      })
      
      return data
    } catch (error) {
      console.error('Erro ao obter todos os dados do storage:', error)
      return {}
    }
  }

  /**
   * Obtém informações sobre o storage
   */
  getStorageInfo() {
    if (!this.isAvailable) {
      return {
        available: false,
        used: 0,
        total: 0,
        remaining: 0,
        itemCount: 0
      }
    }

    try {
      let used = 0
      const keys = Object.keys(localStorage)
      const itemCount = keys.filter(key => key.startsWith(this.prefix)).length
      
      keys.forEach(key => {
        used += localStorage.getItem(key).length
      })

      // Tenta estimar o limite do localStorage (geralmente 5-10MB)
      const testKey = '__size_test__'
      const testData = 'x'.repeat(1024) // 1KB
      let total = 0
      
      try {
        for (let i = 0; i < 10000; i++) { // Testa até 10MB
          localStorage.setItem(testKey, testData.repeat(i))
          total = i * 1024
        }
      } catch (e) {
        // Limite atingido
      } finally {
        localStorage.removeItem('test')
      }

      return {
        available: true,
        used,
        total: total || 5 * 1024 * 1024, // Fallback para 5MB
        remaining: (total || 5 * 1024 * 1024) - used,
        itemCount
      }
    } catch (error) {
      console.error('Erro ao obter informações do storage:', error)
      return {
        available: false,
        used: 0,
        total: 0,
        remaining: 0,
        itemCount: 0
      }
    }
  }

  /**
   * Migra dados antigos para nova estrutura
   */
  migrate() {
    if (!this.isAvailable) {
      return
    }

    try {
      const keys = Object.keys(localStorage)
      
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const item = localStorage.getItem(key)
          
          try {
            const parsed = JSON.parse(item)
            
            // Se não tem a estrutura nova, migra
            if (!parsed || typeof parsed !== 'object' || !('timestamp' in parsed)) {
              const cleanKey = key.replace(this.prefix, '')
              this.set(cleanKey, parsed)
            }
          } catch (e) {
            // Item não é JSON válido, remove
            localStorage.removeItem(key)
          }
        }
      })
    } catch (error) {
      console.error('Erro na migração do storage:', error)
    }
  }
}

// Instância singleton
export const persistentStorage = new PersistentStorageService()

// Executa migração na inicialização
persistentStorage.migrate()

export default persistentStorage