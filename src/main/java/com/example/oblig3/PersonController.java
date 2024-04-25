package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired; // Importerer Autowired-annotasjonen
import org.springframework.web.bind.annotation.GetMapping;     // Importerer GetMapping-annotasjonen
import org.springframework.web.bind.annotation.PostMapping;   // Importerer PostMapping-annotasjonen
import org.springframework.web.bind.annotation.RestController;// Importerer RestController-annotasjonen

// Importerer List-klassen
import java.util.List;

//Markerer denne klassen som en kontrollerklasse i Spring Framework.
@RestController

public class PersonController {
    //Injiserer en instans av PersonRepository-klassen ved hjelp av Autowired-annotasjonen.
    @Autowired
    private PersonRepository rep;


    // HTTP POST-endepunkt for å lagre en person.
    @PostMapping("/lagreAlle")

    // Lagrer kunden ved å kalle lagreAlleKunder-metoden i PersonRepository.
    public void lagreAlle(Person innPerson){rep.lagreAllePersoner(innPerson);
    }


    // HTTP GET-endepunkt for å hente alle personer.
    @GetMapping("/hentAlle")

    // Henter alle personer ved å kalle hentAlle-metoden i PersonRepository.
    public List<Person>hentAlle(){return rep.hentAllePersoner();}



    // HTTP GET-endepunkt for å slette alle personer.
    @GetMapping("/slettAlle")

    // Sletter alle personer ved å kalle slettAlle-metoden i PersonRepository.
    public void slettAlle(){rep.slettAllePersoner();}


}
