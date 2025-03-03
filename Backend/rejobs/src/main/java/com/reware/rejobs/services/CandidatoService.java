package com.reware.rejobs.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.dto.CandiVacanteDTO;
import com.reware.rejobs.dto.CandidatoDTO;  
import com.reware.rejobs.models.Candidato;
import com.reware.rejobs.models.Usuario;
import com.reware.rejobs.models.Vacante;
import com.reware.rejobs.repositories.CandidatoRepository;
import com.reware.rejobs.repositories.UsuarioRepository;
import com.reware.rejobs.repositories.VacanteRepository;

@Service
public class CandidatoService {
    
    private final CandidatoRepository candidatoRepository;
    private final VacanteRepository vacanteRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public CandidatoService(CandidatoRepository candidatoRepository, VacanteRepository vacanteRepository, UsuarioRepository usuarioRepository) {
        this.candidatoRepository = candidatoRepository;
        this.vacanteRepository = vacanteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    //Buscar todas las Candidaturas
    public List<Candidato> findAllCandidatures(){
        return candidatoRepository.findAll();
    }

    //Buscar si un candidato existe por id y vacante usando Optional<CandiVacanteDTO> findUserVacantCandidatures
    public Boolean existUserVacantCandidatures(Integer idUsuario, Integer idVacante){
        return candidatoRepository.findUserVacantCandidatures(idUsuario, idVacante).isPresent();
    }

    //Buscar Candidatura por ID
    public Candidato findById(Integer idCandidato){
        return candidatoRepository.findById(idCandidato).orElse(null);
    }
    //Buscar Candidaturas del Usuario
    public List<CandidatoDTO> findUserCandidatures(Integer idUsuario){
        candidatoRepository.updateUserCandidaturesRevisado(idUsuario);
        return candidatoRepository.findUserCandidatures(idUsuario);
    }

    //Contar las Candidaturas del Usuario
    public Long countUserCandidatures(Integer idUsuario){
        return candidatoRepository.countUserCandidatures(idUsuario);
    }

    //Buscar Candidaturas del Reclutador
    public List<CandiVacanteDTO> findReclutadorCandidatures(Integer idReclutador){
        return candidatoRepository.findEmployerCandidatures(idReclutador);
    }

    //Contar las Candidaturas del Reclutador
    public Long countReclutadorCandidatures(Integer idReclutador){
        return candidatoRepository.countEmployerCandidatures(idReclutador);
    }

    //Buscar Candidaturas por Vacante
    public List<CandiVacanteDTO> findVacancyCandidatures(Integer idVacante){
        return candidatoRepository.findVacancyCandidatures(idVacante);
    }

    //Contar las Candidaturas por Vacante
    public Long countVacancyCandidatures(Integer idVacante){
        return candidatoRepository.countVacancyCandidatures(idVacante);
    }

    //Crear una Candidatura
    public Candidato save(int idVacante, int idUsuario){
        Vacante vacante = vacanteRepository.findById(idVacante).orElse(null);
        Usuario usuario = usuarioRepository.findById(idUsuario).orElse(null);
        Date fechadisp = null;
        Boolean contacto = null;
        if (vacante!= null && usuario!= null) {
            Candidato candidato = new Candidato(new Date(),fechadisp,contacto,null,vacante, true, usuario);
            return candidatoRepository.save(candidato);
        } else {
            throw new RuntimeException("Vacante o Usuario no encontrados");
        }
    }
    //Revisar y Cualificar Candidatura
    public void reviewCandidature(Integer idCandidato, boolean contacto, String nota){
        Candidato candidato = candidatoRepository.findById(idCandidato).orElse(null);
        if (candidato!= null) {
            candidato.setFechaDisp(new Date());
            candidato.setContacto(contacto);
            candidato.setRevisado(false);
            candidato.setNota(nota);
            candidatoRepository.save(candidato);
        } else {
            throw new RuntimeException("Candidatura no encontrada");
        }
    }
}
