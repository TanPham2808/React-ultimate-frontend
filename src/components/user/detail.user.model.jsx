import { Input, Button, notification } from 'antd';
import { Drawer } from 'antd';
import { useState } from 'react';
import { handeUploadFile, updateUserAvatarAPI } from '../../services/api.services';

const DetailUserModel = (props) => {
    const { isModalDetailOpen,
        setIsModalDetailOpen,
        dataDetail,
        setDataDetail,
        loadUser } = props;

    // State phục vụ cho việc lưu trữ file image
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleOnChangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateUserAvatar = async () => {
        // step 1: Upload File
        const res = await handeUploadFile(selectedFile, "avatar");
        if (res.data) {
            // step 2 : Update User
            const newAvatar = res.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(dataDetail._id, dataDetail.fullName, dataDetail.phone, newAvatar);
            if (resUpdateAvatar.data) {
                setIsModalDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();

                notification.success({
                    message: "Update user avarata",
                    description: "Cập nhật thành công"
                })
            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <Drawer title="Detail User"
            onClose={() => {
                setIsModalDetailOpen(false);
                setDataDetail(null)
            }}
            open={isModalDetailOpen}>
            {dataDetail ? <>
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div style={{
                        marginTop: "10px",
                        height: "100px", width: "150px",
                        border: "1px solid #ccc"
                    }}>
                        <img style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "contain"
                        }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                    </div>
                    <div>
                        <label htmlFor='btnUpload'
                            style={{
                                width: "fit-content",
                                background: "orange",
                                marginTop: "15px",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>Upload Avatar
                        </label>
                        <input
                            id='btnUpload'
                            type='file'
                            hidden
                            onChange={(event) => { handleOnChangeFile(event) }}
                        />
                    </div>
                    <div>
                        <span>Full Name</span>
                        <Input
                            value={dataDetail.fullName}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={dataDetail.email}
                        />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input
                            value={dataDetail.phone}
                        />
                    </div>
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                height: "100px", width: "150px",
                            }}>
                                <img style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain"
                                }}
                                    src={preview} />
                                <Button type="primary"
                                    onClick={() => handleUpdateUserAvatar()}>Save</Button>
                            </div>
                        </>
                    }
                </div>
            </> : <><p>Không có data</p></>}
        </Drawer>
    )
}

export default DetailUserModel;