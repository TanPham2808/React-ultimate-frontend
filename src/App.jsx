
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import { Outlet } from 'react-router-dom'
import { getAccountAPI } from './services/api.services'
import { useContext, useEffect } from 'react'
import { AuthContext } from './components/context/auth.context'
import { Spin } from 'antd'

const App = () => {

  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, [])

  const fetchUserInfo = async () => {
    // Trạng thái loading khi Refesh F5
    setIsAppLoading(false); // true sẽ là loading (tạm thời tắt)

    const res = await getAccountAPI();
    if (res.data) {
      setIsAppLoading(false);
      setUser(res.data.user)
    }
  }

  return (
    <>
      {isAppLoading === true ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
          <Spin />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>}
    </>
  )
}

export default App
