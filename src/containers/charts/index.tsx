/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import TabsHeader from "@/components/TabsHeader";
import { tabOptions } from "@/constants/charts";

export default function ChartsClient() {
  const [currentTab, setCurrentTab] = useState(tabOptions[0].name);

  // Read from URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      const tabExists = tabOptions.some(tab => tab.name === tabParam);
      if (tabParam && tabExists) {
        setCurrentTab(tabParam);
      }
    }
  }, []);

  // When tab changes, update URL
  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", newTab);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const selectedTab = tabOptions.find(tab => tab.name === currentTab) ?? tabOptions[0];
  const ActiveComponent = selectedTab.component;

  return (
    <Box>
      <TabsHeader
        tabOptions={tabOptions}
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
      <Box mt={4}>
        <ActiveComponent />
      </Box>
    </Box>
  );
}
