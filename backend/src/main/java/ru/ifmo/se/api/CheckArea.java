package ru.ifmo.se.api;

import ru.ifmo.se.domain.Check;
import ru.ifmo.se.security.Secured;

import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

@Path("check")
public class CheckArea {

    @POST
    @Secured
    public Response checkArea(@HeaderParam(HttpHeaders.AUTHORIZATION) String header,
                              Check check){
        return Response.ok().build();
    }
}
