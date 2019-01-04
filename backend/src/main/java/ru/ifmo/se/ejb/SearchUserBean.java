package ru.ifmo.se.ejb;

import ru.ifmo.se.domain.User;

import javax.ejb.Stateless;
import javax.persistence.*;

@Stateless
public class SearchUserBean {

    @PersistenceContext(unitName = "lab4")
    private EntityManager entityManager;

    public User getUserByLogin(String login){
        TypedQuery<User> query = entityManager.createNamedQuery("User.findByLogin", User.class);
        query.setParameter("login", login);
        try {
            return query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
