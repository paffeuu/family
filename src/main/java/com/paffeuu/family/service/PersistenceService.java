package com.paffeuu.family.service;

import com.paffeuu.family.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersistenceService {
    private FamilyRepository familyRepository;
    private FatherRepository fatherRepository;
    private ChildRepository childRepository;

    @Autowired
    public PersistenceService(
            FamilyRepository familyRepository,
            FatherRepository fatherRepository,
            ChildRepository childRepository
    ) {
        this.familyRepository = familyRepository;
        this.fatherRepository = fatherRepository;
        this.childRepository = childRepository;
    }

    public Family persistFamily(Family family) {
        familyRepository.save(family);
        return family;
    }

    public Father persistFather(Father father) {
        fatherRepository.save(father);
        return father;
    }

    public Child persistChild(Child child) {
        childRepository.save(child);
        return child;
    }

    public Family getFamilyById(int id) {
        return familyRepository.getById(id);
    }

    public Father getFatherById(int id) {
        return fatherRepository.getById(id);
    }

    public Child getChildById(int id) {
        return childRepository.getById(id);
    }




}
