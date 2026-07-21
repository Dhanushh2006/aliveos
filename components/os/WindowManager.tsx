"use client";

import { useState } from "react";

import { AIAssistant } from "./apps/AIAssistant";
import { FileExplorer } from "./apps/FileExplorer";
import { Dock } from "./Dock";

type WindowId = "ai" | "files";

export function WindowManager() {
  const [activeWindow, setActiveWindow] = useState<WindowId>("ai");

  const [openWindows, setOpenWindows] = useState({
    ai: true,
    files: true,
  });

  function openWindow(id: WindowId) {
  setOpenWindows((prev) => ({
    ...prev,
    [id]: true,
  }));

  setActiveWindow(id);
}

function closeWindow(id: WindowId) {
  setOpenWindows((prev) => ({
    ...prev,
    [id]: false,
  }));
}

  return (
    <>
      
        {openWindows.ai && (
  <AIAssistant
    zIndex={activeWindow === "ai" ? 20 : 10}
    onFocus={() => setActiveWindow("ai")}
    onClose={() => closeWindow("ai")}
  />
)}

      
        {openWindows.files && (
  <FileExplorer
    zIndex={activeWindow === "files" ? 20 : 10}
    onFocus={() => setActiveWindow("files")}
    onClose={() => closeWindow("files")}
  />
)}

      <Dock
        onOpen={openWindow}
      />
    </>
  );
}