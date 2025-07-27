import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success("Copied to clipboard");
      return true;
    } catch (error) {
      console.error("Copy failed:", error);
      setIsCopied(false);
      return false;
    }
  }, []);

  return { isCopied, copyToClipboard };
}
