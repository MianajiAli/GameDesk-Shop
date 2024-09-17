import Link from "next/link";

export default function Page() {
    return (
        <div>admin dashboard

            <Link href="/admin/products" > products </Link>
            <Link href="/admin/products/add" > add </Link>
        </div >
    );
}