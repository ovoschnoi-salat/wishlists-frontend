import {Tabbar} from '@telegram-apps/telegram-ui';
import {FC, useState} from 'react';

import {Page} from '@/components/Page.tsx';
import {Icon28Actions} from "@/icons/28/Actions.tsx";
import {Icon28Group} from "@/icons/28/Group.tsx";
import {Icon28Person} from "@/icons/28/Person.tsx";
import { Outlet } from "react-router";
import {useNavigate} from "react-router-dom";

enum Tab {
  MyLists="MyLists",
  Friends = "Friends",
  Profile = "Profile",
  InitData = "InitData",
  ThemeParams = "ThemeParams",
  LaunchParams = "LaunchParams",
}

export const IndexPage: FC = () => {
  const [activeTab, setActiveTab] = useState(Tab.MyLists);


  const navigate = useNavigate();
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    switch (tab) {
      case Tab.MyLists:
        navigate('/')
        break
      case Tab.Friends:
        navigate('/')
        break
      case Tab.Profile:
        navigate('/')
        break
      case Tab.InitData:
        navigate('/init-data')
        break
      case Tab.ThemeParams:
        navigate('/theme-params')
        break
      case Tab.LaunchParams:
        navigate('/launch-params')
        break
    }
  };

  return (
    <Page back={false}>
      <Outlet />
      {/* Tab Bar */}
      <Tabbar>
        <Tabbar.Item
          key='Tab.MyLists'
          text="My Lists"
          selected={activeTab === Tab.MyLists}
          onClick={() => handleTabChange(Tab.MyLists)}
        >
          <Icon28Actions></Icon28Actions>
        </Tabbar.Item>

        <Tabbar.Item
          key="friends"
          text="Friends"
          selected={activeTab === Tab.Friends}
          onClick={() => handleTabChange(Tab.Friends)}
        >
          <Icon28Group></Icon28Group>
        </Tabbar.Item>
        <Tabbar.Item
          key="profile"
          text="Profile"
          selected={activeTab === Tab.Profile}
          onClick={() => handleTabChange(Tab.Profile)}
        >
          <Icon28Person></Icon28Person>
        </Tabbar.Item>
        <Tabbar.Item
          key="init-data"
          text="Init data"
          selected={activeTab === Tab.InitData}
          onClick={() => handleTabChange(Tab.InitData)}
        >
          <Icon28Person></Icon28Person>
        </Tabbar.Item>
        <Tabbar.Item
          key="theme-params"
          text="Theme params"
          selected={activeTab === Tab.ThemeParams}
          onClick={() => handleTabChange(Tab.ThemeParams)}
        >
          <Icon28Person></Icon28Person>
        </Tabbar.Item>
        <Tabbar.Item
          key="launch-params"
          text="Launch params"
          selected={activeTab === Tab.LaunchParams}
          onClick={() => handleTabChange(Tab.LaunchParams)}
        >
          <Icon28Person></Icon28Person>
        </Tabbar.Item>
      </Tabbar>
    </Page>
  );
};
