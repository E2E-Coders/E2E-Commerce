// Mock data for the E2E Commerce application
import { techCategories, techProducts } from './techCatalog.js' // Mantido para compatibilidade, mas merge será desativado

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
export const mockProducts = [] // Inicializado vazio; será preenchido com novos 16 produtos

// === NOVO CATÁLOGO: 16 PRODUTOS (estoques múltiplos de 10) ===
// Criar/garantir categorias específicas
function ensureCategory(name, description) {
  let cat = mockCategories.find(c => c.name === name)
  if (!cat) {
    cat = { id: mockCategories.length + 1, name, description: description || `Categoria ${name}` }
    mockCategories.push(cat)
  }
  return cat
}

const catConsoles = ensureCategory('Consoles', 'Videogames de nova geração')
const catPC = ensureCategory('PC Gamer', 'Computadores para jogos')
const catTeclados = ensureCategory('Teclados', 'Teclados mecânicos e low profile')
const catMouses = ensureCategory('Mouses', 'Mouses gamer de alto desempenho')
const catHeadsets = ensureCategory('Headsets', 'Headsets e fones gamer')
const catMonitores = ensureCategory('Monitores', 'Monitores de alta taxa de atualização')
const catMousepads = ensureCategory('Mousepads', 'Superfícies para precisão')

// Helper para criar produto
let prodId = 1
function addProduct({ title, description, priceCents, stock, category }) {
  mockProducts.push({
    id: prodId++,
    title,
    description,
    priceCents,
    stock, // múltiplo de 10
    categoryId: category.id,
    category,
    sellerId: 2,
    seller: mockUsers[1],
    imageUrl: null, // imagens removidas globalmente
    rating: 0,
    reviewCount: 0,
    createdAt: new Date().toISOString()
  })
}

// Consoles
addProduct({
  title: 'PlayStation 5 Standard 1TB',
  description: 'Console PS5 com 1 TB, suporte a 4K/120fps, ray tracing e áudio 3D. Embalagem: Console, 1 controle DualSense, HDMI 2.1, alimentação, manual.',
  priceCents: 479900,
  stock: 50,
  category: catConsoles
})
addProduct({
  title: 'PlayStation 5 Digital Edition 1TB',
  description: 'Versão digital do PS5, 1 TB SSD, sem leitor de disco. Embalagem: Console, 1 controle DualSense, HDMI 2.1, alimentação, manual.',
  priceCents: 439900,
  stock: 40,
  category: catConsoles
})

// Xbox
addProduct({
  title: 'Xbox Series X',
  description: 'Console 1 TB SSD, 4K/120fps, ray tracing, Game Pass incluso 1 mês. Embalagem: Console, controle Xbox Wireless, HDMI 2.1, alimentação.',
  priceCents: 399900,
  stock: 50,
  category: catConsoles
})
addProduct({
  title: 'Xbox Series S',
  description: 'Versão digital, 512 GB SSD, 1440p/120fps, Game Pass incluso. Embalagem: Console, controle Xbox Wireless, HDMI 2.1, alimentação.',
  priceCents: 239900,
  stock: 60,
  category: catConsoles
})

// PCs Gamer
addProduct({
  title: 'PC Gamer Intel i7 + RTX 4070',
  description: 'i7 13ª geração, RTX 4070, 16 GB DDR5, SSD 1 TB. Embalagem: Desktop montado, cabo de força, manual.',
  priceCents: 1419900,
  stock: 20,
  category: catPC
})
addProduct({
  title: 'PC Gamer AMD Ryzen 7 + RX 7800 XT',
  description: 'Ryzen 7 7800X3D, RX 7800 XT, 16 GB DDR5, SSD 1 TB. Embalagem: Desktop montado, cabo de força, manual.',
  priceCents: 1349900,
  stock: 20,
  category: catPC
})

// Teclados
addProduct({
  title: 'Teclado Mecânico Gamer RGB',
  description: 'Switches azuis, RGB, alumínio, keycaps PBT. Embalagem: Teclado, cabo USB-C, keycaps extras, manual.',
  priceCents: 84900,
  stock: 100,
  category: catTeclados
})
addProduct({
  title: 'Teclado Mecânico Low Profile',
  description: 'Switches low profile, RGB, layout 65%. Embalagem: Teclado, cabo USB-C, manual.',
  priceCents: 69900,
  stock: 80,
  category: catTeclados
})

// Mouses
addProduct({
  title: 'Mouse Gamer Óptico 16000 DPI',
  description: 'Sensor 16.000 DPI, 8 botões, RGB, 1000 Hz. Embalagem: Mouse, cabo USB trançado, manual.',
  priceCents: 39900,
  stock: 120,
  category: catMouses
})
addProduct({
  title: 'Mouse Sem Fio Gamer RGB',
  description: 'Wireless 2.4G, 60h bateria, DPI ajustável, RGB. Embalagem: Mouse, dongle 2.4G, cabo USB-C, manual.',
  priceCents: 49900,
  stock: 100,
  category: catMouses
})

// Headsets
addProduct({
  title: 'Headset Gamer 7.1 USB',
  description: 'Áudio surround 7.1, microfone destacável, almofadas couro sintético. Embalagem: Headset, cabo USB, adaptador, manual.',
  priceCents: 69900,
  stock: 90,
  category: catHeadsets
})
addProduct({
  title: 'Headset Sem Fio Bluetooth 2.4G',
  description: 'Bluetooth 5.2 + 2.4G, até 40h bateria, microfone retrátil. Embalagem: Headset, dongle/cabo de carga, manual.',
  priceCents: 89900,
  stock: 70,
  category: catHeadsets
})

// Monitores
addProduct({
  title: "Monitor 27'' QHD 165Hz",
  description: 'IPS 2560×1440, 165Hz, 1ms, FreeSync/G-Sync, bordas finas. Embalagem: Monitor, base ajustável, DP, HDMI, manual.',
  priceCents: 249900,
  stock: 40,
  category: catMonitores
})
addProduct({
  title: "Monitor 32'' 4K 144Hz",
  description: 'IPS 4K, 144Hz, HDR, suporte VESA. Embalagem: Monitor, base, DP, HDMI, manual.',
  priceCents: 429900,
  stock: 30,
  category: catMonitores
})

// Mousepads
addProduct({
  title: 'Mousepad Gamer XXL Alumínio',
  description: '900×400 mm, base alumínio antiderrapante, costura reforçada. Embalagem: Mousepad, manual.',
  priceCents: 24900,
  stock: 200,
  category: catMousepads
})
addProduct({
  title: 'Mousepad Gamer RGB XL',
  description: 'Tecido com borda RGB, iluminação end-to-end, antiderrapante. Embalagem: Mousepad, cabo USB, manual.',
  priceCents: 32900,
  stock: 150,
  category: catMousepads
})

// Desativar merge antigo de techProducts para manter somente os 16 novos
const ENABLE_LEGACY_TECH_PRODUCTS = false
if (ENABLE_LEGACY_TECH_PRODUCTS) {
  let nextId = mockProducts.length + 1
  techProducts.forEach(p => {
    const category = mockCategories.find(c => c.name === p.categoryName)
    if (category) {
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
}

// Merge tech products
// (Loop antigo removido / substituído pelo bloco condicional acima)

// Reviews
export const mockReviews = [] // Reviews limpos para novo catálogo

// Cart items (will be managed in localStorage)
export const mockCartItems = []

// Orders
export const mockOrders = [] // Pedidos zerados para novo catálogo

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