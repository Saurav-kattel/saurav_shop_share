"use client";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const VerificationForm = () => {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const cookie = useCookies();
  const verificationAuth = cookie.get("otp_verifcation_cookie") ?? "";
  const [resData, setResData] = useState<{
    res: { message: string; success?: boolean };
  }>();
  const router = useRouter();
  async function handleVerifyOtp(
    e: React.FormEvent,
    otp: string,
    verification_auth: string
  ) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/user/verify-otp", {
      method: "POST",
      headers: {
        otp_verifcation_cookie: verification_auth,
      },
      body: JSON.stringify({
        otp: otp,
      }),
    });
    let data = await res.json();
    setResData(data);
    setLoading(false);
    if (data?.res.success) {
      router.push("/components/user/change-password");
    }
  }
  return (
    <div className="w-[100vw] h-[100vh] flex-col gap-2 flex items-center justify-center">
      <div className="flex bg-white w-[50vw] h-[45vh] shadow-sm shadow-slate-900 rounded-md  justify-center flex-col items-center text-rose-400 ">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-4xl mt-8 font-bold">Verify Otp</h1>
          <p className="font-medium">
            <em>Enter your otp you recived in your email</em>
          </p>
        </div>

        <form
          className="flex flex-col gap-1 mt-4 "
          onSubmit={async (e) => {
            await handleVerifyOtp(e, otp, verificationAuth);
          }}
        >
          <label className="flex flex-col font-semibold">
            <input
              className="border-b-[1px] border-b-rose-500 outline-none  p-1"
              placeholder="Ex: 00000"
              value={otp}
              type="text"
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
          </label>
          {loading ? (
            <p className="text-rose-500  text-center h-[2.5rem]">Loading...</p>
          ) : (
            <Button className="bg-rose-500 hover:bg-white hover:text-rose-500 hover:border-[1px] hover:border-rose-500 hover:scale-105 ">
              verify-otp
            </Button>
          )}
          <div>
            {!resData?.res.success ? (
              <p className="text-rose-500 font-semibold px-2 text-center">
                {resData?.res.message}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
