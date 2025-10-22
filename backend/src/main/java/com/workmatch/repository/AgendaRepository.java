package com.workmatch.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.workmatch.model.Agenda;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, UUID> {
    List<Agenda> findByProfissionalId(UUID profissionalId);
}
