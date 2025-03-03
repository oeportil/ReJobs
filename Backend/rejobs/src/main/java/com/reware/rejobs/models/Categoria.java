package com.reware.rejobs.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<SubCategoria> subCategorias;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Notificacion> notificaciones;
    // Constructores
    public Categoria() {}
    public Categoria(Integer id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }
    public Categoria(String nombre) {
        this.nombre = nombre;
    }
    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public List<SubCategoria> getSubCategorias(){ return subCategorias;}
    public void setSubCategorias(List<SubCategoria> subCategorias){this.subCategorias = subCategorias;}
    public List<Notificacion> getNotificaciones(){ return notificaciones;}
    public void setNotificaciones(List<Notificacion> notificaciones){this.notificaciones = notificaciones;}
}
