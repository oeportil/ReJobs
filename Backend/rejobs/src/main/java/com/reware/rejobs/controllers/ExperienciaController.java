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

import com.reware.rejobs.models.Experiencia;
import com.reware.rejobs.services.ExperienciaService;

@RestController
@RequestMapping("/experiencia")
public class ExperienciaController {
    private final ExperienciaService experienciaService;

    @Autowired
    public ExperienciaController(ExperienciaService experienciaService) {
        this.experienciaService = experienciaService;
    }

    // Obtener todas las experiencias
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllExperiencias() {
        Map<String, Object> response = new HashMap<>();
        response.put("experiencias", experienciaService.getAllExperiencias());
        return ResponseEntity.ok(response);
    }

    // Obtener experiencias por usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Map<String, Object>> getExperienciasByUsuario(@PathVariable Integer idUsuario) {
        Map<String, Object> response = new HashMap<>();
        response.put("experiencias", experienciaService.findByUser(idUsuario));
        return ResponseEntity.ok(response);
    }

    // Crear nueva experiencia
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createExperiencia(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            String empresa = (String) request.get("empresa");
            Date fechaInicio = dateFormat.parse((String) request.get("fecha_inicio"));
            Date fechaFin = dateFormat.parse((String) request.get("fecha_fin"));
            String cargo = (String) request.get("cargo");
            String area = (String) request.get("area");
            String descripcion = (String) request.get("descripcion");
            Integer idCurriculum = (Integer) request.get("idCurriculum");

            Experiencia nuevaExperiencia = experienciaService.createExperiencia(empresa, fechaInicio, fechaFin, cargo, area, descripcion, idCurriculum);
            response.put("message", "Experiencia creada exitosamente.");
            response.put("experiencia", nuevaExperiencia);
            return ResponseEntity.status(201).body(response);
        } catch (ParseException e) {
            response.put("error", "Formato de fecha incorrecto. Debe ser yyyy-MM-dd");
            return ResponseEntity.badRequest().body(response);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Eliminar experiencia
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteExperiencia(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        experienciaService.deleteExperiencia(id);
        response.put("message", "Experiencia eliminada exitosamente.");
        return ResponseEntity.ok(response);
    }
}
