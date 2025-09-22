
ALTER TABLE products ADD COLUMN image_url VARCHAR(500);



UPDATE products SET image_url = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' WHERE id = 1; -- iPhone
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' WHERE id = 2; -- Headphones
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' WHERE id = 3; -- iPhone (duplicate image)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop' WHERE id = 4; -- Laptop
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' WHERE id = 5; -- Headphones (duplicate)


UPDATE products SET image_url = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' WHERE id = 6; -- T-shirt
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop' WHERE id = 7; -- Jeans
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' WHERE id = 8; -- T-shirt (duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop' WHERE id = 9; -- Dress
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop' WHERE id = 10; -- Jeans (duplicate)


UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' WHERE id = 11; -- Coffee Maker
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' WHERE id = 12; -- Coffee Maker (duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' WHERE id = 13; -- Plant Pot
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' WHERE id = 14; -- Plant Pot (duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' WHERE id = 15; -- Coffee Maker (another duplicate)


UPDATE products SET image_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' WHERE id = 16; -- Basketball
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' WHERE id = 17; -- Basketball (duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1544966503-7cc4a6d2b4d8?w=400&h=300&fit=crop' WHERE id = 18; -- Yoga Mat
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' WHERE id = 19; -- Basketball (another duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1544966503-7cc4a6d2b4d8?w=400&h=300&fit=crop' WHERE id = 20; -- Yoga Mat (duplicate)


UPDATE products SET image_url = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' WHERE id = 21; -- Book
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' WHERE id = 22; -- Book (duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' WHERE id = 23; -- Book (another duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' WHERE id = 24; -- Book (yet another duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' WHERE id = 25; -- Book (fifth duplicate)


UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop' WHERE id = 26; -- Perfume
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop' WHERE id = 27; -- Perfume (duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop' WHERE id = 28; -- Perfume (another duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop' WHERE id = 29; -- Perfume (yet another duplicate)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop' WHERE id = 30; -- Perfume (fifth duplicate)


UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' WHERE id = 31; -- Plant Pot (wrong image!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' WHERE id = 32; -- Plant Pot (wrong image again!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' WHERE id = 33; -- Plant Pot (wrong image third time!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' WHERE id = 34; -- Plant Pot (wrong image fourth time!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' WHERE id = 35; -- Plant Pot (wrong image fifth time!)


UPDATE products SET image_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' WHERE id = 36; -- Basketball (wrong image!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' WHERE id = 37; -- Basketball (wrong image again!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' WHERE id = 38; -- Basketball (wrong image third time!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' WHERE id = 39; -- Basketball (wrong image fourth time!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' WHERE id = 40; -- Basketball (wrong image fifth time!)


UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' WHERE id = 41; -- Coffee Maker (wrong image!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' WHERE id = 42; -- Coffee Maker (wrong image again!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' WHERE id = 43; -- Coffee Maker (wrong image third time!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' WHERE id = 44; -- Coffee Maker (wrong image fourth time!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' WHERE id = 45; -- Coffee Maker (wrong image fifth time!)


UPDATE products SET image_url = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' WHERE id = 46; -- T-shirt (wrong image!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' WHERE id = 47; -- T-shirt (wrong image again!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' WHERE id = 48; -- T-shirt (wrong image third time!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' WHERE id = 49; -- T-shirt (wrong image fourth time!)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' WHERE id = 50; -- T-shirt (wrong image fifth time!)
