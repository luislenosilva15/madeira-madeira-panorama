import { ParseStringToHTML } from "../util/ParseUtils";

export function CategoryButton(category) {
    return ParseStringToHTML(`
        <li class="custom-furniture-item">
            <img class="custom-furniture-item-icon" src="./img/${category.name}-unselected.png" alt="Adicionar ${category.name}">
            <strong class="custom-furniture-item-text text-capitalize">${category.name}</strong>
        </li>
    `);
}