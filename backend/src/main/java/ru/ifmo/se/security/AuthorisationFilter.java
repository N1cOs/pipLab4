package ru.ifmo.se.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.extern.java.Log;

import javax.annotation.Priority;
import javax.crypto.SecretKey;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.util.logging.Level;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
@Log
public class AuthorisationFilter implements ContainerRequestFilter {

    @Inject
    @KeyToken
    private SecretKey key;

    @Override
    public void filter(ContainerRequestContext requestContext){
        try{
            String authString = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
            String token = authString.substring("Bearer".length()).trim();
            Jws<Claims> claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            requestContext.setProperty("login", claims.getBody().get("login"));
        } catch (Exception e){
            log.log(Level.SEVERE, null, e);
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }
}
