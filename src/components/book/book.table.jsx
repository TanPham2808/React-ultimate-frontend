import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Popconfirm, Table } from "antd";
import UpdateBook from "./update.book";
import { useState } from "react";
import { deleteBookAPI } from "../../services/api.book.services";
import DetailBook from "./detail.book";

const BookTable = (props) => {
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState('');
    const [dataDetail, setDataDetail] = useState('');

    const { dataBook, loadBook,
        current, pageSize, total,
        setCurrent, setPageSize, loadingTable } = props;

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current) //Convert từ string sang number
            }
        }

        //nếu thay đổi tổng số phần tử : pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize) //"5" => 5
            }
        }
    };

    const handleDeletebook = async (id) => {
        const res = await deleteBookAPI(id)
        if (res.data) {
            notification.success({
                message: "Delete book",
                description: "Xóa sách thành công"
            })
            loadBook();
        } else {
            notification.error({
                message: "Delete book error",
                description: JSON.stringify(res.message)
            })
        }
    };

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                );
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            render: (_, record) => {
                return (
                    <a href='#'
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setIsModalDetailOpen(true);
                            setDataDetail(record);
                        }}>{record.mainText}</a>
                );
            }
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text) => {
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency', currency: 'VND'
                }).format(text)
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true)
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />

                    <Popconfirm
                        title="Xóa sách"
                        description="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDeletebook(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined style={{ color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                rowKey={"_id"}
                dataSource={dataBook}
                columns={columns}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
                loading={loadingTable}
            />;

            <UpdateBook
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                loadBook={loadBook}
            />

            <DetailBook
                isModalDetailOpen={isModalDetailOpen}
                setIsModalDetailOpen={setIsModalDetailOpen}
                dataDetail={dataDetail}
            />

        </>
    )
}

export default BookTable;