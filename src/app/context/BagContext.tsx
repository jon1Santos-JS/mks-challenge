'use client';
import { ReactNode, useContext, useState, createContext } from 'react';

type BagContextType = {
    bagContent: BagContent;
    bagState: BagState;
};

type BagContent = {
    total: number;
    totalItems: number;
    products: BagProduct[];
    addProduct: (product: ProductInfo) => void;
    subProduct: (product: ProductInfo) => void;
    excludeProduct: (product: ProductInfo) => void;
};

export type BagProduct = {
    info: ProductInfo;
    qt: number;
};

type BagState = {
    isOpen: boolean;
    onHandle: (value: boolean) => void;
};

const BagContext = createContext<BagContextType>({
    bagContent: {
        total: 0,
        totalItems: 0,
        products: [],
        addProduct: () => null,
        subProduct: () => null,
        excludeProduct: () => null,
    },
    bagState: {
        isOpen: false,
        onHandle: () => null,
    },
});

type BagProvider = {
    children: ReactNode;
};

export function BagProvider({ children }: BagProvider) {
    const [bagContent, setBagContent] = useState({
        products: [] as BagProduct[],
        total: 0,
        totalItems: 0,
        addProduct: (info: ProductInfo) =>
            setBagContent((prev) => {
                const prod = prev.products.find(
                    (bagProduct) => bagProduct.info === info,
                );
                if (!prod) {
                    return {
                        ...prev,
                        products: [...prev.products, { info, qt: 1 }],
                        total: prev.total + Number(info.price),
                        totalItems: prev.totalItems + 1,
                    };
                }
                const newProducts = prev.products.map((bagProduct) =>
                    bagProduct.info === info
                        ? { ...bagProduct, qt: bagProduct.qt++ }
                        : bagProduct,
                );
                return {
                    ...prev,
                    products: newProducts,
                    total: prev.total + Number(info.price),
                    totalItems: prev.totalItems++,
                };
            }),
        subProduct: (info: ProductInfo) =>
            setBagContent((prev) => {
                const prod = prev.products.find(
                    (bagProduct) => bagProduct.info === info,
                );
                if (!prod) {
                    return prev;
                }
                if (prod.qt === 0) {
                    const newProducts = prev.products.filter(
                        (bagProduct) => bagProduct.info !== info,
                    );
                    return {
                        ...prev,
                        products: newProducts,
                        total: prev.total - Number(info.price),
                        totalItems: prev.totalItems--,
                    };
                }
                const newProducts = prev.products.map((bagProduct) =>
                    bagProduct.info === info
                        ? { ...bagProduct, qt: bagProduct.qt-- }
                        : bagProduct,
                );
                return {
                    ...prev,
                    products: newProducts,
                    total: prev.total - Number(info.price),
                    totalItems: prev.totalItems--,
                };
            }),
        excludeProduct: (info: ProductInfo) =>
            setBagContent((prev) => {
                const prod = prev.products.find(
                    (bagProduct) => bagProduct.info === info,
                );
                const newProducts = prev.products.filter(
                    (bagProduct) => bagProduct.info !== info,
                );
                if (prod) {
                    const isZero = prod.qt === 0 ? 1 : prod.qt;
                    const newTotal = prod
                        ? prev.total - Number(prod.info.price) * isZero
                        : prev.total;

                    const newTotalItems =
                        prod.qt === 0
                            ? prev.totalItems--
                            : prev.totalItems - Number(prod.qt);
                    return {
                        ...prev,
                        products: newProducts,
                        total: newTotal,
                        totalItems: newTotalItems,
                    };
                }
                return {
                    ...prev,
                    products: newProducts,
                };
            }),
    });
    const [bagState, setBagState] = useState({
        isOpen: false,
        onHandle: (value: boolean) =>
            setBagState((prev) => ({ ...prev, isOpen: value })),
    });

    return (
        <BagContext.Provider value={{ bagContent, bagState }}>
            {children}
        </BagContext.Provider>
    );
}

export function useBag() {
    return useContext(BagContext);
}
