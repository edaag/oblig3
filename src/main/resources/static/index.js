//En tom array billetter blir definert for å lagre billettobjekter.
let billetter= []

//Funksjonen lagreAlleBillett() blir definert. Den tar vare på dataene fra skjemaet og lagrer dem.
function lagreAlleBillett(){
    // variabel feil blir definert og brukt til å sjekke
    // om det oppstår feil i valideringen av skjemadataene.
    let feil= false;

    /*
    objekt billett blir definert med feltene film, antall, fornavn, etternavn,
    tlf og epost. Hvert felt hentes fra tilsvarende input-elementer i HTML-skjemaet.
     */
    let billett={
        film: document.getElementById("film").value,
        antall: document.getElementById("antall").value,
        fornavn: document.getElementById("fornavn").value,
        etternavn: document.getElementById("etternavn").value,
        tlf: document.getElementById("tlf").value,
        epost: document.getElementById("epost").value,
    }

    // Bruker for løkke til å iterere gjennom hvert felt i objektet billett.
    for (let i in billett){

        //sjekker om det aktuelle feltet er tomt.
        if(billett[i]===""){
            //Hvis feltet er tomt, blir det satt en feilmelding
            document.getElementById(i+"Error").innerHTML="Vennligst fyll ut"+i;

            //feil variabelen blir satt til true.
            feil= true;
        }
        //Hvis feltet ikke er tomt, blir det ikke skrevet ut en feilmelding
        else{
            document.getElementById(i+"Error").innerHTML="";
        }
    }

    //sjekkes om det ikke har oppstått noen feil i valideringen.
    if(!feil){

        //sjekker om antall billetter er mindre enn 1.
        if(billett.antall < 1){
            //hvis mindre enn 1: blir det satt en feilmelding i tilhørende HTML-element.
            document.getElementById("antallError").innerHTML="Velg minst en";
            feil= true;
        }

        //sjekker om telefonnummeret ikke er 8 tegn.
        if (billett.tlf.length !==8){
            //blir det satt en feilmelding
            document.getElementById("tlfError").innerHTML="Skriv inn 8 siffer";
            feil = true;
        }

        //sjekker om telefonnummeret inneholder bindestrek eller pluss-tegn
        if(billett.tlf.includes("-") || billett.tlf.includes("+")){
            //blir satt en feilmelding
            document.getElementById("tlfError").innerHTML="Skriv inn et gyldig nummer";
            feil = true;
        }
        //sjekker om e-postadressen mangler "@" eller "."
        if(!billett.epost.includes("@") || !billett.epost.includes(".")){
            //skriver ut feilmelding
            document.getElementById("epostError").innerHTML = "Skriv inn en gyldig epost";
            feil = true;
        }
    }
    //hvis det ikke har oppstått noen feil i valideringen, kjører koden under
    if(!feil){
        //billetten lagt til i arrayen billetter
        billetter.push(billett);

        //blir kalt for å tømme innholdsinputfeltene i skjemaet
        nullstillInput();

        //blir kalt for å oppdatere visningen av billettene i HTML
        visBilletter(billetter);

        //En HTTP POST-forespørsel blir sendt til "/lagreAlle" URL-en med billettopplysningene som data.
        $.post("/lagreAlle", billett, function (data){

            //skiver ut melding til konsollen om at dataene er lagret på serveren.
            console.log("Data er lagret pa server:", data);

            //henter alle lagrede billetter fra serveren
            hentAlleBilletter();
        });
    }

    //funksjonen nullstillInput blir definert for å tømme innholdet i inputfeltene i skjemaet

    function  nullstillInput(){
        //En array input blir definert med navnene på inputfeltene i skjemaet.
        const input = ["film", "antall", "fornavn", "etternavn", "tlf", "epost"]

        //En for-løkke blir brukt til å iterere gjennom alle inputfeltene.
        for (let i = 0; i < input.length; i++){
            //Verdien til hvert inputfelt blir satt til en tom streng
            document.getElementById(input[i]).value = "";
        }
    }
}
//Funksjon visBilletter() blir definert for å vise billettinformasjonen i HTML-tabellen.

function visBilletter(billetter){
    //variabelen utOverskrifter blir definert med HTML-kode for tabellens overskriftsrader.
    let utOverskrifter =
        '<tr>' +
            '<th>Film</th>'+
            '<th>Antall</th>'+
            '<th>Fornavn</th>'+
            '<th>Etternavn</th>'+
            '<th>Telefonnummer</th>'+
            '<th>E-post</th>'+
        '</tr>';
//En for løkke blir brukt til å iterere gjennom hver billett i arrayen billetter.
    for(let billett of billetter){
        /*
        For hver billett blir det lagt til en rad i tabellen med filmnavn,
        antall, fornavn, etternavn, telefonnummer og e-postadresse.
         */
        utOverskrifter +=
            "<tr>"+
            "<td>" + billett.film + "</td>" +
            "<td>" + billett.antall + "</td>"+
            "<td>" + billett.fornavn + "</td>"+
            "<td>" + billett.etternavn + "</td>"+
            "<td>" + billett.tlf + "</td>"+
            "<td>" + billett.epost + "</td>"+
            "</tr>"
    }
    /*
    HTML-koden for tabellen blir satt inn i elementet med ID-en
    "billetter" ved hjelp av jQuery.
     */
    $("#billetter").html(utOverskrifter);
}

//funksjonen hentAlleBilletter() blir definert for å hente alle billetter fra serveren.
function hentAlleBilletter(){
    //En HTTP GET-forespørsel blir sendt til "/hentAlleBilletter" URL-en for å hente dataene fra serveren.
    $.get("/hentAlleBilletter", function (data){

        //Dataene som er mottatt fra serveren, blir logget til konsollen.
        console.log("data mottatt fra server:", data);

        //Funksjonen visBilletter() blir kalt for å vise billettene som er hentet fra serveren.
        visBilletter(data);
    })
}

//funksjon slettAlleBilletter() blir definert for å slette alle billetter fra både klient- og server-siden.
function slettAlleBilletter(){

    /*
    En HTTP GET-forespørsel blir sendt til "/slettAlle"
    URL-en for å slette alle billetter fra serveren.
     */
    $.get("/slettAlleBilletter", function (){

        //En melding blir skrevet til konsollen for å indikere at alle data er slettet fra serveren.
        console.log("Alt data har blitt slettet fra server.");
        hentAlleBilletter();
        //hentAlleBilletter() blir kalt for å se at alle billetter er slettet fra serveren.
    });
    //Lengden på arrayen billetter blir satt til 0, noe som tømmer arrayen lokalt på klienten.
    billetter.length= 0;

    /*
    Innholdet i elementet med ID-en "billetter" blir satt til en tom streng
    ved hjelp av jQuery. Dette fjerner all billettinformasjonen fra visningen på klienten.
     */
    $("#billetter").html("");
}
