import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <main id="content" className="flex-1">
      <title>用 Google 帳號繼續 · 洛奇旅行</title>
      <Dialog
        open
        onClose={() => navigate('/')}
        fullWidth
        maxWidth="xs"
        aria-labelledby="login-title"
      >
        <DialogTitle
          id="login-title"
          className="font-serif text-4xl leading-tight"
        >
          用 Google 帳號繼續
        </DialogTitle>
        <DialogContent>
          <p>
            報名和我的報名會使用 Google 的姓名與 email。我們不另外設定密碼。
          </p>
        </DialogContent>
        <DialogActions className="flex flex-col items-stretch gap-3 px-6 pb-6">
          <Button type="button" variant="contained">
            用 Google 帳號繼續
          </Button>
          <Button type="button" onClick={() => navigate('/')}>
            返回首頁
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
