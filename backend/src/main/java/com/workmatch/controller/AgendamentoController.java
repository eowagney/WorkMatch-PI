package com.workmatch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workmatch.model.Agendamento;
import com.workmatch.repository.AgendamentoRepository;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepo;

    @PostMapping
    public Agendamento criarAgendamento(@RequestBody Agendamento agendamento) {
        return agendamentoRepo.save(agendamento);
    }
}

