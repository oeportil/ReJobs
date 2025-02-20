package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Academica;

@Repository
public interface AcademicaRepository extends JpaRepository<Academica, Integer>{
    
    //Encontrar Titulos Academicos de un usuario especifico
    @EntityGraph(attributePaths= {"curriculum"})
    @Query("SELECT a FROM Academica a WHERE a.curriculum.usuario.id = :idUsuario")
    List<Academica> findByUser(@Param("idUsuario") Integer idUsuario);
}
