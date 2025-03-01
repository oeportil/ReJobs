package com.reware.rejobs.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.Curriculum;
import com.reware.rejobs.models.Valor;
import com.reware.rejobs.repositories.CurriculumRepository;
import com.reware.rejobs.repositories.ValorRepository;


@Service  
public class ValorService {

    private final ValorRepository valorRepository;
    private final CurriculumRepository curriculumRepository;

    @Autowired
    public ValorService(ValorRepository valorRepository, CurriculumRepository curriculumRepository) {
        this.valorRepository = valorRepository;
        this.curriculumRepository = curriculumRepository;
    }
    
    // Obtener todos los valores
    public Iterable<Valor> getAllValores(){
        return valorRepository.findAll();
    }

    // Obtener valores por id del usuario
    public Iterable<Valor> findByUserId(Integer idUsuario) {
        return valorRepository.findByUser(idUsuario);
    }

    // Crear valor
    public Valor createValor(String valo, String descripcion, Integer idCurriculum) {
        Curriculum curriculum = curriculumRepository.findById(idCurriculum).orElse(null);
        if (curriculum!= null) {
            Valor valor = new Valor(valo, descripcion, curriculum);
            return valorRepository.save(valor);
        } else {
            throw new RuntimeException("Curriculum no encontrado");
        }
    }

    // Eliminar valor
    public void deleteValor(Integer id) {
        valorRepository.deleteById(id);
    }
}
