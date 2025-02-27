package com.reware.rejobs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.Direccion;
import com.reware.rejobs.models.Usuario;
import com.reware.rejobs.repositories.DireccionRepository;

@Service
public class DireccionService {

    private final DireccionRepository direccionRepository;
    private final UsuarioService usuarioService;

    @Autowired
    public DireccionService(DireccionRepository direccionRepository, UsuarioService usuarioService) {
        this.direccionRepository = direccionRepository;
        this.usuarioService = usuarioService;
    }

    //Obtener direccion por usuario
    public Iterable<Direccion> getDireccionesByUsuario(Integer idUsuario) {
        return direccionRepository.findByUsuario(idUsuario);
    }

    //Crear direccion de un usuario obteniendo todos los datos primitivos y convirtiendolos en la dirección del usuario, obtener el usuario del id
    public Direccion createDireccion(Integer idUsuario, String pais, String region, String distrito, String ciudad, String direccion) {
        //Obtener el usuario
        Usuario usuario = usuarioService.DataUser(idUsuario);
        if (usuario == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        //Crear la dirección 
        Direccion nuevaDireccion = new Direccion(pais, region, distrito, ciudad, direccion, usuario);
        return direccionRepository.save(nuevaDireccion);
    }
    
    //Eliminar la dirección
    public void deleteDireccion(Integer id) {
        direccionRepository.deleteById(id);
    }

}
