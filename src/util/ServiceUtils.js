export async function GetRequest(route) {
    let request = await fetch(route, { method: 'GET' });
    let response = await request.json();
    
    return response;
}