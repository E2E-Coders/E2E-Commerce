package com.marketplace.review;

import com.marketplace.auth.User;
import com.marketplace.catalog.Product;
import com.marketplace.catalog.ProductRepository;
import com.marketplace.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/products/{productId}/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Review>>> getProductReviews(@PathVariable Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<Review> reviews = reviewRepository.findByProductOrderByCreatedAtDesc(product);
        return ResponseEntity.ok(ApiResponse.success(reviews));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Review>> createReview(
            @PathVariable Long productId,
            @Valid @RequestBody ReviewRequest request,
            Authentication authentication) {
        
        User user = (User) authentication.getPrincipal();
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if user already reviewed this product
        boolean alreadyReviewed = reviewRepository.findByProduct(product).stream()
                .anyMatch(review -> review.getUser().getId().equals(user.getId()));

        if (alreadyReviewed) {
            return ResponseEntity.status(422)
                    .body(ApiResponse.error("You have already reviewed this product"));
        }

        Review review = new Review(product, user, request.getRating(), request.getComment());
        review = reviewRepository.save(review);

        return ResponseEntity.ok(ApiResponse.success(review));
    }

    public static class ReviewRequest {
        private Integer rating;
        private String comment;

        // Constructors
        public ReviewRequest() {}

        public ReviewRequest(Integer rating, String comment) {
            this.rating = rating;
            this.comment = comment;
        }

        // Getters and Setters
        public Integer getRating() {
            return rating;
        }

        public void setRating(Integer rating) {
            this.rating = rating;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }
    }
}
