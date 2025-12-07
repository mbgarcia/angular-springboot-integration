package com.example.ejb.service;

import com.example.ejb.exception.InvalidTransferException;
import com.example.ejb.model.Beneficio;
import jakarta.persistence.EntityManager;
import jakarta.persistence.LockModeType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BeneficioEjbServiceTest {
    @Mock
    EntityManager em;
    @InjectMocks
    BeneficioEjbService service;

    @Test
    public void invalidInputs() {
        Assertions.assertThrows(InvalidTransferException.class, () -> service.transfer(null, null, null));
        Assertions.assertThrows(InvalidTransferException.class, () -> service.transfer(1L, null, null));
        Assertions.assertThrows(InvalidTransferException.class, () -> service.transfer(1L, 2L, null));
    }

    @Test
    public void invalidAmount() throws InvalidTransferException {
        Assertions.assertThrows(InvalidTransferException.class, () -> service.transfer(1L, 2L, BigDecimal.valueOf(-1)));
        Assertions.assertThrows(InvalidTransferException.class, () -> service.transfer(1L, 2L, BigDecimal.ZERO));
    }

    @Test
    public void invalidDestination() throws InvalidTransferException {
        Assertions.assertThrows(InvalidTransferException.class, () -> service.transfer(1L, 1L, BigDecimal.valueOf(1)));
    }

    @Test
    public void successTransfer() throws InvalidTransferException {
        Beneficio from = new Beneficio(1L, "Beneficio A", "Descrição A", BigDecimal.valueOf(1000));
        Beneficio to = new Beneficio(2L, "Beneficio B", "Descrição B", BigDecimal.valueOf(500));
        when(em.find(Beneficio.class, from.getId(), LockModeType.OPTIMISTIC)).thenReturn(from);
        when(em.find(Beneficio.class, to.getId(), LockModeType.OPTIMISTIC)).thenReturn(to);

        service.transfer(from.getId(), to.getId(), BigDecimal.valueOf(200));

        assertEquals(800.00, from.getValor().doubleValue(), 0.01);
        assertEquals(700.00, to.getValor().doubleValue(), 0.01);
    }
}
