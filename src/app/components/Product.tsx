import Image from 'next/image';
import { useBag } from '../context/BagContext';
import ShoppingBagImage from '../../../public/shoppingBagImage.svg';
import useString from '../hooks/useString';

type UniqueProduct = {
    productInfo: ProductInfo;
};

export default function Product({ productInfo }: UniqueProduct) {
    const PURCHASE_WORD = 'COMPRAR';
    const SHOPPING_BAG_IMAGE_DESCRIPTION = 'Shopping bag image from button';
    const { bagContent } = useBag();
    const { currencyFormat, toAddDots, toTrimString } = useString();
    return (
        <div className="c-card c-product">
            <div className="image">
                <Image
                    src={productInfo.photo}
                    width={200}
                    height={200}
                    alt={productInfo.description}
                    sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                ></Image>
            </div>
            <div className="info-content">
                <div className="name-price-content">
                    <div className="name">{productInfo.name}</div>
                    <div className="price price-primary">
                        {currencyFormat(productInfo.price, 'BRL')}
                    </div>
                </div>
                <div className="description">
                    {toAddDots(toTrimString(productInfo.description, 10))}
                </div>
            </div>
            <button
                onClick={() => bagContent.addProduct(productInfo)}
                className="c-button purchase-button"
            >
                <div className="image">
                    <Image
                        src={ShoppingBagImage}
                        alt={SHOPPING_BAG_IMAGE_DESCRIPTION}
                    ></Image>
                </div>
                <div className="title">{PURCHASE_WORD}</div>
            </button>
        </div>
    );
}
