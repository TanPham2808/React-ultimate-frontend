import { useEffect, useState } from "react";
import { Input, notification, Modal } from 'antd';
import { updateUserAPI } from '../../services/api.services';

const UpdateUserModel = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if (dataUpdate) {
            setFullName(dataUpdate.fullName);
            setId(dataUpdate._id);
            setPhoneNumber(dataUpdate.phone);
        }
    }, [dataUpdate])

    const handleSubmit = async () => {
        const res = await updateUserAPI(id, fullName, phoneNumber)
        if (res.data) {
            notification.success({
                message: "Edit user",
                description: "Cập nhật user thành công"
            })
            resetAndCloseModel();
            await loadUser();
        } else {
            notification.error({
                message: "Error edit user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModel = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setId("");
        setPhoneNumber("");
        setDataUpdate(null)
    }

    return (
        <Modal
            title="Update User"
            open={isModalUpdateOpen}
            onOk={() => { handleSubmit() }}
            onCancel={() => { resetAndCloseModel() }}
            maskClosable={false}
            okText={"Save"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        onChange={(event) => setId(event.target.value)}
                        disabled={true}
                    />
                </div>
                <div>
                    <span>FullName</span>
                    <Input
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default UpdateUserModel