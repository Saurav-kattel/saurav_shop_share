
import Req from './Req';

const page = async () => {
    const getProducts = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/get-requested-product`, {
            headers: {
                method: "GET",
                auth: "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImthdHRlbHNhdXJhdjMyQGdtYWwuY29tIiwidXNlcklkIjoiYzI0MTQ5N2EtNDYxNi00YzU0LTgyM2UtMmI1MTJiYmFiNGNhIiwiaWF0IjoxNjk4MDM3NjY0LCJzdWIiOiJjMjQxNDk3YS00NjE2LTRjNTQtODIzZS0yYjUxMmJiYWI0Y2EifQ.Uw3mdFEVj8rA-bWw7msJYash9sVtErCUVm8lnfgEDa0"
            }
        });
        let data = await res.json();
        return data;
    };
    const data = await getProducts();
    return (
        <Req data={data} />
    );
};

export default page;