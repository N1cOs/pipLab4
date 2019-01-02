package ru.ifmo.se.api;

import ru.ifmo.se.security.Secured;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("test")
public class Test {
    @GET
    public String test(){
        return "common test";
    }

    @GET
    @Path("/secure")
    @Secured
    public String secureTest(){
        return "secure test";
    }

}
