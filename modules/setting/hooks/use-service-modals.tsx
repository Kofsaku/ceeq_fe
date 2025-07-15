import { useState } from "react";
import { Service } from "../type";

type ActionType = "link" | "unlink";

type ModalState = {
  open: boolean;
  actionType: ActionType | null;
  selectedService: Service | null;
};

export function useServiceModals() {
  const [state, setState] = useState<ModalState>({
    open: false,
    actionType: null,
    selectedService: null,
  });

  const showConfirm = (
    actionType: ActionType,
    selectedService: Service | null
  ) => {
    setState({
      open: true,
      actionType,
      selectedService,
    });
  };

  const showConnectConfirm = (selectedService: Service | null) =>
    showConfirm("link", selectedService);
  const showDisconnectConfirm = (selectedService: Service | null) =>
    showConfirm("unlink", selectedService);

  const handleCancel = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  return {
    ...state,
    showConnectConfirm,
    showDisconnectConfirm,
    handleCancel,
  };
}
