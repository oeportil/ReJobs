package com.reware.rejobs.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reware.rejobs.models.Categoria;
import com.reware.rejobs.services.CategoriaService;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    private final CategoriaService categoriaService;

    @Autowired
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    // Obtener todas las categorías
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCategorias() {
        Map<String, Object> response = new HashMap<>();
        List<Categoria> categorias = (List<Categoria>) categoriaService.getAllCategorias();
        response.put("categorias", categorias);
        return ResponseEntity.ok(response);
    }

    // Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCategoriaById(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        Categoria categoria = categoriaService.getById(id);
        if (categoria == null) {
            response.put("error", "Categoría no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.put("categoria", categoria);
        return ResponseEntity.ok(response);
    }

    // Obtener categorías por nombre
    @GetMapping("/buscar")
    public ResponseEntity<Map<String, Object>> findByNombre(@RequestParam String nombre) {
        Map<String, Object> response = new HashMap<>();
        List<Categoria> categorias = (List<Categoria>) categoriaService.findByNombre(nombre);
        response.put("categorias", categorias);
        return ResponseEntity.ok(response);
    }

    // Obtener categoría por ID de subcategoría
    @GetMapping("/subcategoria/{idSubCategoria}")
    public ResponseEntity<Map<String, Object>> getBySubCategoryId(@PathVariable Integer idSubCategoria) {
        Map<String, Object> response = new HashMap<>();
        Categoria categoria = categoriaService.getBySubCategoryId(idSubCategoria);
        if (categoria == null) {
            response.put("error", "Categoría no encontrada para la subcategoría dada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.put("categoria", categoria);
        return ResponseEntity.ok(response);
    }
}
