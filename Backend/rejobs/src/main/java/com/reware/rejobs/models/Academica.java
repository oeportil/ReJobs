package com.reware.rejobs.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "academicas")
public class Academica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String institucion;
    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha;
    private String sede;
    private String titulo;
    private String descripcion;
    
    @ManyToOne
    @JoinColumn(name = "curriculum_id", nullable = false)
    private Curriculum curriculum;
    
    //Constructores
    public Academica() {}
    
    public Academica(Integer id, String institucion, Date fecha, String sede, String titulo, String descripcion, Curriculum curriculum) {
        this.id = id;
        this.institucion = institucion;
        this.fecha = fecha;
        this.sede = sede;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.curriculum = curriculum;
    }
    
    public Academica(String institucion, Date fecha, String sede, String titulo, String descripcion, Curriculum curriculum) {
        this.institucion = institucion;
        this.fecha = fecha;
        this.sede = sede;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.curriculum = curriculum;
    }
    
    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getInstitucion() { return institucion; }
    public void setInstitucion(String institucion) { this.institucion = institucion; }
    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }
    public String getSede() { return sede; }
    public void setSede(String sede) { this.sede = sede; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Curriculum getCurriculum() { return curriculum; }
    public void setCurriculum(Curriculum curriculum) { this.curriculum = curriculum; }
}
