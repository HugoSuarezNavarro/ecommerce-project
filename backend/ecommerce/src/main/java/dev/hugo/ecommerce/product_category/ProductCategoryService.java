package dev.hugo.ecommerce.product_category;

import java.util.List;

public interface ProductCategoryService {
    ProductCategoryDTO create(ProductCategoryDTO categoryDTO);
    List<ProductCategory> findAll(); 
    ProductCategory findById(Long id);
    ProductCategoryDTO update(Long id, ProductCategoryDTO categoryDTO);
    void delete(Long id);
}
