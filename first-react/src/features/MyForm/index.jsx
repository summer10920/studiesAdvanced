import MyButton from '../../_shared/MyButton';

const MyForm = ({ onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="請輸入內容" onChange={onChange} />
      <MyButton>提交</MyButton>
      <hr />
    </form>
  );
};

export default MyForm;
