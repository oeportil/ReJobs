package com.reware.rejobs.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reware.rejobs.services.NotificacionService;

@RestController
@RequestMapping("/notificaciones")
public class NotificacionController {

    private final NotificacionService notificacionService;

    @Autowired
    public NotificacionController(NotificacionService notificacionService) {
        this.notificacionService = notificacionService;
    }

    // Crear Notificación
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createNotificacion(@RequestBody Map<String, Integer> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            var notificacion = notificacionService.createNotificacion(request.get("idUsuario"), request.get("idCategoria"));
            response.put("message", "Notificación creada exitosamente.");
            response.put("notificacion", notificacion);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Obtener Notificaciones por Usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Map<String, Object>> getNotificacionesByUsuario(@PathVariable Integer idUsuario) {
        Map<String, Object> response = new HashMap<>();
        var notificaciones = notificacionService.getNotificacionesByUsuario(idUsuario);
        response.put("notificaciones", notificaciones);
        return ResponseEntity.ok(response);
    }

    // Eliminar Notificación
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteNotificacion(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        notificacionService.deleteNotificacion(id);
        response.put("message", "Notificación eliminada correctamente.");
        return ResponseEntity.ok(response);
    }
}