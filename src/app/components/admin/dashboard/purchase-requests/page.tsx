import RequestedProducts from './RequestedProducts';

const page = async () => {
    const getProducts = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/get-pending-purchase-request`, {
            headers: {
                method: "GET",
                auth: "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImthdHRlbHNhdXJhdjMyQGdtYWwuY29tIiwidXNlcklkIjoiODc1ODU1MTctMDgzZC00Y2YzLThjNWEtNTEwOTc3YzM4OTA4IiwiaWF0IjoxNjk4NTAzOTY4LCJzdWIiOiI4NzU4NTUxNy0wODNkLTRjZjMtOGM1YS01MTA5NzdjMzg5MDgifQ.Bsv2Vt7Zqwef6KHc1jHPGpsQoveiAXwIHvuIdO82wXo"
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