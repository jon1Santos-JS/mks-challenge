import { BagProduct, useBag } from '../context/BagContext';
import Image from 'next/image';

type BagProductContent = {
    bagProduct: BagProduct;
};

export default function BagProduct({ bagProduct }: BagProductContent) {
    const QUANTITY_TITLE = 'Qtd:';
    const { bagContent } = useBag();
    return (
        <div className="c-bag-product c-card">
            <div className="image">
                <Image
                    src={bagProduct.info.photo}
                    width={200}
                    height={200}
                    alt={bagProduct.info.description}
                    sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                ></Image>
            </div>
            <div className="name">{bagProduct.info.name}</div>
            <div className="quantity">
                <div className="title">{QUANTITY_TITLE}</div>
                <div className="content">
                    <button
                        onClick={() => {
                            bagContent.addProduct(bagProduct.info);
                        }}
                        className="add-button"
                    >
                        +
                    </button>
                    <div className="number">{bagProduct.qt}</div>
                    <button
                        onClick={() => {
                            bagContent.subProduct(bagProduct.info);
                        }}
                        className="subtract-button"
                    >
                        -
                    </button>
                </div>
            </div>
            <div className="price">{bagProduct.info.price}</div>
            <button
                className="exclude-button"
                onClick={() => bagContent.excludeProduct(bagProduct.info)}
            >
                x
            </button>
        </div>
    );
}
