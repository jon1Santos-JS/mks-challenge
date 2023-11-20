'use client';

import { useBag } from '../context/BagContext';
import ShoppingCartImage from '../../../public/ShoppingCartImage.svg';
import Image from 'next/image';

export default function NavBar() {
    const LOGO_NAME = 'MKS';
    const SUB_TITLE = 'Sistemas';
    const SHOPPING_CART_DESCRIPTION = 'Shopping cart image button';
    const { bagState, bagContent } = useBag();
    return (
        <nav className="o-nav-bar c-home-nav-bar">
            <div className="brand">
                <span className="logo">{LOGO_NAME}</span>
                <span className="sub-title">{SUB_TITLE}</span>
            </div>
            <button
                className="c-button bag-button"
                onClick={() => bagState.onHandle(!bagState.isOpen)}
            >
                <Image
                    src={ShoppingCartImage}
                    alt={SHOPPING_CART_DESCRIPTION}
                />
                <div className="total-items">{bagContent.totalItems}</div>
            </button>
        </nav>
    );
}
