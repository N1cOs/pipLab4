package ru.ifmo.se.ejb;

import ru.ifmo.se.domain.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

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
