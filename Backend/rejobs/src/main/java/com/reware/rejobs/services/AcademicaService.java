package com.reware.rejobs.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.Academica;
import com.reware.rejobs.models.Curriculum;
import com.reware.rejobs.repositories.AcademicaRepository;
import com.reware.rejobs.repositories.CurriculumRepository;

@Service
public class AcademicaService {
    
    private final AcademicaRepository academicaRepository;
    private final CurriculumRepository curriculumRepository;

    @Autowired
    public AcademicaService(AcademicaRepository academicaRepository, CurriculumRepository curriculumRepository) {
        this.academicaRepository = academicaRepository;
        this.curriculumRepository = curriculumRepository;
    }

    //Obtener historial academico por id del usuario
    public Iterable<Academica> findByUserId(Integer idUsuario) {
        return academicaRepository.findByUser(idUsuario);
    }

    //Obtener todos los historiales academicos
    public Iterable<Academica> getAllAcademicas() {
        return academicaRepository.findAll();
    }

    //Crear nuevo historial academico
    public Academica createAcademica(String institucion, Date fecha, String sede, String titulo, String descripcion, int idCurriculum) {
        Curriculum curr = curriculumRepository.findById(idCurriculum).orElse(null);
        if (curr!= null) {
            Academica academica = new Academica(institucion, fecha, sede, titulo, descripcion, curr);
            return academicaRepository.save(academica);
        } else {
            throw new RuntimeException("Curriculum no encontrado");
        }
    }

    //Eliminar el historial academico
    public void deleteAcademica(Integer id) {
        academicaRepository.deleteById(id);
    }
}


