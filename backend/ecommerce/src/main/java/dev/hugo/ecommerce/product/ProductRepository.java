package dev.hugo.ecommerce.product;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long>{
    
    Page<Product> findByCategoryId(Long id, Pageable pageable);
    Page<Product> findByNameContaining(String keyword, Pageable pageable);
}