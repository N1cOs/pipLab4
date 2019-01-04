package ru.ifmo.se.json;

import lombok.Getter;
import lombok.Setter;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Getter
@Setter
public class JSONLogin {
    @XmlElement
    private String login;

    @XmlElement
    private String password;

}
