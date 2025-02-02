import MyButton from '../MyButton/MyButton';

const MyForm = ({ onLokiSubmit, onLokiChange }) => (
  <form onSubmit={onLokiSubmit}>
    <input type="text" placeholder="請輸入內容" onChange={onLokiChange} />
    <MyButton>提交</MyButton>
    <hr />
  </form>
);

export default MyForm;
