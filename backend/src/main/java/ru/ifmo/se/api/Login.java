package ru.ifmo.se.api;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import ru.ifmo.se.domain.User;
import ru.ifmo.se.ejb.SearchUserBean;
import ru.ifmo.se.json.JSONLogin;
import ru.ifmo.se.security.HashGenerator;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.StringWriter;
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
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(JSONLogin jsonLogin){
        String login = jsonLogin.getLogin();
        String password = jsonLogin.getPassword();
        if(login == null || password == null){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        User user = searchUserBean.getUserByLogin(login);
        if(user == null || !user.getPassword().equals(hashGenerator.getHash(password)))
            return Response.status(Response.Status.UNAUTHORIZED).build();
        else{
            String token = getToken(login);
            JsonObject jsonObject = Json.createObjectBuilder().add("token", token).build();
            return Response.ok().entity(jsonObject).build();
        }
    }

    private String getToken(String login){
        String secretKey = Base64.getEncoder().encodeToString(KEY.getBytes());
        Date expirationDate = Date.from(Instant.now().plus(20, ChronoUnit.MINUTES));
        String token = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .claim("login", login)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        return token;
    }

}
