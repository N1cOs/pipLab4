package ru.ifmo.se.security;

import lombok.extern.java.Log;

import javax.crypto.KeyGenerator;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@Log
@ApplicationScoped
public class KeyGeneratorFactory {

    @Produces
    @Dependent
    public KeyGenerator createGenerator() throws NoSuchAlgorithmException {
        KeyGenerator generator = KeyGenerator.getInstance("HmacSHA256");
        SecureRandom secureRandom = new SecureRandom();
        generator.init(secureRandom);
        return generator;
    }
}
