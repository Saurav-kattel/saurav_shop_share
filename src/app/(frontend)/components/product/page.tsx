import React, { Suspense } from "react";
import { Metadata } from "next";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../utils/Error";
import Loading from "@/app/services/utils/Loading";
const ProductComponent = React.lazy(() => import("./ProductComponent"));

export const metadata: Metadata = {
  title: "Products - available products",
};
async function fetchProducts() {
  console.log("fecthing product data");
  const res = await fetch(`${process.env.BASE_URL}/api/product/get-product`, {
    cache: "no-store",
  });
  return await res.json();
}
const Page = async () => {
  const data = await fetchProducts();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<Error />}>
          <ProductComponent products={data.res["product"]} />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default Page;
