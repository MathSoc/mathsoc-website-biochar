"use client";

import "./tabs.scss";
import React, { useState } from "react";

interface TabData {
  id: string;
  title: string;
  contents: React.ReactNode;
}

export default function Tabs({ tabs }: { tabs: TabData[] }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const isTabActive = (tab: TabData) => tab.id === activeTabId;

  return (
    <div className="tabs">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${isTabActive(tab) ? " active" : ""}`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tabs-body">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-contents ${isTabActive(tab) ? " active" : ""}`}
          >
            {tab.contents}
          </div>
        ))}
      </div>
    </div>
  );
}
