package com.reware.rejobs.controllers;

import java.text.ParseException;
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

import com.reware.rejobs.models.Academica;
import com.reware.rejobs.services.AcademicaService;

@RestController
@RequestMapping("/academica")
public class AcademicaController {
    
    private final AcademicaService academicaService;

    @Autowired
    public AcademicaController(AcademicaService academicaService) {
        this.academicaService = academicaService;
    }

    // Obtener historial académico por ID de usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Map<String, Object>> getByUserId(@PathVariable Integer idUsuario) {
        Map<String, Object> response = new HashMap<>();
        response.put("academica", academicaService.findByUserId(idUsuario));
        return ResponseEntity.ok(response);
    }

    // Obtener todos los historiales académicos
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("academica", academicaService.getAllAcademicas());
        return ResponseEntity.ok(response);
    }

    // Crear historial académico
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createAcademica(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String institucion = (String) request.get("institucion");
            String fechaStr = (String) request.get("fecha");
            Date fecha = new SimpleDateFormat("yyyy-MM-dd").parse(fechaStr);
            String sede = (String) request.get("sede");
            String titulo = (String) request.get("titulo");
            String descripcion = (String) request.get("descripcion");
            Integer idCurriculum = (Integer) request.get("idCurriculum");
            
            Academica academica = academicaService.createAcademica(institucion, fecha, sede, titulo, descripcion, idCurriculum);
            response.put("message", "Historial académico creado exitosamente.");
            response.put("academica", academica);
            return ResponseEntity.status(201).body(response);
        } catch (ParseException e) {
            response.put("error", "Formato de fecha inválido. Debe ser yyyy-MM-dd.");
            return ResponseEntity.badRequest().body(response);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Eliminar historial académico
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteAcademica(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        academicaService.deleteAcademica(id);
        response.put("message", "Historial académico eliminado exitosamente.");
        return ResponseEntity.ok(response);
    }
}
