import BagModal from './components/BagModal';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import NavBar from './components/NavBar';
import { BagProvider } from './context/BagContext';

const PRODUCTS_API =
    'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=6&sortBy=id&orderBy=DESC';

export default async function Home() {
    const products = await getPosts();

    return (
        <main className="o-page">
            <BagProvider>
                <NavBar />
                <ProductList products={products} />
                <BagModal />
            </BagProvider>
            <Footer />
        </main>
    );
}

export async function getPosts() {
    const response = await fetch(PRODUCTS_API, {
        method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    const parsedResponse = await response.json();
    return parsedResponse.products as ProductInfo[];
}
