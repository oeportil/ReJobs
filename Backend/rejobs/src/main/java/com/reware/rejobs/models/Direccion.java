package com.reware.rejobs.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "direcciones")
public class Direccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String pais;
    private String region;
    private String distrito;
    private String ciudad;
    private String direccion;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    //Constructores
    public Direccion() {}
    public Direccion(Integer id, String pais, String region, String distrito, String ciudad, String direccion, Usuario usuario) {
        this.id = id;
        this.pais = pais;
        this.region = region;
        this.distrito = distrito;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.usuario = usuario;
    }
    public Direccion(String pais, String region, String distrito, String ciudad, String direccion, Usuario usuario) {
        this.pais = pais;
        this.region = region;
        this.distrito = distrito;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.usuario = usuario;
    }
    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getPais() { return pais; }
    public void setPais(String pais) { this.pais = pais; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getDistrito() { return distrito; }
    public void setDistrito(String distrito) { this.distrito = distrito; }
    public String getCiudad() { return ciudad; }
    public void setCiudad(String ciudad) { this.ciudad = ciudad; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}
