package com.reware.rejobs.repositories;

import  java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Experiencia;

@Repository
public interface ExperienciaRepository extends JpaRepository<Experiencia, Integer>{
    
    //Buscar Experiencias de un Usuario en especifico
    @EntityGraph(attributePaths= {"curriculum"})
    @Query("SELECT e FROM Experiencia WHERE e.curriculum.usuario.id = :idUsuario")
    List<Experiencia> findByUser(@Param("idUsuario") Integer idUsuario);
}
