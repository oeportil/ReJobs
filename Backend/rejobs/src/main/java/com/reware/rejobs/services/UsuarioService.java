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
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        return usuario;
    }

    //Crear usuario
    public Usuario createUsuario(Usuario usuario) {
        String contra = usuario.getPassword();
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword())); 
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        return nuevoUsuario;
    }

    //Actualizar Usuario
    public Usuario updateUsuario(
        int id,
        String nombre,
        String apellido,
        String email,
        String telefono,
        Boolean reclutador
    ){
        return usuarioRepository.findById(id).map(usuario -> {
            if (nombre != null){
                usuario.setNombre(nombre);
            }
            if (apellido != null){
                usuario.setApellido(apellido);
            }
            if (email != null){ 
            usuario.setEmail(email);
            }
            if (telefono!= null){
                usuario.setTelefono(telefono);
            }
            if (reclutador!= null){
                usuario.setReclutador(reclutador);
            }
            return usuarioRepository.save(usuario);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    //Verificar por email
    public boolean existsByEmail(String email) {
        return usuarioRepository.findByEmail(email) != null;
    }    

    //Actualizar contraseña del usuario
    public Usuario updatePassword(int id, String password){
        return usuarioRepository.findById(id).map(usuario -> {
            if (password!= null && !password.isBlank()){
                usuario.setPassword(passwordEncoder.encode(password));
            }
            return usuarioRepository.save(usuario);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    //Actualizar url del usuario
    public Usuario updatePfp(int id, String pfp){
        return usuarioRepository.findById(id).map(usuario -> {
            if (pfp!= null && !pfp.isBlank()){
                usuario.setPfp(pfp);
            }
            return usuarioRepository.save(usuario);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
