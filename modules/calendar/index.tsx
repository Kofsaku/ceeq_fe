import React from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { ISeoMetadata } from "@/types/seo-metadata.type";
import { PlusSquareOutlined } from "@ant-design/icons";
import CeeqButton from "@/components/button";
import CalendarList from "./components/calendar-list";
import { useCalendarStore } from "@/store/use-calendar";
import ModalSelectMeet from "./components/modal-select-meet";
import ModalClone from "./components/modal-clone";
import ModalAddMember from "./components/modal-add-member";

export function CalendarPage() {
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
  const { setIsModalOpen } = useCalendarStore();
  const handleCreateCalendar = () => {
    setIsModalOpen(true);
  };
  return (
    <PageWrapper metadata={metadata}>
      <div>
        <h1 className="text-[24px]">カレンダー一覧</h1>
        <div className="bg-white mt-4 lg: mt-[35px]">
          <div className="flex flex-col lg:flex-row gap-2 justify-end p-4 lg:p-[40px]">
            <CeeqButton
              title="新規登録"
              className="!px-6 !py-4"
              icon={<PlusSquareOutlined />}
              onClick={handleCreateCalendar}
            />
          </div>
          <CalendarList />
        </div>
        <ModalSelectMeet />
        <ModalClone />
      </div>
    </PageWrapper>
  );
}
