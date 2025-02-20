package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Hito;

@Repository
public interface HitoRepository extends JpaRepository<Hito, Integer>{
    //Buscar Hitos de un Usuario especifico
    @EntityGraph(attributePaths= {"curriculum"})
    @Query("SELECT h FROM Hito WHERE h.curriculum.usuario.id = :idUsuario")
    List<Hito> findByUser(@Param("idUsuario") Integer idUsuario);
}
