package ru.ifmo.se.security;

import javax.annotation.PostConstruct;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;


@ApplicationScoped
public class TokenKeyGenerator implements Serializable {

    @Produces
    @KeyToken
    private SecretKey secretKey;


    @PostConstruct
    private void init() {
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
            SecureRandom secureRandom = new SecureRandom();
            keyGenerator.init(secureRandom);
            secretKey = keyGenerator.generateKey();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }
}
