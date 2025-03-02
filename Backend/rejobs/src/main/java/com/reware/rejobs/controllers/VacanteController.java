package com.reware.rejobs.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reware.rejobs.models.Vacante;
import com.reware.rejobs.services.VacanteService;

@RestController
@RequestMapping("/vacantes")
public class VacanteController {

    private final VacanteService vacanteService;
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    public VacanteController(VacanteService vacanteService) {
        this.vacanteService = vacanteService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getVacanteById(@PathVariable Integer id) {
        Vacante vacante = vacanteService.getById(id);
        if (vacante != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("vacante", vacante);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "Vacante no encontrada"));
        }
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Map<String, Object>> getVacantesByUser(@PathVariable Integer id, @RequestParam Boolean asc) {
        Iterable<Vacante> vacantes = vacanteService.findByUserId(id, asc);
        return ResponseEntity.ok(Map.of("vacantes", vacantes));
    }

    @GetMapping("/buscar")
    public ResponseEntity<Map<String, Object>> searchVacantes(@RequestParam String dato, @RequestParam Boolean asc) {
        Iterable<Vacante> vacantes = vacanteService.findByLike(dato, asc);
        return ResponseEntity.ok(Map.of("vacantes", vacantes));
    }

    @GetMapping("/buscar/subcategoria")
    public ResponseEntity<Map<String, Object>> searchVacantesBySubcategoria(@RequestParam String dato, @RequestParam Integer idSubCategoria, @RequestParam Boolean asc) {
        Iterable<Vacante> vacantes = vacanteService.findByLikeAndSubcategoryId(dato, idSubCategoria, asc);
        return ResponseEntity.ok(Map.of("vacantes", vacantes));
    }

    @PostMapping("/crear")
    public ResponseEntity<Map<String, Object>> createVacante(@RequestBody Map<String, Object> request) {
        try {
            Date fechaInicio = dateFormat.parse(request.get("fechaInicio").toString());
            Date fechaFin = dateFormat.parse(request.get("fechaFin").toString());
            Vacante vacante = vacanteService.save(
                request.get("empresa").toString(),
                request.get("contrato").toString(),
                fechaInicio,
                fechaFin,
                request.get("nombre").toString(),
                request.get("ciudad").toString(),
                request.get("region").toString(),
                request.get("pais").toString(),
                request.get("emailContacto").toString(),
                (String) request.get("telefonoContacto"),
                (String) Integer.toString((Integer) request.get("salario")),
                (String) request.get("formato"),
                (String) request.get("horario"),
                (String) request.get("descripcion"),
                Integer.parseInt(request.get("idUsuario").toString()),
                Integer.parseInt(request.get("idSubCategoria").toString())
            );
            return ResponseEntity.ok(Map.of("vacante", vacante));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Map<String, Object>> updateVacante(@PathVariable Integer id, @RequestBody Map<String, Object> request) {
        try {
            Vacante vacante = vacanteService.update(
                id,
                (String) request.get("empresa"),
                (String) request.get("contrato"),
                (String) request.get("nombre"),
                (String) request.get("ciudad"),
                (String) request.get("region"),
                (String) request.get("pais"),
                (String) request.get("emailContacto"),
                (String) request.get("telefonoContacto"),
                (String) request.get("salario"),
                (String) request.get("formato"),
                (String) request.get("horario"),
                (String) request.get("descripcion")
            );
            return ResponseEntity.ok(Map.of("vacante", vacante));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/desactivar/{id}")
    public ResponseEntity<Map<String, Object>> deactivateVacante(@PathVariable Integer id) {
        try {
            Vacante vacante = vacanteService.turnoff(id);
            return ResponseEntity.ok(Map.of("vacante", vacante));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }
}
