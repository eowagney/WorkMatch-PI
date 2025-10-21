package com.workmatch.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
public class Agenda {

    @Id
    @GeneratedValue
    private UUID id;

    private LocalDate data;

    @ElementCollection
    @CollectionTable(name = "agenda_horarios", joinColumns = @JoinColumn(name = "agenda_id"))
    private List<String> horarios;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    // Getters e Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public List<String> getHorarios() { return horarios; }
    public void setHorarios(List<String> horarios) { this.horarios = horarios; }
    public Profissional getProfissional() { return profissional; }
    public void setProfissional(Profissional profissional) { this.profissional = profissional; }
}
