import { Button, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createBookAPI } from "../../services/api.book.services";

const CreateBook = (props) => {
    const { loadBook } = props;
    const [modalCreateOpen, setModalCreateOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
        const res = await createBookAPI(
            values.mainText,
            values.author,
            values.price,
            values.quantity
        )
        if (res.data) {
            setLoading(false)
            notification.success({
                message: "Create book",
                description: "Thêm sách thành công"
            })
            loadBook();
        } else {
            notification.error({
                message: "Create book error",
                description: JSON.stringify(res.message)
            })
        }

        // Clear Data
        form.setFieldsValue({
            mainText: "",
            author: "",
            price: "",
            quantity: ""
        })

        setModalCreateOpen(false);
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table Book</h3>
                    <Button
                        type="primary"
                        onClick={() => setModalCreateOpen(true)}
                    >
                        Create Book
                    </Button>
                </div>
            </div>
            <Modal
                title="Create book"
                open={modalCreateOpen}
                onOk={() => form.submit()}
                okButtonProps={{
                    loading: loading
                }}
                onCancel={() => { setModalCreateOpen(false) }}
                okText={"Create"}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: 'Không để trống tiêu đề sách!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Không để trống tên tác giả!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Không để trống giá tiền!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Không để trống số lượng !',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CreateBook;