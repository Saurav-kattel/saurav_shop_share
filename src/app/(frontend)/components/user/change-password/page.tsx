import Loading from "@/app/services/utils/Loading";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../../utils/Error";
import { cookies } from "next/headers";
const ChangePasswordForm = React.lazy(() => import("./ChangePasswordForm"));
const page = () => {
  const cookie = cookies().get("otp_verifcation_accepted")?.value;
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<Error />}>
        <ChangePasswordForm token={cookie} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default page;
