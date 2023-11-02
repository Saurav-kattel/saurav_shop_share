import RequestedProducts from './RequestedProducts';
import { cookies } from 'next/headers';

const page = async () => {
    const getProducts = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/get-pending-purchase-request`, {
            headers: {
                method: "GET",
                auth: cookies().get("auth")?.value ?? ''
            },
            cache: "no-store"
        });
        let data = await res.json();
        return data;
    };
    const data = await getProducts();
    return (
        <RequestedProducts data={data} />
    );
};

export default page;