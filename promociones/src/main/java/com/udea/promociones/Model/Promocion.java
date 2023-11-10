package com.udea.promociones.Model;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@ApiModel(description = "All details about the promotion.")
@Table(name = "promocion", schema = "promociones")
public class Promocion implements Serializable{
    @ApiModelProperty(notes = "The database generated promotion ID")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_promocion", length = 3, nullable = false, unique = true, updatable = false)
    private long idPromo;

    @ApiModelProperty(notes = "The promotion name")
    @Column(name = "nombre", nullable = false, length = 50)
    private String name;

    @ApiModelProperty(notes = "The promotion description")
    @Column(name = "descripcion", nullable = false, length = 50)
    private String description;

    @ApiModelProperty(notes = "The promotion discount percentage")
    @Column(name = "porcentaje_descuento", nullable = false, length = 3)
    @Min(1)
    @Max(50)
    private int discountPercentage;

    @ApiModelProperty(notes = "The promotion state")
    @Column(name = "estado", nullable = false, length = 1)
    private Boolean isActive;

    @ApiModelProperty(notes = "The promotion city")
    @Column(name = "ciudad", nullable = false, length = 50)
    private String city;

    @ApiModelProperty(notes = "The promotion start date")
    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime startDate;

    @ApiModelProperty(notes = "The promotion end date")
    @Column(name = "fecha_fin", nullable = false)
    private LocalDateTime endDate;
}
