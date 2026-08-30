const textHladu = document.getElementById("hlad-text");
const tlacidloKrmit = document.getElementById("krmit-tlacidlo");
const zvieratko = document.getElementById("zvieratko");
const tlacidloRestart = document.getElementById("restart-tlacidlo");

let hlad = 100;
let casovac; // Premennú pre časovač si pripravíme na vrchu, aby sme ju vedeli zapínať a vypínať

// 2. Vytvoríme funkciu na spustenie hry (aby sme ju vedeli volať aj pri reštarte)
function spustHru() {
    hlad = 100;
    textHladu.innerText = "Hlad: 100%";
    textHladu.classList.remove("cerveny-text");
    zvieratko.innerText = "🐶";
    tlacidloKrmit.disabled = false;
    tlacidloRestart.classList.add("skryte"); // Znova skryjeme tlačidlo reštartu

    // Spustíme interval a uložíme ho do premennej casovac
    casovac = setInterval(function() {
        hlad = hlad - 5; 

        if (hlad < 30) {
            textHladu.classList.add("cerveny-text");
        }

        if (hlad <= 0) {
            hlad = 0;
            clearInterval(casovac); 
            textHladu.innerText = "Hlad: 0% (Hladný k smrti)";
            zvieratko.innerText = "👻";
            tlacidloKrmit.disabled = true; 
            
            // HUNTER ZOMREL: Ukážeme tlačidlo na reštart (odstránením triedy skryte)
            tlacidloRestart.classList.remove("skryte");
        } else {
            textHladu.innerText = "Hlad: " + hlad + "%";
            vytvorPlavajuciText("- 5 % hladu", "cerveny");
            aktualizujVzhladZvieratka();
        }
    }, 1000);
}

// 3. Spustíme akciu pre tlačidlo Nakŕmiť
tlacidloKrmit.addEventListener("click", function() {
    if (hlad < 100) {
        hlad = hlad + 15;

        if (hlad > 100) {
            hlad = 100;
        }
        textHladu.innerText = "Hlad: " + hlad + "%";

        vytvorPlavajuciText("+ 15 % hladu", "zeleny");

        if (hlad >= 30) {
            textHladu.classList.remove("cerveny-text");
        }

        aktualizujVzhladZvieratka();
    }
});

// 4. Pridáme akciu pre tlačidlo Reštart (po kliknutí spustí hru odznova)
tlacidloRestart.addEventListener("click", spustHru);

// Funkcia na zmenu emoji podľa hladu
function aktualizujVzhladZvieratka() {
    if (hlad < 30) {
        zvieratko.innerText = "😭"; 
    } else if (hlad < 50) {
        zvieratko.innerText = "🤤"; 
    } else if (hlad < 80) {
        zvieratko.innerText = "😐"; 
    } else {
        zvieratko.innerText = "🐶"; 
    }
}

// Funkcia na lietajúci text
function vytvorPlavajuciText(sprava, farba) {
    const novyElement = document.createElement("span"); 
    novyElement.innerText = sprava;

    novyElement.classList.add("plavajuci-text"); 
    novyElement.classList.add(farba);
    
    textHladu.appendChild(novyElement); 
    
    setTimeout(function() {
        novyElement.remove(); 
    }, 1000);
}

// 5. NAJDOLEŽITEJŠÍ RIADOK: Prvýkrát naštartujeme hru pri načítaní stránky
spustHru();
