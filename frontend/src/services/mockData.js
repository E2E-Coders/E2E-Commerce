// Mock data for the E2E Commerce application
import { techCategories, techProducts } from './techCatalog.js'

// Utilitário para gerar uma imagem SVG dinâmica (data URI) baseada em título e categoria
function generateImageDataUri(title, categoryName) {
  const palette = [
    '#4f46e5', '#6366f1', '#7c3aed', '#4338ca', '#0f766e', '#047857', '#2563eb', '#1d4ed8', '#db2777', '#be185d'
  ]
  const hash = [...(title + categoryName)].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const color = palette[hash % palette.length]
  const label = title.length > 18 ? title.slice(0, 17) + '…' : title
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'>` +
    `<rect width='500' height='500' rx='8' fill='${color}'/>` +
    `<text x='50%' y='50%' font-family='Arial, sans-serif' font-size='40' font-weight='700' fill='white' dominant-baseline='middle' text-anchor='middle'>${label.replace(/&/g,'&amp;')}</text>` +
    `<text x='50%' y='90%' font-family='Arial, sans-serif' font-size='20' fill='white' opacity='0.8' dominant-baseline='middle' text-anchor='middle'>${categoryName}</text>` +
    `</svg>`
  const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22')
  return `data:image/svg+xml;utf8,${encoded}`
}

// Default users for testing
export const mockUsers = [
  {
    id: 1,
    name: "Admin Master",
    email: "admin@e2ecommerce.com",
    role: "ADMIN",
    password: "S3nh4@Admin",
    balanceCents: 100000000000,
    receivableCents: 250000000
  },
  {
    id: 2,
    name: "Seller One",
    email: "seller1@e2ecommerce.com",
    role: "SELLER",
    password: "S3nh4@Seller",
    receivableCents: 12500000,
    balanceCents: 0
  },
  {
    id: 3,
    name: "Buyer Prime",
    email: "buyer1@e2ecommerce.com",
    role: "CUSTOMER",
    password: "S3nh4@Buyer",
    // Ajustado para exatamente R$ 1.000.000,00 conforme requisito (centavos)
    balanceCents: 100000000,
    receivableCents: 0
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

// Append new tech categories without duplicates
techCategories.forEach(cat => {
  if (!mockCategories.find(c => c.name === cat.name)) {
    mockCategories.push({ id: mockCategories.length + 1, name: cat.name, description: `Categoria ${cat.name}` })
  }
})

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
    imageUrl: generateImageDataUri('Galaxy A54', 'Eletrônicos'),
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
    imageUrl: generateImageDataUri('Inspiron 15', 'Eletrônicos'),
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
  imageUrl: generateImageDataUri('Camiseta Algodão', 'Roupas'),
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
  imageUrl: generateImageDataUri('Tênis Air Max', 'Esportes'),
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
  imageUrl: generateImageDataUri('Livro Clean Code', 'Livros'),
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
  imageUrl: generateImageDataUri('Perfume Importado', 'Beleza'),
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
  imageUrl: generateImageDataUri('Mesa Jantar 6', 'Casa e Jardim'),
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
  imageUrl: generateImageDataUri('Fone Bluetooth', 'Eletrônicos'),
    rating: 4.4,
    reviewCount: 203,
    createdAt: "2024-01-25T08:45:00Z"
  }
]

// Merge tech products
let nextId = mockProducts.length + 1
techProducts.forEach(p => {
  const category = mockCategories.find(c => c.name === p.categoryName)
  if (category) {
    // Gera path ilustrativo baseado na categoria e nome do produto
  const slugCat = p.categoryName.toLowerCase().replace(/\s+/g,'-')
  const slugTitle = p.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')
  const imgPath = p.imageUrl || generateImageDataUri(p.title, p.categoryName)
    mockProducts.push({
      id: nextId++,
      title: p.title,
      description: p.description,
      priceCents: p.priceCents,
      stock: p.stock,
      active: true,
      promo: p.promo || false,
      categoryId: category.id,
      category,
      sellerId: 2,
      seller: mockUsers[1],
      imageUrl: imgPath,
      rating: 0,
      reviewCount: 0,
      createdAt: p.createdAt
    })
  }
})

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