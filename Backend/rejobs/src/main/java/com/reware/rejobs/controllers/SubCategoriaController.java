package com.reware.rejobs.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reware.rejobs.models.SubCategoria;
import com.reware.rejobs.services.SubCategoriaService;

@RestController
@RequestMapping("/subcategorias")
public class SubCategoriaController {

    private final SubCategoriaService subCategoriaService;

    @Autowired
    public SubCategoriaController(SubCategoriaService subCategoriaService) {
        this.subCategoriaService = subCategoriaService;
    }

    // Obtener todas las subcategorías
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllSubCategorias() {
        Map<String, Object> response = new HashMap<>();
        response.put("subcategorias", subCategoriaService.getAllSubCategorias());
        return ResponseEntity.ok(response);
    }

    // Obtener subcategoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        SubCategoria subCategoria = subCategoriaService.getById(id);
        if (subCategoria == null) {
            response.put("error", "Subcategoría no encontrada");
            return ResponseEntity.status(404).body(response);
        }
        response.put("subcategoria", subCategoria);
        return ResponseEntity.ok(response);
    }

    // Obtener subcategorías por nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Map<String, Object>> findByNombre(@PathVariable String nombre) {
        Map<String, Object> response = new HashMap<>();
        response.put("subcategorias", subCategoriaService.findByNombre(nombre));
        return ResponseEntity.ok(response);
    }

    // Obtener subcategorías por ID de categoría
    @GetMapping("/categoria/{idCategoria}")
    public ResponseEntity<Map<String, Object>> findByCategoriaId(@PathVariable Integer idCategoria) {
        Map<String, Object> response = new HashMap<>();
        response.put("subcategorias", subCategoriaService.findByCategoriaId(idCategoria));
        return ResponseEntity.ok(response);
    }

    // Obtener subcategorías por nombre de categoría
    @GetMapping("/categoria/nombre/{nombre}")
    public ResponseEntity<Map<String, Object>> findByCategoriaNombre(@PathVariable String nombre) {
        Map<String, Object> response = new HashMap<>();
        response.put("subcategorias", subCategoriaService.findByCategoriaNombre(nombre));
        return ResponseEntity.ok(response);
    }
}
