"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ForgetPasswordForm = () => {
  type OtpRes = {
    res: { message: string; success?: boolean };
  };
  const [email, setEmail] = useState("");
  const [otpRes, setOtpRes] = useState<OtpRes>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleForgetPasswordRequest(
    e: React.FormEvent,
    email: string
  ) {
    e.preventDefault();
    setLoading(true);
    let res = await fetch("/api/user/send-otp-request", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    });
    let data = await res.json();
    if (data?.res.success) {
      router.push("/components/user/verify-otp");
    }
    setOtpRes(data);
    setEmail("");
  }
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <form
        onSubmit={async (e) => {
          await handleForgetPasswordRequest(e, email);
        }}
        className="flex flex-col bg-white rounded-xl items-center py-4 px-3  justify-around w-[50vw] h-[50vh] shadow shadow-slate-950"
      >
        <div>
          <h1 className="font-bold text-4xl text-rose-600">Forget Password</h1>
          <p className="text-rose-600 text-ellipsis text-center">
            Please enter your email to verify.
          </p>
        </div>
        <div>
          <label className="flex flex-col items-start justify-center p-2 gap-1">
            <span className="text-rose-600 font-semibold text-center">
              Email
            </span>
            <input
              type="email"
              value={email}
              className=" bg-transparent outline-none border-b-[1px] w-[25vw] px-1 text-rose-500  border-b-rose-600"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <div className="flex items-center justify-center w-[25vw]">
            {loading ? (
              <div className="text-rose-500 text-center font-semibold h-[2.5rem]">
                Loading...
              </div>
            ) : (
              <Button className="bg-rose-500 w-[10vw] hover:bg-white hover:scale-105 hover:border-[1px] hover:border-rose-500 hover:text-rose-500">
                Verify
              </Button>
            )}
          </div>
          {/* Error or Success section */}
          <div className="w-[25vw] h-[6vh] flex items-center justify-center">
            {!loading && !otpRes?.res.success ? (
              <p className="text-red-600 font-semibold lowercase ">
                {otpRes?.res.message}
              </p>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
