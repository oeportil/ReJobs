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

import com.reware.rejobs.services.ValorService;

@RestController
@RequestMapping("/valores")
public class ValorController {
    private final ValorService valorService;

    @Autowired
    public ValorController(ValorService valorService) {
        this.valorService = valorService;
    }

    // Obtener todos los valores
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllValores() {
        Map<String, Object> response = new HashMap<>();
        response.put("valores", valorService.getAllValores());
        return ResponseEntity.ok(response);
    }

    // Obtener valores por ID de usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Map<String, Object>> getValoresByUsuario(@PathVariable Integer idUsuario) {
        Map<String, Object> response = new HashMap<>();
        response.put("valores", valorService.findByUserId(idUsuario));
        return ResponseEntity.ok(response);
    }

    // Crear un nuevo valor
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createValor(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String valo = (String) request.get("valor");
            String descripcion = (String) request.get("descripcion");
            Integer idCurriculum = (Integer) request.get("idCurriculum");
            response.put("valor", valorService.createValor(valo, descripcion, idCurriculum));
            response.put("message", "Valor creado exitosamente.");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Eliminar un valor
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteValor(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        try {
            valorService.deleteValor(id);
            response.put("message", "Valor eliminado exitosamente.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
