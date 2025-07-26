import CeeqButton from "@/components/button";
import { PageWrapper } from "@/components/page-wrapper";
import { ISeoMetadata } from "@/types/seo-metadata.type";
import { PlusSquareOutlined } from "@ant-design/icons";
import AccountList from "./components/account-list";
import { useRouter } from "next/navigation";

export const Accounts = () => {
  const router = useRouter();
  const metadata: ISeoMetadata = {
    title: "シーケンス",
    description: "シーケンス",
    image: "",
    url: "",
    siteName: "シーケンス",
    type: "website",
    canonical: "",
    disableCrawling: false,
  };
  const handleCreateAccount = () => {
    router.push("/setting/accounts/create");
  };
  return (
    <PageWrapper metadata={metadata}>
      <div>
        <h1 className="text-[24px]">アカウント</h1>
        <div className="bg-white mt-4 lg: mt-[35px]">
          <div className="flex flex-col lg:flex-row gap-2 justify-end p-4 lg:p-[40px]">
            <CeeqButton
              title="新規登録"
              className="!px-6 !py-4"
              icon={<PlusSquareOutlined />}
              onClick={handleCreateAccount}
            />
          </div>
          <AccountList />
        </div>
      </div>
    </PageWrapper>
  );
};
