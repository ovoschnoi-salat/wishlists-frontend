import {FC, useState} from 'react';
import {Outlet} from "react-router";
import {useNavigate} from "react-router-dom";

import {Tabbar} from '@telegram-apps/telegram-ui';

import {Page} from '@/components/Page.tsx';
import {Icon28Actions} from "@/icons/28/Actions.tsx";
import {Icon28Group} from "@/icons/28/Group.tsx";
import {Icon28Person} from "@/icons/28/Person.tsx";

import "./PageWithTabbar.css";

enum Tab {
  MyLists = "MyLists",
  Friends = "Friends",
  Profile = "Profile",
  InitData = "InitData",
  ThemeParams = "ThemeParams",
  LaunchParams = "LaunchParams",
}

// const styles = {
//   paddingBottom: 'calc(var(--tg-viewport-content-safe-area-inset-bottom) + var(--tg-viewport-safe-area-inset-bottom))',
// }

export const PageWithTabbar: FC = () => {
  const [activeTab, setActiveTab] = useState(Tab.MyLists);

  interface tab {
    tabEnum: Tab,
    title: string,
    icon: any,
    navLink: string,
  }

  const tabs: tab[] = [
    {
      tabEnum: Tab.MyLists,
      title: "My lists",
      icon: <Icon28Actions/>,
      navLink: "/",
    },
    {
      tabEnum: Tab.Friends,
      title: "Friends",
      icon: <Icon28Group/>,
      navLink: "/friends",
    },
    {
      tabEnum: Tab.Profile,
      title: "Profile",
      icon: <Icon28Person/>,
      navLink: "/",
    },
    {
      tabEnum: Tab.InitData,
      title: "Init data",
      icon: <Icon28Person/>,
      navLink: "/init-data",
    },
    {
      tabEnum: Tab.ThemeParams,
      title: "Theme params",
      icon: <Icon28Person/>,
      navLink: "/theme-params",
    },
    {
      tabEnum: Tab.LaunchParams,
      title: "Launch params",
      icon: <Icon28Person/>,
      navLink: "/launch-params",
    },
  ]

  const navigate = useNavigate();

  const handleTabClick = (tab: Tab, link: string) => {
    setActiveTab(tab)
    navigate(link)
  }

  return <Page back={false}>
    <div style={{paddingBottom: "100px"}}>
      <Outlet/>
    </div>

    <Tabbar>
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
  </Page>
};
