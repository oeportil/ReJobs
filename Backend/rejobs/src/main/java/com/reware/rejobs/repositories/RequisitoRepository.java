package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Requisito;

@Repository
public interface RequisitoRepository extends JpaRepository<Requisito, Integer> {

    // Encontrar Requisitos de una vacante especifica
    @EntityGraph(attributePaths= {"vacante"})
    @Query("SELECT r FROM Requisito r WHERE r.vacante.id = :idVacante")
    List<Requisito> findByVacante(@Param("idVacante") Integer idVacante);
}

