import CeeqButton from "@/components/button";
import { PageWrapper } from "@/components/page-wrapper";
import { ISeoMetadata } from "@/types/seo-metadata.type";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import SequenceList from "./components/sequence-list";

export function SequencePage() {
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
  const handleCreateSequence = () => {
    router.push("/sequence/create");
  };
  return (
    <PageWrapper metadata={metadata}>
      <div>
        <h1 className="text-[24px]">シーケンス</h1>
        <div className="bg-white mt-4 lg: mt-[35px]">
          <div className="flex flex-col lg:flex-row gap-2 justify-end p-4 lg:p-[40px]">
            <CeeqButton
              title="表示切替え"
              className="!bg-transparent !text-[#1A1A1A] !px-6 !py-4 !border-[#1A1A1A]"
            />
            <CeeqButton
              title="インポート"
              className="!bg-transparent !text-[#1A1A1A] !px-6 !py-4 !border-[#1A1A1A]"
            />
            <CeeqButton
              title="新規登録"
              className="!px-6 !py-4"
              icon={<PlusSquareOutlined />}
              onClick={handleCreateSequence}
            />
          </div>
          <SequenceList />
        </div>
      </div>
    </PageWrapper>
  );
}
