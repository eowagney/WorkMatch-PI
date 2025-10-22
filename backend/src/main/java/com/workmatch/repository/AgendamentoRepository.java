package com.workmatch.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.workmatch.model.Agendamento;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, UUID> {
    List<Agendamento> findByProfissionalIdAndData(UUID profissionalId, LocalDate data);
}
