// Mock data for the E2E Commerce application

// Default users for testing
export const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@teste.com",
    role: "CUSTOMER",
    password: "123456"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@teste.com", 
    role: "SELLER",
    password: "123456"
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@teste.com",
    role: "ADMIN", 
    password: "admin123"
  }
]

// Categories
export const mockCategories = [
  { id: 1, name: "Eletrônicos", description: "Produtos eletrônicos em geral" },
  { id: 2, name: "Roupas", description: "Vestuário e acessórios" },
  { id: 3, name: "Casa e Jardim", description: "Produtos para casa e jardim" },
  { id: 4, name: "Esportes", description: "Artigos esportivos" },
  { id: 5, name: "Livros", description: "Livros e materiais educativos" },
  { id: 6, name: "Beleza", description: "Produtos de beleza e cuidados pessoais" }
]

// Products
export const mockProducts = [
  {
    id: 1,
    title: "Smartphone Samsung Galaxy A54",
    description: "Smartphone com tela de 6.4 polegadas, 128GB de armazenamento e câmera tripla de 50MP",
    priceCents: 149900, // R$ 1.499,00
    stock: 25,
    categoryId: 1,
    category: mockCategories[0],
    sellerId: 2,
    seller: mockUsers[1],
    imageUrl: "/placeholder-product.svg",
    rating: 4.5,
    reviewCount: 128,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Notebook Dell Inspiron 15",
    description: "Notebook com processador Intel i5, 8GB RAM, SSD 256GB e tela Full HD de 15.6 polegadas",
    priceCents: 279900, // R$ 2.799,00
    stock: 12,
    categoryId: 1,
    category: mockCategories[0],
    sellerId: 2,
    seller: mockUsers[1],
    imageUrl: "/placeholder-product.svg",
    rating: 4.2,
    reviewCount: 89,
    createdAt: "2024-01-10T14:30:00Z"
  },
  {
    id: 3,
    title: "Camiseta Básica Algodão",
    description: "Camiseta 100% algodão, disponível em várias cores e tamanhos",
    priceCents: 3990, // R$ 39,90
    stock: 150,
    categoryId: 2,
    category: mockCategories[1],
    sellerId: 2,
    seller: mockUsers[1],
    imageUrl: "/placeholder-product.svg",
    rating: 4.0,
    reviewCount: 245,
    createdAt: "2024-01-20T09:15:00Z"
  },
  {
    id: 4,
    title: "Tênis Nike Air Max",
    description: "Tênis esportivo confortável para corrida e atividades físicas",
    priceCents: 45900, // R$ 459,00
    stock: 35,
    categoryId: 4,
    category: mockCategories[3],
    sellerId: 2,
    seller: mockUsers[1],
    imageUrl: "/placeholder-product.svg",
    rating: 4.7,
    reviewCount: 167,
    createdAt: "2024-01-18T16:45:00Z"
  },
  {
    id: 5,
    title: "Livro: Clean Code",
    description: "Guia completo para escrever código limpo e maintível",
    priceCents: 8990, // R$ 89,90
    stock: 78,
    categoryId: 5,
    category: mockCategories[4],
    sellerId: 2,
    seller: mockUsers[1],
    imageUrl: "/placeholder-product.svg",
    rating: 4.8,
    reviewCount: 312,
    createdAt: "2024-01-12T11:20:00Z"
  },
  {
    id: 6,
    title: "Perfume Importado 100ml",
    description: "Fragrância masculina sofisticada com notas amadeiradas",
    priceCents: 12900, // R$ 129,00
    stock: 42,
    categoryId: 6,
    category: mockCategories[5],
    sellerId: 2,
    seller: mockUsers[1],
    imageUrl: "/placeholder-product.svg",
    rating: 4.3,
    reviewCount: 98,
    createdAt: "2024-01-22T13:10:00Z"
  },
  {
    id: 7,
    title: "Mesa de Jantar 6 Lugares",
    description: "Mesa de madeira maciça com acabamento natural, ideal para 6 pessoas",
    priceCents: 89900, // R$ 899,00
    stock: 8,
    categoryId: 3,
    category: mockCategories[2],
    sellerId: 2,
    seller: mockUsers[1],
    imageUrl: "/placeholder-product.svg",
    rating: 4.6,
    reviewCount: 45,
    createdAt: "2024-01-08T15:30:00Z"
  },
  {
    id: 8,
    title: "Fone de Ouvido Bluetooth",
    description: "Fone sem fio com cancelamento de ruído e bateria de 30 horas",
    priceCents: 19900, // R$ 199,00
    stock: 67,
    categoryId: 1,
    category: mockCategories[0],
    sellerId: 2,
    seller: mockUsers[1],
    imageUrl: "/placeholder-product.svg",
    rating: 4.4,
    reviewCount: 203,
    createdAt: "2024-01-25T08:45:00Z"
  }
]

// Reviews
export const mockReviews = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    user: mockUsers[0],
    rating: 5,
    comment: "Excelente smartphone! Muito rápido e com ótima qualidade de câmera.",
    createdAt: "2024-01-20T14:30:00Z"
  },
  {
    id: 2,
    productId: 1,
    userId: 3,
    user: mockUsers[2],
    rating: 4,
    comment: "Bom custo-benefício, recomendo!",
    createdAt: "2024-01-18T10:15:00Z"
  },
  {
    id: 3,
    productId: 2,
    userId: 1,
    user: mockUsers[0],
    rating: 4,
    comment: "Notebook rápido para trabalho. Bateria poderia durar mais.",
    createdAt: "2024-01-15T16:20:00Z"
  },
  {
    id: 4,
    productId: 5,
    userId: 1,
    user: mockUsers[0],
    rating: 5,
    comment: "Livro essencial para qualquer programador. Muito bem escrito!",
    createdAt: "2024-01-14T09:30:00Z"
  }
]

// Cart items (will be managed in localStorage)
export const mockCartItems = []

// Orders
export const mockOrders = [
  {
    id: 1,
    userId: 1,
    status: "DELIVERED",
    totalCents: 189890, // R$ 1.898,90
    shippingAddress: "Rua das Flores, 123 - São Paulo, SP",
    zipCode: "01234-567",
    items: [
      {
        id: 1,
        productId: 1,
        product: mockProducts[0],
        quantity: 1,
        priceCents: 149900
      },
      {
        id: 2,
        productId: 3,
        product: mockProducts[2],
        quantity: 1,
        priceCents: 3990
      }
    ],
    shippingCents: 1500, // R$ 15,00
    discountCents: 0,
    createdAt: "2024-01-10T10:00:00Z",
    deliveredAt: "2024-01-15T14:30:00Z"
  },
  {
    id: 2,
    userId: 1,
    status: "PROCESSING",
    totalCents: 45900,
    shippingAddress: "Rua das Flores, 123 - São Paulo, SP",
    zipCode: "01234-567",
    items: [
      {
        id: 3,
        productId: 4,
        product: mockProducts[3],
        quantity: 1,
        priceCents: 45900
      }
    ],
    shippingCents: 0, // Frete grátis
    discountCents: 0,
    createdAt: "2024-01-25T15:20:00Z"
  }
]

// Coupons
export const mockCoupons = [
  {
    code: "DESCONTO10",
    discountPercent: 10,
    minOrderCents: 10000, // Mínimo R$ 100,00
    active: true
  },
  {
    code: "FRETEGRATIS",
    freeShipping: true,
    minOrderCents: 5000, // Mínimo R$ 50,00
    active: true
  },
  {
    code: "BEMVINDO20",
    discountPercent: 20,
    minOrderCents: 15000, // Mínimo R$ 150,00
    active: true
  }
]

// Helper functions
export const getProductById = (id) => {
  return mockProducts.find(product => product.id === parseInt(id))
}

export const getProductsByCategory = (categoryId) => {
  return mockProducts.filter(product => product.categoryId === parseInt(categoryId))
}

export const getUserByEmail = (email) => {
  return mockUsers.find(user => user.email === email)
}

export const getOrdersByUserId = (userId) => {
  return mockOrders.filter(order => order.userId === parseInt(userId))
}

export const getOrderById = (id) => {
  return mockOrders.find(order => order.id === parseInt(id))
}

export const getReviewsByProductId = (productId) => {
  return mockReviews.filter(review => review.productId === parseInt(productId))
}

export const getCouponByCode = (code) => {
  return mockCoupons.find(coupon => coupon.code === code && coupon.active)
}