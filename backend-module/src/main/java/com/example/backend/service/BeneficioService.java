package com.example.backend.service;

import com.example.backend.exception.BusinessException;
import com.example.backend.to.BeneficioTo;
import com.example.backend.to.TransferPayloadTo;
import com.example.ejb.exception.InvalidTransferException;
import com.example.ejb.model.Beneficio;
import com.example.ejb.service.BeneficioEjbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BeneficioService {
    private static final String ERROR_CODE_INVALID_ACCOUNT = "Conta inválida.";

    @Autowired
    BeneficioEjbService ejbService;

    public void transfer(TransferPayloadTo payload) throws BusinessException {
        try{
            ejbService.transfer(payload.getFromId(), payload.getToId(), payload.getValor());
        } catch (InvalidTransferException e) {
            throw new BusinessException(e.getMessage());
        }
    }

    public List<BeneficioTo> allBenefits() {
        List<Beneficio> all = ejbService.listAllBeneficios();

        return all.stream().map(e -> new BeneficioTo(e.getId(), e.getNome(), e.getDescricao(), e.getValor(), e.getAtivo()))
                .toList();
    }

    public void novaConta(BeneficioTo to) {
        Beneficio novo = new Beneficio();
        novo.setAtivo(to.getAtivo());
        novo.setDescricao(to.getDescricao());
        novo.setNome(to.getNome());
        novo.setValor(to.getValor());

        ejbService.criarOuAtualizar(novo);
    }

    public BeneficioTo findById(Long id) {
        Optional<Beneficio> optional = ejbService.findById(id);

        BeneficioTo to = new BeneficioTo();

        if (optional.isPresent()) {
            Beneficio b = optional.get();
            to.setId(b.getId());
            to.setAtivo(b.getAtivo());
            to.setDescricao(b.getDescricao());
            to.setNome(b.getNome());
            to.setValor(b.getValor());
        }

        return to;
    }

    public void update(Long id, BeneficioTo to) throws BusinessException {
        Optional<Beneficio> optional = ejbService.findById(id);

        Beneficio b = optional.orElseThrow(() -> new BusinessException(ERROR_CODE_INVALID_ACCOUNT));

        b.setNome(to.getNome());
        b.setDescricao(to.getDescricao());
        b.setValor(to.getValor());
        b.setAtivo(to.getAtivo());

        ejbService.criarOuAtualizar(b);
    }

    public void delete(Long id) throws BusinessException {
        Optional<Beneficio> optional = ejbService.findById(id);

        Beneficio b = optional.orElseThrow(() -> new BusinessException(ERROR_CODE_INVALID_ACCOUNT));

        b.setAtivo(Boolean.FALSE);

        ejbService.criarOuAtualizar(b);
    }
}
