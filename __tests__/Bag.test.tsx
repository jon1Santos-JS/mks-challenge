import React from 'react';
import { useBag } from '@/context/BagContext';
import '@testing-library/jest-dom';
import {
    render,
    fireEvent,
    Matcher,
    MatcherOptions,
} from '@testing-library/react';
import { BagProvider } from '@/context/BagContext';

const qtProductsToList = 6;

const totalBagProducts = 0;

test('Bag test', () => {
    const { getByTestId } = render(
        <BagProvider>
            <ProdList products={produtFactory(qtProductsToList)} />
            <ShoppingModal />
        </BagProvider>,
    );

    addToBag(getByTestId, 2, 7);
    subFromBag(getByTestId, 2, 2);
    delFromBag(getByTestId, 2);
    expect(getByTestId('total-items')).toHaveTextContent(
        totalBagProducts.toString(),
    );
});

function addToBag(
    cb: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement,
    id: number,
    qt: number,
) {
    for (let i = 0; i < qt; i++) {
        fireEvent.click(cb(id));
    }
}

function subFromBag(
    cb: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement,
    id: number,
    qt: number,
) {
    for (let i = 0; i < qt; i++) {
        fireEvent.click(cb(`bag ${id} sub`));
    }
}

function delFromBag(
    cb: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement,
    id: number,
) {
    fireEvent.click(cb(`bag ${id} del`));
}

type ProductProps = {
    info: ProductInfo;
};

type ProdListProps = {
    products: ProductInfo[];
};

export function ProdList({ products }: ProdListProps) {
    return products.map((product) => <Prod key={product.id} info={product} />);
}

export function Prod({ info }: ProductProps) {
    const { bagContent } = useBag();

    return (
        <>
            <button
                data-testid={info.id}
                onClick={() => bagContent.addProduct(info)}
            >
                Add Product
            </button>
        </>
    );
}

export function ShoppingModal() {
    const { bagContent } = useBag();
    return (
        <div>
            <div data-testid="total-items">{bagContent.totalItems}</div>
            <div>
                {bagContent.products.map((product) => (
                    <div key={product.info.id}>
                        <button
                            data-testid={`bag ${product.info.id} sub`}
                            onClick={() => bagContent.subProduct(product.info)}
                        >
                            Minus Button
                        </button>
                        <button
                            data-testid={`bag ${product.info.id} del`}
                            onClick={() =>
                                bagContent.excludeProduct(product.info)
                            }
                        >
                            Remove Product
                        </button>
                    </div>
                ))}
            </div>
            ;
        </div>
    );
}

export function produtFactory(qt: number): ProductInfo[] {
    const productList: ProductInfo[] = [];
    for (let i = 0; i <= qt; i++) {
        const prod = {
            id: i,
            name: 'test',
            brand: 'test',
            description: 'test',
            photo: 'test',
            price: 'test',
            createdAt: 'test',
            updatedAt: 'test',
        } as ProductInfo;
        productList.push(prod);
    }

    return productList;
}
