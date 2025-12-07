package com.example.backend.service;

import com.example.backend.exception.BusinessException;
import com.example.backend.to.TransferPayload;
import com.example.backend.to.TransferResultTo;
import com.example.ejb.exception.InvalidTransferException;
import com.example.ejb.service.BeneficioEjbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
