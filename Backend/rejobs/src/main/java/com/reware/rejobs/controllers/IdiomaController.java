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

import com.reware.rejobs.services.IdiomaService;

@RestController
@RequestMapping("/idiomas")
public class IdiomaController {
    
    private final IdiomaService idiomaService;

    @Autowired
    public IdiomaController(IdiomaService idiomaService) {
        this.idiomaService = idiomaService;
    }

    // Obtener todos los idiomas
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllIdiomas() {
        Map<String, Object> response = new HashMap<>();
        response.put("idiomas", idiomaService.getAllIdiomas());
        return ResponseEntity.ok(response);
    }

    // Obtener idiomas de un usuario específico
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Map<String, Object>> getIdiomasByUser(@PathVariable Integer idUsuario) {
        Map<String, Object> response = new HashMap<>();
        response.put("idiomas", idiomaService.findByIdiomasByUser(idUsuario));
        return ResponseEntity.ok(response);
    }

    // Crear nuevo idioma
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createIdioma(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String idioma = (String) request.get("idioma");
            Integer idCurriculum = (Integer) request.get("idCurriculum");
            response.put("idioma", idiomaService.createIdioma(idioma, idCurriculum));
            response.put("message", "Idioma creado exitosamente");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Eliminar idioma
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteIdioma(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        try {
            idiomaService.deleteIdioma(id);
            response.put("message", "Idioma eliminado exitosamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}

