package com.reware.rejobs.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.Requisito;
import com.reware.rejobs.models.Vacante;
import com.reware.rejobs.repositories.RequisitoRepository; 
import com.reware.rejobs.repositories.VacanteRepository; 

@Service  
public class RequisitoService {
    private final RequisitoRepository requisitoRepository;
    private final VacanteRepository vacanteRepository;

    @Autowired
    public RequisitoService(RequisitoRepository requisitoRepository, VacanteRepository vacanteRepository) {
        this.requisitoRepository = requisitoRepository;
        this.vacanteRepository = vacanteRepository;
    }

    //Obtener todos los requisitos
    public Iterable<Requisito> getAllRequisitos(){
        return requisitoRepository.findAll();
    }

    //Obtener requisitos de una vacante en especifico
    public Iterable<Requisito> findByVacante(Vacante vacante){
        return requisitoRepository.findByVacante(vacante.getId());
    }

    //Crear nuevo requisito
    public Requisito createRequisito(String nombre, String descripcion, Boolean minimo, int idVacante){
        Vacante vacante = vacanteRepository.findById(idVacante).orElse(null);
        if (vacante!= null && nombre != null && descripcion != null) {
            Requisito nuevoRequisito = new Requisito(nombre, descripcion, minimo, vacante);
            return requisitoRepository.save(nuevoRequisito);
        } else {
            throw new RuntimeException("Vacante no encontrada o nombre y descripcion vacios");
        }
    }

    //Eliminar requisito
    public void deleteRequisito(Integer id){
        requisitoRepository.deleteById(id);
    }
    
}
