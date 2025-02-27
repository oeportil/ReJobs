package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Direccion;

@Repository
public interface DireccionRepository extends JpaRepository<Direccion, Integer> {
    //Obtener Direcciones por Usuario
    @Query("SELECT d FROM Direccion d WHERE d.usuario.id = :idUsuario")
    List<Direccion> findByUsuario(@Param("idUsuario") Integer idUsuario);
}

