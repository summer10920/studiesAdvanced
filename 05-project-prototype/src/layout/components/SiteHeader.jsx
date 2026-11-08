import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import SiteNav from './SiteNav.jsx';
import Icon from '../../_shared/Icon.jsx';

const item = ({ isActive }) =>
  `inline-flex min-h-11 items-center rounded-full px-3 font-bold ${isActive ? 'bg-action text-white' : 'text-ink hover:bg-mist'}`;

export default function SiteHeader() {
  const { pathname } = useLocation();
  const admin = pathname.startsWith('/admin');
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const account = (
    <Button
      component={Link}
      to={admin ? '/admin/login' : '/login'}
      onClick={close}
    >
      {admin ? '後台登入' : '登入'}
    </Button>
  );

  const links = (id) =>
    admin ? (
      <nav id={id} className="flex flex-col gap-1 md:flex-row md:items-center">
        <NavLink to="/admin" end className={item} onClick={close}>
          行程管理
        </NavLink>
        <NavLink to="/admin/bookings" className={item} onClick={close}>
          報名清單
        </NavLink>
      </nav>
    ) : (
      <SiteNav onNavigate={close} id={id} />
    );

  return (
    <AppBar id="site-header" position="sticky" component="header">
      <a className="skip" href="#content">
        跳到內容
      </a>
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link
          to={admin ? '/admin' : '/'}
          className="font-serif text-2xl font-semibold text-ink"
        >
          {admin ? '洛奇旅行 · 後台' : '洛奇旅行'}
        </Link>
        <Button
          id="nav-toggle"
          className="md:hidden"
          variant="outlined"
          startIcon={<Icon name="menu" />}
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
        >
          選單
        </Button>
        <div className="hidden items-center gap-1 md:flex">
          {links('site-nav')}
          {account}
        </div>
      </div>
      <Drawer anchor="right" open={open} onClose={close}>
        <div id="site-drawer" className="flex flex-col gap-2 p-4">
          {links(undefined)}
          {account}
        </div>
      </Drawer>
    </AppBar>
  );
}
