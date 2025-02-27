package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer>{
    //Buscar Categorias por Nombre
    @EntityGraph(attributePaths = {"id", "nombre"}) 
    @Query("SELECT c FROM Categoria c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Categoria> findByNombreLike(@Param("nombre") String nombre);
    
    //Buscar Categorias por SubCategorias
    @EntityGraph(attributePaths = {"subCategorias"}) 
    @Query("SELECT c FROM Categoria c WHERE c.id IN (SELECT sc.categoria.id FROM SubCategoria sc WHERE LOWER(sc.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')))")
    List<Categoria> findBySubCategoriasLike(@Param("nombre") String nombre);

    //Buscar Categorias por id Subcategorias
    @EntityGraph(attributePaths = {"subCategorias"}) 
    @Query("SELECT c FROM Categoria c WHERE c.id IN (SELECT sc.subCategoria.id FROM SubCategoria sc WHERE sc.id = :idSubCategoria)")
    List<Categoria> findBySubCategoryId(@Param("idSubCategoria") Integer idSubCategoria);
}
