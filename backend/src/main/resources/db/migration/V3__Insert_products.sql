-- Insert products
INSERT INTO products (title, description, price_cents, stock, category_id, seller_id) VALUES
-- Electronics (seller1)
('iPhone 15 Pro', 'Latest Apple iPhone with advanced camera system', 99900, 50, 1, 2),
('Samsung Galaxy S24', 'Premium Android smartphone with AI features', 89900, 45, 1, 2),
('MacBook Pro 14"', 'Powerful laptop for professionals', 199900, 25, 1, 2),
('iPad Air', 'Versatile tablet for work and play', 59900, 30, 1, 2),
('AirPods Pro', 'Wireless earbuds with noise cancellation', 24900, 100, 1, 2),
('Apple Watch Series 9', 'Smartwatch with health tracking', 39900, 75, 1, 2),
('Sony WH-1000XM5', 'Premium noise-canceling headphones', 39900, 40, 1, 2),
('Nintendo Switch', 'Gaming console for home and on-the-go', 29900, 60, 1, 2),
('Canon EOS R6', 'Professional mirrorless camera', 249900, 15, 1, 2),
('DJI Mini 3', 'Compact drone for aerial photography', 49900, 20, 1, 2),

-- Clothing (seller2)
('Nike Air Max 270', 'Comfortable running shoes', 15000, 80, 2, 3),
('Adidas Ultraboost 22', 'Premium running shoes', 18000, 60, 2, 3),
('Levi\'s 501 Jeans', 'Classic straight-fit jeans', 8900, 120, 2, 3),
('Uniqlo Heattech Shirt', 'Thermal base layer shirt', 1900, 200, 2, 3),
('North Face Jacket', 'Waterproof outdoor jacket', 25000, 45, 2, 3),
('Converse Chuck Taylor', 'Classic canvas sneakers', 6500, 150, 2, 3),
('H&M Basic T-Shirt', 'Comfortable cotton t-shirt', 1200, 300, 2, 3),
('Zara Blazer', 'Professional blazer for office', 8900, 70, 2, 3),
('Gap Hoodie', 'Warm fleece hoodie', 4500, 90, 2, 3),
('Under Armour Sports Bra', 'High-performance sports bra', 3500, 110, 2, 3),

-- Home & Garden (seller4)
('IKEA Billy Bookcase', 'Modular bookcase system', 8900, 25, 3, 5),
('Philips Hue Bulb Set', 'Smart LED light bulbs', 12000, 50, 3, 5),
('Roomba i7+', 'Robot vacuum with self-emptying', 79900, 15, 3, 5),
('KitchenAid Stand Mixer', 'Professional kitchen mixer', 39900, 20, 3, 5),
('Dyson V15 Vacuum', 'Cordless stick vacuum cleaner', 64900, 12, 3, 5),
('Weber Grill', 'Gas grill for outdoor cooking', 45000, 18, 3, 5),
('Nest Thermostat', 'Smart home thermostat', 24900, 35, 3, 5),
('Instant Pot', 'Multi-cooker pressure cooker', 12900, 40, 3, 5),
('Casper Mattress', 'Memory foam mattress', 89500, 8, 3, 5),
('Ring Doorbell', 'Smart video doorbell', 19900, 30, 3, 5),

-- Sports (seller3)
('Wilson Tennis Racket', 'Professional tennis racket', 15900, 35, 4, 4),
('Nike Basketball', 'Official size basketball', 4500, 80, 4, 4),
('Adidas Soccer Cleats', 'Professional soccer cleats', 12000, 45, 4, 4),
('Yoga Mat Premium', 'Non-slip yoga mat', 3500, 100, 4, 4),
('Dumbbell Set 20kg', 'Adjustable dumbbell set', 8900, 25, 4, 4),
('Cycling Helmet', 'Safety cycling helmet', 6900, 60, 4, 4),
('Swimming Goggles', 'Anti-fog swimming goggles', 1900, 150, 4, 4),
('Running Shorts', 'Lightweight running shorts', 2500, 120, 4, 4),
('Golf Club Set', 'Complete golf club set', 29900, 15, 4, 4),
('Treadmill Home', 'Folding home treadmill', 89900, 8, 4, 4),

-- Books (seller5)
('The Great Gatsby', 'Classic American novel', 1200, 200, 5, 6),
('Harry Potter Box Set', 'Complete 7-book series', 8900, 50, 5, 6),
('1984 by George Orwell', 'Dystopian classic novel', 1500, 180, 5, 6),
('Programming in Java', 'Computer programming textbook', 8900, 75, 5, 6),
('Cookbook: Italian Cuisine', 'Traditional Italian recipes', 3500, 90, 5, 6),
('Self-Help: Atomic Habits', 'Personal development book', 1800, 120, 5, 6),
('Science Fiction Collection', 'Best sci-fi stories', 4500, 60, 5, 6),
('Children\'s Picture Book', 'Illustrated children\'s story', 1200, 150, 5, 6),
('Biography: Steve Jobs', 'Life story of Apple founder', 2500, 80, 5, 6),
('Art History Textbook', 'Comprehensive art history guide', 12000, 40, 5, 6);
