import RequestedProducts from './RequestedProducts';

const page = async () => {
    const getProducts = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/get-pending-purchase-request`, {
            headers: {
                method: "GET",
                auth: "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImthdHRlbHNhdXJhdjMyQGdtYWwuY29tIiwidXNlcklkIjoiZTg0NmFmODItYTNmZC00ZTBlLTg4NDgtY2E2Zjc5OTMyODUwIiwiaWF0IjoxNjk4MzI5MDYxLCJzdWIiOiJlODQ2YWY4Mi1hM2ZkLTRlMGUtODg0OC1jYTZmNzk5MzI4NTAifQ.o_qcj6D7A_WcMbzn8lQ1xSJ6RLCWmD4DYWf59dgebh8"
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