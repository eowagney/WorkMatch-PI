package com.workmatch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.workmatch.model.Cliente;
import com.workmatch.repository.ClienteRepository;

@RestController
@RequestMapping("/api/login")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping
    public Cliente login(@RequestBody Cliente loginRequest) {
        Cliente cliente = clienteRepository.findByCpf(loginRequest.getCpf());

        if (cliente != null && cliente.getSenha().equals(loginRequest.getSenha())) {
            return cliente;
        } else {
            throw new RuntimeException("CPF ou senha inválidos");
        }
    }
}
