package ru.ifmo.se.api;

import ru.ifmo.se.domain.Check;
import ru.ifmo.se.domain.User;
import ru.ifmo.se.ejb.CheckAreaBean;
import ru.ifmo.se.ejb.SearchUserBean;
import ru.ifmo.se.json.JSONCheck;
import ru.ifmo.se.security.Secured;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.stream.JsonCollectors;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.text.SimpleDateFormat;
import java.util.List;

@Path("check")
public class CheckArea {

    @EJB
    private CheckAreaBean checkAreaBean;

    @EJB
    private SearchUserBean searchUserBean;

    @POST
    @Secured
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response checkArea(@Context ContainerRequestContext context,
                              @Valid JSONCheck jsonCheck){
        String login = (String) context.getProperty("login");
        User user = searchUserBean.getUserByLogin(login);
        Check check = checkAreaBean.check(user, jsonCheck.getX(), jsonCheck.getY(), jsonCheck.getR());
        return Response.ok().entity(getJsonCheck(check)).build();
    }

    @GET
    @Path("history")
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public JsonArray getHistory(@Context ContainerRequestContext context){
        String login = (String) context.getProperty("login");
        User user = searchUserBean.getUserByLogin(login);
        List<Check> results = checkAreaBean.getResults(user.getId());
        return results.stream().map(this::getJsonCheck).collect(JsonCollectors.toJsonArray());
    }

    private JsonObject getJsonCheck(Check check){
        return Json.createObjectBuilder()
                .add("xValue", check.getXValue())
                .add("yValue", check.getYValue())
                .add("rValue", check.getRValue())
                .add("result", check.isResult())
                .add("date", new SimpleDateFormat("HH:mm MM-dd-yyyy").
                        format(check.getDate())).build();
    }
}
