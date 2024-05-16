//import { emberekLISTA } from "./adat.js";
import { deleteAdat, getAdat } from "./aszinkron.js";
import { sorTorles, szuresNevSzerint, tablazatRendez } from "./adatKezelo.js";
import { megjelenites, tablazatOsszeallit } from "./fuggvenyek.js";
import { adatokListaba } from "./urlapKezelo.js";
/*  jelenítsük meg az adatainkat egy táblázatban az adatok div-ben
az urlap div-ben legyen egy űrlap, amivel ilyen adatokat tudunk a táblázatba beletenni

1. ha a táblázat név fejlécére kattintunk, akkor azon mező szerint 
tudjuk rendezni a táblázatot. 
2. tudjuk törölni a táblázat adott sorát
3. legyen egy szűrőmező, ahova beírva szavakat, tudunk szűrni, név szerint. 

Milyen függvények kellenek? 

1. tablazatOsszeallit(lista)->txt - összeállítja a html kódot szöveges formátumban, minden sor végén legyen egy kuka!
2. megjelenites(txt)->nincs - megjelníti egy html szoveget egy html elemben
3. tablazatbaTesz(lista) - összeszedi az űrlapadatokat, és hozzáfűzi a listához, majd megjeleníti újra a táblázatot. - akkor hívódik meg, ha a Submit gombra kattintunk
4. tablazatRendez(lista) - adott mező szerint rendezi a táblázatot. - akkor hívódik meg, ha a táblázat név fejlécmezőjére kattintunk. Berendezzük a listát, és megjelenítjük újra a táblázatot. 
5. sorTorles(lista, index) - minden sor végén legyen egy kuka, a sor indexével, erre a kukára kattintva töröljük az adott sort a listából, és újra megjelenítjük a táblázatot a módosult listával.  
6. szuresNevSzerint(lista, szurtSzoveg) -> szurtLista - a szűrőbe írt szó alaján kilistázza azokat az adatokat a listából, amelyekben szerepel a név mezőjében az adott szó. 
Ezután megjelenítjük a szűrt listát az oldalon. 
Akkor fog lefutni, amikor megváltozik a szűrőmező tartalma 
 
 */
getAdat("http://localhost:3000/emberekLISTA",init)
let nevIrany = 1;
//init(emberekLISTA);
nevSzuresEsemeny();


export function init(lista) {
  let txt = tablazatOsszeallit(lista);
  megjelenites(txt);
  nevRendezEsemeny(lista);
  adatokListaba(lista)
  sorTorlesEsemeny()
}

function nevRendezEsemeny(lista) {
  /* ha a táblázat név fejlécmezőjére kattintunk, akkor berendezzük a listát, és megjelenítjük újra a táblázatot */
  const nevELEM = $(".adatok th").eq(0); /* első fejléc th elem */
  nevELEM.on("click", function () {
    const LISTA = tablazatRendez(lista, nevIrany);

    nevIrany *= -1;
    init(LISTA);
  });
}

function nevSzuresEsemeny() {
  /* a szűrőbe írt szó alaján kilistázza azokat az adatokat a listából, amelyekben szerepel a név mezőjében az adott szó. 
Ezután megjelenítjük a szűrt listát az oldalon. 
Akkor fog lefutni, amikor megváltozik a szűrőmező tartalma  */
  const szuroELEM = $("#szNev");
  szuroELEM.on("keyup", function () {
    let szuroSZoveg = szuroELEM.val();
    const LISTA = szuresNevSzerint(emberekLISTA, szuroSZoveg);
    init(LISTA);
  });
}
/* szorgalmi: szűrés más mezők alaőpján is működjön  */

function sorTorlesEsemeny() {
  /* minden sor végén legyen egy kuka, a sor indexével, erre a kukára kattintva töröljük az adott sort a listából, és újra megjelenítjük a táblázatot a módosult listával.   */
  const kukaELEM = $(".kuka");
  kukaELEM.on("click", function (event) {
    let id = event.target.id; /*  az aktuális kuka indexe */
    deleteAdat("http://localhost:3000/emberekLISTA",id)
    init(LISTA);
  });
}
/*  szorgalmi: Mi a hiba a programban?  */
