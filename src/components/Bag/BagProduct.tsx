import { BagProduct, useBag } from '../../context/BagContext';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useString from '@/hooks/useString';

type BagProductContent = {
    bagProduct: BagProduct;
};

export default function BagProduct({ bagProduct }: BagProductContent) {
    const QUANTITY_TITLE = 'Qtd:';
    const { bagContent } = useBag();
    const { currencyFormat } = useString();
    return (
        <motion.div
            key={bagProduct.info.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="c-bag-product c-card"
        >
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
                            bagContent.subProduct(bagProduct.info);
                        }}
                        className="c-button subtract-button"
                    >
                        -
                    </button>
                    <div className="number">{bagProduct.qt}</div>
                    <button
                        onClick={() => {
                            bagContent.addProduct(bagProduct.info);
                        }}
                        className="c-button add-button"
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="price">
                {currencyFormat(bagProduct.info.price, 'BRL')}
            </div>
            <motion.button
                whileHover={{ scale: 0.84, x: '50%', y: '-50%' }}
                initial={{ scale: 0.8, x: '50%', y: '-50%' }}
                whileTap={{ scale: 0.76, x: '50%', y: '-50%' }}
                className="c-button exclude-button "
                onClick={() => bagContent.excludeProduct(bagProduct.info)}
            >
                x
            </motion.button>
        </motion.div>
    );
}
