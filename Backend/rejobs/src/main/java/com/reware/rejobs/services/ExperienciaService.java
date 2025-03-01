package com.reware.rejobs.services;


import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.Curriculum;
import com.reware.rejobs.models.Experiencia;
import com.reware.rejobs.repositories.CurriculumRepository;
import com.reware.rejobs.repositories.ExperienciaRepository;

@Service  
public class ExperienciaService {
    
    private final ExperienciaRepository experienciaRepository;
    private final CurriculumRepository curriculumRepository;  

    @Autowired
    public ExperienciaService(ExperienciaRepository experienciaRepository, CurriculumRepository curriculumRepository) {
        this.experienciaRepository = experienciaRepository;
        this.curriculumRepository = curriculumRepository;  
    }

    //Obtener todas las experiencias
    public Iterable<Experiencia> getAllExperiencias(){
        return experienciaRepository.findAll();
    }

    //Obtener experiencias de un Usuario en especifico
    public Iterable<Experiencia> findByUser(Integer idUsuario){
        return experienciaRepository.findByUser(idUsuario);
    }

    //Crear nueva experiencia
    public Experiencia createExperiencia(String empresa, Date fecha_inicio, Date fecha_fin, String cargo, String area, String descripcion, Integer idCurriculum){
        Curriculum curriculum = curriculumRepository.findById(idCurriculum).orElse(null);
        if (curriculum!= null) {
            Experiencia experiencia = new Experiencia(empresa, fecha_inicio, fecha_fin, cargo, area, descripcion, curriculum);
            return experienciaRepository.save(experiencia);
        } else {
            throw new RuntimeException("Curriculum no encontrado");
        }
    }

    //Eliminar experiencia
    public void deleteExperiencia(Integer id){
        experienciaRepository.deleteById(id);
    }
}
