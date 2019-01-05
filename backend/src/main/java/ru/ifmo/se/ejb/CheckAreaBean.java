package ru.ifmo.se.ejb;

import ru.ifmo.se.domain.Check;
import ru.ifmo.se.domain.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.Date;
import java.util.List;

@Stateless
public class CheckAreaBean {

    @PersistenceContext(name = "lab4")
    private EntityManager entityManager;

    public List<Check> getResults(Integer userId){
        TypedQuery<Check> query = entityManager.createNamedQuery("Check.historyByUserId", Check.class);
        query.setParameter("id_user", userId);
        return query.getResultList();
    }

    public Check check(User user, double xValue, double yValue, double rValue){
        Check check = new Check();
        check.setXValue(xValue);
        check.setYValue(yValue);
        check.setRValue(rValue);
        check.setDate(new Date());
        check.setUser(user);

        boolean result = false;
        if(xValue >= 0 && xValue <= rValue / 2 && yValue >= 0 && yValue <= rValue)
            result = true;
        else if(xValue <= 0 && xValue >= -rValue){
            if(Math.pow(xValue, 2) + Math.pow(yValue, 2) <= Math.pow(rValue, 2))
                result = true;
            else if(yValue <= 0.5 * (xValue + rValue))
                result = true;
        }
        check.setResult(result);
        entityManager.persist(check);

        return check;
    }


}
