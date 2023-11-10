package com.udea.promociones.Controller;

import javax.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.udea.promociones.Exception.DataDuplicateException;
import com.udea.promociones.Exception.PromoNotFoundException;
import com.udea.promociones.Model.Promocion;
import com.udea.promociones.Service.PromocionService;
import io.swagger.annotations.*;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/promo")
@CrossOrigin("*")
@Api(value = "Manejo del sistema de promociones")
public class PromocionController {
    @Autowired
    private PromocionService promocionService;

    @ApiOperation(value = "Agregar promoción")
    @PostMapping("/save")
    @ApiResponses(value = {
        @ApiResponse(code= 201, message = "Promoción creada exitosamente"),
        @ApiResponse(code = 400, message = "Parámetros de entrada inválidos"),
        @ApiResponse(code = 409, message = "Conflicto: La promoción ya existe") 
    })
    public ResponseEntity<Long> save(
            @ApiParam(value = "Objeto promoción guardado en la tabla de la base de datos", required = true)
            @Valid @RequestBody Promocion promocion) {
        try {
            promocionService.save(promocion);
            return new ResponseEntity<Long>(promocion.getIdPromo(), HttpStatus.CREATED);
        } catch (DataDuplicateException e) {
            throw new DataDuplicateException("La promoción ya existe en la base de datos.");
        }
    }

    @ApiOperation(value = "Eliminar promoción")
    @DeleteMapping("/delete/{id}")
    @ApiResponses( value = {
        @ApiResponse(code = 200, message = "Promoción eliminada exitosamente"),
        @ApiResponse(code = 404, message = "Promoción no encontrada"),
        @ApiResponse(code = 500, message = "Error interno del servidor")
    })
    public ResponseEntity<String> delete(
            @ApiParam(value = "ID de la promoción a ser eliminada", required = true)
            @PathVariable Long id) {
        try {
            promocionService.delete(id);
            return new ResponseEntity<String>("Promoción eliminada con ID: " + id, HttpStatus.OK);
        } catch (PromoNotFoundException e) {
            throw new PromoNotFoundException("Promoción no encontrada con ID: " + id);
        }
    }

    @ApiOperation(value = "Actualizar promoción")
    @PutMapping("/update/{id}")
    @ApiResponses( value = {
        @ApiResponse(code = 200, message = "Promoción actualizada exitosamente"),
        @ApiResponse(code = 404, message = "Promoción no encontrada"),
        @ApiResponse(code = 400, message = "Parámetros de entrada inválidos"),
        @ApiResponse(code = 500, message = "Error interno del servidor")
    })
    public ResponseEntity<Promocion> update(
            @ApiParam(value = "Promoción actualizada en la base de datos", required = true)
            @Valid @RequestBody Promocion promocion, @PathVariable Long id) {
        try {
            return new ResponseEntity<Promocion>(promocionService.update(promocion), HttpStatus.OK);
        } catch (PromoNotFoundException e) {
            throw new PromoNotFoundException("Promoción no encontrada con ID: " + id);
        }
    }

    @ApiOperation(value = "Buscar promoción por ID")
    @GetMapping("/find/{id}")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Promoción encontrada"),
            @ApiResponse(code = 400, message = "Parámetros de entrada inválidos"),
            @ApiResponse(code = 404, message = "Promoción no encontrada")
    })
    public ResponseEntity<Promocion> findById(
            @ApiParam(value = "ID de la promoción a ser buscada", required = true)
            @PathVariable("id") int id) {
        Promocion promo = promocionService.findById(id);
        if (promo == null) {
            throw new PromoNotFoundException("Promoción no encontrada con ID: " + id);
        } else {
            return new ResponseEntity<Promocion>(promocionService.findById(id), HttpStatus.OK);
        }
    }

    @ApiOperation(value = "Buscar todas las promociones")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Listado de promociones"),
            @ApiResponse(code = 401, message = "No estás autorizado para ver el recurso"),
            @ApiResponse(code = 403, message = "Acceso prohibido"),
            @ApiResponse(code = 404, message = "Promocion no encontrada ")
    })
    @GetMapping("/findAll")
    public ResponseEntity<Iterable<Promocion>> findAll() {
        return new ResponseEntity<Iterable<Promocion>>(promocionService.findAll(), HttpStatus.OK);
    }

    @ApiOperation(value = "Buscar promoción con el mayor descuento")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Promoción encontrada"),
            @ApiResponse(code = 404, message = "Promocion no encontrada"),
            @ApiResponse(code = 500, message = "Error interno del servidor")
    })
    @GetMapping("/bestDiscount")
    public ResponseEntity<Promocion> findBestDiscount() {
        try {
            return new ResponseEntity<Promocion>(promocionService.findBestDiscount(), HttpStatus.OK);
        } catch (PromoNotFoundException e) {
            throw new PromoNotFoundException("No hay promociones disponibles.");
        }
    }

    @ApiOperation(value = "Buscar promoción por ciudad")
    @GetMapping("/findByCity/{city}")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Listado de promoc "),
            @ApiResponse(code = 400, message = "Parámetros de entrada inválidos"),
            @ApiResponse(code = 404, message = "Promociones por ciud ")
    })
    public ResponseEntity<List<Promocion>> findByCity(
            @ApiParam(value = "Ciudad para buscar promociones", required = true)
            @PathVariable("city") String city) {
        List<Promocion> promociones = promocionService.findByCity(city);
        if (promociones.isEmpty()) {
            throw new PromoNotFoundException("No se encontraron promociones para la ciudad: " + city);
        } else {
            return new ResponseEntity<List<Promocion>>(promociones, HttpStatus.OK);
        }
    }
}