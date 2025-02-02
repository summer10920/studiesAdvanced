const handleClick = () => console.log('is click event!!');
const MyButton = ({ children }) => <button onClick={handleClick}>{children}</button>;

export default MyButton;
