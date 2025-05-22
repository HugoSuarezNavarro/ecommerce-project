package dev.hugo.ecommerce.product;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

import dev.hugo.ecommerce.product_category.ProductCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class ProductDTO {

    private Long id;
    @NotBlank(message = "SKU is required")
    @Pattern(
        regexp = "^[A-Z]+(-[A-Z]+)*-[0-9]+$",
        message = "SKU must follow the pattern BOOK-TECH-1000"
    )
    private String sku;
    @NotBlank(message = "name is required")
    private String name;
    @NotBlank(message = "description is required")
    private String description;
    @NotNull(message = "price is required")
    @PositiveOrZero
    @JsonProperty("unit_price")
    private BigDecimal unitPrice;
    @NotNull(message = "image url is required")
    @JsonProperty("image_url")
    private String imageUrl;    
    private Boolean active;
    @NotNull(message = "units in stock required")
    @JsonProperty("units_in_stock")
    @PositiveOrZero
    private Integer unitsInStock;
    @NotNull(message = "category id is required")
    @JsonProperty("category_id")
    private Long categoryId;
    @JsonProperty("category_name")
    private String categoryName;

    public static ProductDTO mapToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setSku(product.getSku());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setUnitPrice(product.getUnitPrice());
        dto.setImageUrl(product.getImageUrl());
        dto.setActive(product.getActive());
        dto.setUnitsInStock(product.getUnitsInStock());
        dto.setCategoryId(product.getCategory().getId());
        dto.setCategoryName(product.getCategory().getCategoryName());

        return dto;
    }

    public static Product toEntity(ProductDTO dto, ProductCategory category) {
        if (dto == null) return null;

        Product product = new Product();
        product.setSku(dto.getSku());
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setUnitPrice(dto.getUnitPrice());
        product.setImageUrl(dto.getImageUrl());
        product.setActive(dto.getActive());
        product.setUnitsInStock(dto.getUnitsInStock());
        product.setCategory(category);

        return product;
    }

    public static Product updateEntityFromDTO(ProductDTO dto, Product product) {

        if (dto.getSku() != null) product.setSku(dto.getSku());
        if (dto.getName() != null) product.setName(dto.getName());
        if (dto.getDescription() != null) product.setDescription(dto.getDescription());
        if (dto.getUnitPrice() != null) product.setUnitPrice(dto.getUnitPrice());
        if (dto.getImageUrl() != null) product.setImageUrl(dto.getImageUrl());
        if (dto.getActive() != null) product.setActive(dto.getActive());
        if (dto.getUnitsInStock() != null) product.setUnitsInStock(dto.getUnitsInStock());

        return product;
    }
}


