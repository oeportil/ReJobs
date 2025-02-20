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
@Table(name = "experiencias")
public class Experiencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String empresa;
    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha_inicio;
    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha_fin;
    private String cargo;
    private String area;
    private String descripcion;
    
    @ManyToOne
    @JoinColumn(name = "curriculum_id", nullable = false)
    private Curriculum curriculum;
    
    //Constructores
    public Experiencia() {}
    
    public Experiencia(Integer id, String empresa, Date fecha_inicio, Date fecha_fin, String cargo, String area, String descripcion, Curriculum curriculum) {
        this.id = id;
        this.empresa = empresa;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.cargo = cargo;
        this.area = area;
        this.descripcion = descripcion;
        this.curriculum = curriculum;
    }
    
    public Experiencia(String empresa, Date fecha_inicio, Date fecha_fin, String cargo, String area, String descripcion, Curriculum curriculum) {
        this.empresa = empresa;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.cargo = cargo;
        this.area = area;
        this.descripcion = descripcion;
        this.curriculum = curriculum;
    }
    
    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }
    public Date getFechaInicio() { return fecha_inicio; }
    public void setFechaInicio(Date fecha_inicio) { this.fecha_inicio = fecha_inicio; }
    public Date getFechaFin() { return fecha_fin; }
    public void setFechaFin(Date fecha_fin) { this.fecha_fin = fecha_fin; }
    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Curriculum getCurriculum() { return curriculum; }
    public void setCurriculum(Curriculum curriculum) { this.curriculum = curriculum; }
}
