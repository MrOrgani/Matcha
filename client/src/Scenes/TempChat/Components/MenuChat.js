import React, {useState, useContext} from "react";
import { Menu, Icon } from "antd";
import {TempChatContext} from './TempChatContext'
import './MenuChat.css'
import UserInMenu from "./Components/UserInMenu"

const { SubMenu, Item } = Menu;

const MenuChat =  () => {
  const [iMatched, likedMe, iLiked, visitedMe, iVisited, iBlocked] = useContext(TempChatContext)
  // submenu keys of first level
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  const [state,setState] = useState({
    openKeys: [""]
  });



  const onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => state.openKeys.indexOf(key) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setState({ openKeys });
    } else {
      setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

    

    return (
      <Menu
        mode="inline"
        openKeys={state.openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 256, height: '100vh' }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="check" />
              <span>Matched</span>
            </span>
          }
          >
        {iMatched.map((el) => {return <Menu.Item key={el.user_id}><UserInMenu data={el}/></Menu.Item>})}
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="heart" />
              <span>Likes</span>
            </span>
          }
          >
          <SubMenu key="sub20" title="I LIKED">
          {iLiked.map((el) => {return <Menu.Item style={{paddingLeft: '0px'}}key={el.user_id}><UserInMenu data={el}/></Menu.Item>})}
          </SubMenu>
          <SubMenu key="sub21" title="LIKED ME" >
          {likedMe.map((el) => {return <Item className='Item' style={{paddingLeft: '0px'}} key={el.user_id}><UserInMenu className='Item' data={el}/></Item>})}
          </SubMenu>
        </SubMenu>
        <SubMenu 
          key="sub4"
          title={
            <span>
              <Icon type="eye" />
              <span>Visited</span>
            </span>
          }
          >
          <SubMenu key="sub40" title="VISITED ME">
          {visitedMe.map((el) => {return <Menu.Item key={el.user_id}><UserInMenu data={el}/></Menu.Item>})}
          </SubMenu>
          <SubMenu key="sub41" title="VISITED">
          {iVisited.map((el) => {return <Menu.Item key={el.user_id}><UserInMenu data={el}/></Menu.Item>})}
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub5"
          title={
            <span>
              <Icon type="close-circle" />
              <span>Blocked</span>
            </span>
          }
          >
          {iBlocked.map((el) => {return <Menu.Item key={el.user_id}><UserInMenu data={el}/></Menu.Item>})}
        </SubMenu>
      </Menu>
    );
  }


export default MenuChat;
