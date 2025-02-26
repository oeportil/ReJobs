package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.SubCategoria;

@Repository
public interface SubCategoriaRepository extends JpaRepository<SubCategoria, Integer> {
    //Buscar SubCategorias por Nombre
    @Query("SELECT s FROM SubCategoria s WHERE LOWER(s.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) OR LOWER(s.categoria.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<SubCategoria> findByNombreLike(@Param("nombre") String nombre);
    
    //Buscar SubCategorias por Categoria (Id)
    @Query("SELECT s FROM SubCategoria s WHERE s.categoria.id = :categoriaId")
    List<SubCategoria> findByCategoriaId(@Param("categoriaId") Integer categoriaId);

    //Buscar SubCategorias por Categoria (Nombre)
    @Query("SELECT s FROM SubCategoria s WHERE LOWER(s.categoria.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<SubCategoria> findByCategoriaNombre(@Param("nombre") String nombre);
}
