import Link from 'next/link';

const navItems = [
    { label: 'صفحه اصلی', href: '/' },
    { label: 'فروشگاه', href: '/shop' },
    { label: 'بلاگ', href: '/blog' },
    { label: 'سبد خرید', href: '/cart' },
    { label: 'ادمین', href: '/admin' }
];

export default function Header() {
    return (<>
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
        <div dir="rtl" className="bg-black/5 w-full h-5 flex flex-row  justify-end  items-center px-10 gap-1 text-sm">
            <Link href="/auth/login">ورود</Link>
            /
            <Link href="/auth/register">ثبت نام</Link>
            |
            <Link href="/auth/logout">خروج</Link>
        </div>
    </>
    );
}
