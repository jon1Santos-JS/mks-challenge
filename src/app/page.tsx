import BagModal from '../components/Bag/BagModal';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import NavBar from '../components/NavBar';
import { BagProvider } from '../context/BagContext';
import { getProducts } from '@/lib/APIRequests';

export default async function Home() {
    const products = await getProducts();

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
