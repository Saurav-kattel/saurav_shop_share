"use client";
import React from 'react';
const Req = ({ data }: { data: any; }) => {
    return (
        <div>{<div>{JSON.stringify(data)}</div>}</div>
    );
};

export default Req;