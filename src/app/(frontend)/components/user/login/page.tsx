import Loading from "@/app/services/utils/Loading";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../../utils/Error";
const LoginForm = React.lazy(() => import("./LoginForm"));

const page = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<Error />}>
          <LoginForm />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default page;
