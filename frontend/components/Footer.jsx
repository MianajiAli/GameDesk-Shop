import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black/90 text-white " dir="rtl">
            <div className="py-6 px-10 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* بخش درباره ما */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-lg font-semibold mb-2">درباره ما</h2>
                    <p className="text-sm text-gray-400">
                        فروشگاه آنلاین ما با ارائه محصولات با کیفیت و قیمت مناسب، تلاش می‌کند تا بهترین تجربه خرید را برای شما فراهم کند.
                    </p>
                </div>

                {/* بخش لینک‌ها */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-lg font-semibold mb-2">لینک‌های مهم</h2>
                    <ul className="text-sm text-gray-400">
                        <li className="py-1">خانه</li>
                        <li className="py-1">محصولات</li>
                        <li className="py-1">تماس با ما</li>
                        <li className="py-1">سوالات متداول</li>
                    </ul>
                </div>

                {/* بخش تماس با ما */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-lg font-semibold mb-2">تماس با ما</h2>
                    <p className="text-sm text-gray-400">
                        شماره تلفن: 123456789
                    </p>
                    <p className="text-sm text-gray-400">
                        ایمیل: info@example.com
                    </p>
                    <p className="text-sm text-gray-400">
                        آدرس: تهران، خیابان مثال، کوچه شماره 1
                    </p>
                </div>
            </div>

            {/* کپی رایت */}
            <div className="flex justify-center items-center py-4 bg-black/30">
                <p className="text-sm text-white/50">
                    © 2024 تمامی حقوق محفوظ است.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
