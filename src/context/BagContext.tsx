'use client';
import {
    ReactNode,
    useContext,
    useState,
    createContext,
    useEffect,
    useRef,
} from 'react';

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
    const [bagState, setBagState] = useState({
        isOpen: false,
        onHandle: (value: boolean) =>
            setBagState((prev) => ({ ...prev, isOpen: value })),
    });
    const [bagContent, setBagContent] = useState({
        products: [] as BagProduct[],
        total: 0,
        totalItems: 0,
        addProduct: (info: ProductInfo) =>
            setBagContent((prev) => {
                const prod = prev.products.find(
                    (bagProduct) => bagProduct.info.id === info.id,
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
                    bagProduct.info.id === info.id
                        ? { ...bagProduct, qt: bagProduct.qt + 1 }
                        : bagProduct,
                );
                return {
                    ...prev,
                    products: newProducts,
                    total: prev.total + Number(info.price),
                    totalItems: prev.totalItems + 1,
                };
            }),
        subProduct: (info: ProductInfo) =>
            setBagContent((prev) => {
                const prod = prev.products.find(
                    (bagProduct) => bagProduct.info.id === info.id,
                );
                if (!prod) {
                    return prev;
                }
                if (prod.qt === 1) {
                    const newProducts = prev.products.filter(
                        (bagProduct) => bagProduct.info.id !== info.id,
                    );
                    return {
                        ...prev,
                        products: newProducts,
                        total: prev.total - Number(info.price),
                        totalItems: prev.totalItems - 1,
                    };
                }
                const newProducts = prev.products.map((bagProduct) =>
                    bagProduct.info.id === info.id
                        ? { ...bagProduct, qt: bagProduct.qt - 1 }
                        : bagProduct,
                );
                return {
                    ...prev,
                    products: newProducts,
                    total: prev.total - Number(info.price),
                    totalItems: prev.totalItems - 1,
                };
            }),
        excludeProduct: (info: ProductInfo) =>
            setBagContent((prev) => {
                const prod = prev.products.find(
                    (bagProduct) => bagProduct.info.id === info.id,
                );
                const newProducts = prev.products.filter(
                    (bagProduct) => bagProduct.info.id !== info.id,
                );
                if (prod) {
                    const prodTotalPrice = Number(prod.info.price) * prod.qt;
                    const newTotal = prod
                        ? prev.total - prodTotalPrice
                        : prev.total;
                    const newTotalItems = prev.totalItems - Number(prod.qt);
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
    const initialContent = useRef(bagContent);

    useEffect(() => {
        const response = localStorage.getItem('bagstate');
        if (!response) return;
        const bag = JSON.parse(response) as BagContent;
        setBagContent((prev) => ({
            ...prev,
            total: bag.total,
            totalItems: bag.totalItems,
            products: bag.products,
        }));
    }, []);

    useEffect(() => {
        if (initialContent.current !== bagContent) {
            const stringifiedState = JSON.stringify(bagContent);
            localStorage.setItem('bagstate', stringifiedState);
        }
    }, [bagContent]);

    return (
        <BagContext.Provider value={{ bagContent, bagState }}>
            {children}
        </BagContext.Provider>
    );
}

export function useBag() {
    return useContext(BagContext);
}
