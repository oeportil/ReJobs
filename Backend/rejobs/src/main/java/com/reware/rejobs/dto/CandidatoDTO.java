package com.reware.rejobs.dto;

import java.util.Date;

public class CandidatoDTO {
    private Integer id;
    private Date fechaCan;
    private Date fechaDisp;
    private String nota;
    private Integer estado;
    private Boolean revisado;
    private String nombre;
    private String apellido;  
    private String empresa;
    private Integer idVacante;

    public CandidatoDTO(Integer id, Date fechaCan, Date fechaDisp, String nota, Integer estado, Boolean revisado, String nombre, String apellido, String empresa, Integer idVacante) {
        this.id = id;
        this.fechaCan = fechaCan;
        this.fechaDisp = fechaDisp;
        this.nota = nota;
        this.estado = estado;
        this.revisado = revisado;
        this.nombre = nombre;
        this.apellido = apellido;
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
    public String getEmpresa() { return empresa; }
    public String getNombre() { return nombre; }
    public String getApellido() { return apellido; }
    public Integer getIdVacante() { return idVacante; }
}
