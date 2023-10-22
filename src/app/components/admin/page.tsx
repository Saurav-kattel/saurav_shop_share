import React from 'react';

const page = async () => {
    const getProducts = async () => {
        const data = await fetch(`${process.env.BASE_URL}/api/admin/product/get-product-request`, {
            method: "GET",
            headers: {
                auth: "eyJhbGciOiJIUzI1NiJ.eyJlbWFpbCI6ImthdHRlbHNhdXJhdjMyQGdtYWwuY29tIiwidXNlcklkIjoiNTI2MzZmMGUtNzdiZi00YTM2LTg3MWUtYTlmZGY3NGM3ZTY1IiwiaWF0IjoxNjk3ODY2MzkzLCJzdWIiOiI1MjYzNmYwZS03N2JmLTRhMzYtODcxZS1hOWZkZjc0YzdlNjUifQ.97kuf3bKR-hwpJ2Juo4c4VNUor2u_z3Brj31Ij-yPaA"
            }
        });
        return await data.json();
    };
    return (
        <div>{JSON.stringify(await getProducts())}</div>
    );
};

export default page;