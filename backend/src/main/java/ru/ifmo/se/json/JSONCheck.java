package ru.ifmo.se.json;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import java.io.Serializable;

@Getter
@Setter
public class JSONCheck implements Serializable {

    @DecimalMin(value = "-3")
    @DecimalMax(value = "5")
    private double x = 10;

    @DecimalMin(value = "-3")
    @DecimalMax(value = "3")
    private double y = 10;

    @DecimalMin(value = "1")
    @DecimalMax(value = "5")
    private double r = -1;
}
