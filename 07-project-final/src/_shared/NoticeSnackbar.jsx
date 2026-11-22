import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function NoticeSnackbar({ notice, onClose }) {
  return (
    <Snackbar
      open={Boolean(notice)}
      autoHideDuration={3200}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity="success" variant="filled" onClose={onClose}>
        {notice}
      </Alert>
    </Snackbar>
  );
}
