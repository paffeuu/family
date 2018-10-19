package com.paffeuu.family.persistence;

import javax.persistence.*;

@Entity
@Table(name = "families")
public class Family {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne
    @JoinColumn(name = "FatherId")
    private Father father;

    @ManyToOne
    @JoinColumn(name ="ChildId")
    private Child child;

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

    public Child getChild() {
        return child;
    }

    public void setChild(Child child) {
        this.child = child;
    }
}
