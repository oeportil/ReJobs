package com.reware.rejobs.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.Curriculum;
import com.reware.rejobs.models.Hito;
import com.reware.rejobs.repositories.CurriculumRepository;
import com.reware.rejobs.repositories.HitoRepository;

@Service  
public class HitoService {

    private final HitoRepository hitoRepository;
    private final CurriculumRepository curriculumRepository;

    @Autowired
    public HitoService(HitoRepository hitoRepository, CurriculumRepository curriculumRepository) {
        this.hitoRepository = hitoRepository;
        this.curriculumRepository = curriculumRepository;
    }
    
    //Obtener todos los hitos por id del usuario
    public Iterable<Hito> getHitosByUserId(Integer idUsuario) {
        return hitoRepository.findByUser(idUsuario);
    }

    //Obtener todos los hitos
    public Iterable<Hito> getAllHitos() {
        return hitoRepository.findAll();
    }

    //Crear nuevo hito 
    public Hito createHito(String hito, String descripcion, Date fecha, String url, int idCurriculum) {
        Curriculum curr = curriculumRepository.findById(idCurriculum).orElse(null);
        if (curr!= null) {
            Hito nuevoHito = new Hito(hito, descripcion, fecha, url, curr);
            return hitoRepository.save(nuevoHito);
        } else {
            throw new RuntimeException("Curriculum no encontrado");
        }
    }

    //Eliminar el hito
    public void deleteHito(Integer id) {
        hitoRepository.deleteById(id);
    }
}
