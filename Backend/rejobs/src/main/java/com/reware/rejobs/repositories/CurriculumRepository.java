package com.reware.rejobs.repositories;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Curriculum;

@Repository
public interface CurriculumRepository extends JpaRepository<Curriculum, Integer> {
    //Encontrar el curriculum de un usuario
    @EntityGraph(attributePaths= {"usuario"})
    @Query("SELECT c FROM Curriculum c WHERE c.usuario.id = :idUsuario")
    Curriculum findByUserId(@Param("idUsuario") Integer idUsuario);
}

