package com.paffeuu.family.persistence;


import org.springframework.data.repository.CrudRepository;

public interface ChildRepository extends CrudRepository<Child, Integer> {
    Child getById(int id);
}
