package com.reware.rejobs.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "curriculums")
public class Curriculum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String descripcion;
    private String biografia;
    
    @OneToOne(mappedBy = "curriculum", cascade = CascadeType.ALL)
    private Usuario usuario;

    @OneToMany(mappedBy = "curriculum", cascade = CascadeType.ALL)
    private List<Idioma> idiomas;

    @OneToMany(mappedBy = "curriculum", cascade = CascadeType.ALL)
    private List<Experiencia> experiencias;

    @OneToMany(mappedBy = "curriculum", cascade = CascadeType.ALL)
    private List<Valor> valores;

    @OneToMany(mappedBy = "curriculum", cascade = CascadeType.ALL)
    private List<Academica> academicas;

    @OneToMany(mappedBy = "curriculum", cascade = CascadeType.ALL)
    private List<Hito> hitos;
    
    //Constructores
    public Curriculum() {}
    
    public Curriculum(Integer id, String descripcion, String biografia, Usuario usuario) {
        this.id = id;
        this.descripcion = descripcion;
        this.biografia = biografia;
        this.usuario = usuario;
    }
    
    public Curriculum(String descripcion, String biografia, Usuario usuario) {
        this.descripcion = descripcion;
        this.biografia = biografia;
        this.usuario = usuario;
    }
    
    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getBiografia() { return biografia; }
    public void setBiografia(String biografia) { this.biografia = biografia; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public List<Idioma> getIdiomas(){ return idiomas;}
    public void setIdiomas(List<Idioma> idiomas){this.idiomas = idiomas;}
    public List<Experiencia> getExperiencias(){ return experiencias;}
    public void setExperiencias(List<Experiencia> experiencias){this.experiencias = experiencias;}
    public List<Valor> getValores(){ return valores;}
    public void setValores(List<Valor> valores){this.valores = valores;}
    public List<Academica> getAcademicas(){ return academicas;}
    public void setAcademicas(List<Academica> academicas){this.academicas = academicas;}
    public List<Hito> getHitos(){ return hitos;}
    public void setHitos(List<Hito> hitos){this.hitos = hitos;}
}
