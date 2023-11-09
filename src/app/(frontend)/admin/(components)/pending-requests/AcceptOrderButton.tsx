"use client";
import { Button } from '@/components/ui/button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AcceptOrderButton = ({ item }: { item: any; }) => {
    const [loading, setLoading] = useState(false);
    async function acceptOrder({ order, appRouter }: { order: any; appRouter: AppRouterInstance; }) {
        setLoading(true);
        const res = await fetch('/api/admin/partial-order-request', {
            method: 'POST',
            body: JSON.stringify({
                partialRequestItem: order,
                confirmation: true
            }),
        });

        if (res.ok) {
            appRouter.refresh();
        }
        const data = await res.json();
        console.error(data.res.message);
    }
    setLoading(false);
    const router = useRouter();
    return (
        <Button className='bg-green-700 hover:scale-105 hover:bg-green-600 text-white w-[12vw]'
            disabled={loading}
            onClick={async () => {
                await acceptOrder({ order: item, appRouter: router });
            }}
            variant={"default"}>Accept Order</Button>
    );
};

export default AcceptOrderButton;