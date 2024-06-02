import { type NextPage } from "next";
import dynamic from "next/dynamic";

const ErrorComponent = dynamic(
  () => import("@/components/common/ErrorComponent"),
  {
    ssr: false,
  }
);

const Error: NextPage = () => {
  return (
    <>
      <ErrorComponent />
    </>
  );
};

export default Error;
