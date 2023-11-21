'use client';

import useString from '@/hooks/useString';
import { useBag } from '../../context/BagContext';
import BagProduct from './BagProduct';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
    open: { opacity: 1, x: '1%', transition: { ease: 'circOut' } },
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
            className="is-close-modal "
            onClick={() => bagState.onHandle(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="o-modal c-bag c-text--secondary "
            >
                <div className="top-content">
                    <div className="title">{BAG_TITLE}</div>
                    <button
                        className="c-button c-button--black exit-button "
                        onClick={() => bagState.onHandle(!bagState.isOpen)}
                    >
                        x
                    </button>
                </div>
                <div className="products-container">
                    <div className="products">
                        <AnimatePresence>
                            {bagContent.products.map((bagProduct) => (
                                <BagProduct
                                    key={bagProduct.info.id}
                                    bagProduct={bagProduct}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="bottom-content">
                    <div className="total">
                        <div className="title">{TOTAL_TITLE}</div>
                        <div className="number">
                            {currencyFormat(bagContent.total, 'BRL')}
                        </div>
                    </div>
                    <button className="c-button c-button--black purchase-button ">
                        {BUTTON_TITLE}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
