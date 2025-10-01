function init() {
    const game = document.getElementById("game");

    let cartas = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍"];

    // duplico los emojis
    cartas = [...cartas, ...cartas];

    // aleatorizar emojis
    cartas.sort(() => Math.random() - 0.5);

    let primeraCarta = null;
    let segundaCarta = null;
    let bloquear = false;

    let contador = 0;

    cartas.forEach(emoji => {
        const carta = document.createElement("div");
        carta.classList.add("carta");

        // guardar el emoji
        carta.dataset.simbolo = emoji;

        carta.addEventListener("click", () => {
            // si hay dos cartas volteadas, que no actue la carta
            if (bloquear) {
                return;
            }

            // hacer visible el emoji
            carta.textContent = emoji;

            // logica de volteo y bloqueo
            if (!primeraCarta) {
                primeraCarta = carta;
            } else {
                segundaCarta = carta;
                bloquear = true;
            }
            // hacer volteo (css)
            carta.classList.add("girada");

            // comprovar que haya dos cartas volteadas
            if (primeraCarta && segundaCarta) {
                // logica de emparejamiento
                if (primeraCarta.dataset.simbolo != segundaCarta.dataset.simbolo) {
                    setTimeout(() => {
                        primeraCarta.classList.remove("girada");
                        segundaCarta.classList.remove("girada");
                        primeraCarta.textContent = "";
                        segundaCarta.textContent = "";
                        primeraCarta = null;
                        segundaCarta = null;
                        bloquear = false;
                    }, 1000);
                } else {
                    // Si coinciden, desbloquear
                    primeraCarta = null;
                    segundaCarta = null;
                    bloquear = false;

                    contador++;
                    if (contador === cartas.length / 2) {
                        ganador();
                    }
                }
            }

        });
        game.appendChild(carta);
    });


}

function ganador() {
    document.body.style.backgroundColor = "green";
}

document.addEventListener("DOMContentLoaded", init);
