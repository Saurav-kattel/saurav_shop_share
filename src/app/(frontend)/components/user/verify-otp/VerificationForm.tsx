"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const VerificationForm = () => {
  const [otp, setOtp] = useState<string>();
  return (
    <div className="w-[100vw] h-[100vh] flex-col gap-2 flex items-center justify-center">
      <div className="flex bg-white w-[50vw] h-[45vh] shadow-sm shadow-slate-900 rounded-md  justify-center flex-col items-center text-rose-400 ">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-4xl mt-8 font-bold">Verify Otp</h1>
          <p className="font-medium">
            <em>Enter your otp you recived in your email</em>
          </p>
        </div>

        <form className="flex flex-col gap-1 mt-4 ">
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
          <Button className="bg-rose-500">verify-otp</Button>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
