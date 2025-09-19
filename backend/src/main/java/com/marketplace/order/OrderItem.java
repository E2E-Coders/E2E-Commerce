package com.marketplace.order;

import com.marketplace.catalog.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(nullable = false)
    private Integer quantity;

    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @Column(name = "price_cents", nullable = false)
    private Long priceCents;

    // Constructors
    public OrderItem() {}

    public OrderItem(Order order, Product product, Integer quantity, Long priceCents) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.priceCents = priceCents;
    }

    // Helper methods
    public BigDecimal getPrice() {
        return BigDecimal.valueOf(priceCents).divide(BigDecimal.valueOf(100));
    }

    public void setPrice(BigDecimal price) {
        this.priceCents = price.multiply(BigDecimal.valueOf(100)).longValue();
    }

    public Long getTotalPriceCents() {
        return priceCents * quantity;
    }

    public BigDecimal getTotalPrice() {
        return BigDecimal.valueOf(getTotalPriceCents()).divide(BigDecimal.valueOf(100));
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getPriceCents() {
        return priceCents;
    }

    public void setPriceCents(Long priceCents) {
        this.priceCents = priceCents;
    }
}
