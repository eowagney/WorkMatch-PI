package com.workmatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestBody;

import com.workmatch.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Cliente save(@RequestBody Cliente cliente);
}
