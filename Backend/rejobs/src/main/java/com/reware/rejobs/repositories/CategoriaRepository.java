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
    
}
