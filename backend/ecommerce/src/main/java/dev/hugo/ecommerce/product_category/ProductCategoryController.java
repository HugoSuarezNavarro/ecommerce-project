package dev.hugo.ecommerce.product_category;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@CrossOrigin({"http://localhost:4200", "http://192.168.0.23:4200"})
@RestController
@RequestMapping("/api/product-category")
public class ProductCategoryController {
    
    private ProductCategoryService categoryService;

    public ProductCategoryController(ProductCategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<ProductCategoryDTO> createCategory(@Valid @RequestBody ProductCategoryDTO categoryDTO) {
        ProductCategoryDTO createdCategory = categoryService.create(categoryDTO);
        return ResponseEntity.created(URI.create("/api/product-category/" + createdCategory.getId())).body(createdCategory);
    }

    @GetMapping
    public ResponseEntity<List<ProductCategory>> getAllProducts() {
        List<ProductCategory> categories =  categoryService.findAll();
        return  categories.isEmpty() ?
            ResponseEntity.noContent().build():
            ResponseEntity.ok(categories); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCategory> getProductById(@PathVariable Long id) {
        ProductCategory category =  categoryService.findById(id);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductCategoryDTO> updateCategory(@PathVariable Long id, @Valid @RequestBody ProductCategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.update(id, categoryDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
