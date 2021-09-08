import { ParseStringToHTML, ParseStringToMoney, ParseAvaliationToImg } from "../util/ParseUtils";
import { domain } from "../service/FurnitureServices";

export function FurnitureCard(variation, index) {
    return ParseStringToHTML(`
        <div id="function-variant-select" class="custom-furniture-card mr-2">
            <div class="d-flex flex-row custom-variant-card">
                <img class="custom-variant-image mr-2" src=${domain}/assets/${variation.image} />
                <div class="d-flex flex-column justify-content-center custom-variant-data">
                    <div class="custom-variant-description">${variation.description}</div>
                    ${index != 0 ?
                        `
                            <div class="d-flex flex-row align-items-center justify-content-between">
                                <div class="d-flex flex-column">
                                    <div class="d-flex flex-row mb-2">${ParseAvaliationToImg(variation.avaliation)}</div>
                                    <div class="d-flex flex-row">
                                        <span class="custom-variant-coin">R$</span>
                                        <span class="custom-variant-price">${ParseStringToMoney(variation.price)}</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center align-items-center px-3 mr-2">
                                    <img class="custom-variant-more" src="/img/more-info.png" data-toggle="modal" data-target="#function-more-info" />
                                </div>
                            </div>
                        ` : 'Experimente agora!'
                    }
                </div>
            </div>
        </div>
    `);
}