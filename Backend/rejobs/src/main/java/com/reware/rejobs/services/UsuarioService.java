package com.reware.rejobs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.reware.rejobs.models.Usuario;
import com.reware.rejobs.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(PasswordEncoder passwordEncoder, UsuarioRepository usuarioRepository) {
        this.passwordEncoder = passwordEncoder;
        this.usuarioRepository = usuarioRepository;
    }

    //Login
    public Usuario logIn(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null && passwordEncoder.matches(password, usuario.getPassword())){
            return usuario;
        }
        return null;
    } 

    //ObtenerDatos
    public Usuario DataUser(int id){
        Usuario usuario = usuarioRepository.findByIdUser(id);
        return usuario;
    }

    //Crear usuario
    public Usuario createUsuario(Usuario usuario) {
        String contra = usuario.getPassword();
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword())); // Encriptar la contraseña
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        return nuevoUsuario;
    }

    //Actualizar Usuario
    public Usuario updateUsuario(
        int id,
        String nombre,
        String apellido,
        String email,
        String password,
        String telefono,
        Boolean reclutador
    ){
        
    }
}
