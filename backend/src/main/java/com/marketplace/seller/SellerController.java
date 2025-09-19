package com.marketplace.seller;

import com.marketplace.auth.Role;
import com.marketplace.auth.User;
import com.marketplace.catalog.Category;
import com.marketplace.catalog.CategoryRepository;
import com.marketplace.catalog.Product;
import com.marketplace.catalog.ProductRepository;
import com.marketplace.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/seller/products")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('SELLER') or hasRole('ADMIN')")
public class SellerController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<Product>>> getMyProducts(
            Authentication authentication,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "20") int size) {
        
        User user = (User) authentication.getPrincipal();
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findBySeller(user, pageable);
        
        return ResponseEntity.ok(ApiResponse.success(products));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Product>> createProduct(
            @Valid @RequestBody ProductRequest request,
            Authentication authentication) {
        
        User user = (User) authentication.getPrincipal();
        
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPriceCents(request.getPriceCents());
        product.setStock(request.getStock());
        product.setCategory(category);
        product.setSeller(user);

        product = productRepository.save(product);
        return ResponseEntity.ok(ApiResponse.success(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request,
            Authentication authentication) {
        
        User user = (User) authentication.getPrincipal();
        
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if user owns the product or is admin
        if (!product.getSeller().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            return ResponseEntity.status(403)
                    .body(ApiResponse.error("Access denied"));
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPriceCents(request.getPriceCents());
        product.setStock(request.getStock());
        product.setCategory(category);

        product = productRepository.save(product);
        return ResponseEntity.ok(ApiResponse.success(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteProduct(
            @PathVariable Long id,
            Authentication authentication) {
        
        User user = (User) authentication.getPrincipal();
        
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if user owns the product or is admin
        if (!product.getSeller().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            return ResponseEntity.status(403)
                    .body(ApiResponse.error("Access denied"));
        }

        productRepository.delete(product);
        return ResponseEntity.ok(ApiResponse.success("Product deleted"));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<Category>>> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    public static class ProductRequest {
        private String title;
        private String description;
        private Long priceCents;
        private Integer stock;
        private Long categoryId;

        // Constructors
        public ProductRequest() {}

        public ProductRequest(String title, String description, Long priceCents, Integer stock, Long categoryId) {
            this.title = title;
            this.description = description;
            this.priceCents = priceCents;
            this.stock = stock;
            this.categoryId = categoryId;
        }

        // Getters and Setters
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Long getPriceCents() {
            return priceCents;
        }

        public void setPriceCents(Long priceCents) {
            this.priceCents = priceCents;
        }

        public Integer getStock() {
            return stock;
        }

        public void setStock(Integer stock) {
            this.stock = stock;
        }

        public Long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Long categoryId) {
            this.categoryId = categoryId;
        }
    }
}
