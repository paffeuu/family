package com.paffeuu.family.controller;

import com.paffeuu.family.persistence.Child;
import com.paffeuu.family.persistence.Family;
import com.paffeuu.family.persistence.Father;
import com.paffeuu.family.service.PersistenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

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
    public ResponseEntity<Set<Father>> searchChild(@RequestBody Child child) {
        Set<Child> children = persistenceService.findChildren(child);
        Set<Father> fathers = new HashSet<>();
        children.forEach(child1 -> fathers.add(persistenceService.getFatherByFamily(child1.getFamily())));
        return ResponseEntity.ok(fathers);
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
