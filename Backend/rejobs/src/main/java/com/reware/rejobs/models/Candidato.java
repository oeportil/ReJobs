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
@Table(name = "candidatos")
public class Candidato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCan;
    @Temporal(TemporalType.TIMESTAMP)   
    private Date fechaDisp;
    private Boolean contacto;
    private String nota;

    @ManyToOne
    @JoinColumn(name = "vacante_id", nullable = false)
    private Vacante vacante;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    //Constructores
    public Candidato() {}

    public Candidato(Integer id, Date fechaCan, Date fechaDisp, Boolean contacto, String nota, Vacante vacante, Usuario usuario) {
        this.id = id;
        this.fechaCan = fechaCan;
        this.fechaDisp = fechaDisp;
        this.contacto = contacto;
        this.nota = nota;
        this.vacante = vacante;
        this.usuario = usuario;
    }

    public Candidato(Date fechaCan, Date fechaDisp, Boolean contacto, String nota, Vacante vacante, Usuario usuario) {
        this.fechaCan = fechaCan;
        this.fechaDisp = fechaDisp;
        this.contacto = contacto;
        this.nota = nota;
        this.vacante = vacante;
        this.usuario = usuario;
    }

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Date getFechaCan() { return fechaCan; }
    public void setFechaCan(Date fechaCan) { this.fechaCan = fechaCan; }
    public Date getFechaDisp() { return fechaDisp; }
    public void setFechaDisp(Date fechaDisp) { this.fechaDisp = fechaDisp; }
    public Boolean getContacto() { return contacto; }
    public void setContacto(Boolean contacto) { this.contacto = contacto; }
    public String getNota() { return nota; }
    public void setNota(String nota) { this.nota = nota; }
    public Vacante getVacante() { return vacante; }
    public void setVacante(Vacante vacante) { this.vacante = vacante; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}
