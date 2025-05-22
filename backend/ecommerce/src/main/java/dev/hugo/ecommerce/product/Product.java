package dev.hugo.ecommerce.product;

import java.math.BigDecimal;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import dev.hugo.ecommerce.product_category.ProductCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "product")
@Data
public class Product {
    
    // @JsonProperty("id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // @JsonProperty("sku")
    @Column(name = "sku")
    private String sku;
    // @JsonProperty("name")
    @Column(name = "name")
    private String name;
    // @JsonProperty("description")
    @Column(name = "description")
    private String description;
    // @JsonProperty("unit_price")
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
    // @JsonProperty("image_url")
    @Column(name = "image_url")
    private String imageUrl;
    // @JsonProperty("active")    
    @Column(name = "active")
    private Boolean active;
    // @JsonProperty("units_in_stock")
    @Column(name = "units_in_stock")
    private Integer unitsInStock;
    // @JsonProperty("date_created")
    @Column(name = "date_created")
    @CreationTimestamp // Uses the current timestamp when creating the entity
    private Date dateCreated;
    // @JsonProperty("last_updated")
    @Column(name = "last_updated")
    @UpdateTimestamp // Uses the current timestamp when creating the entity
    private Date lastUpdated;
    // @JsonProperty("category")
    @JsonManagedReference // Breaks infinite recursion when serializing JSON
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;
    


    
}
