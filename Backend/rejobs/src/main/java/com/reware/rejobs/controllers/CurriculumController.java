package com.reware.rejobs.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reware.rejobs.models.Curriculum;
import com.reware.rejobs.models.Usuario;
import com.reware.rejobs.services.CurriculumService;
import com.reware.rejobs.services.UsuarioService;

@RestController
@RequestMapping("/curriculum")
public class CurriculumController {
    
    private final CurriculumService curriculumService;
    private final UsuarioService usuarioService;
    
    @Autowired
    public CurriculumController(CurriculumService curriculumService, UsuarioService usuarioService) {
        this.curriculumService = curriculumService;
        this.usuarioService = usuarioService;
    }

    // Obtener todos los curriculums
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllCurriculums() {
        Map<String, Object> response = new HashMap<>();
        response.put("curriculums", curriculumService.getAllCurriculums());
        return ResponseEntity.ok(response);
    }

    // Obtener curriculum por id
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCurriculumById(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        Curriculum curriculum = curriculumService.getById(id);
        if (curriculum == null) {
            response.put("error", "Curriculum no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.put("curriculum", curriculum);
        return ResponseEntity.ok(response);
    }

    // Obtener curriculum por usuario (id)
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Map<String, Object>> getCurriculumByUsuario(@PathVariable Integer idUsuario) {
        Map<String, Object> response = new HashMap<>();
        Curriculum curriculum = curriculumService.findByUsuarioId(idUsuario);
        if (curriculum == null) {
            response.put("error", "Curriculum no encontrado para el usuario");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.put("curriculum", curriculum);
        return ResponseEntity.ok(response);
    }

    // Crear curriculum
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createCurriculum(@RequestBody Map<String, Object> request) {

        Map<String, Object> response = new HashMap<>();
        try{
            Integer idUsuario = (Integer) request.get("idUsuario");
            String descripcion = (String) request.get("descripcion");
            String biografia = (String) request.get("biografia");
            Usuario usuario = usuarioService.DataUser(idUsuario);
            Curriculum curriculum = new Curriculum(descripcion, biografia, usuario);
            curriculumService.save(curriculum);
            response.put("message", "Curriculum creado exitosamente");
            response.put("curriculum", curriculum);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("error", "Error al crear el curriculum: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

    // Actualizar curriculum
    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateCurriculum(@PathVariable int id, @RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            Curriculum updatedCurriculum = curriculumService.update(
                id, 
                request.get("descripcion"), 
                request.get("biografia")
            );
            response.put("message", "Curriculum actualizado exitosamente");
            response.put("curriculum", updatedCurriculum);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
