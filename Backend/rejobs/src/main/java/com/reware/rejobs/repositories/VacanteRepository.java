package com.reware.rejobs.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Vacante;

@Repository
interface VacanteRepository extends JpaRepository<Vacante, Integer> {

    // Encontrar Vacantes de un usuario especifico
    @Query("SELECT v FROM Vacante v WHERE v.reclutador.id = :idUsuario")
    List<Vacante> findByUserId(@Param("idUsuario") Integer idUsuario);

    // Encontrar vacantes activas con like de nombre, empresa, contrato, salario, ubicacion, categoria o subcategoria
    @EntityGraph(attributePaths = {"subCategoria"})
    @Query("SELECT v FROM Vacante v WHERE LOWER(v.nombre) LIKE LOWER(:dato) OR LOWER(v.empresa) LIKE LOWER(:dato) OR LOWER(v.contrato) LIKE LOWER(:dato) OR LOWER(v.ciudad) LIKE LOWER(:dato) OR LOWER(v.region) LIKE LOWER(:dato) OR LOWER(v.pais) LIKE LOWER(:dato) OR LOWER(v.subCategoria.nombre) LIKE LOWER(:dato) OR LOWER(v.subCategoria.categoria.nombre) LIKE LOWER(:dato)")
    List<Vacante> findByLike(@Param("dato") String dato);

    // Encontrar vacantes activas con like de nombre, empresa, contrato, salario o ubicacion, y por id de subcategoria
    @EntityGraph(attributePaths = {"subCategoria"})
    @Query("SELECT v FROM Vacante v WHERE LOWER(v.nombre) LIKE LOWER(:dato) OR LOWER(v.empresa) LIKE LOWER(:dato) OR LOWER(v.contrato) LIKE LOWER(:dato) OR LOWER(v.ciudad) LIKE LOWER(:dato) OR LOWER(v.region) LIKE LOWER(:dato) OR LOWER(v.pais) LIKE LOWER(:dato) AND v.subCategoria.id = :idSubcategoria")
    List<Vacante> findByLikeAndSubcategoryId(@Param("dato") String dato, @Param("idSubcategoria") Integer idSubcategoria);
}

