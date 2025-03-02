package com.reware.rejobs.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reware.rejobs.models.Requisito;
import com.reware.rejobs.models.Vacante;
import com.reware.rejobs.services.RequisitoService;

@RestController
@RequestMapping("/requisitos")
public class RequisitoController {

    private final RequisitoService requisitoService;

    @Autowired
    public RequisitoController(RequisitoService requisitoService) {
        this.requisitoService = requisitoService;
    }

    // Obtener todos los requisitos
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllRequisitos() {
        Map<String, Object> response = new HashMap<>();
        response.put("requisitos", requisitoService.getAllRequisitos());
        return ResponseEntity.ok(response);
    }

    // Obtener requisitos por vacante
    @GetMapping("/vacante/{idVacante}")
    public ResponseEntity<Map<String, Object>> getRequisitosByVacante(@PathVariable Integer idVacante) {
        Map<String, Object> response = new HashMap<>();
        Vacante vacante = new Vacante();
        vacante.setId(idVacante);
        response.put("requisitos", requisitoService.findByVacante(vacante));
        return ResponseEntity.ok(response);
    }

    // Crear requisito
    @PostMapping("/crear")
    public ResponseEntity<Map<String, Object>> createRequisito(@RequestParam String nombre,
                                                                @RequestParam String descripcion,
                                                                @RequestParam Boolean minimo,
                                                                @RequestParam Integer idVacante) {
        Map<String, Object> response = new HashMap<>();
        try {
            Requisito nuevoRequisito = requisitoService.createRequisito(nombre, descripcion, minimo, idVacante);
            response.put("mensaje", "Requisito creado exitosamente");
            response.put("requisito", nuevoRequisito);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Eliminar requisito
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Map<String, Object>> deleteRequisito(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        requisitoService.deleteRequisito(id);
        response.put("mensaje", "Requisito eliminado exitosamente");
        return ResponseEntity.ok(response);
    }
}
