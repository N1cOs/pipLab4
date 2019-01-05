package ru.ifmo.se.json;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
public class JSONLogin implements Serializable {
    @NotNull
    private String login;

    @NotNull
    private String password;

}
