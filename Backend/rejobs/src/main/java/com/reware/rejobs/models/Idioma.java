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
@Table(name = "idiomas")
public class Idioma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String idioma;
    
    @ManyToOne
    @JoinColumn(name = "curriculum_id", nullable = false)
    @JsonIgnore
    private Curriculum curriculum;
    
    //Constructores
    public Idioma() {}
    
    public Idioma(Integer id, String idioma, Curriculum curriculum) {
        this.id = id;
        this.idioma = idioma;
        this.curriculum = curriculum;
    }
    
    public Idioma(String idioma, Curriculum curriculum) {
        this.idioma = idioma;
        this.curriculum = curriculum;
    }
    
    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getIdioma() { return idioma; }
    public void setIdioma(String idioma) { this.idioma = idioma; }
    public Curriculum getCurriculum() { return curriculum; }
    public void setCurriculum(Curriculum curriculum) { this.curriculum = curriculum; }
}
