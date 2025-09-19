-- Insert sample orders
INSERT INTO orders (user_id, total_cents, status, shipping_address, created_at) VALUES
(7, 114900, 'DELIVERED', '123 Main St, New York, NY 10001', '2024-01-15 10:30:00'),
(8, 32900, 'SHIPPED', '456 Oak Ave, Los Angeles, CA 90210', '2024-01-16 14:20:00'),
(9, 8900, 'CONFIRMED', '789 Pine Rd, Chicago, IL 60601', '2024-01-17 09:15:00'),
(10, 15000, 'DELIVERED', '321 Elm St, Houston, TX 77001', '2024-01-18 16:45:00'),
(11, 24900, 'PENDING', '654 Maple Dr, Phoenix, AZ 85001', '2024-01-19 11:30:00'),
(12, 39900, 'SHIPPED', '987 Cedar Ln, Philadelphia, PA 19101', '2024-01-20 13:20:00'),
(13, 15000, 'DELIVERED', '147 Birch St, San Antonio, TX 78201', '2024-01-21 08:45:00'),
(14, 8900, 'CONFIRMED', '258 Spruce Ave, San Diego, CA 92101', '2024-01-22 15:10:00'),
(15, 12000, 'DELIVERED', '369 Willow Rd, Dallas, TX 75201', '2024-01-23 12:30:00'),
(16, 4500, 'SHIPPED', '741 Poplar St, San Jose, CA 95101', '2024-01-24 09:20:00'),
(17, 8900, 'DELIVERED', '852 Ash Ave, Austin, TX 78701', '2024-01-25 14:15:00'),
(18, 3500, 'PENDING', '963 Hickory Dr, Jacksonville, FL 32201', '2024-01-26 10:45:00'),
(19, 15900, 'SHIPPED', '174 Walnut Ln, Fort Worth, TX 76101', '2024-01-27 11:30:00'),
(20, 4500, 'DELIVERED', '285 Cherry St, Columbus, OH 43201', '2024-01-28 16:20:00'),
(21, 12000, 'CONFIRMED', '396 Apple Rd, Charlotte, NC 28201', '2024-01-29 13:45:00'),
(22, 3500, 'SHIPPED', '507 Orange Ave, Seattle, WA 98101', '2024-01-30 08:30:00'),
(23, 8900, 'DELIVERED', '618 Peach St, Denver, CO 80201', '2024-01-31 15:15:00'),
(24, 2500, 'PENDING', '729 Pear Dr, Washington, DC 20001', '2024-02-01 12:00:00'),
(25, 12000, 'SHIPPED', '830 Grape Ln, Boston, MA 02101', '2024-02-02 09:45:00'),
(26, 3500, 'DELIVERED', '941 Berry Rd, Nashville, TN 37201', '2024-02-03 14:30:00');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price_cents) VALUES
-- Order 1
(1, 1, 1, 99900),
(1, 6, 1, 39900),
-- Order 2
(2, 11, 1, 15000),
(2, 13, 1, 8900),
(2, 14, 2, 4500),
-- Order 3
(3, 13, 1, 8900),
-- Order 4
(4, 11, 1, 15000),
-- Order 5
(5, 5, 1, 24900),
-- Order 6
(6, 6, 1, 39900),
-- Order 7
(7, 11, 1, 15000),
-- Order 8
(8, 13, 1, 8900),
-- Order 9
(9, 4, 1, 12000),
-- Order 10
(10, 16, 1, 4500),
-- Order 11
(11, 13, 1, 8900),
-- Order 12
(12, 24, 1, 3500),
-- Order 13
(13, 31, 1, 15900),
-- Order 14
(14, 32, 1, 4500),
-- Order 15
(15, 4, 1, 12000),
-- Order 16
(16, 24, 1, 3500),
-- Order 17
(17, 13, 1, 8900),
-- Order 18
(18, 17, 1, 2500),
-- Order 19
(19, 4, 1, 12000),
-- Order 20
(20, 24, 1, 3500);

-- Insert sample reviews
INSERT INTO reviews (product_id, user_id, rating, comment, created_at) VALUES
-- iPhone reviews
(1, 7, 5, 'Amazing phone! The camera quality is outstanding.', '2024-01-20 10:30:00'),
(1, 8, 4, 'Great device, but battery could be better.', '2024-01-21 14:20:00'),
(1, 9, 5, 'Perfect for photography and video recording.', '2024-01-22 09:15:00'),

-- MacBook reviews
(3, 10, 5, 'Excellent laptop for professional work.', '2024-01-23 16:45:00'),
(3, 11, 4, 'Fast and reliable, great for development.', '2024-01-24 11:30:00'),

-- Nike shoes reviews
(11, 12, 5, 'Very comfortable running shoes.', '2024-01-25 13:20:00'),
(11, 13, 4, 'Good quality, true to size.', '2024-01-26 08:45:00'),
(11, 14, 5, 'Perfect for daily workouts.', '2024-01-27 15:10:00'),

-- Jeans reviews
(13, 15, 4, 'Classic fit, good quality denim.', '2024-01-28 12:30:00'),
(13, 16, 3, 'Okay quality, but sizing runs small.', '2024-01-29 09:20:00'),

-- Tennis racket reviews
(31, 17, 5, 'Professional quality racket, great control.', '2024-01-30 14:15:00'),
(31, 18, 4, 'Good for intermediate players.', '2024-01-31 10:45:00'),

-- Basketball reviews
(32, 19, 5, 'Official quality ball, great grip.', '2024-02-01 11:30:00'),
(32, 20, 4, 'Good basketball for practice.', '2024-02-02 16:20:00'),

-- Book reviews
(41, 21, 5, 'Classic novel, must read for everyone.', '2024-02-03 13:45:00'),
(41, 22, 4, 'Timeless story, well written.', '2024-02-04 08:30:00'),

-- Harry Potter reviews
(42, 23, 5, 'Amazing series, perfect for all ages.', '2024-02-05 15:15:00'),
(42, 24, 5, 'Best fantasy series ever written.', '2024-02-06 12:00:00'),

-- Programming book reviews
(44, 25, 4, 'Good reference book for Java developers.', '2024-02-07 09:45:00'),
(44, 26, 5, 'Comprehensive guide to Java programming.', '2024-02-08 14:30:00');
