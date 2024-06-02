import Head from "next/head";
import { META_TEXT } from "@/constants/staticContents";

const DocHead = () => {
  return (
    <Head>
      <title>{META_TEXT.TITLE}</title>
      <link rel="shortcut icon" href="favicon.ico" />
    </Head>
  );
};

export default DocHead;
