package com.workmatch.repository;

import com.workmatch.model.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface AgendaRepository extends JpaRepository<Agenda, UUID> {
    List<Agenda> findByProfissionalId(UUID profissionalId);
}
