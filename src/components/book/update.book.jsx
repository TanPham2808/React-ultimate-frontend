import { Form, Input, Modal, notification } from "antd";
import { updateBookAPI } from "../../services/api.book.services";

const UpdateBook = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, loadBook } = props
    const [form] = Form.useForm();

    if (dataUpdate) {
        form.setFieldsValue({
            mainText: dataUpdate.mainText,
            author: dataUpdate.author,
            price: dataUpdate.price,
            quantity: dataUpdate.quantity
        })
    }

    const onFinish = async (values) => {
        const res = await updateBookAPI(
            dataUpdate._id,
            values.mainText,
            values.author,
            values.price,
            values.quantity
        )
        if (res.data) {
            notification.success({
                message: "Update book",
                description: "Cập nhật sách thành công"
            })
            loadBook();

        } else {
            notification.error({
                message: "Update book error",
                description: JSON.stringify(res.message)
            })
        }
        setIsModalUpdateOpen(false);
    }

    return (<>
        <Modal
            title="Basic Modal"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => setIsModalUpdateOpen(false)}>
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
    </>)
}

export default UpdateBook;