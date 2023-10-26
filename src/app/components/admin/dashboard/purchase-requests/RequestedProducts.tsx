"use client";
import React from 'react';
const RequestedProducts = ({ data }: { data: any; }) => {
    return (
        <div>{<div>{JSON.stringify(data)}</div>}</div>
    );
};

export default RequestedProducts;