// Mock API implementation to replace backend calls
import {
  mockUsers,
  mockCategories,
  mockProducts,
  mockReviews,
  mockOrders,
  mockCoupons,
  getProductById,
  getProductsByCategory,
  getUserByEmail,
  getOrdersByUserId,
  getOrderById,
  getReviewsByProductId,
  getCouponByCode
} from './mockData.js'

// Simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

// Generate JWT token (mock)
const generateMockToken = (user) => {
  const payload = {
    userId: user.id,
    name: user.name,
    sub: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000), // issued at
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2) // 2 hours (mais curto para segurança)
  }
  
  // Simple base64 encoding for mock token
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payloadEncoded = btoa(JSON.stringify(payload))
  const signature = btoa('mock-signature')
  
  return `${header}.${payloadEncoded}.${signature}`
}

// Verificar se o token está expirado
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentTime
  } catch {
    return true
  }
}

// Get current user from localStorage
const getCurrentUser = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  
  // Verificar se o token está expirado
  if (isTokenExpired(token)) {
    localStorage.removeItem('token')
    return null
  }
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return mockUsers.find(user => user.id === payload.userId)
  } catch {
    return null
  }
}

// Cart management (localStorage)
const getCart = () => {
  const cart = localStorage.getItem('mockCart')
  return cart ? JSON.parse(cart) : []
}

const saveCart = (cartItems) => {
  localStorage.setItem('mockCart', JSON.stringify(cartItems))
}

// Mock API responses
export const mockApiHandlers = {
  // Authentication
  '/auth/login': {
    POST: async (data) => {
      await delay()
      const { email, password } = data
      const user = getUserByEmail(email)
      
      if (!user) {
        throw new Error('E-mail não encontrado. Verifique o endereço ou cadastre-se.')
      }
      
      if (user.password !== password) {
        throw new Error('Senha incorreta. Verifique sua senha e tente novamente.')
      }
      
      const token = generateMockToken(user)
      const { password: _, ...userWithoutPassword } = user
      
      return {
        success: true,
        data: {
          token,
          user: userWithoutPassword
        }
      }
    }
  },

  '/auth/register': {
    POST: async (data) => {
      await delay()
      const { name, email, password } = data
      
      // Check if user already exists
      if (getUserByEmail(email)) {
        throw new Error('Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.')
      }
      
      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        role: 'CUSTOMER',
        password
      }
      
      mockUsers.push(newUser)
      
      const token = generateMockToken(newUser)
      const { password: _, ...userWithoutPassword } = newUser
      
      return {
        success: true,
        data: {
          token,
          user: userWithoutPassword
        }
      }
    }
  },

  // Products
  '/products': {
    GET: async (params = {}) => {
      await delay()
      let filteredProducts = [...mockProducts]
      
      // Apply filters
      if (params.q) {
        const query = params.q.toLowerCase()
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        )
      }
      
      if (params.category) {
        filteredProducts = filteredProducts.filter(product =>
          product.categoryId === parseInt(params.category)
        )
      }
      
      if (params.minPrice) {
        filteredProducts = filteredProducts.filter(product =>
          product.priceCents >= parseInt(params.minPrice) * 100
        )
      }
      
      if (params.maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
          product.priceCents <= parseInt(params.maxPrice) * 100
        )
      }
      
      // Apply sorting
      const sortField = params.sort || 'createdAt'
      const direction = params.direction || 'desc'
      
      filteredProducts.sort((a, b) => {
        let aValue = a[sortField]
        let bValue = b[sortField]
        
        if (sortField === 'title') {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }
        
        if (direction === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
      
      // Apply pagination
      const page = parseInt(params.page) || 0
      const size = parseInt(params.size) || 20
      const startIndex = page * size
      const endIndex = startIndex + size
      
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
      
      return {
        success: true,
        data: {
          content: paginatedProducts,
          totalElements: filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / size),
          size,
          number: page,
          first: page === 0,
          last: page >= Math.ceil(filteredProducts.length / size) - 1
        }
      }
    }
  },

  '/products/categories': {
    GET: async () => {
      await delay()
      return {
        success: true,
        data: mockCategories
      }
    }
  },

  '/products/:id': {
    GET: async (params, pathParams) => {
      await delay()
      const product = getProductById(pathParams.id)
      if (!product) {
        throw new Error('Product not found')
      }
      
      return {
        success: true,
        data: product
      }
    }
  },

  '/products/:id/reviews': {
    GET: async (params, pathParams) => {
      await delay()
      const reviews = getReviewsByProductId(pathParams.id)
      
      return {
        success: true,
        data: reviews
      }
    },
    
    POST: async (data, pathParams) => {
      await delay()
      const user = getCurrentUser()
      if (!user) {
        throw new Error('Authentication required')
      }
      
      const newReview = {
        id: mockReviews.length + 1,
        productId: parseInt(pathParams.id),
        userId: user.id,
        user: { id: user.id, name: user.name },
        rating: data.rating,
        comment: data.comment,
        createdAt: new Date().toISOString()
      }
      
      mockReviews.push(newReview)
      
      return {
        success: true,
        data: newReview
      }
    }
  },

  // Cart
  '/cart': {
    GET: async () => {
      await delay()
      const user = getCurrentUser()
      if (!user) {
        throw new Error('Authentication required')
      }
      
      const cartItems = getCart()
      
      // Enrich cart items with product data
      const enrichedItems = cartItems.map(item => ({
        ...item,
        product: getProductById(item.productId)
      }))
      
      return {
        success: true,
        data: enrichedItems
      }
    },
    
    POST: async (data) => {
      await delay()
      const user = getCurrentUser()
      if (!user) {
        throw new Error('Authentication required')
      }
      
      const cartItems = getCart()
      const existingItem = cartItems.find(item => item.productId === data.productId)
      
      if (existingItem) {
        existingItem.quantity += data.quantity
      } else {
        cartItems.push({
          id: Date.now(),
          productId: data.productId,
          quantity: data.quantity,
          userId: user.id
        })
      }
      
      saveCart(cartItems)
      
      return {
        success: true,
        data: { message: 'Item added to cart' }
      }
    },
    
    DELETE: async () => {
      await delay()
      const user = getCurrentUser()
      if (!user) {
        throw new Error('Authentication required')
      }
      
      saveCart([])
      
      return {
        success: true,
        data: { message: 'Cart cleared' }
      }
    }
  },

  '/cart/:productId': {
    DELETE: async (params, pathParams) => {
      await delay()
      const user = getCurrentUser()
      if (!user) {
        throw new Error('Authentication required')
      }
      
      const cartItems = getCart()
      const filteredItems = cartItems.filter(item => 
        item.productId !== parseInt(pathParams.productId)
      )
      
      saveCart(filteredItems)
      
      return {
        success: true,
        data: { message: 'Item removed from cart' }
      }
    }
  },

  // Checkout
  '/checkout/quote': {
    POST: async (data) => {
      await delay()
      const user = getCurrentUser()
      if (!user) {
        throw new Error('Authentication required')
      }
      
      const cartItems = getCart()
      if (cartItems.length === 0) {
        throw new Error('Cart is empty')
      }
      
      // Calculate totals
      let subtotalCents = 0
      const items = cartItems.map(item => {
        const product = getProductById(item.productId)
        const itemTotal = product.priceCents * item.quantity
        subtotalCents += itemTotal
        
        return {
          productId: item.productId,
          product,
          quantity: item.quantity,
          priceCents: product.priceCents,
          totalCents: itemTotal
        }
      })
      
      // Calculate shipping (mock logic)
      let shippingCents = 1500 // R$ 15,00 default
      if (subtotalCents >= 10000) { // Free shipping over R$ 100
        shippingCents = 0
      }
      
      // Apply coupon if provided
      let discountCents = 0
      let coupon = null
      if (data.couponCode) {
        coupon = getCouponByCode(data.couponCode)
        if (coupon) {
          if (coupon.discountPercent && subtotalCents >= coupon.minOrderCents) {
            discountCents = Math.floor(subtotalCents * coupon.discountPercent / 100)
          }
          if (coupon.freeShipping && subtotalCents >= coupon.minOrderCents) {
            shippingCents = 0
          }
        }
      }
      
      const totalCents = subtotalCents + shippingCents - discountCents
      
      return {
        success: true,
        data: {
          items,
          subtotalCents,
          shippingCents,
          discountCents,
          totalCents,
          coupon,
          shippingAddress: data.shippingAddress,
          zipCode: data.zipCode
        }
      }
    }
  },

  '/checkout/confirm': {
    POST: async (data) => {
      await delay()
      const user = getCurrentUser()
      if (!user) {
        throw new Error('Authentication required')
      }
      
      const cartItems = getCart()
      if (cartItems.length === 0) {
        throw new Error('Cart is empty')
      }
      
      // Create order
      const newOrder = {
        id: mockOrders.length + 1,
        userId: user.id,
        status: 'PROCESSING',
        totalCents: data.totalCents,
        shippingAddress: data.shippingAddress,
        zipCode: data.zipCode,
        items: cartItems.map(item => {
          const product = getProductById(item.productId)
          return {
            id: Date.now() + Math.random(),
            productId: item.productId,
            product,
            quantity: item.quantity,
            priceCents: product.priceCents
          }
        }),
        shippingCents: data.shippingCents || 0,
        discountCents: data.discountCents || 0,
        createdAt: new Date().toISOString()
      }
      
      mockOrders.push(newOrder)
      
      // Clear cart
      saveCart([])
      
      return {
        success: true,
        data: newOrder
      }
    }
  },

  // Orders
  '/orders': {
    GET: async () => {
      await delay()
      const user = getCurrentUser()
      if (!user) {
        throw new Error('Authentication required')
      }
      
      const userOrders = getOrdersByUserId(user.id)
      
      return {
        success: true,
        data: userOrders
      }
    }
  },

  '/orders/:id': {
    GET: async (params, pathParams) => {
      await delay()
      const user = getCurrentUser()
      if (!user) {
        throw new Error('Authentication required')
      }
      
      const order = getOrderById(pathParams.id)
      if (!order || order.userId !== user.id) {
        throw new Error('Order not found')
      }
      
      return {
        success: true,
        data: order
      }
    }
  },

  // Seller endpoints
  '/seller/products': {
    GET: async () => {
      await delay()
      const user = getCurrentUser()
      if (!user || user.role !== 'SELLER') {
        throw new Error('Seller access required')
      }
      
      const sellerProducts = mockProducts.filter(product => product.sellerId === user.id)
      
      return {
        success: true,
        data: sellerProducts
      }
    },
    
    POST: async (data) => {
      await delay()
      const user = getCurrentUser()
      if (!user || user.role !== 'SELLER') {
        throw new Error('Seller access required')
      }
      
      const newProduct = {
        id: mockProducts.length + 1,
        title: data.title,
        description: data.description,
        priceCents: parseInt(data.priceCents),
        stock: parseInt(data.stock),
        categoryId: parseInt(data.categoryId),
        category: mockCategories.find(cat => cat.id === parseInt(data.categoryId)),
        sellerId: user.id,
        seller: { id: user.id, name: user.name },
        imageUrl: "/placeholder-product.svg",
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString()
      }
      
      mockProducts.push(newProduct)
      
      return {
        success: true,
        data: newProduct
      }
    }
  },

  '/seller/products/:id': {
    PUT: async (data, pathParams) => {
      await delay()
      const user = getCurrentUser()
      if (!user || user.role !== 'SELLER') {
        throw new Error('Seller access required')
      }
      
      const productIndex = mockProducts.findIndex(p => 
        p.id === parseInt(pathParams.id) && p.sellerId === user.id
      )
      
      if (productIndex === -1) {
        throw new Error('Product not found')
      }
      
      mockProducts[productIndex] = {
        ...mockProducts[productIndex],
        title: data.title,
        description: data.description,
        priceCents: parseInt(data.priceCents),
        stock: parseInt(data.stock),
        categoryId: parseInt(data.categoryId),
        category: mockCategories.find(cat => cat.id === parseInt(data.categoryId))
      }
      
      return {
        success: true,
        data: mockProducts[productIndex]
      }
    },
    
    DELETE: async (params, pathParams) => {
      await delay()
      const user = getCurrentUser()
      if (!user || user.role !== 'SELLER') {
        throw new Error('Seller access required')
      }
      
      const productIndex = mockProducts.findIndex(p => 
        p.id === parseInt(pathParams.id) && p.sellerId === user.id
      )
      
      if (productIndex === -1) {
        throw new Error('Product not found')
      }
      
      mockProducts.splice(productIndex, 1)
      
      return {
        success: true,
        data: { message: 'Product deleted' }
      }
    }
  },

  '/seller/categories': {
    GET: async () => {
      await delay()
      const user = getCurrentUser()
      if (!user || user.role !== 'SELLER') {
        throw new Error('Seller access required')
      }
      
      return {
        success: true,
        data: mockCategories
      }
    }
  }
}

// Helper function to match routes with parameters
export const matchRoute = (path, pattern) => {
  const pathParts = path.split('/')
  const patternParts = pattern.split('/')
  
  if (pathParts.length !== patternParts.length) {
    return null
  }
  
  const params = {}
  
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      const paramName = patternParts[i].slice(1)
      params[paramName] = pathParts[i]
    } else if (patternParts[i] !== pathParts[i]) {
      return null
    }
  }
  
  return params
}

// Main mock API handler
export const handleMockApiCall = async (method, path, data = null, queryParams = {}) => {
  // Remove query parameters from path for matching
  const cleanPath = path.split('?')[0]
  
  // Find matching handler
  for (const [pattern, handlers] of Object.entries(mockApiHandlers)) {
    const pathParams = matchRoute(cleanPath, pattern)
    
    if (pathParams !== null && handlers[method]) {
      try {
        const result = await handlers[method](queryParams, pathParams, data)
        return result
      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
  
  throw new Error(`Mock API handler not found: ${method} ${cleanPath}`)
}