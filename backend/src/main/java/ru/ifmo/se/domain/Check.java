package ru.ifmo.se.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "results")
public class Check {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double xValue;

    private double yValue;

    private double rValue;

    private boolean result;

    private Date date;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
}
