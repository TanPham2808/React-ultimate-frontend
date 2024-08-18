import './style.css';

const MyComponent = () => {
    const a = 'test'
    const b = 123
    const objectTan = {
        ten: "Pham Xuan Tan",
        tuoi: 25
    }

    return (
        <>
            <div className='child'>Ta là Component {objectTan.ten}</div>
            <div className='child'>Ta là Component {JSON.stringify(objectTan)}</div>
        </>
    );
}

// Chỉ xuất ra duy nhất 1 component (1 biến)
export default MyComponent;