package com.paffeuu.family.controller;

import com.paffeuu.family.persistence.Child;
import com.paffeuu.family.persistence.Family;
import com.paffeuu.family.persistence.Father;
import com.paffeuu.family.service.PersistenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin
@RequestMapping("/family")
@RestController
public class FamilyController {
    private PersistenceService persistenceService;

    @Autowired
    public FamilyController(PersistenceService persistenceService) {
        this.persistenceService = persistenceService;
    }

    @PostMapping(path = "/create-family")
    public ResponseEntity createFamily() {
        Family family = persistenceService.persistFamily(new Family());
        return (family != null) ? ResponseEntity.ok(family.getId()) : ResponseEntity.badRequest().build();
    }

    @PostMapping(path = "/add-father/{familyId}")
    public ResponseEntity addFatherToFamily(@RequestBody Father father, @PathVariable int familyId) {
        father = persistenceService.addFatherToFamily(father, familyId);
        return (father != null) ? ResponseEntity.ok(father.getId()) : ResponseEntity.badRequest().build();
    }

    @PostMapping(path = "/add-child/{familyId}")
    public ResponseEntity addChildToFamily(@RequestBody Child child, @PathVariable int familyId) {
        child = persistenceService.addChildToFamily(child, familyId);
        return (child != null) ? ResponseEntity.ok(child.getId()) : ResponseEntity.badRequest().build();
    }

    @GetMapping(path = "/search-child")
    public ResponseEntity<Set<Family>> searchChild(
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "secondName", required = false) String secondName,
            @RequestParam(value = "pesel", required = false) String pesel,
            @RequestParam(value = "birthDate", required = false) String birthDateParam,
            @RequestParam(value = "sex", required = false) String sex) {
        Date birthDate;
        if (birthDateParam == null) {
            birthDate = null;
        } else {
            birthDate = Date.valueOf(birthDateParam);
        }
        Child child = new Child(firstName, secondName, pesel, birthDate, sex);
        Set<Child> children = persistenceService.findChildren(child);
        Set<Family> families = new HashSet<>();
        children.forEach(child1 -> families.add(child1.getFamily()));
        return ResponseEntity.ok(families);
    }

    @GetMapping(path = "/read-family/{familyId}")
    public ResponseEntity<Family> readFamily(@PathVariable Integer familyId) {
        return ResponseEntity.ok(persistenceService.getFamilyById(familyId));
    }

    @GetMapping(path = "/read-child/{childId}")
    public ResponseEntity<Child> readChild(@PathVariable Integer childId) {
        return ResponseEntity.ok(persistenceService.getChildById(childId));
    }

    @GetMapping(path = "/read-father/{fatherId}")
    public ResponseEntity<Father> readFather(@PathVariable Integer fatherId) {
        return ResponseEntity.ok(persistenceService.getFatherById(fatherId));
    }

}
