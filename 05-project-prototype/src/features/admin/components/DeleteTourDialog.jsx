import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteTourDialog({ tour, busy, onClose, onConfirm }) {
  return (
    <Dialog open={Boolean(tour)} onClose={onClose}>
      <DialogTitle>刪除這筆行程？</DialogTitle>
      <DialogContent>刪除後，這筆行程不會再出現在列表。</DialogContent>
      <DialogActions className="gap-2 p-4">
        <Button onClick={onClose}>留下</Button>
        <Button
          color="error"
          variant="contained"
          disabled={busy}
          onClick={onConfirm}
        >
          刪除
        </Button>
      </DialogActions>
    </Dialog>
  );
}
