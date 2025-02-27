package com.reware.rejobs.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "hitos")
public class Hito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String hito;
    private String descripcion;
    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha;
    private String url;

    @ManyToOne
    @JoinColumn(name = "curriculum_id", nullable = false)
    @JsonIgnore
    private Curriculum curriculum;

    //Constructor
    public Hito(){}

    public Hito(Integer id, String hito, String descripcion, Date fecha, String url, Curriculum curriculum){
        this.id = id;
        this.hito = hito;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.url = url;
        this.curriculum = curriculum;
    }
    public Hito(String hito, String descripcion, Date fecha, String url, Curriculum curriculum) {
        this.hito = hito;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.url = url;
        this.curriculum = curriculum;
    }
    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getHito() { return hito; }
    public void setHito(String hito) { this.hito = hito; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public Curriculum getCurriculum() { return curriculum; }
    public void setCurriculum(Curriculum curriculum) { this.curriculum = curriculum; }
}
