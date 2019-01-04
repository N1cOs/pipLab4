package ru.ifmo.se.security;

import io.jsonwebtoken.Jwts;
import lombok.extern.java.Log;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.util.Base64;
import java.util.logging.Level;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
@Log
public class AuthorisationFilter implements ContainerRequestFilter {

    private static final String KEY = "VERY_SECRET_KEY";

    @Override
    public void filter(ContainerRequestContext requestContext){
        try{
            String authString = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
            String token = authString.substring("Bearer".length()).trim();

            String secretKey = Base64.getEncoder().encodeToString(KEY.getBytes());
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        } catch (Exception e){
            log.log(Level.SEVERE, null, e);
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }
}
