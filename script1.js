document.addEventListener("DOMContentLoaded", async function() {
    // Crear el contenedor si no existe
    let appDiv = document.getElementById("app");
    if (!appDiv) {
        appDiv = document.createElement("div");
        appDiv.id = "app";
        document.body.prepend(appDiv);
    }

    // Aplicar estilos al contenedor
    Object.assign(appDiv.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "-1", //Para que no cubra otros elementos
        pointerEvents: "none", //Evita interferencias con clicks 
    });

    try {
        //Importar la libreria de threejs-toys dinamicamente
        const module = await import("https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js");

        if (module.butterfliesBackground) {
            module.butterfliesBackground({
                el: appDiv,
                eventsEl: null,
                gpgpuSize: 18,
                background: 0xffdde1,
                material: "phong",
                lights: [
                    { type: "ambient", params: [0xffffff, 0.5] },
                    { type: "directional", params: [0xffffff, 1], props: { position: [10, 0, 0] } }
                ],
                materialParams: { transparent: true, alphaTest: 0.5 }, 
                texture: "https://assets.codepen.io/33787/butterflies.png",
                textureCount: 4,
                wingsScale: [2, 2, 2],
                wingsWidthSegments: 16,
                wingsHeightSegments: 16,
                wingsSpeed: 0.75,
                wingsDisplacementScale: 1.25,
                noiseCoordScale: 0.01,
                noiseTimeCoef: 0.0005,
                noiseIntensity: 0.0025,
                attractionRadius1: 100,
                attractionRadius2: 150,
                maxVelocity: 0.1
            });
        } else {
            console.error("Error: butterfliesBackground no está disponible.");
        }
    } catch (error) {
        console.error("Error al cargar la libreria de threejs-toys:", error);
    }

    //Ventana modal
    let modal = document.getElementById("mensajeEspecial");
    let btn = document.getElementById("mensajeBtn");
    let cerrar = document.querySelector(".cerrar");

    if (!modal || !btn || !cerrar) {
        console.error("Error: Uno o mas elementos del modal no fueron encontrados.");
        return;
    }

    btn.addEventListener("click", function () {
        console.log("Botón de mensaje especial clickeado.");
        modal.style.display = "flex";
        setTimeout(() => modal.style.opacity = "1", 10);
    });

    cerrar.addEventListener("click", function () {
        console.log("Cerrando modal.");
        modal.style.opacity = "0";
        setTimeout(() => modal.style.display = "none", 500);
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            console.log("Clic fuera del modal, cerrando.");
            modal.style.opacity = "0";
            setTimeout(() => modal.style.display = "none", 500);
        }
    });

    let musica = document.getElementById("backgroundMusic");
    let playBtn = document.getElementById("playBtn");
    let stopBtn = document.getElementById("stopBtn");

    // Configuracion inicial del volumen
    musica.volume = 0.5; // mantiene un volumen moderado por defecto

    // Evento para reproducir musica
    playBtn.addEventListener("click", function () {
        musica.play().catch(error => console.error("Error al reproducir musica:", error));
    });

    // Evento para detener musica
    stopBtn.addEventListener("click", function () {
        musica.pause();
    });
});
