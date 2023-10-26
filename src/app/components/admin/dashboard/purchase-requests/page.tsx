import RequestedProducts from './RequestedProducts';

const page = async () => {
    const getProducts = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/get-pending-purchase-request`, {
            headers: {
                method: "GET",
                auth: "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImthdHRlbHNhdXJhdjMyQGdtYWlsLmNvbSIsInVzZXJJZCI6ImQyYmMzZTc1LTJlZmMtNGFlOS1iMTdlLWFjZmU3NTExMzU3YiIsImlhdCI6MTY5ODMwMTQ3NCwic3ViIjoiZDJiYzNlNzUtMmVmYy00YWU5LWIxN2UtYWNmZTc1MTEzNTdiIn0.Fhlwwpk0TMq7w3RqJ7DP4CAuYxLbAHCjeCGT7dGCKFk"
            }
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