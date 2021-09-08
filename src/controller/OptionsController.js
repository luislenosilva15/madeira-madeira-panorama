import { arcCam, scene, sensorCam, canvas } from "../main";

// Modifica a tela para o modo tela cheia ou reduzida
export function SetScreenState() {
    let fullscreenButton = document.getElementById('function-fullscreen');
    let headerStyle = document.querySelector("header").style;
    let navStyle = document.querySelector(".custom-nav").style;
    
    if(fullscreenButton.innerHTML === "Expandir tela") {
        document.body.requestFullscreen();
        navStyle.display = 'none';
        headerStyle.display = 'none';
        fullscreenButton.innerHTML = "Reduzir tela";
    } else {
        document.exitFullscreen();
        navStyle.display = window.innerWidth <= 992 ? 'none' : 'block';
        headerStyle.display = 'block';
        fullscreenButton.innerHTML = "Expandir tela";
    }
}

// Define a câmera a ser utilizada na versão mobile, sensor ou clique e arraste
export function SetViewMode() {
    let setViewModeButtonText = document.getElementById("function-viewmode");

    if(scene.activeCamera.name === "arcCam") {
        scene.activeCamera = sensorCam;
        setViewModeButtonText.innerHTML = "Clique e arraste";
    } else {
        scene.activeCamera = arcCam;
        setViewModeButtonText.innerHTML = "Habilitar 360º";
    }
    scene.activeCamera.attachControl(canvas, true);
}