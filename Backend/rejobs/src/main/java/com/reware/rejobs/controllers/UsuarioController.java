package com.reware.rejobs.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.reware.rejobs.models.Usuario;
import com.reware.rejobs.services.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> logIn(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        Usuario usuario = usuarioService.logIn(loginRequest.getEmail(), loginRequest.getPassword());
        if (usuario == null) {
            response.put("error", "Usuario no encontrado o credenciales incorrectas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        response.put("usuario", usuario);
        return ResponseEntity.ok(response);
    }

    // CREAR USUARIO
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createUsuario(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        String email = request.get("email");
        
        // Verificar si el email ya existe
        if (usuarioService.existsByEmail(email)) {
            response.put("error", "El correo ya existe");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.get("nombre"));
        usuario.setApellido(request.get("apellido"));
        usuario.setEmail(email);
        usuario.setTelefono(request.get("telefono"));
        usuario.setPassword(request.get("password"));
        usuario.setReclutador(Boolean.parseBoolean(request.get("tipo")));

        Usuario nuevoUsuario = usuarioService.createUsuario(usuario);
        response.put("message", "Usuario creado exitosamente.");
        response.put("usuario", nuevoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // OBTENER USUARIO POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUserData(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        Usuario usuario = usuarioService.DataUser(id);
        if (usuario == null) {
            response.put("error", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.put("usuario", usuario);
        return ResponseEntity.ok(response);
    }

    // ACTUALIZAR USUARIO
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateUsuario(
        @PathVariable int id, 
        @RequestBody Map<String, Object> updates
    ) {
        Map<String, Object> response = new HashMap<>();
        try {
            Usuario updatedUsuario = usuarioService.updateUsuario(
                id,
                (String) updates.get("nombre"),
                (String) updates.get("apellido"),
                (String) updates.get("email"),
                (String) updates.get("telefono"),
                (updates.get("reclutador") != null) ? Boolean.parseBoolean(updates.get("reclutador").toString()) : null
            );
            response.put("usuario_actualizado", updatedUsuario);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // ACTUALIZAR CONTRASEÑA
    @PutMapping("/{id}/password")
    public ResponseEntity<Map<String, Object>> updatePassword(@PathVariable int id, @RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            Usuario usuario = usuarioService.updatePassword(id, request.get("password"));
            response.put("mensaje", "Contraseña actualizada correctamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // SUBIR IMAGEN DE PERFIL
    @PostMapping("/{id}/upload")
    public ResponseEntity<Map<String, Object>> uploadProfilePicture(@PathVariable int id, @RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();
        if (file.isEmpty()) {
            response.put("error", "El archivo está vacío");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            
            String fileName = id + "_pfp_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.write(filePath, file.getBytes());
            
            Usuario usuario = usuarioService.updatePfp(id, fileName);
            response.put("mensaje", "Imagen subida correctamente");
            response.put("usuario", usuario);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("error", "Error al subir la imagen: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    // OBTENER IMAGEN DE PERFIL
    @GetMapping("/{id}/imagen")
    public ResponseEntity<Resource> getProfilePicture(@PathVariable int id) {
        Usuario usuario = usuarioService.DataUser(id);
        if (usuario == null || usuario.getPfp() == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path imagePath = Paths.get(UPLOAD_DIR + usuario.getPfp());
            Resource imageResource = new UrlResource(imagePath.toUri());
            if (!imageResource.exists() || !imageResource.isReadable()) {
                return ResponseEntity.notFound().build();
            }
            
            String contentType = Files.probeContentType(imagePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }
            
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(imageResource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    // OBTENER IMAGEN POR NOMBRE DE ARCHIVO
    @GetMapping("/imgsrc/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            Resource imageResource = new UrlResource(imagePath.toUri());

            if (!imageResource.exists() || !imageResource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = Files.probeContentType(imagePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(imageResource);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}