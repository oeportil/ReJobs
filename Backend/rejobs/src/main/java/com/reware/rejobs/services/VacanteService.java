package com.reware.rejobs.services;


import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.SubCategoria;
import com.reware.rejobs.models.Usuario;
import com.reware.rejobs.models.Vacante;
import com.reware.rejobs.repositories.SubCategoriaRepository;
import com.reware.rejobs.repositories.UsuarioRepository;
import com.reware.rejobs.repositories.VacanteRepository;

@Service
public class VacanteService {
    
    private final VacanteRepository vacanteRepository;
    private final UsuarioRepository usuarioRepository;
    private final SubCategoriaRepository subCategoriaRepository;

    @Autowired
    public VacanteService(VacanteRepository vacanteRepository, UsuarioRepository usuarioRepository, SubCategoriaRepository subCategoriaRepository) {
        this.vacanteRepository = vacanteRepository;
        this.usuarioRepository = usuarioRepository;
        this.subCategoriaRepository = subCategoriaRepository;
    }

    //Vacante por id
    public Vacante getById(Integer idVacante) {
        return vacanteRepository.findById(idVacante).orElse(null);
    }

    //Vacantes por usuario especifico
    public Iterable<Vacante> findByUserId(Integer idUsuario, Boolean asc) {
        return vacanteRepository.findByUserIdOrdered(idUsuario, asc);
    }
    //Buscar vacantes por nombre
    public Iterable<Vacante> findByLike(String dato, Boolean asc) {
        return vacanteRepository.findByLikeOrdered("%" + dato + "%", asc);
    }

    //Buscar vacantes por nombre y subcategoría
    public Iterable<Vacante> findByLikeAndSubcategoryId(String dato, Integer idSubcategoria, Boolean asc) {
        return vacanteRepository.findByLikeAndSubcategoryIdOrdered("%" + dato + "%", idSubcategoria, asc);
    }

    //Crear Vacante
    public Vacante save(String empresa, String contrato, Date fechaInicio, Date fechaFin, String nombre, String ciudad, String region, String pais, String emailContacto, int idUsuario, int idSubCategoria){
        Usuario reclutador = usuarioRepository.findById(idUsuario).orElse(null);
        SubCategoria subCategoria = subCategoriaRepository.findById(idSubCategoria).orElse(null);

        if ( empresa != null && contrato != null && nombre != null && ciudad != null && region != null && pais != null && emailContacto != null && reclutador != null && subCategoria != null){
            Vacante vacante = new Vacante(null, contrato, empresa, fechaInicio, fechaFin, nombre, ciudad, region, pais, emailContacto, true, reclutador, subCategoria);
            return vacanteRepository.save(vacante);
        }
        else{
            throw new IllegalArgumentException("Todos los campos son obligatorios.");
        }
    }

    //Actualizar Vacante
    public Vacante update(Integer id, String empresa, String contrato, String nombre, String ciudad, String region, String pais, String emailContacto){
        return vacanteRepository.findById(id).map((vacante) -> {
            if (empresa != null && !empresa.isBlank()) {
                vacante.setEmpresa(empresa);
            }
            if (contrato != null && !contrato.isBlank()) {
                vacante.setContrato(contrato);
            }
            if (nombre!= null &&!nombre.isBlank()) {
                vacante.setNombre(nombre);
            }
            if (ciudad!= null &&!ciudad.isBlank()) {
                vacante.setCiudad(ciudad);
            }
            if (region!= null &&!region.isBlank()) {
                vacante.setRegion(region);
            }
            if (pais!= null &&!pais.isBlank()) {
                vacante.setPais(pais);
            }
            if (emailContacto!= null &&!emailContacto.isBlank()) {
                vacante.setEmailContacto(emailContacto);
            }
            return vacanteRepository.save(vacante);
        }).orElseThrow(() -> new RuntimeException("Vacante no encontrada"));
    }
    //Desactivar vacante (Si ya está descativada no hacer nada)
    public Vacante turnoff(int id){
        return vacanteRepository.findById(id).map((vacante) -> {
            vacante.setActivo(false);
            return vacanteRepository.save(vacante);
        }).orElseThrow(() -> new RuntimeException("Vacante no encontrada"));
    } 
}
