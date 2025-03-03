package com.reware.rejobs.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Vacante;

@Repository
public interface VacanteRepository extends JpaRepository<Vacante, Integer> {

    // Encontrar Vacantes de un usuario especifico
    @Query("SELECT v FROM Vacante v WHERE v.reclutador.id = :idUsuario")
    List<Vacante> findByUserId(@Param("idUsuario") Integer idUsuario);

    // Nueva Query - Ordenar por fechaInicio
    @Query("SELECT v FROM Vacante v WHERE v.reclutador.id = :idUsuario ORDER BY " +
           "CASE WHEN :ascendente = true THEN v.fechaInicio END ASC, " +
           "CASE WHEN :ascendente = false THEN v.fechaInicio END DESC")
    List<Vacante> findByUserIdOrdered(@Param("idUsuario") Integer idUsuario, @Param("ascendente") Boolean ascendente);

    // Encontrar vacantes activas con búsqueda LIKE
    @EntityGraph(attributePaths = {"subCategoria"})
    @Query("SELECT v FROM Vacante v WHERE LOWER(v.nombre) LIKE LOWER(:dato) OR LOWER(v.empresa) LIKE LOWER(:dato) OR LOWER(v.contrato) LIKE LOWER(:dato) OR LOWER(v.ciudad) LIKE LOWER(:dato) OR LOWER(v.region) LIKE LOWER(:dato) OR LOWER(v.pais) LIKE LOWER(:dato) OR LOWER(v.subCategoria.nombre) LIKE LOWER(:dato) OR LOWER(v.subCategoria.categoria.nombre) LIKE LOWER(:dato)")
    List<Vacante> findByLike(@Param("dato") String dato);

    // Buscar por LIKE y ordenar por fechaInicio
    @EntityGraph(attributePaths = {"subCategoria"})
    @Query("SELECT v FROM Vacante v WHERE " +
           "(LOWER(v.nombre) LIKE LOWER(:dato) OR LOWER(v.empresa) LIKE LOWER(:dato) OR LOWER(v.contrato) LIKE LOWER(:dato) OR " +
           "LOWER(v.ciudad) LIKE LOWER(:dato) OR LOWER(v.region) LIKE LOWER(:dato) OR LOWER(v.pais) LIKE LOWER(:dato) OR " +
           "LOWER(v.subCategoria.nombre) LIKE LOWER(:dato) OR LOWER(v.subCategoria.categoria.nombre) LIKE LOWER(:dato)) " +
           "ORDER BY " +
           "CASE WHEN :ascendente = true THEN v.fechaInicio END ASC, " +
           "CASE WHEN :ascendente = false THEN v.fechaInicio END DESC")
    List<Vacante> findByLikeOrdered(@Param("dato") String dato, @Param("ascendente") Boolean ascendente);

    // Buscar por LIKE y subcategoría
    @EntityGraph(attributePaths = {"subCategoria"})
    @Query("SELECT v FROM Vacante v WHERE " +
           "(LOWER(v.nombre) LIKE LOWER(:dato) OR LOWER(v.empresa) LIKE LOWER(:dato) OR LOWER(v.contrato) LIKE LOWER(:dato) OR " +
           "LOWER(v.ciudad) LIKE LOWER(:dato) OR LOWER(v.region) LIKE LOWER(:dato) OR LOWER(v.pais) LIKE LOWER(:dato) OR " +
           "LOWER(v.subCategoria.nombre) LIKE LOWER(:dato) OR LOWER(v.subCategoria.categoria.nombre) LIKE LOWER(:dato)) " +
           "AND v.subCategoria.id = :idSubcategoria")
    List<Vacante> findByLikeAndSubcategoryId(@Param("dato") String dato, @Param("idSubcategoria") Integer idSubcategoria);

    // Nueva Query - Buscar por LIKE, subcategoría y ordenar por fechaInicio
    @EntityGraph(attributePaths = {"subCategoria"})
    @Query("SELECT v FROM Vacante v WHERE " +
           "(LOWER(v.nombre) LIKE LOWER(:dato) OR LOWER(v.empresa) LIKE LOWER(:dato) OR LOWER(v.contrato) LIKE LOWER(:dato) OR " +
           "LOWER(v.ciudad) LIKE LOWER(:dato) OR LOWER(v.region) LIKE LOWER(:dato) OR LOWER(v.pais) LIKE LOWER(:dato) OR " +
           "LOWER(v.subCategoria.nombre) LIKE LOWER(:dato) OR LOWER(v.subCategoria.categoria.nombre) LIKE LOWER(:dato)) " +
           "AND v.subCategoria.id = :idSubcategoria " +
           "ORDER BY " +
           "CASE WHEN :ascendente = true THEN v.fechaInicio END ASC, " +
           "CASE WHEN :ascendente = false THEN v.fechaInicio END DESC")
    List<Vacante> findByLikeAndSubcategoryIdOrdered(@Param("dato") String dato, @Param("idSubcategoria") Integer idSubcategoria, @Param("ascendente") Boolean ascendente);

    //Obtener id nueva vacante + 1
    @Query("SELECT COALESCE(MAX(v.id), 0) + 1 FROM Vacante v")
    Integer getNextId();
}


