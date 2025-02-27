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

import com.reware.rejobs.models.Direccion;
import com.reware.rejobs.services.DireccionService;

@RestController
@RequestMapping("/api/direcciones")
public class DireccionController {

    private final DireccionService direccionService;

    @Autowired
    public DireccionController(DireccionService direccionService) {
        this.direccionService = direccionService;
    }

    // Obtener direcciones por usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Map<String, Object>> getDireccionesByUsuario(@PathVariable Integer idUsuario) {
        Map<String, Object> response = new HashMap<>();
        response.put("direcciones", direccionService.getDireccionesByUsuario(idUsuario));
        return ResponseEntity.ok(response);
    }

    // Crear dirección
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createDireccion(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            Integer idUsuario = (Integer) request.get("idUsuario");
            String pais = (String) request.get("pais");
            String region = (String) request.get("region");
            String distrito = (String) request.get("distrito");
            String ciudad = (String) request.get("ciudad");
            String direccion = (String) request.get("direccion");

            Direccion nuevaDireccion = direccionService.createDireccion(idUsuario, pais, region, distrito, ciudad, direccion);
            response.put("mensaje", "Dirección creada exitosamente");
            response.put("direccion", nuevaDireccion);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Eliminar dirección
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteDireccion(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        try {
            direccionService.deleteDireccion(id);
            response.put("mensaje", "Dirección eliminada correctamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
