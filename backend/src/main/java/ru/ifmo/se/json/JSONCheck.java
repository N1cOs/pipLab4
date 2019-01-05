package ru.ifmo.se.json;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class JSONCheck implements Serializable {

    private double x;

    private double y;

    private double r;
}
