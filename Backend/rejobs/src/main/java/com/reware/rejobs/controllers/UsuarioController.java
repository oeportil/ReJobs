package com.reware.rejobs.controllers;

import com.reware.rejobs.models.Usuario;
import com.reware.rejobs.services.UsuarioService;
import org.springframework.http.ResponseEntity;

import org.springframework.http.HttpStatus;  // Para HttpStatus

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public  ResponseEntity<Usuario> logIn(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Maneja el error de forma adecuada
        }

        if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Maneja el error de forma adecuada
        }

        Usuario usuario = usuarioService.logIn(loginRequest.getEmail(), loginRequest.getPassword());
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // Usuario no encontrado o credenciales incorrectas
        }
        return ResponseEntity.ok(usuario);
    }
}




