"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const AcceptOrderButton = ({ item }: { item: any; }) => {
    const [loading, setLoading] = useState(false);
    return (
        <Button className='bg-green-700 hover:scale-105 hover:bg-green-600 text-white w-[12vw]' disabled={loading} variant={"default"}>Accept Order</Button>
    );
};

export default AcceptOrderButton;