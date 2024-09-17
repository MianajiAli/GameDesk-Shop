import Link from 'next/link';

const navItems = [
    { label: 'صفحه اصلی', href: '/' },
    { label: 'فروشگاه', href: '/shop' },
    { label: 'بلاگ', href: '/blog' },
    { label: 'سبد خرید', href: '/cart' }
];

export default function Header() {
    return (
        <div className="bg-black/5 w-full h-10 flex flex-row-reverse justify-between items-center px-10">
            <span className="text-3xl font-bold select-none">آجر شاپ</span>
            <div className="flex flex-row-reverse justify-between items-center gap-5">
                {navItems.map((item) => (
                    <Link key={item.label} href={item.href}>
                        {item.label}
                    </Link>
                ))}
            </div>
        </div >
    );
}
