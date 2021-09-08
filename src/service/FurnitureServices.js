import { GetRequest } from "../util/ServiceUtils"

// export const domain = "https://panorama-api.herokuapp.com";
export const domain = "https://panorama-madeira.herokuapp.com";

export async function GetAllFurnitures() {
    let response = await GetRequest(domain + "/furniture/list/all");
    return response;
}

export async function GetFurnituresPerCategory(category) {
    let response = await GetRequest(domain + `/furniture/list?category=${category}`);
    return response;
}