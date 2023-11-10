package com.udea.promociones.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udea.promociones.DAO.IPromocionDAO;
import com.udea.promociones.Exception.PromoNotFoundException;
import com.udea.promociones.Model.Promocion;

@Service
public class PromocionService {
    //Inyectando el DAO
    @Autowired
    private IPromocionDAO promoDAO;

    //Guardando una promocion
    public Promocion save(Promocion promo){
        return promoDAO.save(promo);
    }
    
    //Borrando la promocion
    public String delete(Long id){
        promoDAO.deleteById(id);
        return "promocion borrada";
    }

    //Editando la promoción
    public Promocion update(Promocion promo){
        Promocion existPromo = promoDAO.findById(promo.getIdPromo()).orElse(null);
        existPromo.setName(promo.getName());
        existPromo.setDescription(promo.getDescription());
        existPromo.setStartDate(promo.getStartDate());
        existPromo.setEndDate(promo.getEndDate());
        existPromo.setDiscountPercentage(promo.getDiscountPercentage());
        existPromo.setCity(promo.getCity());
        existPromo.setIsActive(promo.getIsActive());
        return promoDAO.save(promo);
    }

    //Obtener la promoción por id
    public Promocion findById(long id){
        return promoDAO.findById(id).orElse(null);
    }

    //Obtener todas las promociones
    public Iterable<Promocion> findAll(){
        return promoDAO.findAll();
    }

    //Encontrando promocion con el mayor descuento
    public Promocion findBestDiscount() throws PromoNotFoundException{
        Promocion promo = promoDAO.findPromoWithMostDescount();
        if (promo == null) {
            throw new PromoNotFoundException("No existe ninguna promocion");
        }else{
            return promo;
        }
    }

    //Encontrando las promociones por una ciudad en especifico
    public List<Promocion> findByCity(String city){
        List<Promocion> promos = promoDAO.findByCity(city);
        if (promos.size()>0) {
            return promos;
        }else{
            throw new PromoNotFoundException("No existen promociones en esta ciudad");
        }
    }
}
