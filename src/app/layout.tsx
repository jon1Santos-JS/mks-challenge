import Providers from './components/Providers';
import '../../styles/sass/index.scss';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '400', subsets: ['latin'] });
export const metadata = {
    title: 'MKS-Challenger',
    description: 'ecommerce-interface',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
