package com.reware.rejobs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.Categoria;
import com.reware.rejobs.repositories.CategoriaRepository;

@Service  
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;
    
    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }  

    //Obtener todas las categorias
    public Iterable<Categoria> getAllCategorias(){
        return categoriaRepository.findAll();
    }

    //Obtener categoria por id
    public Categoria getById(Integer id){
        return categoriaRepository.findById(id).orElse(null);
    }
}
