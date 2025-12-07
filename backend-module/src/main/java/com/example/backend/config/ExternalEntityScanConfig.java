package com.example.backend.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EntityScan("com.example.ejb.model")
public class ExternalEntityScanConfig {
}
