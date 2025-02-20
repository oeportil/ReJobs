package com.reware.rejobs.repositories;

import java.util.List;  

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Idioma;

@Repository
public interface IdiomaRepository extends JpaRepository<Idioma, Integer>{

    //Buscar Idiomas de un Usuario en especifico
    @EntityGraph(attributePaths= {"curriculum"})
    @Query("SELECT i FROM Idioma i WHERE i.curriculum.usuario.id = :idUsuario")
    List<Idioma> findByUser(@Param("idUsuario") Integer idUsuario);
    
}
