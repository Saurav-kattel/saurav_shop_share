import { NextResponse } from "next/server";

export function response({ status, res }: { status: number, res: any; }) {
    return NextResponse.json({ res }, { status });
}