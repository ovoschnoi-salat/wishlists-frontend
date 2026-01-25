import {FC, ReactElement, useEffect, useState, memo} from 'react';
import {Outlet} from "react-router";
import {useLocation, useNavigate} from "react-router";

import {Tabbar} from '@telegram-apps/telegram-ui';

import {Icon28Actions, Icon28Group, Icon28Person, Icon28Settings} from "@/icons/28";

import "./PageWithTabbar.css";

enum Tab {
  MyLists = "MyLists",
  Friends = "Friends",
  Settings = "Settings",
  InitData = "InitData",
  ThemeParams = "ThemeParams",
  LaunchParams = "LaunchParams",
}

// const styles = {
//   paddingBottom: 'calc(var(--tg-viewport-content-safe-area-inset-bottom) + var(--tg-viewport-safe-area-inset-bottom))',
// }

function getCurrentTab(path: string): Tab {
  if (path.startsWith("/friends")) {
    return Tab.Friends
  }
  if (path.startsWith("/settings")) {
    return Tab.Settings
  }
  return Tab.MyLists
}

export const PageWithTabbar: FC = memo(function PageWithTabbar() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(getCurrentTab(location.pathname));
  const [tabbarHeight, setTabbarHeight] = useState(200);

  useEffect(() => {
    const tabbar = document.getElementById("tabbar")
    if (tabbar) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTabbarHeight(tabbar.clientHeight);
    }
  }, [])

  interface tab {
    tabEnum: Tab,
    title: string,
    icon: ReactElement,
    navLink: string,
  }

  const tabs: tab[] = [
    {
      tabEnum: Tab.MyLists,
      title: "My lists",
      icon: <Icon28Actions/>,
      navLink: "/wishlists",
    },
    {
      tabEnum: Tab.Friends,
      title: "Friends",
      icon: <Icon28Group/>,
      navLink: "/friends",
    },
    {
      tabEnum: Tab.Settings,
      title: "Settings",
      icon: <Icon28Settings/>,
      navLink: "/settings",
    },
    {
      tabEnum: Tab.ThemeParams,
      title: "Theme params",
      icon: <Icon28Person/>,
      navLink: "/theme-params",
    },
  ]

  if (import.meta.env.DEV) {
    tabs.push(
      {
        tabEnum: Tab.InitData,
        title: "Init data",
        icon: <Icon28Person/>,
        navLink: "/init-data",
      },
      {
        tabEnum: Tab.LaunchParams,
        title: "Launch params",
        icon: <Icon28Person/>,
        navLink: "/launch-params",
      },
    )
  }

  const navigate = useNavigate();

  const handleTabClick = (tab: Tab, link: string) => {
    if (tab !== activeTab) {
      setActiveTab(tab)
      navigate(link)
    }
  }

  return <>
    <div style={{paddingBottom: tabbarHeight + "px"}}>
      <Outlet/>
    </div>

    <Tabbar id={"tabbar"}>
      {tabs.map((tab: tab) =>
        <Tabbar.Item
          key={tab.tabEnum}
          text={tab.title}
          selected={activeTab === tab.tabEnum}
          onClick={() => handleTabClick(tab.tabEnum, tab.navLink)}
        >
          {tab.icon}
        </Tabbar.Item>
      )}
    </Tabbar>
  </>
});
