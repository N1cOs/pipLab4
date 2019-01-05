package ru.ifmo.se.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "results")
@NamedQueries(
        @NamedQuery(name = "Check.historyByUserId", query = "select c " +
                "from Check c join c.user u where u.id = :id_user")
)
public class Check implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "x_value")
    private double xValue;

    @Column(name = "y_value")
    private double yValue;

    @Column(name = "r_value")
    private double rValue;

    private boolean result;

    private Date date;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
}
