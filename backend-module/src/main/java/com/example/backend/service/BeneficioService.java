package com.example.backend.service;

import com.example.backend.exception.BusinessException;
import com.example.backend.to.BeneficioTo;
import com.example.backend.to.TransferPayload;
import com.example.backend.to.TransferResultTo;
import com.example.ejb.exception.InvalidTransferException;
import com.example.ejb.model.Beneficio;
import com.example.ejb.service.BeneficioEjbService;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BeneficioService {
    @Autowired
    BeneficioEjbService ejbService;

    public TransferResultTo transfer(TransferPayload payload) throws BusinessException {
        try{
            ejbService.transfer(payload.getFrom(), payload.getTo(), payload.getValue());
            TransferResultTo resultTo = new TransferResultTo();
            resultTo.setStatus("OK");
            resultTo.setMessagem("Transferencia realizada com sucesso");
            return resultTo;
        } catch (InvalidTransferException e) {
            throw new BusinessException(e.getCode());
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

    public void update(Long id, BeneficioTo to) {
        Optional<Beneficio> optional = ejbService.findById(id);

        if (optional.isPresent()) {
            Beneficio b = optional.get();
            b.setNome(to.getNome());
            b.setDescricao(to.getDescricao());
            b.setValor(to.getValor());
            b.setAtivo(to.getAtivo());

            ejbService.criarOuAtualizar(b);
        }
    }

    public void delete(Long id) {
        Optional<Beneficio> optional = ejbService.findById(id);

        if (optional.isPresent()) {
            Beneficio b = optional.get();
            b.setAtivo(Boolean.FALSE);

            ejbService.criarOuAtualizar(b);
        }
    }
}
