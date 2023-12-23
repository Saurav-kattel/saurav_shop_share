import Loading from "@/app/services/utils/Loading";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { cookies } from "next/headers";
import Error from "../../utils/Error";
const VerificationForm = React.lazy(() => import("./VerificationForm"));

const page = () => {
  const new_cookie = cookies().get("otp_verifcation_cookie")?.value ?? "";
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<Error />}>
        <VerificationForm new_cookie={new_cookie} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default page;
