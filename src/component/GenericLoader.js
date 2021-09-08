import { ParseStringToHTML } from "../util/ParseUtils";

export function GenericLoader(description) {
    return ParseStringToHTML(`
        <div id="function-generic-loader" class="custom-generic-loader">
            <div class="spinner-grow mb-2" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            ${description}
        </div>
    `);
}