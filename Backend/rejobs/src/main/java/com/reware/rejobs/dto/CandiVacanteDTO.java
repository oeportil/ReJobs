package com.reware.rejobs.dto;

import java.util.Date;

public class CandiVacanteDTO {
    private Integer id;
    private Date fechaCan;
    private Date fechaDisp;
    private String nota;
    private Integer estado;
    private Boolean revisado;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String pfp;
    private Integer idUsuario;
    private String titulo;
    private String empresa;
    private Integer idVacante;

    public CandiVacanteDTO(Integer id, Date fechaCan, Date fechaDisp, String nota, Integer estado, Boolean revisado, String nombre, String apellido, String email, String telefono, String pfp, Integer idUsuario, String titulo, String empresa, Integer idVacante) { 
        this.id = id;
        this.fechaCan = fechaCan;
        this.fechaDisp = fechaDisp;
        this.nota = nota;
        this.estado = estado;
        this.revisado = revisado;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.pfp = pfp;
        this.idUsuario = idUsuario;
        this.titulo = titulo;
        this.empresa = empresa;
        this.idVacante = idVacante;  
    }

    // Getters
    public Integer getId() { return id; }
    public Date getFechaCan() { return fechaCan; }
    public Date getFechaDisp() { return fechaDisp; }
    public String getNota() { return nota; }
    public Integer getEstado() { return estado; }
    public Boolean getRevisado() { return revisado; }
    public String getNombre() { return nombre; }
    public String getApellido() { return apellido; }
    public String getEmail() { return email; }
    public String getTelefono() { return telefono; }
    public String getPfp() { return pfp; }
    public Integer getIdUsuario() { return idUsuario; }
    public String getTitulo() { return titulo; }
    public String getEmpresa() { return empresa; }
    public Integer getIdVacante() { return idVacante; }
}
