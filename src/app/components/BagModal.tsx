'use client';

import { useBag } from '../context/BagContext';
import BagProduct from './BagProduct';

export default function BagModal() {
    const BAG_TITLE = 'Carrinho de compras';
    const BUTTON_TITLE = 'Finalizar Compra';
    const TOTAL_TITLE = 'Total:';
    const { bagState, bagContent } = useBag();

    return (
        <div
            onClick={() => bagState.onHandle(false)}
            className={`o-close-modal ${bagState.isOpen ? '' : 'hide-state'}`}
        >
            <div onClick={(e) => e.stopPropagation()} className={`o-bag `}>
                <div className="top-content">
                    <div className="title">{BAG_TITLE}</div>
                    <button
                        className="exit-button"
                        onClick={() => bagState.onHandle(!bagState.isOpen)}
                    >
                        x
                    </button>
                </div>
                <div className="products">
                    {bagContent.products.map((bagProduct) => (
                        <BagProduct
                            key={bagProduct.info.description}
                            bagProduct={bagProduct}
                        />
                    ))}
                </div>
                <div className="bottom-content">
                    <div className="total">
                        <div className="title">{TOTAL_TITLE}</div>
                        <div className="number">{bagContent.total}</div>
                    </div>
                    <button className="purchase-button">{BUTTON_TITLE}</button>
                </div>
            </div>
        </div>
    );
}
