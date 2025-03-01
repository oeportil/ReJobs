package com.reware.rejobs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.Curriculum;
import com.reware.rejobs.models.Idioma;
import com.reware.rejobs.repositories.CurriculumRepository;
import com.reware.rejobs.repositories.IdiomaRepository;

@Service
public class IdiomaService {
    private final IdiomaRepository idiomaRepository;
    private final CurriculumRepository curriculumRepository;

    @Autowired
    public IdiomaService(IdiomaRepository idiomaRepository, CurriculumRepository curriculumRepository) {
        this.idiomaRepository = idiomaRepository;
        this.curriculumRepository = curriculumRepository;
    }

    //Obtener todos los idiomas
    public Iterable<Idioma> getAllIdiomas(){
        return idiomaRepository.findAll();
    }

    //Obtener idiomas de un Usuario en especifico
    public Iterable<Idioma> findByIdiomasByUser(Integer idUsuario){
        return idiomaRepository.findByUser(idUsuario);
    }

    //Crear nuevo idioma
    public Idioma createIdioma(String idiom, Integer idCurriculum){
        Curriculum curriculum = curriculumRepository.findById(idCurriculum).orElse(null);
        if (curriculum!= null) {
            Idioma idioma = new Idioma(idiom, curriculum);
            return idiomaRepository.save(idioma);
        } else {
            throw new RuntimeException("Curriculum no encontrado");
        }
    }

    //Eliminar idioma
    public void deleteIdioma(Integer id){
        idiomaRepository.deleteById(id);
    }
}