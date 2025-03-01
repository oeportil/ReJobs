package com.reware.rejobs.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reware.rejobs.models.Hito;
import com.reware.rejobs.services.HitoService;

@RestController
@RequestMapping("/hitos")
public class HitoController {
    
    private final HitoService hitoService;
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    public HitoController(HitoService hitoService) {
        this.hitoService = hitoService;
    }

    // Obtener todos los hitos
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllHitos() {
        Map<String, Object> response = new HashMap<>();
        response.put("hitos", hitoService.getAllHitos());
        return ResponseEntity.ok(response);
    }

    // Obtener hitos por usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Map<String, Object>> getHitosByUser(@PathVariable Integer idUsuario) {
        Map<String, Object> response = new HashMap<>();
        response.put("hitos", hitoService.getHitosByUserId(idUsuario));
        return ResponseEntity.ok(response);
    }

    // Crear nuevo hito
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createHito(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String hito = request.get("hito");
            String descripcion = request.get("descripcion");
            Date fecha = dateFormat.parse(request.get("fecha"));
            String url = request.get("url");
            int idCurriculum = Integer.parseInt(request.get("idCurriculum"));
            
            Hito nuevoHito = hitoService.createHito(hito, descripcion, fecha, url, idCurriculum);
            response.put("message", "Hito creado exitosamente");
            response.put("hito", nuevoHito);
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            response.put("error", "Error al crear el hito: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Eliminar hito
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteHito(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        try {
            hitoService.deleteHito(id);
            response.put("message", "Hito eliminado exitosamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Error al eliminar el hito: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
