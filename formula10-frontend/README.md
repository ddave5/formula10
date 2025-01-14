1. Bevezetés
Az alkalmazás célja, hogy Forma-1 rajongók számára lehetőséget nyújtson tippelési játékban való részvételre, ahol a felhasználók előre megpróbálják kitalálni, hogy ki lesz a következő futam 10. helyezettje. Az alkalmazásban minden felhasználó csoportokat hozhat létre, másokat felvehet, és együtt versenyezhetnek egyéni pontszámok alapján. Minden Forma-1 futamhoz lehetőségük van tippet leadni, és az eredményeket összehasonlíthatják a hivatalos Forma-1-es versenyeredményekkel. A játék végén egy végső eredménytábla alakul ki.

Az alkalmazás fő funkciói közé tartozik a tippelés, a pontszámok kiszámítása, a csoportok kezelése, valamint értesítések küldése. Az alkalmazás mobilra optimalizált, így felhasználóbarát élményt nyújt minden eszközön.

2. Felhasználói szerepek és jogok
Az alkalmazás két fő felhasználói szerepkört különböztet meg:

2.1. Regisztrált játékos
Jogok:
Saját profil módosítása (email cím és jelszó).
Tippelés a futamokra a szabályoknak megfelelően.
Saját tippjeinek megtekintése és korlátozott időn belül módosítása (időmérő előtti 30 percig).
Csoportokhoz való csatlakozás meghívás alapján (maximum 10 fős csoport).
Az időmérő után a csoport többi tagjának tippjeinek megtekintése.
Futamok utáni pontszámok és eredmények megtekintése.
Értesítések fogadása (pl. tippemlékeztető, regisztrációs megerősítés).
2.2. Csoport adminisztrátor (létrehozó)
Jogok:
A fent felsorolt regisztrált játékos jogok.
Új csoport létrehozása és annak adminisztrálása (maximum 1 aktív csoport).
Felhasználók hozzáadása és eltávolítása a saját csoportjába.
A csoport állapotának kezelése (pl. lezárás az idény végén, archiválás).
3. Fő funkciók
A fő funkciók részletesen meghatározzák, hogyan működik az alkalmazás, és milyen lehetőségeket biztosít a felhasználók számára.

3.1. Főoldal
A főoldalon jelennek meg az aktuális Forma-1 hírek, amelyeket egy API-ról kérünk le (pl. sport hírek API).
Az oldal tetején egy visszaszámláló is látható, amely mutatja, hogy mennyi idő van hátra a következő futam tippleadásának lezárásáig.
A felhasználók beléphetnek a saját profiljukba, ahol láthatják az aktuális csoportjaik állapotát és a leadott tippjeiket.
Funkciók:
Hírek megjelenítése: egy hírek szekció az API-ról lekért legfrissebb Forma-1 cikkekkel. A hírek kattinthatók, és egy külső linkre viszik a felhasználót.
Visszaszámláló megjelenítése a következő tippleadás határidejéig.
Navigáció a fiókoldalra, csoportokhoz és tippelési funkciókhoz.
3.2. Regisztráció / Bejelentkezés
A felhasználók e-mail cím és jelszó segítségével regisztrálhatnak, illetve bejelentkezhetnek.
Regisztrációkor e-mail verifikációt küldünk a felhasználónak, amely megerősítést igényel.
Bejelentkezés után a felhasználó hozzáfér a csoportjaihoz, leadhatja a tippjeit, és módosíthatja a profilját.
Funkciók:
Regisztrációs űrlap, e-mail verifikációs folyamat.
Bejelentkezési űrlap.
Jelszó visszaállítása e-mail alapú módosító linkkel.
3.3. Csoportkezelés
A felhasználók létrehozhatnak csoportokat, amelyeket adminisztrálhatnak, illetve csatlakozhatnak más csoportokhoz.
A csoport maximum 10 főből állhat, és csak a csoport adminisztrátorának van joga új tagokat hozzáadni vagy eltávolítani.
Funkciók:
Csoport létrehozása: egyedi név megadása, meghívás e-mail címmel vagy felhasználónévvel.
Csoport adminisztráció: tagok hozzáadása és eltávolítása.
Csoport archiválása a szezon végén (az eredmények továbbra is megtekinthetők).
3.4. Tippelés
A játékosok minden futam előtt leadhatják a tippjüket, hogy ki lesz a 10. helyezett.
A tippek csak az időmérő előtt 30 perccel adhatók le, utána automatikusan lezárul a tippelési lehetőség.
Ha egy játékos nem ad le tippet, akkor automatikusan az előző futam 10. helyezettjét kapja meg.
Funkciók:
Tippelési felület, ahol a versenyző nevét kiválaszthatják az API alapján.
Tipp státusza (pl. már leadott, várakozik a kiértékelésre).
Automatikus tipp beállítása, ha valaki nem ad le tippet.
Tipp módosítása az időmérő előtt 30 perccel.
3.5. Pontszámítás és eredmény megjelenítés
Minden futam után a rendszer automatikusan kiértékeli a tippjeiket, és a hivatalos Forma-1-es eredmények alapján kiosztja a pontokat.
A csoporton belül két táblázat jelenik meg:
Az első táblázatban a játékosok nevei szerepelnek oszlopokban, a futamok pedig időrendi sorrendben sorokban, ahol az egyes futamokra kapott pontszám látható. A legalsó sor az összesített pontszámot mutatja.
A második táblázat egyszerű pontösszesítést tartalmaz, ahol a játékos neve mellett a jelenlegi összpontszáma látható.
Funkciók:
Automatikus pontszámítás a hivatalos eredmények alapján.
Tabellák megjelenítése a csoporton belül.
3.6. Email értesítések
A felhasználók különböző eseményekről értesítést kapnak e-mailben, mint például:
Sikeres regisztráció: A felhasználó megerősítést kap a regisztrációról.
Tippelési emlékeztető: Az időmérő előtt 1 nappal egy emlékeztetőt küldünk, hogy a felhasználó adjon le tippet, ha még nem tette meg.
Egyéb értesítések: pl. csoporthoz való csatlakozás vagy módosítás esetén.
Funkciók:
Email szolgáltatás integrálása a regisztrációhoz és emlékeztetőkhöz.