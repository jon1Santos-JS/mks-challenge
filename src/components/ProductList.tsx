'use client';

import { useQuery } from '@tanstack/react-query';
import Product from './Product';
import Link from 'next/link';
import { getProducts } from '@/lib/APIRequests';

type Products = {
    products: ProductInfo[];
};

export default function ProductList(props: Products) {
    const RELOAD_MESSAGE = '400 bad request, try to reload the page';
    const { data, isLoading, isFetching, error, isError } = useQuery({
        queryKey: ['posts'],
        queryFn: getProducts,
        initialData: props.products,
    });

    if (error || isError)
        return (
            <div className="c-400-error">
                <Link href="" onClick={() => window.location.reload()}>
                    {RELOAD_MESSAGE}
                </Link>
            </div>
        );

    return (
        <div className="c-product-list">
            <section className="c-grid">
                {data.map((product) => (
                    <Product
                        key={product.id}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        productInfo={product}
                    />
                ))}
            </section>
        </div>
    );
}
