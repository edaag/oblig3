package com.example.oblig3;

// Definerer klassen for person (kunde)
public class Person {
    // Definerer instansvariablene for informasjon om personen
    private String film;
    private int antall;
    private String fornavn;
    private String etternavn;
    private String telefonnr;
    private String epost;

    // Lager en konstruktør og initialsiere variablene

    public Person(String film, int antall, String fornavn,
                  String etternavn, String telefonnr, String epost){
        this.film= film;
        this.antall= antall;
        this.fornavn= fornavn;
        this.telefonnr= telefonnr;
        this.etternavn= etternavn;
        this.epost= epost;
    }

    //Definerer en standardkonstruktør uten parametere
    public Person(){}

    // Bruker get og set metoder for å sette inn verdier i
    // variablene og hente ut disse verdiene til objektene som dannes
    public String getFilm(){
        return film;
    }
    public void setFilm(String film){ this.film= film; }
    public int getAntall(){
        return antall;
    }
    public void setAntall(int antall){
        this.antall= antall;
    }
    public String getFornavn(){
        return fornavn;
    }
    public void setFornavn(String fornavn){
        this.fornavn= fornavn;
    }
    public String getEtternavn(){
        return etternavn;
    }
    public void setEtternavn(String etternavn){
        this.etternavn= etternavn;
    }
    public String getTelefonnr(){
        return telefonnr;
    }
    public void setTelefonnr(String telefonnr){
        this.telefonnr= telefonnr;
    }
    public String getEpost(){
        return epost;
    }
    public void setEpost(String epost){
        this.epost=epost;
    }
}
