const container = document.querySelector(".container");
const sedista = document.querySelectorAll(".red .sediste:not(.zauzeto)");
const broj = document.getElementById("broj");
const ukupnaCena = document.getElementById("ukupnaCena");

const izborFilma = document.getElementById("izborFilma");

populateUI();   //Prizivam funkciju kojom vadim stvari iz local storage. Poslednju sam nju radio, ali je prizivam na pocetku, da bi se odmah ucitala pri ucitavanju strane.

let cenaKarte = +izborFilma.value;         //Biram value, zato sto sam u html naveo value za svaku opciju. Plus ispred sam stavio zato
                                           //sto tako pretvaram string u broj. Pre toga je value bio string.


//Funkcija za cuvanje podataka o filmi
function sacuvajPodatkeOFilmu(indeksFilma, cenaFilma){
    localStorage.setItem("izabraniFilm", indeksFilma);
    localStorage.setItem("cenaFilma", cenaFilma);
}

//Funkcija za azuriranje koliko smo sedista izabrali.
function azurirajBrojIzabranihSedista(){
    const izabranaSedista = document.querySelectorAll(".red .sediste.izabrano");

    // Ove linije koda radim posle svih ovih drugih (Zakljucno sa linijom koda 33. Prvo sam napravio sve, pa sam onda napravio za local storage.
    // Prvo kopiram izabrana sedista u niz. Onda prolazim kroz taj niz pomocu map metoda. Nakon toga vracam novi niz (od indeksa) koji sam dobio.

    // Pravim niz od izabranih sedista, zato sto zelim da odredim njihov indeks. A njihov indeks odredjujem tako sto cu da ga odredim u odnosu na sva sedista.
    const indexSedista = [...izabranaSedista].map(function(sediste){
        return [...sedista].indexOf(sediste);
    })

    localStorage.setItem("izabranoSediste", JSON.stringify(indexSedista)); //Moram pomocu stringify da ga pretvorim u string (indexSedista je niz), zato sto localStorage prima string samo.

    const brojIzabranihSedista = izabranaSedista.length;
    broj.innerText = brojIzabranihSedista;
    ukupnaCena.innerText = brojIzabranihSedista*cenaKarte;
};

//Funkcija za prizivanje podataka iz local storage.
function populateUI(){
    const izabranaSedista = JSON.parse(localStorage.getItem("izabranoSediste"));     //parse koristim zato sto sam u liniji 35 koristio stringify.

    if (izabranaSedista !== null && izabranaSedista.length > 0) {
        sedista.forEach(function(sediste, index) {
            if (izabranaSedista.indexOf(index) > -1){
                sediste.classList.add("izabrano");
            }
        })
    }

    const indeksIzabranogFilma = localStorage.getItem("izabraniFilm");

    if (indeksIzabranogFilma !== null) {
        izborFilma.selectedIndex = indeksIzabranogFilma;
    }

}

//Event za izbor sedista.
container.addEventListener("click", (e) => {            //Umesto function(e)(){}, napisao sam kao arrow funkciju. Isto je znacenje.
    if(e.target.classList.contains("sediste") && !e.target.classList.contains("zauzeto")){
        e.target.classList.toggle("izabrano");          //Toggle se koristi da dodam ili uklanjam naziv klasi klikom.//

        azurirajBrojIzabranihSedista();
    }
});

//Event za izbor filma.
izborFilma.addEventListener("change", (e) => {
    cenaKarte = +e.target.value;                        //Azuriram ukupnu cenu karata ako promenim film.//

    sacuvajPodatkeOFilmu(e.target.selectIndex, e.target.value);

    azurirajBrojIzabranihSedista();
})


//Ovo je funkcija koju sam koristio kod azuriranja sedista, prizivana je u listeneru, a na kraju sam je stavio da bude prizvana i cim bude osvezena
//stranica, kako bi se azurirao broj izabranih sedista i u tom slucaju. Da izvuce iz storage.
azurirajBrojIzabranihSedista();
