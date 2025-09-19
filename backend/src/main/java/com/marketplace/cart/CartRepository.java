package com.marketplace.cart;

import com.marketplace.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
    
    @Query("SELECT ci FROM CartItem ci JOIN FETCH ci.product WHERE ci.user = :user")
    List<CartItem> findByUser(@Param("user") User user);
    
    Optional<CartItem> findByUserAndProduct(User user, com.marketplace.catalog.Product product);
    void deleteByUser(User user);
}
