import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Contact.css';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  // 表單驗證
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
    }

    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子郵件';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '電子郵件格式不正確';
    }

    if (!formData.message.trim()) {
      newErrors.message = '請輸入訊息內容';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '訊息內容至少需要 10 個字';
    }

    return newErrors;
  };

  // 處理輸入變化，將form 資料存到 state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const singleValidate = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        if (!value.trim()) setErrors((prev) => ({ ...prev, name: '請輸入姓名' }));
        else setErrors((prev) => ({ ...prev, name: '' }));
        break;
      case 'email':
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, email: '請輸入電子郵件' }));
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          setErrors((prev) => ({ ...prev, email: '電子郵件格式不正確' }));
        } else {
          setErrors((prev) => ({ ...prev, email: '' }));
        }
        break;
      case 'message':
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, message: '請輸入訊息內容' }));
        } else if (value.trim().length < 10) {
          setErrors((prev) => ({ ...prev, message: '訊息內容至少需要 10 個字' }));
        } else {
          setErrors((prev) => ({ ...prev, message: '' }));
        }
        break;
    }
  };

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // 因為 return 提前結束函式，所以不會繼續往下執行
    }

    // <!-- 在真實應用中，這裡會是發送表單資料到後端的邏輯 -->
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // 模擬發送成功
        // alert(`訊息已送出！\n 姓名：${formData.name}\nEmail：${formData.email}`);

        // 🌟 使用 navigate 導航到作品列表
        navigate('/lesson02/projects', {
          state: { message: '感謝您的聯絡，我會盡快回覆！' },
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contact-container">
      <h1>📧 聯絡我</h1>
      <p className="contact-intro">有任何問題或合作機會歡迎與我聯絡！</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">姓名 *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={singleValidate}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">電子郵件 *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={singleValidate}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">訊息內容 *</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            onBlur={singleValidate}
            className={errors.message ? 'error' : ''}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-submit"
            disabled={Object.values(formData).includes('') || Object.values(errors).join('')}
          >
            送出訊息
          </button>
          <button type="button" onClick={() => navigate('/lesson02/projects')} className="btn-cancel">
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
