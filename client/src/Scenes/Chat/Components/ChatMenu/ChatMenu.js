import React, { useContext } from "react";
import { Menu, Icon } from "antd";
import { ChatMenuContext } from "../../ChatMenuContext";
import "./ChatMenu.css";
import UserInMenu from "./Components/UserInMenu";
import Notifications from "react-notify-toast";
const { SubMenu, Item } = Menu;

const MenuChat = () => {
  const [MenuContext] = useContext(ChatMenuContext);
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  const onOpenChange = async OKeys => {
    MenuContext.setIBlocked(await MenuContext.getIBlocked());
    MenuContext.setIMatched(await MenuContext.getIMatched());
    MenuContext.setIVisited(await MenuContext.getIVisited());
    MenuContext.setILiked(await MenuContext.getILiked());
    MenuContext.setLikedMe(await MenuContext.getLikedMe());
    MenuContext.setVisitedMe(await MenuContext.getVisitedMe());
    const latestOpenKey = OKeys.find(
      key => MenuContext.openKeys.indexOf(key) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      MenuContext.setOpenKeys(OKeys);
    } else {
      MenuContext.setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={MenuContext.openKeys}
      onOpenChange={onOpenChange}
      className="Menu"
      style={{ width: "30%" }} // avirer pour avoir la bonne taille
    >
      <Notifications />
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="check" />
            <span>Matched</span>
          </span>
        }
      >
        {MenuContext.iMatched.map(el => {
          return (
            <Menu.Item key={el.uuid + "iMatched"}>
              <UserInMenu data={el} matched={true} />
            </Menu.Item>
          );
        })}
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
          {MenuContext.iLiked.map(el => {
            return (
              <Menu.Item
                style={{ paddingLeft: "0px" }}
                key={el.uuid + `iLiked`}
              >
                <UserInMenu data={el} />
              </Menu.Item>
            );
          })}
        </SubMenu>
        <SubMenu key="sub21" title="LIKED ME">
          {MenuContext.likedMe.map(el => {
            return (
              <Item
                className="Item"
                style={{ paddingLeft: "0px" }}
                key={el.uuid}
              >
                <UserInMenu className="Item" data={el} />
              </Item>
            );
          })}
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
          {MenuContext.visitedMe.map(el => {
            return (
              <Menu.Item key={el.uuid}>
                <UserInMenu data={el} />
              </Menu.Item>
            );
          })}
        </SubMenu>
        <SubMenu key="sub41" title="VISITED">
          {MenuContext.iVisited.map(el => {
            return (
              <Menu.Item key={el.uuid}>
                <UserInMenu data={el} />
              </Menu.Item>
            );
          })}
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
        {MenuContext.iBlocked.map(el => {
          return (
            <Menu.Item key={el.uuid}>
              <UserInMenu data={el} />
            </Menu.Item>
          );
        })}
      </SubMenu>
    </Menu>
  );
};

export default MenuChat;
