package ru.ifmo.se.security;

import javax.enterprise.inject.Default;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Default
public class Sha256Generator implements HashGenerator {
    @Override
    public String getHash(String password) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = messageDigest.digest(password.getBytes());
            StringBuilder hashPassword = new StringBuilder();
            for(byte b : hashBytes){
                String hexByte = Integer.toHexString(b & 0xff);
                if(hexByte.length() == 1)
                    hashPassword.append('0');
                hashPassword.append(hexByte);
            }
            return hashPassword.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
}
