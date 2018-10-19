package com.paffeuu.family.persistence;

import org.springframework.data.repository.CrudRepository;

public interface FamilyRepository extends CrudRepository<Family, Integer> {
    Family getFamilyById(int id);
}
