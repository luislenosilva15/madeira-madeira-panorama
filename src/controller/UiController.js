import { scene } from "../main";
import { SpawnNode, UpdateDeleteEvent } from "./MeshController";

import { FurnitureCard } from "../component/FurnitureCard";
import { CategoryButton } from "../component/CategoryButton";
import { OptionsModal } from "../component/OptionsModal";
import { SetScreenState, SetViewMode } from "./OptionsController";
import { TranslateToTarget } from "./CameraController";
import { CheckIfMobile } from "../util/DeviceUtils";

import { domain } from "../service/FurnitureServices";
import { ParseInCapitalize, ParseStringToHTML, ParseStringToMoney } from "../util/ParseUtils";

// Habilita opções para manipular estado do modal e botão de acesso
function EnableModalOptions() {
    let modalButton = document.getElementById("function-modal-access");
    let closeModalButton = document.getElementById("function-modal-close");
    let modal = document.getElementById("function-modal-state");

    modalButton.addEventListener('click', () => modalButton.style.display = 'none');
    closeModalButton.addEventListener('click', () =>  modalButton.style.display = 'block');
    modal.addEventListener('click', () =>  modalButton.style.display = 'block');
}

// Cria as opções de tela maximizada/minimizada e outras
function CreateExtraOptions() {
    let fullScreenButton = document.getElementById("function-fullscreen");
    let viewmodeButton = document.getElementById("function-viewmode");
    let bottomStateButton = document.getElementById("function-bottombar-state");

    if(CheckIfMobile()) {
        let checkSupport = false;
        window.addEventListener('devicemotion', function (event) {
            if(!checkSupport) {
                if(event.acceleration.x != null) {
                    viewmodeButton.addEventListener('click', () => SetViewMode());
                } else {
                    viewmodeButton.style.cursor = "default";
                    viewmodeButton.style.color = "var(--color-xlowgray)";
                    viewmodeButton.innerHTML += "<br>(indisponível)";
                }
                checkSupport = true;
            }
        });
    } else {
        viewmodeButton.style.cursor = "default";
        viewmodeButton.style.color = "var(--color-xlowgray)";
        viewmodeButton.innerHTML += "<br>(mobile)";
    }

    fullScreenButton.addEventListener('click', () => SetScreenState());
    bottomStateButton.addEventListener('click', () => SetBottomBarState());
}

// Cria botões de todas opções de acordo com os nomes das categorias listadas
function CreateFurnitureNav(navbar, data) {
    data.forEach(category => {
        navbar.children[0].appendChild(CategoryButton(category));
    });
    EnableCardgroupWhell();
}

// Adiciona o comportamento de estilização e captura do índice da opção de categoria selecionada
function AddFurnitureNavBehaviour(categoriesList, data) {
    let categoryIndex = 0;
    
    categoriesList.forEach(categoryOption => {
        const index = categoryIndex;

        categoryOption.addEventListener('click', () => SelectFurnitureOption(categoriesList, index, data));
        categoryIndex++;
    });
}

// Modifica o estilo da opção da categoria selecionada
function SelectFurnitureOption(categoriesList, index, data) {
    const target = { alpha: data[index].alpha, beta: data[index].beta };

    // localStorage.removeItem('selectedFurniture');
    let sceneNodes = scene.getNodes();
    let hasFurniture = false;
    for(let position=0; position<sceneNodes.length; position++) {
        if(sceneNodes[position].name == data[index].name) {
            hasFurniture = true;
            break;
        }
    }
    if(hasFurniture == false) localStorage.removeItem('selectedFurniture');

    let selectedBefore = localStorage.getItem('selectedCategory');
    if(!selectedBefore || selectedBefore != index || (selectedBefore == null && index == 0)) {
        TranslateToTarget(scene.activeCamera, target);
        CreateFurnitureOption(index, data);
        UpdateDeleteEvent(index, data);
        localStorage.setItem('selectedCategory', index);
    }

    for(let checkedIndex=0; checkedIndex<categoriesList.length; checkedIndex++) {
        let option = categoriesList[checkedIndex];

        if(checkedIndex == index) {
            option.style.backgroundColor = "var(--color-orange)";
            option.children[0].src = `./img/${data[checkedIndex].name}-selected.png`;
            option.children[1].style.color = "var(--color-white)";
        } else {
            option.style.backgroundColor = "var(--color-white)";
            option.children[0].src = `./img/${data[checkedIndex].name}-unselected.png`;
            option.children[1].style.color = "var(--color-blue)";
        }
    }
}

// Cria os cards de cada variação da categoria selecionada
function CreateFurnitureOption(index, data) {
    let optionsLabel = document.getElementById('function-furniture-options');

    while (optionsLabel.firstChild) optionsLabel.removeChild(optionsLabel.firstChild);
    let loaderText = index != 0 ? "Aguarde, estamos disponibilizando os móveis..." : "Aguarde, estamos acessando os ambientes disponíveis...";
    optionsLabel.appendChild(ParseStringToHTML(`<p id="function-furniture-loader" style="position: absolute; bottom: 20px; margin: 0; left: 50%; transform: translateX(-50%);">${loaderText}<p>`));
    
    let selectedFurnitureAux = 0;
    data[index].items.forEach(variation => {
        let cardOption = FurnitureCard(variation, index);
        let variationImageLink = `${domain}/assets/${variation.fileUrl}`;
        cardOption.style.opacity = '0';
        
        const selectedFurniture = selectedFurnitureAux;
        cardOption.addEventListener('click', async () => {
            let selectedBefore = localStorage.getItem('selectedFurniture');
            
            if(selectedBefore == null || parseInt(selectedBefore) != selectedFurniture) {
                let furnitureLoader = document.getElementById("function-generic-loader");
                if(furnitureLoader != null && furnitureLoader != undefined) furnitureLoader.remove();
                
                let removeButton = document.getElementById("function-clear-furniture");
                removeButton.click();
                
                SpawnNode(true, data[index].name, scene.getMeshByName("domeMaster").parent, null, null);
                SpawnNode(
                    false, 
                    scene.getTransformNodeByName(data[index].name), 
                    data[index].name,
                    variationImageLink,
                    data[index].renderIndex
                );
    
                UpdateDeleteEvent(index, data);
                localStorage.setItem('selectedFurniture', selectedFurniture);

                if(variation.avaliation) {
                    let furnitureTitle = document.getElementById("function-furniture-title");
                    let furnitureCost = document.getElementById("function-furniture-cost");
    
                    let furnitureHeight = document.getElementById("function-furniture-height");
                    let furnitureWidth = document.getElementById("function-furniture-width");
                    let furnitureDepth = document.getElementById("function-furniture-depth");
    
                    let furnitureStyle = document.getElementById("function-furniture-style");
                    let furnitureWarranty = document.getElementById("function-furniture-warranty");
                    let furnitureWeight = document.getElementById("function-furniture-weight");
                    let furnitureMountingSystem = document.getElementById("function-furniture-mountingsystem");
                    let furnitureLineOrCollection = document.getElementById("function-furniture-lineorcollection");
    
                    furnitureTitle.innerHTML = variation.description;
                    furnitureCost.innerHTML = ParseStringToMoney(variation.price);
    
                    furnitureHeight.innerHTML = variation.dimensions[0].height + " cm";
                    furnitureWidth.innerHTML = variation.dimensions[0].width + " cm";
                    furnitureDepth.innerHTML = variation.dimensions[0].depth + " cm";
    
                    furnitureStyle.innerHTML = ParseInCapitalize(variation.characteristics[0].style);
                    furnitureWarranty.innerHTML = variation.characteristics[0].Warranty;
                    furnitureWeight.innerHTML = variation.characteristics[0].Weight + "kg";
                    furnitureMountingSystem.innerHTML = ParseInCapitalize(variation.characteristics[0]['mounting system']);
                    furnitureLineOrCollection.innerHTML = ParseInCapitalize(variation.characteristics[0]['line or collection']);
                }
            }
        });
        selectedFurnitureAux++;
        optionsLabel.appendChild(cardOption);
    });

    let cardOptions = document.querySelectorAll(".custom-furniture-card");
    Array.from(cardOptions).forEach((card) => {
        let cardImage = card.children[0].children[0];
        let imageLoaderVerification = setInterval(async () => {
            let imageIsLoaded = await cardImage.complete && cardImage.naturalHeight !== 0;
            if(imageIsLoaded) {
                card.style.opacity = '1';
                let furnitureLoader = document.getElementById("function-furniture-loader");
                if(furnitureLoader) furnitureLoader.remove();
            }
            
            let lastCardImage = cardOptions[Array.from(cardOptions).length-1].children[0].children[0];
            // if(lastCardImage.complete && lastCardImage.naturalHeight !== 0) clearInterval(imageLoaderVerification);
        }, 100);
    });
}

// Minimiza ou maximiza o menu inferior completo
function SetBottomBarState() {
    let furnitureLabelOptions = document.getElementById("function-collapse");
    let stateBottombarIcon = document.getElementById("function-bottom-icon");
    let removeButton = document.getElementById("function-clear-furniture");

    if(furnitureLabelOptions.classList.contains("show")) {
        stateBottombarIcon.style.transform = 'rotate(180deg)';
        removeButton.style.bottom = "4.4em";
    } else {
        stateBottombarIcon.style.transform = 'rotate(0deg)';
        removeButton.style.bottom = window.innerWidth >= 693 && window.innerWidth <= 1064 ? "13.9em" : "11em";
    }
}

// Habilita scroll por mouse no menu de moveis
function EnableCardgroupWhell() {
    let furnitureOptions = document.getElementById("function-furniture-options");
    window.addEventListener("wheel", function (e) {
        if (e.deltaY > 0) furnitureOptions.scrollLeft += 75;
        else furnitureOptions.scrollLeft -= 75;
    });
}

// Cria o menu de navegação e inserção de móveis
export function CreateUI(data) {
    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("selectedFurniture");

    let navbar = document.getElementById("function-furniture-nav");
    document.getElementById("function-options-modal").appendChild(OptionsModal());

    CreateFurnitureNav(navbar, data);

    let categoriesElements = navbar.children[0].children;
    let categoriesList = Array.from(categoriesElements);

    AddFurnitureNavBehaviour(categoriesList, data);
    SelectFurnitureOption(categoriesList, 0, data);

    CreateExtraOptions();
    EnableModalOptions();
}