package ru.ifmo.se.api;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import ru.ifmo.se.domain.User;
import ru.ifmo.se.ejb.SearchUserBean;
import ru.ifmo.se.json.JSONLogin;
import ru.ifmo.se.security.HashGenerator;
import ru.ifmo.se.security.KeyToken;

import javax.crypto.SecretKey;
import javax.ejb.EJB;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Path("login")
public class Login {

    @Inject
    @KeyToken
    private SecretKey secretKey;

    @EJB
    private SearchUserBean searchUserBean;

    @Inject
    private HashGenerator hashGenerator;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@Valid JSONLogin jsonLogin){
        String login = jsonLogin.getLogin();
        String password = jsonLogin.getPassword();

        User user = searchUserBean.getUserByLogin(login);
        if(user == null || !user.getPassword().equalsIgnoreCase(hashGenerator.getHash(password)))
            return Response.status(Response.Status.UNAUTHORIZED).build();
        else{
            String token = getToken(login);
            JsonObject jsonObject = Json.createObjectBuilder().add("token", token).build();
            return Response.ok().entity(jsonObject).build();
        }
    }

    private String getToken(String login){
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
