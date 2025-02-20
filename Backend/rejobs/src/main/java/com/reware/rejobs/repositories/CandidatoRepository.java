package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.dto.CandiVacanteDTO;
import com.reware.rejobs.dto.CandidatoDTO;
import com.reware.rejobs.models.Candidato;

@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, Integer>{

    //Buscar Candidaturas del Usuario
    @Query("SELECT new com.reware.rejobs.dto.CandidatoDTO( " +
       "c.id, c.fechaCan, c.fechaDisp, c.nota, " +
       "CASE WHEN c.contacto IS NULL THEN 0 " +
       "     WHEN c.contacto = true THEN 1 " +
       "     ELSE 2 END, c.revisado, c.vacante.nombre, c.vacante.empresa, c.vacante.id) " +
       "FROM Candidato c WHERE c.usuario.id = :idUsuario")
    List<CandidatoDTO> findUserCandidatures(@Param("idUsuario") Integer idUsuario);

    //Contarlas
    @Query("SELECT COUNT(c) FROM Candidato c WHERE c.usuario.id = :idUsuario AND c.revisado = false")
    Long countUserCandidatures(@Param("idUsuario") Integer idUsuario);

    //Buscar Candidaturas del Reclutador
    @Query("SELECT new com.reware.rejobs.dto.CandiVacanteDTO( " +
        "c.id, c.fechaCan, c.fechaDisp, c.nota, " +
        "CASE WHEN c.contacto IS NULL THEN 0 " +
        "     WHEN c.contacto = true THEN 1 " +
        "     ELSE 2 END, c.revisado, c.usuario.nombre, c.usuario.email, c.usuario.telefono, c.usuario.pfp, c.usuario.id, c.vacante.nombre, c.vacante.empresa, c.vacante.id) " +
        "FROM Candidato c WHERE c.vacante.reclutador.id = :idUsuario ")
    List<CandiVacanteDTO> findEmployerCandidatures(@Param("idUsuario") Integer idUsuario);

    //Contarlas
    @Query("SELECT COUNT(c) FROM Candidato c WHERE c.vacante.reclutador.id = :idUsuario AND c.contacto IS NULL")
    Long countEmployerCandidatures(@Param("idUsuario") Integer idUsuario);

    //Buscar Candidaturas por Vacante
    @Query("SELECT new com.reware.rejobs.dto.CandiVacanteDTO( " +
        "c.id, c.fechaCan, c.fechaDisp, c.nota, " +
        "CASE WHEN c.contacto IS NULL THEN 0 " +
        "     WHEN c.contacto = true THEN 1 " +
        "     ELSE 2 END, c.revisado, c.usuario.nombre, c.usuario.email, c.usuario.telefono, c.usuario.pfp, c.usuario.id, c.vacante.nombre, c.vacante.empresa, c.vacante.id) " +
        "FROM Candidato c WHERE c.vacante.id = :idVacante")
        List<CandiVacanteDTO> findVacancyCandidatures(@Param("idVacante") Integer idVacante);

    //Contarlas
    @Query("SELECT COUNT(c) FROM Candidato c WHERE c.vacante.id = :idVacante AND c.contacto IS NULL")
    Long countVacancyCandidatures(@Param("idVacante") Integer idVacante);

    //Actualizar revisados del usuario
    @Query("UPDATE Candidato c SET c.revisado = true WHERE c.usuario.id = :idUsuario")
    void updateUserCandidaturesRevisado(@Param("idUsuario") Integer idUsuario);

}
