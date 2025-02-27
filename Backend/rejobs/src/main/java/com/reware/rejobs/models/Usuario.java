package com.reware.rejobs.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "usuarios", uniqueConstraints={@UniqueConstraint(columnNames = {"email"})})
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String apellido;
    @Email
    @NotNull
    private String email;
    @JsonIgnore
    private String password;
    private String telefono;
    private String pfp;
    private Boolean reclutador;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Direccion> direcciones;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Notificacion> notificaciones;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Candidato> candidatos;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "curriculum_id", referencedColumnName = "id")
    private Curriculum curriculum;

    @OneToMany(mappedBy = "reclutador", cascade = CascadeType.ALL)
    private List<Vacante> vacantes;
    
    
    // Constructores
    public Usuario() {}
    
    public Usuario(Integer id, String nombre, String apellido, String email, String password, String telefono, String pfp, Boolean reclutador, Curriculum curriculum) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.pfp = pfp;
        this.reclutador = reclutador;
        this.curriculum = curriculum;
    }
    
    public Usuario(String nombre, String apellido, String email, String password, String telefono, String pfp, Boolean reclutador, Curriculum curriculum) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.pfp = pfp;
        this.reclutador = reclutador;
        this.curriculum = curriculum;
    }
    
    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getPfp() { return pfp; }
    public void setPfp(String pfp) { this.pfp = pfp; }
    public Boolean getReclutador() { return reclutador; }
    public void setReclutador(Boolean reclutador) { this.reclutador = reclutador; }
    public List<Direccion> getDirecciones(){ return direcciones;}
    public void setDirecciones(List<Direccion> direcciones){this.direcciones = direcciones;}
    public List<Notificacion> getNotificaciones(){ return notificaciones;}
    public void setNotificaciones(List<Notificacion> notificaciones){this.notificaciones = notificaciones;}
    public List<Candidato> getCandidatos(){ return candidatos;}
    public void setCandidatos(List<Candidato> candidatos){this.candidatos = candidatos;}
    public Curriculum getCurriculum(){ return curriculum;}
    public void setCurriculum(Curriculum curriculum){this.curriculum = curriculum;}
    public List<Vacante> getVacantes(){ return vacantes;}
    public void setVacantes(List<Vacante> vacantes){this.vacantes = vacantes;}
}
