import { Drawer, Input } from "antd"

const DetailBook = (props) => {
    const { isModalDetailOpen, setIsModalDetailOpen, dataDetail } = props;

    return (
        <>
            <Drawer
                title="Thông tin sách"
                onClose={() => setIsModalDetailOpen(false)}
                open={isModalDetailOpen}>
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <p>Tiêu đề: {dataDetail.mainText}</p>
                        <br></br>
                        <p>Tác giả: {dataDetail.author}</p>
                        <br></br>
                        <p>Thể loại: {dataDetail.category}</p>
                        <br></br>
                        <p>Giá tiền:
                            {Intl.NumberFormat('vi-VN', {
                                style: 'currency', currency: 'VND'
                            }).format(dataDetail.price)}
                        </p>
                        <br></br>
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
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} />
                        </div>
                    </div>

                </div>
            </Drawer>
        </>
    )
}

export default DetailBook