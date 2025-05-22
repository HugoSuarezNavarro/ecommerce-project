package dev.hugo.ecommerce.product;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import dev.hugo.ecommerce.exception.DuplicateEntityException;
import dev.hugo.ecommerce.exception.EntityNotFoundException;
import dev.hugo.ecommerce.product_category.ProductCategory;
import dev.hugo.ecommerce.product_category.ProductCategoryRepository;

@Service
public class ProductServiceImpl implements ProductService{

    private ProductRepository productRepository;
    private ProductCategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, ProductCategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Product findProductById(Long id) {
        return productRepository.findById(id).orElseThrow(
            () -> new EntityNotFoundException("Product with id: " + id + " not found!")
        );
    }

    @Override
    @Transactional
    public ProductDTO create(ProductDTO productDTO) {
        // Check for ID in the incoming DTO
        if (productDTO.getId() != null) {
            if(productRepository.findById(productDTO.getId()).isPresent()) {
                throw new DuplicateEntityException("Product already exists.");
            } else {
                throw new IllegalArgumentException("Cannot create product with predefined ID.");
            }
        }

        // Fetch and validate category
        ProductCategory category = categoryRepository.findById(productDTO.getCategoryId())
            .orElseThrow(() -> new EntityNotFoundException("Product category not found"));

        // Map DTO to entity
        Product product = ProductDTO.toEntity(productDTO, category);

        // Save to DB and map back to DTO
        return ProductDTO.mapToDTO(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductDTO update(Long id, ProductDTO productDTO) {
        // Validate that the product exists
        Product existingProduct = productRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Product with ID " + id + " not found!"));

        // Map DTO to Entity
        Product updatedProduct = ProductDTO.updateEntityFromDTO(productDTO, existingProduct);

        // Update category if present
        if (productDTO.getCategoryId() != null) {
            ProductCategory category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category with ID " + productDTO.getCategoryId() + " not found!"));
            
            updatedProduct.setCategory(category);
        }
        
        // Save and return updated DTO
        return ProductDTO.mapToDTO(productRepository.save(updatedProduct));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Product existingProduct = productRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Unable to delete product with ID " + id + " because it does not exist!"));

        productRepository.delete(existingProduct);
    }

    @Override
    public Page<Product> findByCategoryId(Long id, Pageable pageable) {
        categoryRepository.findById(id).orElseThrow(
            () -> new EntityNotFoundException("The category with ID " + id + " does not exist!")
        );
        return productRepository.findByCategoryId(id, pageable);
    }

    @Override
    public Page<Product> findByKeyword(String keyword, Pageable pageable) {
        return productRepository.findByNameContaining(keyword, pageable);
    }
    
}