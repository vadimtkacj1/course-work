import VehicleRegistration from "./components/VehicleRegistration/VehicleRegistration"
import
{ Layout }
from
"antd"
;
import { CarOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider, Menu } = Layout;
import Icon from "../../assets/icon.svg"

function MainPage({handleLogOut}) {
  return (
    <Layout style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: "#05327a"
        }}
      >
        <img src={Icon} alt="icon"  style={{height: "85%"}}/>
        <div style={{color: "#ffffff", cursor: "pointer"}} onClick={handleLogOut}>Log out</div>
      </Header>
      <Content style={{backgroundColor: "#ffffff", display: "flex", flex: 1, padding: "50px 50px 0px 50px"}}>
        <VehicleRegistration />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
       Created by Vadim Tkachenko ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  )
}

export default MainPage
