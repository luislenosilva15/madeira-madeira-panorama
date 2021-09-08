// Formata texto com HTML para HTMLElement
export function ParseStringToHTML(stringElement) {
    let parser = new DOMParser();
    let HTMLElement = parser.parseFromString(stringElement, 'text/html');

    return HTMLElement.body.childNodes[0];
}

// Formata texto numérico para moeda BRL
export function ParseStringToMoney(stringMoney) {
    return (stringMoney).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace("R$", "");
}

// Formata uma avaliação int para lista de estrelas preenchidas ou vazias
export function ParseAvaliationToImg(intAvaliation) {
    let stars = "";

    for(let index=0; index<intAvaliation; index++) stars += `<img class="custom-variant-avaliation mr-1" src="/img/avaliation-positive.png" />`
    if(intAvaliation < 5) {
        do {
            stars += `<img class="custom-variant-avaliation mr-1" src="/img/avaliation-negative.png" />`;
            intAvaliation +=1;
        } while (intAvaliation<5);       
    }
    return stars;
}

export function ParseInCapitalize(strContent) {
    return strContent.charAt(0).toUpperCase() + strContent.slice(1);
}