package com.reware.rejobs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;  

import com.reware.rejobs.models.Categoria;
import com.reware.rejobs.models.Notificacion;
import com.reware.rejobs.models.Usuario;
import com.reware.rejobs.repositories.NotificacionRepository;

@Service
public class NotificacionService {
    
    private final NotificacionRepository notificacionRepository;
    private final CategoriaService categoriaService;
    private final UsuarioService usuarioService;

    @Autowired
    public NotificacionService(NotificacionRepository notificacionRepository, CategoriaService categoriaService, UsuarioService usuarioService) {
        this.notificacionRepository = notificacionRepository;
        this.categoriaService = categoriaService;
        this.usuarioService = usuarioService;
    }

    //Crear notificación
    public Notificacion createNotificacion(Integer idUsuario, Integer idCategoria) {
        //Obtener la categoria
        Categoria categoria = categoriaService.getById(idCategoria);
        if (categoria == null) {
            throw new RuntimeException("Categoría no encontrada");
        }
        //Obtener el usuario
        Usuario usuario = usuarioService.DataUser(idUsuario);
        if (usuario == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        //Verificar que no esté repetido
        if (notificacionRepository.findByUsuarioAndCategoria(idUsuario, idCategoria).isPresent()) {
            throw new RuntimeException("Notificación repetida para el usuario y categoría");
        }
        //Crear la notificación 
        Notificacion nuevaNotificacion = new Notificacion(usuario, categoria);
        return notificacionRepository.save(nuevaNotificacion);
    }

    //Obtener notificaciones por usuario
    public Iterable<Notificacion> getNotificacionesByUsuario(Integer idUsuario) {
        return notificacionRepository.findByUsuario(idUsuario);
    }

    //Obtener notificaciones por categoria
    public Iterable<Notificacion> getNotificacionesByCategoria(Integer idCategoria) {
        return notificacionRepository.findByCategoria(idCategoria);
    }

    //Obtener notificaciones por subcategorias
    public Iterable<Notificacion> getNotificacionesBySubCategoryId(Integer idSubCategoria) {
        return notificacionRepository.findBySubCategoryId(idSubCategoria);
    }

    //Eliminar notificacion
    public void deleteNotificacion(Integer id) {
        notificacionRepository.deleteById(id);
    }
}
