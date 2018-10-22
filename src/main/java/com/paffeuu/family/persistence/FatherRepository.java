package com.paffeuu.family.persistence;

import org.springframework.data.repository.CrudRepository;

public interface FatherRepository extends CrudRepository<Father, Integer> {
    Father getFatherById(int id);
    Father getFatherByFamily(Family family);
}
