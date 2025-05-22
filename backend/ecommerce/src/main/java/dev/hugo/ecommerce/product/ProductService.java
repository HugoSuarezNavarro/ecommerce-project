package dev.hugo.ecommerce.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Page<Product> findAll(Pageable pageable);
    Page<Product> findByCategoryId(Long id, Pageable pageable);
    Page<Product> findByKeyword(String keyword, Pageable pageable);
    Product findProductById(Long id);
    ProductDTO create(ProductDTO productDTO);
    ProductDTO update(Long id, ProductDTO productDTO);
    void delete(Long id);
}
