package ru.ifmo.se.api;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import ru.ifmo.se.domain.User;
import ru.ifmo.se.ejb.SearchUserBean;
import ru.ifmo.se.security.HashGenerator;

import javax.ejb.EJB;
import javax.inject.Inject;
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
public class Login {

    private static final String KEY = "VERY_SECRET_KEY";

    @EJB
    private SearchUserBean searchUserBean;

    @Inject
    private HashGenerator hashGenerator;

    @POST
    public Response login(@FormParam("login") String login, @FormParam("password") String password){
        User user = searchUserBean.getUserByLogin(login);
        String hashPassword = hashGenerator.getHash(password);
        if(user == null || !user.getPassword().equals(hashPassword))
            return Response.status(Response.Status.UNAUTHORIZED).build();
        else{
            String token = getToken(login);
            return Response.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + token).build();
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
