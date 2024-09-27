import Link from "next/link";

const sidebarData = {
    محصولات: [
        { name: "مدیریت محصولات", href: "/admin/products" },
        { name: "مشاهده فروشگاه", href: "/shop/" },
    ],
    کاربران: [
        { name: "مدیریت کاربران", href: "/users/manage" },
        { name: "اضافه کردن کاربر", href: "/users/add" },
    ],
    سفارشات: [
        { name: "مشاهده سفارشات", href: "/orders/view" },
        { name: "مدیریت سفارشات", href: "/orders/manage" },
    ],
    سبدها: [
        { name: "مشاهده سبدها", href: "/carts/view" },
    ],
    پرداخت‌ها: [
        { name: "تاریخچه پرداخت", href: "/payments/history" },
        { name: "تنظیمات پرداخت", href: "/payments/settings" },
    ],
};

const layout = ({ children }) => {
    return (
        <>
            <div className="flex">
                <div className="bg-white min-h-screen flex-1 md:mr-60 mr-0">
                    {children}
                </div>
                {/* Sidebar */}
                <div dir="rtl" className="w-60 h-screen bg-stone-700 text-white p-5 hidden md:block fixed right-0">
                    <h1 className="text-xl font-bold mb-4">برند</h1>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin">
                                <h2 className="text-lg font-semibold">نوار مدیریت</h2>
                            </Link>
                            <ul className="mr-4 space-y-1">
                                {/* Dynamically render sections from the object */}
                                {Object.entries(sidebarData).map(([section, links]) => (
                                    <li key={section}>
                                        <h3 className="text-md">{section}</h3>
                                        <ul className="mr-4">
                                            {links.map((link) => (
                                                <li key={link.href}>
                                                    <Link href={link.href} className="text-sm hover:underline">
                                                        {link.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default layout;
