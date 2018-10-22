package com.paffeuu.family.persistence;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "children")
public class Child {
    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="BirthDate")
    private Date birthDate;

    @Column(name="FirstName")
    private String firstName;

    @Column(name="PESEL")
    private String pesel;

    @Column(name="SecondName")
    private String secondName;

    @Column(name="Sex")
    private String sex;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "FamilyId")
    private Family family;

    public Child() {}

    public Child(String firstName, String secondName, String pesel, Date birthDate, String sex) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.pesel = pesel;
        this.birthDate = birthDate;
        this.sex = sex;
    }

    public Family getFamily() {
        return family;
    }

    public void setFamily(Family family) {
        this.family = family;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }
}
