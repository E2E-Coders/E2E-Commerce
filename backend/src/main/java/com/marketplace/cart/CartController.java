package com.marketplace.cart;

import com.marketplace.auth.User;
import com.marketplace.common.ApiResponse;
import com.marketplace.catalog.Product;
import com.marketplace.catalog.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CartItem>>> getCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<CartItem> cartItems = cartRepository.findByUser(user);
        return ResponseEntity.ok(ApiResponse.success(cartItems));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CartItem>> addToCart(
            @Valid @RequestBody CartRequest request, 
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < request.getQuantity()) {
            return ResponseEntity.status(422)
                    .body(ApiResponse.error("Insufficient stock"));
        }

        Optional<CartItem> existingItem = cartRepository.findByUserAndProduct(user, product);
        
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            cartRepository.save(item);
            return ResponseEntity.ok(ApiResponse.success(item));
        } else {
            CartItem newItem = new CartItem(user, product, request.getQuantity());
            cartRepository.save(newItem);
            return ResponseEntity.ok(ApiResponse.success(newItem));
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<String>> removeFromCart(
            @PathVariable Long productId, 
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> cartItem = cartRepository.findByUserAndProduct(user, product);
        
        if (cartItem.isPresent()) {
            cartRepository.delete(cartItem.get());
            return ResponseEntity.ok(ApiResponse.success("Item removed from cart"));
        } else {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("Item not found in cart"));
        }
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<String>> clearCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        cartRepository.deleteByUser(user);
        return ResponseEntity.ok(ApiResponse.success("Cart cleared"));
    }

    public static class CartRequest {
        private Long productId;
        private Integer quantity;

        // Constructors
        public CartRequest() {}

        public CartRequest(Long productId, Integer quantity) {
            this.productId = productId;
            this.quantity = quantity;
        }

        // Getters and Setters
        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
}
