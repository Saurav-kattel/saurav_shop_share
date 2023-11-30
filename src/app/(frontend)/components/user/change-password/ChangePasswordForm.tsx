"use client";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ChangePasswordForm = ({ token }: { token: string | undefined }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [response, setResponse] = useState<{
    res: { message: string; success?: boolean };
  }>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleChangePasswordForm(e: React.FormEvent, token: string) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/user/change-forgeted-password", {
      method: "POST",
      headers: {
        otp_verifcation_accepted: token,
      },
      body: JSON.stringify({
        newPassword,
        confPassword,
      }),
    });

    const data = await res.json();
    setResponse(data);

    if (data?.res.success) {
      router.refresh();
      router.push("/");
    }
    setLoading(false);
    setNewPassword("");
    setConfPassword("");
  }
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-1 items-center justify-center w-[50vw] h-[60vh] rounded-lg shadow-lg shadow-slate-900 bg-white ">
        <h1 className="text-3xl text-rose-500 font-bold">Change Password</h1>

        <form
          onSubmit={async (e) => {
            await handleChangePasswordForm(e, token ?? "");
          }}
          className="flex flex-col items-start justify-center gap-1 p-2  m-4"
        >
          <label className="flex flex-col gap-1 items-start justify-center text-rose-500">
            <span>New Password</span>
            <input
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              className="border-b-[1px] border-b-rose-500 outline-none px-1 text-rose-600"
              type="password"
            />
          </label>
          <label className="flex flex-col gap-1 items-start justify-center text-rose-500">
            <span>Confrim Password</span>
            <input
              value={confPassword}
              onChange={(e) => {
                setConfPassword(e.target.value);
              }}
              className="border-b-[1px] border-b-rose-500 outline-none px-1 text-rose-600"
              type="password"
            />
          </label>
          <div className="flex w-[14vw] mt-4 justify-start ">
            {loading ? (
              <p className="h-[2.5rem] text-rose-500">Loading...</p>
            ) : (
              <Button
                className="bg-rose-600 hover:scale-105 hover:text-rose-500 hover:border-[1px] hover:border-rose-500 hover:bg-white"
                type="submit"
              >
                change password
              </Button>
            )}
          </div>
        </form>
        {!loading && !response?.res.success ? (
          <em className="h-[2.5rem] lowercase font-semibold text-red-500">
            {response?.res.message}
          </em>
        ) : null}
      </div>
    </div>
  );
};

export default ChangePasswordForm;
