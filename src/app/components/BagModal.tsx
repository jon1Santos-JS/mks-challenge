'use client';

import { useBag } from '../context/BagContext';
import useString from '../hooks/useString';
import BagProduct from './BagProduct';
import { motion } from 'framer-motion';

const variants = {
    open: { opacity: 1, x: 0, transition: { ease: 'linear' } },
    closed: { opacity: 0, x: '100%' },
};

export default function BagModal() {
    const BAG_TITLE = 'Carrinho de compras';
    const BUTTON_TITLE = 'Finalizar Compra';
    const TOTAL_TITLE = 'Total:';
    const { bagState, bagContent } = useBag();
    const { currencyFormat } = useString();
    return (
        <motion.div
            animate={bagState.isOpen ? 'open' : 'closed'}
            variants={variants}
            initial="closed"
            className="o-bag"
        >
            <div className="top-content">
                <div className="title">{BAG_TITLE}</div>
                <button
                    className="c-button exit-button"
                    onClick={() => bagState.onHandle(!bagState.isOpen)}
                >
                    x
                </button>
            </div>
            <div className="products-container">
                <div className="products">
                    {bagContent.products.map((bagProduct) => (
                        <BagProduct
                            key={bagProduct.info.description}
                            bagProduct={bagProduct}
                        />
                    ))}
                </div>
            </div>
            <div className="bottom-content">
                <div className="total">
                    <div className="title">{TOTAL_TITLE}</div>
                    <div className="number">
                        {currencyFormat(bagContent.total, 'BRL')}
                    </div>
                </div>
                <button className="c-button purchase-button">
                    {BUTTON_TITLE}
                </button>
            </div>
        </motion.div>
    );
}
