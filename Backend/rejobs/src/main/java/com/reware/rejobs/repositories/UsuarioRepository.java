package com.reware.rejobs.repositories;

import java.util.List;
import java.util.Optional;

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
    @Query("SELECT u FROM Usuario u WHERE u.email = :email")
    Usuario findByEmail(@Param("email") String email);

    //Buscar Usuario por id
    @Override
    @EntityGraph(attributePaths= {"curriculum"})
    Optional<Usuario> findById(Integer id);

    //Buscar por subcategoria en la categoria de notificacion
    @EntityGraph(attributePaths = {"notificaciones"})
    @Query("SELECT DISTINCT u FROM Usuario u " +
       "JOIN u.notificaciones n " +
       "JOIN n.categoria c " +
       "JOIN c.subCategorias sc " +
       "WHERE c.nombre = :categoria AND sc.nombre = :subcategoria")
    List<Usuario> findByCategoryAndSubcategory(@Param("categoria") String categoria, @Param("subcategoria") String subcategoria);

    //Buscar por subcategoría asociada a notificación
   @Query("SELECT DISTINCT u FROM Usuario u " +
         "JOIN u.notificaciones n " +
         "JOIN n.categoria c " + 
         "JOIN SubCategoria sc ON sc.categoria = c " +
         "WHERE sc.id = :idSubCategoria")
   List<Usuario> findBySubCategoryId(@Param("idSubCategoria") Integer idSubCategoria);

}

