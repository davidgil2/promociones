package com.udea.promociones.Model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.Min;
import com.fasterxml.jackson.annotation.JsonFormat;
import javax.validation.constraints.Max;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ApiModel(description = "All details about the promotion.")
public class Promocion implements Serializable{
    @Id
    @ApiModelProperty(notes = "The database generated promotion ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idPromo")
    private long idPromo;

    @ApiModelProperty(notes = "The promotion name")
    @Column(name = "name", nullable = false, length = 80)
    private @NonNull String name;

    @ApiModelProperty(notes = "The promotion description")
    @Column(name = "description", nullable = true, length = 80)
    private String description;

    @ApiModelProperty(notes = "The promotion discount percentage")
    @Column(name = "discountPercentage", nullable = false, length = 4)
    @Min(value = 1, message = "More or equal than 1")
    @Max(value = 50, message = "Less or equal than 50")
    private @NonNull Integer discountPercentage;

    @ApiModelProperty(notes = "The promotion state")
    @Column(name = "isActive", nullable = false, length = 12)
    private @NonNull Boolean isActive;

    @ApiModelProperty(notes = "The promotion city")
    @Column(name = "city", nullable = false, length = 80)
    private @NonNull String city;

    @ApiModelProperty(notes = "The promotion start date")
    @Column(name = "startDate", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private @NonNull LocalDateTime startDate;

    @ApiModelProperty(notes = "The promotion end date")
    @Column(name = "endDate", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private @NonNull LocalDateTime endDate;
}
