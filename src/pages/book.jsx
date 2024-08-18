import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchBookAPI } from "../services/api.book.services";
import UpdateBook from "../components/book/update.book";
import CreateBook from "../components/book/create.book";

const BookPage = () => {
    const [dataBook, setDataBook] = useState();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [loadingTable, setLoadingTable] = useState(false);

    const loadBook = async () => {
        setLoadingTable(true);

        const res = await fetchBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }

        setLoadingTable(false);
    }

    useEffect(() => {
        loadBook();
    }, [current, pageSize])

    return (
        <div style={{ padding: "20px" }}>
            <CreateBook loadBook={loadBook} />
            <BookTable
                dataBook={dataBook}
                loadBook={loadBook}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                loadingTable={loadingTable}
            />
        </div>
    )
}

export default BookPage;