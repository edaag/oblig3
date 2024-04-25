package com.example.oblig3;

// importerer nødvendige spring framework
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

//Definerer repository klassen for å kunne håndtere dataoperasjoner mot databasen
@Repository

public class PersonRepository {

    //injiserer en JdbcTemplate-objekt inn i dette feltet
    //Dette er objektet som kommuniserer med databasen
    @Autowired
    private JdbcTemplate db;


    // Metode for å lagre en personer i databasen
    public void lagreAllePersoner(Person innPerson){
        // SQL-spørringen for å sette inn data i Kunde-tabellen
        String sql="INSERT INTO Person(film, antall, fornavn, etternavn, tlf, epost) VALUES(?,?,?,?,?,?)";

        // Oppdaterer databasen ved å bruke JDBC-template og setter inn de gitte verdiene
        db.update(sql, innPerson.getFilm(), innPerson.getAntall(), innPerson.getFornavn(),
                innPerson.getEtternavn(), innPerson.getTelefonnr(), innPerson.getEpost());
    }


    // Metode for å hente alle personer fra databasen
    public List<Person> hentAllePersoner(){
        // SQL-spørring for å velge alle personer fra Person-tabellen, sortert etter etternavn
        String sql= "SELECT * FROM Person ORDER BY etternavn";

        // Utfører spørringen og mapper resultatene til en liste
        // av person-objekter ved hjelp av BeanPropertyRowMapper
        List<Person> allePersoner = db.query(sql, new BeanPropertyRowMapper(Person.class));

        // Returnerer listen med personer
        return allePersoner;
    }



    // Metode for å slette alle personer fra databasen

    public void slettAllePersoner(){
        // SQL-spørring for å slette alle rader fra Person-tabellen
        String sql = "DELETE FROM Person";

        // Utfører spørringen for å slette alle personer fra databasen
        db.update(sql);
    }


}
