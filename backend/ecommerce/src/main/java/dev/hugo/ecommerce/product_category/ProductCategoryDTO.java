package dev.hugo.ecommerce.product_category;


import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductCategoryDTO {
    private Long id;
    @NotBlank(message = "category name required")
    @JsonProperty("category_name")
    private String categoryName;

    public static ProductCategoryDTO mapToDTO(ProductCategory category) {
        ProductCategoryDTO dto = new ProductCategoryDTO();
        
        dto.setId(category.getId());
        dto.setCategoryName(category.getCategoryName());

        return dto;
    }

    public static ProductCategory toEntity(ProductCategoryDTO dto) {
        if (dto == null) return null;

        ProductCategory category = new ProductCategory();
        category.setCategoryName(dto.getCategoryName());
        
        return category;
    }

    public static ProductCategory updateEntityFromDTO(ProductCategoryDTO dto, ProductCategory category) {

        if (dto.getCategoryName() != null) category.setCategoryName(dto.getCategoryName());

        return category;
    }
}
