package dev.hugo.ecommerce.product_category;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.hugo.ecommerce.exception.DuplicateEntityException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    private ProductCategoryRepository categoryRepository;

    public ProductCategoryServiceImpl(ProductCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Transactional
    public ProductCategoryDTO create(ProductCategoryDTO categoryDTO) {
        // Check for ID in the incoming DTO
        if (categoryDTO.getId() != null) {
            if (categoryRepository.findById(categoryDTO.getId()).isPresent()) {
                throw new DuplicateEntityException("Product already exists.");
            } else {
                throw new IllegalArgumentException("Cannot create product with predefined ID.");
            }
        }

        // Map DTO to Entity and return it as DTO
        ProductCategory category = ProductCategoryDTO.toEntity(categoryDTO);
        return ProductCategoryDTO.mapToDTO(categoryRepository.save(category));
    }

    @Override
    public List<ProductCategory> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public ProductCategory findById(Long id) {
        return categoryRepository.findById(id).orElseThrow(
            () -> new EntityNotFoundException("Can't find category with ID " + id)
        );
    }

    @Override
    @Transactional
    public ProductCategoryDTO update(Long id, ProductCategoryDTO categoryDTO) {
         // Validate that the product exists
        ProductCategory existingCategory = categoryRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Category with ID " + id + " not found!"));

        // Map DTO to Entity
        ProductCategory updatedCategory = ProductCategoryDTO.updateEntityFromDTO(categoryDTO, existingCategory);
        
        // Save and return updated DTO
        return ProductCategoryDTO.mapToDTO(categoryRepository.save(updatedCategory));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ProductCategory category = categoryRepository.findById(id).orElseThrow(
            () -> new EntityNotFoundException("Category with ID " + id + " not found!")
        );

       categoryRepository.delete(category);
    }

}
