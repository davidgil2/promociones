package com.udea.promociones.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.udea.promociones.Model.Promocion;

public interface IPromocionDAO extends CrudRepository<Promocion, Long>{
    //La promoción con mayor descuento
    @Query("SELECT p FROM Promocion p ORDER BY p.descuento DESC")
    public Promocion findPromoWithMostDescount();

    //Las promociones por una ciudad en especifico
    @Query("SELECT p FROM Promocion p WHERE p.ciudad = ?1")
    public List<Promocion> findByCity(String ciudad);
}
