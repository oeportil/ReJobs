package com.reware.rejobs.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "requisitos")
public class Requisito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String descripcion;
    private Boolean minimo;

    @ManyToOne
    @JoinColumn(name = "vacante_id", nullable = false)
    @JsonIgnore
    private Vacante vacante;

    public Requisito() {}
    public Requisito(Integer id, String nombre, String descripcion, Boolean minimo, Vacante vacante) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.minimo = minimo;
        this.vacante = vacante;
    }
    public Requisito( String nombre, String descripcion, Boolean minimo, Vacante vacante) {

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.minimo = minimo;
        this.vacante = vacante;
    }
    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Boolean getMinimo() { return minimo; }
    public void setMinimo(Boolean minimo) { this.minimo = minimo; }
    public Vacante getVacante() { return vacante; }
    public void setVacante(Vacante vacante) { this.vacante = vacante; }
}
