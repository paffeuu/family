package com.paffeuu.family.persistence;


import org.springframework.data.repository.CrudRepository;

import java.sql.Date;
import java.util.Set;

public interface ChildRepository extends CrudRepository<Child, Integer> {
    Child getById(int id);
    Set<Child> findChildByBirthDate(Date date);
    Set<Child> findChildByPesel(String pesel);
    Set<Child> findChildByFirstName(String firstName);
    Set<Child> findChildBySecondName(String secondName);
    Set<Child> findChildBySex(String sex);
}
