import MyButton from '../../_shared/MyButton';

const MyForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表單預設提交行為
    console.log('submit');
  };

  const handelChangeText = (e) => {
    console.log(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="請輸入內容" onChange={handelChangeText} />
      <MyButton>提交</MyButton>
      <hr />
    </form>
  );
};

export default MyForm;
