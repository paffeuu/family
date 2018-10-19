package com.paffeuu.family.service;

import com.paffeuu.family.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

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
        return familyRepository.save(family);
    }

    private Father persistFather(Father father) {
        return fatherRepository.save(father);
    }

    public Father addFatherToFamily(Father father, int familyId) {
        father = persistFather(father);
        Family family = familyRepository.getFamilyById(familyId);
        if (family != null) {
            family.setFather(father);
            return (familyRepository.save(family) != null) ? father : null;
        }
        return null;
    }

    private Child persistChild(Child child, int familyId) {
        child.setFamily(familyRepository.getFamilyById(familyId));
        return childRepository.save(child);
    }

    public Child addChildToFamily(Child child, int familyId) {
        child = persistChild(child, familyId);
        Family family = familyRepository.getFamilyById(familyId);
        if (family != null) {
            family.addChild(child);
            return (familyRepository.save(family) != null) ? child : null;
        }
        return null;
    }

    public Family getFamilyById(int id) {
        return familyRepository.getFamilyById(id);
    }

    public Father getFatherById(int id) {
        return fatherRepository.getFatherById(id);
    }

    public Father getFatherByFamily(Family family) {
        return fatherRepository.getFatherByFamily(family);
    }

    public Child getChildById(int id) {
        return childRepository.getById(id);
    }

    public Set<Child> findChildren(Child child) {
        HashSet<Child> children = null;
        Date birthDate = child.getBirthDate();
        if (birthDate != null) {
            children = new HashSet<>(childRepository.findChildByBirthDate(birthDate));
        }
        String firstName = child.getFirstName();
        if (firstName != null) {
            if (children == null) {
                children = new HashSet<>(childRepository.findChildByFirstName(firstName));
            } else {
                Set<Child> childrenToCompare = childRepository.findChildByFirstName(firstName);
                children.removeIf((child1) -> !childrenToCompare.contains(child1));
            }
        }
        String secondName = child.getSecondName();
        if (secondName != null) {
            if (children == null) {
                children = new HashSet<>(childRepository.findChildBySecondName(secondName));
            } else {
                Set<Child> childrenToCompare = childRepository.findChildBySecondName(secondName);
                children.removeIf((child1 -> !childrenToCompare.contains(child1)));
            }
        }
        String pesel = child.getPesel();
        if (pesel != null) {
            if (children == null) {
                children = new HashSet<>(childRepository.findChildByPesel(pesel));
            } else {
                Set<Child> childrenToCompare = childRepository.findChildByPesel(pesel);
                children.removeIf((child1 -> !childrenToCompare.contains(child1)));
            }
        }
        String sex = child.getSex();
        if (sex != null) {
            if (children == null) {
                children = new HashSet<>(childRepository.findChildBySex(sex));
            } else {
                Set<Child> childrenToCompare = childRepository.findChildBySex(sex);
                children.removeIf((child1 -> !childrenToCompare.contains(child1)));
            }
        }
        return children;
    }
}
