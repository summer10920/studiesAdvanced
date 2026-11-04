import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NavLinks from './NavLinks.jsx';
import Icon from './Icon.jsx';
import { useAuth } from '../auth.jsx';

const item = ({ isActive }) => `inline-flex min-h-11 items-center rounded-full px-3 font-bold ${isActive ? 'bg-action text-white' : 'text-ink hover:bg-mist'}`;

export default function SiteHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const admin = pathname.startsWith('/admin');
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const close = () => { setOpen(false); setAnchor(null); };
  const logout = () => { signOut(); close(); navigate('/'); };

  const label = user?.email ?? '';
  const account = user ? (
    <Button type="button" aria-haspopup="true" aria-expanded={Boolean(anchor)} onClick={(event) => setAnchor(event.currentTarget)} className="gap-2 text-ink">
      <Avatar className="h-8 w-8 bg-action text-base font-bold text-white">{label.slice(0, 1).toUpperCase()}</Avatar>
      {label}
    </Button>
  ) : admin ? <Button component={Link} to="/admin/login" onClick={close}>後台登入</Button> : null;

  const links = (id) => (admin ? (
    <nav id={id} className="flex flex-col gap-1 md:flex-row md:items-center" aria-label="後台">
      <NavLink to="/admin" end className={item} onClick={close}>行程管理</NavLink>
      <NavLink to="/admin/bookings" className={item} onClick={close}>報名清單</NavLink>
    </nav>
  ) : <NavLinks onNavigate={close} id={id} />);

  return (
    <AppBar id="site-header" position="sticky" component="header">
      <a className="skip" href="#content">跳到內容</a>
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link to={admin ? '/admin' : '/'} className="font-serif text-2xl font-semibold text-ink">{admin ? '洛奇旅行 · 後台' : '洛奇旅行'}</Link>
        <Button id="nav-toggle" className="md:hidden" variant="outlined" startIcon={<Icon name="menu" />} aria-expanded={open} aria-controls="site-drawer" onClick={() => setOpen(true)}>選單</Button>
        <div className="hidden items-center gap-1 md:flex">
          {links('site-nav')}
          {account}
        </div>
      </div>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        {admin ? null : <MenuItem component={Link} to="/me" onClick={close}>我的報名</MenuItem>}
        <MenuItem onClick={logout}>登出</MenuItem>
      </Menu>
      <Drawer anchor="right" open={open} onClose={close}>
        <div id="site-drawer" className="flex flex-col gap-2 p-4">
          {links(undefined)}
          {user ? (
            <Button type="button" aria-haspopup="true" onClick={(event) => setAnchor(event.currentTarget)} className="justify-start gap-2 text-ink">
              <Avatar className="h-8 w-8 bg-action text-base font-bold text-white">{label.slice(0, 1).toUpperCase()}</Avatar>
              {label}
            </Button>
          ) : admin ? <Button component={Link} to="/admin/login" onClick={close}>後台登入</Button> : null}
        </div>
      </Drawer>
    </AppBar>
  );
}
