package com.marketplace.checkout;

import com.marketplace.auth.User;
import com.marketplace.cart.CartItem;
import com.marketplace.cart.CartRepository;
import com.marketplace.common.ApiResponse;
import com.marketplace.order.Order;
import com.marketplace.order.OrderItem;
import com.marketplace.order.OrderRepository;
import com.marketplace.order.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/checkout")
@CrossOrigin(origins = "*")
public class CheckoutController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/quote")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getQuote(
            @Valid @RequestBody QuoteRequest request, 
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<CartItem> cartItems = cartRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            return ResponseEntity.status(422)
                    .body(ApiResponse.error("Cart is empty"));
        }

        long subtotalCents = cartItems.stream()
                .mapToLong(CartItem::getTotalPriceCents)
                .sum();

        long shippingCents = calculateShipping(request.getZipCode());
        long discountCents = calculateDiscount(request.getCouponCode(), subtotalCents);
        long totalCents = subtotalCents + shippingCents - discountCents;

        Map<String, Object> quote = Map.of(
                "subtotal", BigDecimal.valueOf(subtotalCents).divide(BigDecimal.valueOf(100)),
                "shipping", BigDecimal.valueOf(shippingCents).divide(BigDecimal.valueOf(100)),
                "discount", BigDecimal.valueOf(discountCents).divide(BigDecimal.valueOf(100)),
                "total", BigDecimal.valueOf(totalCents).divide(BigDecimal.valueOf(100))
        );

        return ResponseEntity.ok(ApiResponse.success(quote));
    }

    @PostMapping("/confirm")
    @Transactional
    public ResponseEntity<ApiResponse<Order>> confirmOrder(
            @Valid @RequestBody CheckoutRequest request, 
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<CartItem> cartItems = cartRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            return ResponseEntity.status(422)
                    .body(ApiResponse.error("Cart is empty"));
        }

        // Calculate totals
        long subtotalCents = cartItems.stream()
                .mapToLong(CartItem::getTotalPriceCents)
                .sum();
        long shippingCents = calculateShipping(request.getZipCode());
        long discountCents = calculateDiscount(request.getCouponCode(), subtotalCents);
        long totalCents = subtotalCents + shippingCents - discountCents;

        // Create order
        Order order = new Order(user, totalCents, OrderStatus.PENDING, request.getShippingAddress());
        order = orderRepository.save(order);

        // Create order items
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem(
                    order,
                    cartItem.getProduct(),
                    cartItem.getQuantity(),
                    cartItem.getProduct().getPriceCents()
            );
            order.getItems().add(orderItem);
        }

        order = orderRepository.save(order);

        // Clear cart
        cartRepository.deleteByUser(user);

        return ResponseEntity.ok(ApiResponse.success(order));
    }

    private long calculateShipping(String zipCode) {
        // Simple shipping calculation based on zip code
        if (zipCode == null || zipCode.isEmpty()) {
            return 1000; // Default $10.00
        }
        
        // Mock shipping zones
        int zone = Integer.parseInt(zipCode.substring(0, 1));
        switch (zone) {
            case 0:
            case 1:
                return 500; // $5.00
            case 2:
            case 3:
                return 1000; // $10.00
            default:
                return 1500; // $15.00
        }
    }

    private long calculateDiscount(String couponCode, long subtotalCents) {
        if (couponCode == null || couponCode.isEmpty()) {
            return 0;
        }

        // Mock valid coupons
        switch (couponCode.toUpperCase()) {
            case "SAVE10":
                return Math.min(1000, subtotalCents / 10); // 10% off, max $10
            case "SAVE20":
                return Math.min(2000, subtotalCents / 5); // 20% off, max $20
            case "FREE":
                return Math.min(500, subtotalCents); // $5 off, max $5
            default:
                return 0;
        }
    }

    public static class QuoteRequest {
        private String zipCode;
        private String couponCode;

        // Constructors
        public QuoteRequest() {}

        public QuoteRequest(String zipCode, String couponCode) {
            this.zipCode = zipCode;
            this.couponCode = couponCode;
        }

        // Getters and Setters
        public String getZipCode() {
            return zipCode;
        }

        public void setZipCode(String zipCode) {
            this.zipCode = zipCode;
        }

        public String getCouponCode() {
            return couponCode;
        }

        public void setCouponCode(String couponCode) {
            this.couponCode = couponCode;
        }
    }

    public static class CheckoutRequest {
        private String shippingAddress;
        private String zipCode;
        private String couponCode;

        // Constructors
        public CheckoutRequest() {}

        public CheckoutRequest(String shippingAddress, String zipCode, String couponCode) {
            this.shippingAddress = shippingAddress;
            this.zipCode = zipCode;
            this.couponCode = couponCode;
        }

        // Getters and Setters
        public String getShippingAddress() {
            return shippingAddress;
        }

        public void setShippingAddress(String shippingAddress) {
            this.shippingAddress = shippingAddress;
        }

        public String getZipCode() {
            return zipCode;
        }

        public void setZipCode(String zipCode) {
            this.zipCode = zipCode;
        }

        public String getCouponCode() {
            return couponCode;
        }

        public void setCouponCode(String couponCode) {
            this.couponCode = couponCode;
        }
    }
}
