const PRODUCTS_API =
    'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=6&sortBy=id&orderBy=DESC';

export async function getProducts() {
    const response = await fetch(PRODUCTS_API, {
        method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    const parsedResponse = await response.json();
    return parsedResponse.products as ProductInfo[];
}
