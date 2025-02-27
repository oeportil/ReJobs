package com.reware.rejobs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.SubCategoria;
import com.reware.rejobs.repositories.SubCategoriaRepository;

@Service  
public class SubCategoriaService {

    private final SubCategoriaRepository subCategoriaRepository;

    @Autowired
    public SubCategoriaService(SubCategoriaRepository subCategoriaRepository) {
        this.subCategoriaRepository = subCategoriaRepository;
    }

    //Obtener todas las subcategorias
    public Iterable<SubCategoria> getAllSubCategorias(){
        return subCategoriaRepository.findAll();
    }

    //Obtener subcategorias por id
    public SubCategoria getById(Integer id){
        return subCategoriaRepository.findById(id).orElse(null);
    }

    //Obtener subcategorias por nombre
    public Iterable<SubCategoria> findByNombre(String nombre){
        return subCategoriaRepository.findByNombreLike("%"+nombre+"%");
    }

    //Obtener subcategorias por categoria (Id)
    public Iterable<SubCategoria> findByCategoriaId(Integer id){
        return subCategoriaRepository.findByCategoriaId(id);
    }

    //Obtener subcategorias por categoria (Nombre)
    public Iterable<SubCategoria> findByCategoriaNombre(String nombre){
        return subCategoriaRepository.findByCategoriaNombre(nombre);
    }
}
