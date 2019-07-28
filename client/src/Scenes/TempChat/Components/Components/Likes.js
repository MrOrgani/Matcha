import React, { useContext } from 'react'
import {TempChatContext} from './../TempChatContext'
import { Menu, Icon } from "antd";
const { SubMenu } = Menu;

const LikesMe = () => {
    const [likesMe] = useContext(TempChatContext)

    return (
        likesMe.map((e, i) => {return <Menu.Item key={i}>{e.firstName} {e.lastName}</Menu.Item>})
    )
}

const Likes = () => {

    return(
<SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="heart" />
              <span>Likes</span>
            </span>
          }
        >
          <SubMenu key="sub30" title="I LIKED">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub31" title="LIKED ME">
            {LikesMe}
          </SubMenu>
        </SubMenu>
    )
        }

export default Likes