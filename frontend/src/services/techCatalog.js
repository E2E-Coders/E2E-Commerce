// Catálogo tecnológico adicional (~100 produtos)
export const techCategories = [
  { name: 'PlayStation' },
  { name: 'Xbox' },
  { name: 'PC Gamer' },
  { name: 'Notebooks' },
  { name: 'TVs' },
  { name: 'Monitores' },
  { name: 'Teclados' },
  { name: 'Mouses' },
  { name: 'Headsets' }
]

const baseData = {
  PlayStation: [
    'PS5 Slim 1TB', 'PS5 Edição Digital', 'PS4 Pro 1TB',
    'Controle DualSense Branco', 'Controle DualSense Midnight Black', 'Headset Pulse 3D'
  ],
  Xbox: [
    'Xbox Series X 1TB', 'Xbox Series S 512GB', 'Controle Xbox Carbon Black',
    'Headset Xbox Stereo', 'Xbox Elite Controller 2'
  ],
  'PC Gamer': [
    'Desktop Gamer RTX 4060', 'Desktop Gamer RTX 4070', 'Desktop Gamer RTX 4080',
    'Water Cooler 240mm', 'Gabinete Mid Tower RGB', 'Fonte 750W 80 Plus Gold'
  ],
  Notebooks: [
    'Notebook Gamer i7 RTX 4050', 'Ultrabook i5 16GB RAM', 'Notebook Ryzen 7 32GB',
    'MacBook Air M2 13"', 'MacBook Pro M3 14"'
  ],
  TVs: [
    'Smart TV 55" 4K QLED', 'Smart TV 65" 4K OLED', 'TV 50" 4K HDR',
    'Smart TV 75" MiniLED', 'TV 43" 4K HDR10'
  ],
  Monitores: [
    'Monitor 27" 165Hz IPS', 'Monitor 24" 144Hz', 'Monitor Ultrawide 34" 144Hz',
    'Monitor 32" 4K UHD', 'Monitor 49" Super Ultrawide'
  ],
  Teclados: [
    'Teclado Mecânico RGB Switch Red', 'Teclado Mecânico Low Profile',
    'Teclado 60% Wireless', 'Teclado TKL Switch Brown', 'Teclado Gamer ABNT2'
  ],
  Mouses: [
    'Mouse Gamer 26K DPI', 'Mouse Sem Fio 2.4G', 'Mouse Ultralight 59g',
    'Mouse MMO 12 Botões', 'Mouse Vertical Ergonômico'
  ],
  Headsets: [
    'Headset Gamer 7.1 USB', 'Headset Wireless 2.4G', 'Headset Bluetooth ANC',
    'Headset Studio Monitoring', 'Headset In-Ear Gamer'
  ]
}

const rand = (min,max) => Math.floor(Math.random()*(max-min+1))+min
const now = Date.now()

export const techProducts = []

Object.entries(baseData).forEach(([categoryName, titles]) => {
  titles.forEach((title, idx) => {
    techProducts.push({
      categoryName,
      title,
      description: `${title} - modelo de alta performance, ideal para uso intensivo e entusiastas.`,
      priceCents: rand(300, 15000) * 100,
      stock: rand(1, 99),
      imageUrl: `/images/${categoryName.toLowerCase().replace(/\s+/g,'-')}/${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.jpg`,
      createdAt: new Date(now - rand(0, 1000*60*60*24*60)).toISOString(),
      promo: idx === 0 // primeiro de cada categoria em promoção
    })
  })
})

// Completar lista até ~100 itens se necessário
const extra = 100 - techProducts.length
for (let i = 0; i < extra; i++) {
  const cat = techCategories[i % techCategories.length].name
  techProducts.push({
    categoryName: cat,
    title: `${cat} Produto Série ${i+1}`,
    description: `Variação ${i+1} da linha ${cat}, com excelente custo-benefício.`,
    priceCents: rand(250, 9000) * 100,
    stock: rand(1,99),
    imageUrl: `/images/${cat.toLowerCase().replace(/\s+/g,'-')}/generico-${i+1}.jpg`,
    createdAt: new Date(now - rand(0, 1000*60*60*24*90)).toISOString(),
    promo: false
  })
}
