"use client";
import { Button } from '@/components/ui/button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RejectOrderButton = ({ item }: { item: any; }) => {
    const [loading, setLoading] = useState(false);
    async function rejectOreder({ order, appRouter }: { order: any; appRouter: AppRouterInstance; }) {
        setLoading(true);
        const res = await fetch('/api/admin/partial-order-request', {
            method: 'POST',
            body: JSON.stringify({
                partialRequestItem: order,
                confirmation: false
            }),
        });

        if (res.ok) {
            appRouter.refresh();
        }
        const data = await res.json();
        setLoading(false);
        console.error(data.res.message);
    }

    const router = useRouter();
    return (
        <Button
            onClick={async () => {
                await rejectOreder({ order: item, appRouter: router });
            }}
            disabled={loading}
            className='w-[12vw] hover:scale-105' variant={"destructive"}>{loading ? "loading..." : "Reject"}</Button>
    );
};

export default RejectOrderButton;