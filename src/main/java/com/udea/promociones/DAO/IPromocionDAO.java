package com.udea.promociones.DAO;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.udea.promociones.Model.Promocion;

@Repository
public interface IPromocionDAO extends CrudRepository<Promocion, Long>{
    //La promoción con mayor descuento
    @Query("SELECT p FROM Promocion p ORDER BY p.discountPercentage DESC")
    List<Promocion> findPromoWithMostDescount(Pageable pageable);

    //Las promociones por una ciudad en especifico
    @Query("SELECT p FROM Promocion p WHERE p.city = ?1")
    public List<Promocion> findByCity(String ciudad);
}
