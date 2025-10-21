package com.workmatch.controller;

import com.workmatch.model.Profissional;
import com.workmatch.model.Agenda;
import com.workmatch.repository.ProfissionalRepository;
import com.workmatch.repository.AgendaRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/profissionais")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfissionalController {

    private final ProfissionalRepository profissionalRepository;
    private final AgendaRepository agendaRepository;

    public ProfissionalController(ProfissionalRepository profissionalRepository, AgendaRepository agendaRepository) {
        this.profissionalRepository = profissionalRepository;
        this.agendaRepository = agendaRepository;
    }

    @GetMapping
    public List<Profissional> getAll() {
        return profissionalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Profissional getById(@PathVariable UUID id) {
        return profissionalRepository.findById(id).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));
    }

    @GetMapping("/{id}/agenda")
    public List<Agenda> getAgenda(@PathVariable UUID id) {
        return agendaRepository.findByProfissionalId(id);
    }
}

