import { redirect } from 'next/navigation';

export default async function Page() {
    // Perform some logic here
    const shouldRedirect = true; // Change this based on your logic

    if (shouldRedirect) {
        redirect('/shop/1');
    }

    return <div>Loading</div>;
}
