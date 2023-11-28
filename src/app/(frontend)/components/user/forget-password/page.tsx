import Loading from "@/app/services/utils/Loading";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../../utils/Error";
const ForgetPasswordForm = React.lazy(() => import("./ForgetPasswordForm"));

export const metadata: Metadata = {
  title: "Forget Password",
};

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<Error />}>
        <ForgetPasswordForm />
      </ErrorBoundary>
    </Suspense>
  );
};

export default page;
