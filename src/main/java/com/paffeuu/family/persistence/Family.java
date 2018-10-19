package com.paffeuu.family.persistence;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "families")
public class Family {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne
    @JsonManagedReference
    @JoinColumn(name = "FatherId")
    private Father father;

    @OneToMany(mappedBy = "family")
    @JsonManagedReference
    @Column(name ="Children")
    private List<Child> children;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Father getFather() {
        return father;
    }

    public void setFather(Father father) {
        this.father = father;
    }

    public List<Child> getChildren() {
        return children;
    }

    public void setChildren(List<Child> children) {
        this.children = children;
    }

    public void addChild(Child child) {
        children.add(child);
    }
}
