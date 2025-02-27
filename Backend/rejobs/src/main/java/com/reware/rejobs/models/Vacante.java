package com.reware.rejobs.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "vacantes")
public class Vacante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String empresa;
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaInicio;
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaFin;
    private String nombre;
    private String ciudad;
    private String region;
    private String contrato;
    private String pais;
    private String emailContacto;
    private Boolean activo;

    @OneToMany(mappedBy = "vacante", cascade = CascadeType.ALL)
    private List<Requisito> requisitos;

    @ManyToOne
    @JoinColumn(name = "reclutador_id", nullable = false)
    @JsonIgnore
    private Usuario reclutador;

    @ManyToOne
    @JoinColumn(name = "subCategoria_id", nullable = false)
    private SubCategoria subCategoria;

    public Vacante() {}
    public Vacante(Integer id, String contrato,String empresa, Date fechaInicio, Date fechaFin, String nombre, String ciudad, String region, String pais, String emailContacto, Boolean activo, Usuario reclutador, SubCategoria subCategoria) {
        this.id = id;
        this.empresa = empresa;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.region = region;
        this.pais = pais;
        this.emailContacto = emailContacto;
        this.activo = activo;
        this.reclutador = reclutador;
        this.subCategoria = subCategoria;
    }
    public Vacante(String empresa, String contrato, Date fechaInicio, Date fechaFin, String nombre, String ciudad, String region, String pais, String emailContacto, Boolean activo, Usuario reclutador, SubCategoria subCategoria) {
        this.empresa = empresa;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.region = region;
        this.pais = pais;
        this.emailContacto = emailContacto;
        this.activo = activo;
        this.reclutador = reclutador;
        this.subCategoria = subCategoria;
    }
    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }
    public Date getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(Date fechaInicio) { this.fechaInicio = fechaInicio; }
    public Date getFechaFin() { return fechaFin; }
    public void setFechaFin(Date fechaFin) { this.fechaFin = fechaFin; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCiudad() { return ciudad; }
    public void setCiudad(String ciudad) { this.ciudad = ciudad; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getPais() { return pais; }
    public void setPais(String pais) { this.pais = pais; }
    public String getEmailContacto() { return emailContacto; }
    public void setEmailContacto(String emailContacto) { this.emailContacto = emailContacto; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
    public Usuario getReclutador() { return reclutador; }
    public void setReclutador(Usuario reclutador) { this.reclutador = reclutador; }
    public SubCategoria getSubCategoria() { return subCategoria; }
    public void setSubCategoria(SubCategoria subCategoria) { this.subCategoria = subCategoria; }
    public List<Requisito> getRequisitos() { return requisitos; }
    public void setRequisitos(List<Requisito> requisitos) { this.requisitos = requisitos; }
    public void setContrato(String contrato){ this.contrato = contrato;};
    public String getContrato(){ return contrato; }
    
}
