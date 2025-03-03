package com.reware.rejobs.controllers;

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
import org.springframework.web.bind.annotation.RestController;

import com.reware.rejobs.models.Candidato;
import com.reware.rejobs.services.CandidatoService;

@RestController
@RequestMapping("/candidatos")
public class CandidatoController {

    private final CandidatoService candidatoService;

    @Autowired
    public CandidatoController(CandidatoService candidatoService) {
        this.candidatoService = candidatoService;
    }

    // Obtener todas las candidaturas
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllCandidatures() {
        Map<String, Object> response = new HashMap<>();
        response.put("candidaturas", candidatoService.findAllCandidatures());
        return ResponseEntity.ok(response);
    }
    // Obtener candidatura por id
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        response.put("candidatura", candidatoService.findById(id));
        return ResponseEntity.ok(response);
    }

    // Obtener candidaturas de un usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Map<String, Object>> getUserCandidatures(@PathVariable Integer idUsuario) {
        Map<String, Object> response = new HashMap<>();
        response.put("candidaturas", candidatoService.findUserCandidatures(idUsuario));
        return ResponseEntity.ok(response);
    }

    // Contar candidaturas de un usuario
    @GetMapping("/usuario/{idUsuario}/count")
    public ResponseEntity<Map<String, Object>> countUserCandidatures(@PathVariable Integer idUsuario) {
        Map<String, Object> response = new HashMap<>();
        response.put("total", candidatoService.countUserCandidatures(idUsuario));
        return ResponseEntity.ok(response);
    }

    // Obtener candidaturas de un reclutador
    @GetMapping("/reclutador/{idReclutador}")
    public ResponseEntity<Map<String, Object>> getReclutadorCandidatures(@PathVariable Integer idReclutador) {
        Map<String, Object> response = new HashMap<>();
        response.put("candidaturas", candidatoService.findReclutadorCandidatures(idReclutador));
        return ResponseEntity.ok(response);
    }

    // Contar candidaturas de un reclutador
    @GetMapping("/reclutador/{idReclutador}/count")
    public ResponseEntity<Map<String, Object>> countReclutadorCandidatures(@PathVariable Integer idReclutador) {
        Map<String, Object> response = new HashMap<>();
        response.put("total", candidatoService.countReclutadorCandidatures(idReclutador));
        return ResponseEntity.ok(response);
    }

    // Obtener candidaturas por vacante
    @GetMapping("/vacante/{idVacante}")
    public ResponseEntity<Map<String, Object>> getVacancyCandidatures(@PathVariable Integer idVacante) {
        Map<String, Object> response = new HashMap<>();
        response.put("candidaturas", candidatoService.findVacancyCandidatures(idVacante));
        return ResponseEntity.ok(response);
    }

    // Contar candidaturas por vacante
    @GetMapping("/vacante/{idVacante}/count")
    public ResponseEntity<Map<String, Object>> countVacancyCandidatures(@PathVariable Integer idVacante) {
        Map<String, Object> response = new HashMap<>();
        response.put("total", candidatoService.countVacancyCandidatures(idVacante));
        return ResponseEntity.ok(response);
    }

    // Crear una candidatura
    @PostMapping("/crear")
    public ResponseEntity<Map<String, Object>> createCandidature(@RequestBody Map<String, Object> request) {
        int idVacante = (int) request.get("idVacante");
        int idUsuario = (int) request.get("idUsuario");
        Candidato candidato = candidatoService.save(idVacante, idUsuario);
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Candidatura creada exitosamente");
        response.put("candidato", candidato);
        return ResponseEntity.ok(response);
    }

    // Revisar y calificar candidatura
    @PutMapping("/revisar")
    public ResponseEntity<Map<String, Object>> reviewCandidature(@RequestBody Map<String, Object> request) {
        Integer idCandidato = (Integer) request.get("idCandidato");
        Boolean contacto = (Boolean) request.get("contacto");
        String nota = (String) request.get("nota");
        candidatoService.reviewCandidature(idCandidato, contacto, nota);
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Candidatura revisada exitosamente");
        return ResponseEntity.ok(response);
    }
}
