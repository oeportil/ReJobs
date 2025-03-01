package com.reware.rejobs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.Curriculum;
import com.reware.rejobs.repositories.CurriculumRepository;

@Service  
public class CurriculumService {
    private final CurriculumRepository curriculumRepository;

    @Autowired
    public CurriculumService(CurriculumRepository curriculumRepository) {
        this.curriculumRepository = curriculumRepository;
    }
    
    //Obtener todos los curriculums
    public Iterable<Curriculum> getAllCurriculums(){
        return curriculumRepository.findAll();
    }

    //Obtener curriculum por id
    public Curriculum getById(Integer id){
        return curriculumRepository.findById(id).orElse(null);
    }

    //Obtener curriculum por usuario (id)
    public Curriculum findByUsuarioId(Integer idUsuario){
        return curriculumRepository.findByUserId(idUsuario);
    }
    
    //Crear curriculum
    public Curriculum save(Curriculum curriculum){
        return curriculumRepository.save(curriculum);
    }

    //Actualizar curriculum
    public Curriculum update(int id, String descripcion, String biografia){
        return curriculumRepository.findById(id).map( curriculum -> {
            if (descripcion!= null &&!descripcion.isBlank()){
                curriculum.setDescripcion(descripcion);
            }
            if (biografia!= null &&!biografia.isBlank()){
                curriculum.setBiografia(biografia);
            }
            return curriculumRepository.save(curriculum);
        }).orElseThrow(() -> new RuntimeException("Curriculum no encontrado"));
    }
}

