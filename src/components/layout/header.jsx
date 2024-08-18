import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import {
    AuditOutlined, HomeOutlined, SettingOutlined,
    UsergroupAddOutlined, LoginOutlined, AliwangwangOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.services';

const Header = () => {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Data đã được nạp useContext lúc login
    const { user, setUser } = useContext(AuthContext);

    const onClick = (e) => {
        setCurrent(e.key);
    };

    useEffect(() => {
        if (location && location.pathname) {
            const allRoutes = ["user", "books"];
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname);
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent("home");
            }
        }
    }, [location])


    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            // Clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Logut thành công.");

            // redirect page home
            navigate("/");
        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/user"}>Users</Link>,
            key: 'user',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Book</Link>,
            key: 'books',
            icon: <AuditOutlined />,
        },

        ...(!user.id ? [{
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />
        }] : []),

        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                    key: 'logout',
                }
            ],
        }] : []),
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
}

export default Header