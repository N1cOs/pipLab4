package ru.ifmo.se.api;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.java.Log;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

@Path("login")
@Log
public class Login {

    private static final String KEY = "VERY_SECRET_KEY";

    @POST
    public Response login(@FormParam("login") String login, @FormParam("password") String password){
        //ToDO:add authentication
        if((login.equals("nick") || login.equals("mark")) && password.equals("1234")){
            String token = getToken(login);
            return Response.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + token).build();
        }
        else{
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    private String getToken(String login){
        String secretKey = Base64.getEncoder().encodeToString(KEY.getBytes());
        Date expirationDate = Date.from(Instant.now().plus(20, ChronoUnit.MINUTES));
        String token = Jwts.builder()
                .setSubject(login)
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        return token;
    }

}
