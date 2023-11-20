'use client';

import Image from 'next/image';
import { useBag } from '../context/BagContext';
import ShoppingBagImage from '../../public/ShoppingBagImage.svg';
import Skeleton from '@mui/material/Skeleton';

type UniqueProduct = {
    productInfo: ProductInfo;
    isLoading?: boolean;
    isFetching?: boolean;
};
import { motion } from 'framer-motion';
import useString from '@/hooks/useString';

const purchaseImageVariants = {
    hover: { scale: 0.11, x: '-2%' },
    tap: { scale: 0.1, x: '2%' },
};

const purchaseTitleVariants = {
    hover: { scale: 1.1, x: '-98%' },
    tap: { scale: 0.9, x: '-101%' },
};

export default function Product({ productInfo, isFetching }: UniqueProduct) {
    const PURCHASE_WORD = 'COMPRAR';
    const SHOPPING_BAG_IMAGE_DESCRIPTION = 'Shopping bag image from button';
    const { bagContent } = useBag();
    const { currencyFormat, toAddDots, toTrimString } = useString();

    if (isFetching)
        return (
            <div className="c-card c-product">
                <div className="image">
                    <Skeleton width={200} height={150}></Skeleton>
                </div>
                <div className="info-content">
                    <div className="name-price-content">
                        <Skeleton
                            variant="text"
                            width={100}
                            sx={{ fontSize: '2rem' }}
                        ></Skeleton>
                        <Skeleton
                            width={100}
                            variant="text"
                            sx={{ fontSize: '1.5rem' }}
                        ></Skeleton>
                    </div>
                    <div className="description">
                        <Skeleton
                            width={200}
                            variant="text"
                            sx={{ fontSize: '2.5rem' }}
                        ></Skeleton>
                    </div>
                </div>
                <button className=" purchase-button">
                    <Skeleton width={240} height={30}></Skeleton>
                </button>
            </div>
        );

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
            <motion.button
                onClick={() => bagContent.addProduct(productInfo)}
                whileHover="hover"
                whileTap="tap"
                className="c-button purchase-button purchase-button--secondary"
            >
                <motion.div
                    className="image"
                    initial={{ scale: 0.1 }}
                    variants={purchaseImageVariants}
                >
                    <Image
                        src={ShoppingBagImage}
                        alt={SHOPPING_BAG_IMAGE_DESCRIPTION}
                    ></Image>
                </motion.div>
                <motion.div
                    className="title"
                    initial={{ x: '-100%' }}
                    variants={purchaseTitleVariants}
                >
                    {PURCHASE_WORD}
                </motion.div>
            </motion.button>
        </div>
    );
}
