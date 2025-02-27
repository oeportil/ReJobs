package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Notificacion;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Integer> {
    //Buscar Notificaciones por Usuario
    @Query("SELECT n FROM Notificacion n WHERE n.usuario.id = :idUsuario")
    List<Notificacion> findByUsuario(@Param("idUsuario") Integer idUsuario);

    //Buscar Notificaciones por Categoria
    @Query("SELECT n FROM Notificacion n WHERE n.categoria.id = :idCategoria")
    List<Notificacion> findByCategoria(@Param("idCategoria") Integer idCategoria);

    //Buscar Notificaciones por SubCategorias
    @Query("SELECT n FROM Notificacion n " +
       "JOIN n.categoria c " +
       "JOIN c.subCategorias sc " +
       "WHERE sc.id = :idSubCategoria")
    List<Notificacion> findBySubCategoryId(@Param("idSubCategoria") Integer idSubCategoria);



}



