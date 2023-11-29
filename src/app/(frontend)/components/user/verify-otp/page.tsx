import Loading from "@/app/services/utils/Loading";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../../utils/Error";
const VerificationForm = React.lazy(() => import("./VerificationForm"));

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<Error />}>
        <VerificationForm />
      </ErrorBoundary>
    </Suspense>
  );
};

export default page;
