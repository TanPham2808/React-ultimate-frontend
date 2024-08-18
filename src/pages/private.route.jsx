import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link, Navigate } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    // Đăng nhập rồi
    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }

    //Xử lý chuyển về trang lỗi (tùy thích)
    return (
        <Result
            status="403"
            title="Unauthorize!"
            subTitle={"Bạn cần đăng nhập để đăng nhập nguồn tài nguyên này"}
            extra={<Button type="primary">
                <Link to="/login">
                    <span>Login Page</span>
                </Link>
            </Button>}
        />
    );

    // Hoặc có thể chuyển tới trang Login
    //return (<Navigate to="/login" />);
}

export default PrivateRoute