package ru.ifmo.se.api;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
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
import javax.ws.rs.*;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.text.SimpleDateFormat;
import java.util.Base64;
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
    public Response checkArea(@HeaderParam(HttpHeaders.AUTHORIZATION) String header,
                              JSONCheck jsonCheck){
        String login = getLoginFromHeader(header);
        User user = searchUserBean.getUserByLogin(login);
        Check check = checkAreaBean.check(user, jsonCheck.getX(), jsonCheck.getY(), jsonCheck.getR());
        return Response.ok().entity(getJsonCheck(check)).build();
    }

    @GET
    @Path("history")
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public JsonArray getHistory(@HeaderParam(HttpHeaders.AUTHORIZATION) String header){
        String login = getLoginFromHeader(header);
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

    private String getLoginFromHeader(String header){
        String key = Base64.getEncoder().encodeToString("VERY_SECRET_KEY".getBytes());
        String token = header.substring("Bearer".length()).trim();
        Jws<Claims> claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token);
        return  (String) claims.getBody().get("login");
    }
}
