import "../styles/globals.scss";
import { CeeqLayout, useGetLayout } from "@/components/layout";
import QueryClientProvider from "@/providers/query-client.provider";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type NextPageWithLayout = NextPage & {
  layout?: CeeqLayout;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CeeqApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = useGetLayout(Component.layout);
  return (
    <QueryClientProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} />
      </Layout>
    </QueryClientProvider>
  );
}

export default CeeqApp;
