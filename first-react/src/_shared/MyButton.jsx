const handleClick = () => console.log('is click event!!');
const MyButton = ({ children }) => {
  // console.log('MyButton rendered');
  return <button onClick={handleClick}>{children}</button>;
};

export default MyButton;
