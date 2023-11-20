'use client';

import { getPosts } from '@/app/page';
import { useQuery } from '@tanstack/react-query';
import Product from './Product';

type Products = {
    products: ProductInfo[];
};

export default function ProductList(props: Products) {
    const { data } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        initialData: props.products,
    });
    return (
        <div className="c-product-list">
            <section className="c-grid">
                {data.map((product) => (
                    <Product key={product.id} productInfo={product} />
                ))}
            </section>
        </div>
    );
}
