package com.reware.rejobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reware.rejobs.models.Valor;

@Repository
public interface ValorRepository extends JpaRepository<Valor, Integer>{
    //Buscar Valores de un Usuario en especifico
    @EntityGraph(attributePaths= {"curriculum"})
    @Query("SELECT v FROM Valor v WHERE v.curriculum.usuario.id = :idUsuario")
    List<Valor> findByUser(@Param("idUsuario") Integer idUsuario);
    
}
