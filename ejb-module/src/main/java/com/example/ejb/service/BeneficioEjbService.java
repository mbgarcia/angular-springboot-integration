package com.example.ejb.service;

import com.example.ejb.exception.InvalidTransferException;
import com.example.ejb.model.Beneficio;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.LockModeType;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Stateless
public class BeneficioEjbService {
    private static final String ERROR_CODE_INPUT_DATA = "Dados obrigatórios inválidos";
    private static final String ERROR_CODE_INVALID_ACCOUNTS = "Contas inválidas.";
    private static final String ERROR_CODE_AMOUNT_NOT_POSITIVE = "Valor inválido para ser transferido";
    private static final String ERROR_CODE_INVALID_DESTINATION = "Informe contas diferentes na transação";
    private static final String ERROR_CODE_AMOUNT_NEGATIVATES_ACCOUNT = "Valor a ser transferido é superior ao saldo";

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public Optional<Beneficio> findById(Long id) {
        return Optional.of(em.find(Beneficio.class, id, LockModeType.OPTIMISTIC));
    }

    @Transactional
    public void criarOuAtualizar(Beneficio e) {
        em.persist(e);
    }

    public List<Beneficio> listAllBeneficios(){
        TypedQuery<Beneficio> query = em.createQuery("select e from Beneficio e", Beneficio.class);

        return query.getResultList();
    }

    @Transactional()
    public void transfer(Long fromId, Long toId, BigDecimal amount) throws InvalidTransferException {
        if (fromId == null || toId == null || amount == null) {
            throw new InvalidTransferException(ERROR_CODE_INPUT_DATA);
        }

        if (amount.compareTo(BigDecimal.ZERO)<= 0) {
            throw new InvalidTransferException(ERROR_CODE_AMOUNT_NOT_POSITIVE);
        }

        if (fromId.equals(toId)) {
            throw new InvalidTransferException(ERROR_CODE_INVALID_DESTINATION);
        }

        Beneficio from = em.find(Beneficio.class, fromId, LockModeType.OPTIMISTIC);
        Beneficio to   = em.find(Beneficio.class, toId, LockModeType.OPTIMISTIC);

        if (from == null || to == null) {
            throw new InvalidTransferException(ERROR_CODE_INVALID_ACCOUNTS);
        }

        if (from.getValor().compareTo(amount) < 0) {
            throw new InvalidTransferException(ERROR_CODE_AMOUNT_NEGATIVATES_ACCOUNT);
        }

        // BUG: sem validações, sem locking, pode gerar saldo negativo e lost update
        from.setValor(from.getValor().subtract(amount));
        to.setValor(to.getValor().add(amount));

        em.merge(from);
        em.merge(to);
    }
}
