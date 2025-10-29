"use client";

import type { ReactElement } from "react";

import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";

import type { TabOption } from "@/types/charts";

type TabsHeaderProps = {
  tabOptions: TabOption[];
  currentTab: string;
  onTabChange: (tabName: string) => void;
};

function TabsHeader({
  tabOptions,
  currentTab,
  onTabChange,
}: TabsHeaderProps): ReactElement {
  const tabIndex = tabOptions.findIndex(tab => tab.name === currentTab);

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    const selectedTab = tabOptions[newIndex].name;
    onTabChange(selectedTab);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Tabs
      value={tabIndex !== -1 ? tabIndex : 0}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons={!!isMobile}
      allowScrollButtonsMobile={!!isMobile}
    >
      {tabOptions.map(tab => (
        <Tab key={tab.name} label={tab.label} />
      ))}
    </Tabs>
  );
}

export default TabsHeader;
