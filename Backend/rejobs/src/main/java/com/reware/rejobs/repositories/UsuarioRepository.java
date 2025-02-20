package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{

    //Buscar Usuario por Email
    @EntityGraph(attributePaths= {"curriculum"})
    @Query("SELECT u FROM Usuario u WHERE u.id = :id")
    Usuario findByEmail(@Param("id") String email);

    //Buscar Usuario por id
    @EntityGraph(attributePaths= {"curriculum"})
    Usuario findByIdUser(Integer id);

    //Buscar por subcategoria en la categoria de notificacion
    @EntityGraph(attributePaths= {"notificaciones"})
    @Query("SELECT u FROM Usuario u WHERE u.notificaciones.subcategoria = :subcategoria AND u.notificaciones.categoria = :categoria")
    List<Usuario> findBySubcategoryAndCategory(@Param("subcategoria") String subcategoria, @Param("categoria") String categoria);
}

