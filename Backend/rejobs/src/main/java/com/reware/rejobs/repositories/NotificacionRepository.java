package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Notificacion;

@Repository
interface NotificacionRepository extends JpaRepository<Notificacion, Integer> {
    //Buscar Notificaciones por Usuario
    @Query("SELECT n FROM Notificacion n WHERE n.usuario.id = :idUsuario")
    List<Notificacion> findByUsuario(@Param("idUsuario") Integer idUsuario);
}



