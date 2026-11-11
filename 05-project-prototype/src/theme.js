import { createElement } from 'react';
import { createTheme } from '@mui/material/styles';

/**
 * 色票來源。main.jsx 會寫進 --loki-*，Tailwind 讀這些變數。
 * 嫩綠 #3FB27F 配白字僅 2.66:1，未達 WCAG AA（大字門檻 3:1 也未過）。
 * 帶字的主按鈕與連結改用 action #1F6B4A（白字 6.44:1），hover #146845（6.78:1）。
 */
export const tokens = {
  primary: '#3FB27F',
  hover: '#2E8F63',
  action: '#1F6B4A',
  actionHover: '#146845',
  accent: '#FFC94A',
  secondary: '#FFC94A',
  ink: '#1F2A44',
  muted: '#3A4350',
  paper: '#FAF8F3',
  mist: '#E7F4EC',
  foam: '#FFF6D6',
  line: '#E4E0D4',
  alert: '#C23B4A',
  white: '#FFFFFF',
};

export const applyTokens = () => {
  Object.entries(tokens).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--loki-${key}`, value);
  });
};

/** Material Symbols 字型 icon（取代 MUI 內建 SVG）。 */
const ms = (name, props = {}) =>
  createElement(
    'span',
    {
      'aria-hidden': 'true',
      ...props,
      className: `material-symbols-outlined ${props.className || ''}`.trim(),
    },
    name,
  );
const SelectArrow = ({ className }) => ms('expand_more', { className });
const CloseIcon = () => ms('close');
const StepIcon = ({ active, completed, icon }) => {
  const base =
    'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold';
  if (completed)
    return createElement(
      'span',
      { className: `${base} bg-action text-white` },
      ms('check', { style: { fontSize: 20 } }),
    );
  return createElement(
    'span',
    {
      className: `${base} ${active ? 'bg-action text-white' : 'bg-line text-muted'}`,
    },
    icon,
  );
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: tokens.action,
      light: tokens.primary,
      dark: tokens.actionHover,
      contrastText: tokens.white,
    },
    secondary: {
      main: tokens.accent,
      dark: '#E8B423',
      contrastText: tokens.ink,
    },
    error: { main: tokens.alert, contrastText: tokens.white },
    info: {
      main: tokens.action,
      light: tokens.mist,
      dark: tokens.actionHover,
      contrastText: tokens.white,
    },
    success: {
      main: tokens.action,
      light: tokens.mist,
      dark: tokens.actionHover,
      contrastText: tokens.white,
    },
    Alert: {
      infoColor: tokens.ink,
      infoStandardBg: tokens.mist,
      infoIconColor: tokens.action,
      successColor: tokens.action,
      successStandardBg: tokens.mist,
      successIconColor: tokens.action,
    },
    text: { primary: tokens.ink, secondary: tokens.muted },
    background: { default: tokens.paper, paper: tokens.white },
    divider: tokens.line,
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Noto Sans TC', ui-sans-serif, sans-serif",
    h1: {
      fontFamily: "'Noto Serif TC', serif",
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Noto Serif TC', serif",
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: "'Noto Serif TC', serif",
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.35,
    },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '1rem', lineHeight: 1.7 },
    button: {
      fontFamily: "'Noto Sans TC', sans-serif",
      fontWeight: 700,
      fontSize: '1rem',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          minHeight: 44,
          paddingInline: 22,
          fontWeight: 700,
        },
        containedPrimary: {
          backgroundColor: tokens.action,
          color: tokens.white,
          '&:hover': { backgroundColor: tokens.actionHover },
        },
        containedSecondary: {
          backgroundColor: tokens.accent,
          color: tokens.ink,
          '&:hover': { backgroundColor: '#E8B423' },
        },
        outlined: {
          borderColor: tokens.line,
          color: tokens.ink,
          '&:hover': {
            borderColor: tokens.action,
            backgroundColor: tokens.mist,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { borderRadius: 999 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 10px 28px rgb(31 42 68 / 8%)',
          backgroundColor: tokens.white,
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 24 } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 16, backgroundColor: tokens.white },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: 'none',
          border: `1px solid ${tokens.line}`,
          backgroundColor: tokens.white,
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: 0 },
          '&:first-of-type, &:last-of-type': { borderRadius: 24 },
        },
      },
    },
    MuiAccordionSummary: {
      defaultProps: { expandIcon: ms('expand_more') },
      styleOverrides: {
        root: {
          minHeight: 56,
          paddingInline: 20,
          '&.Mui-expanded': { minHeight: 56 },
        },
      },
    },
    MuiChip: {
      defaultProps: { deleteIcon: ms('cancel') },
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 700 },
        colorSecondary: { backgroundColor: tokens.accent, color: tokens.ink },
        colorPrimary: { backgroundColor: tokens.action, color: tokens.white },
      },
    },
    MuiAppBar: {
      defaultProps: { color: 'inherit', elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(250 248 243 / 92%)',
          color: tokens.ink,
          backdropFilter: 'blur(14px)',
          borderBottom: `1px solid ${tokens.line}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: { paper: { borderRadius: '0 24px 24px 0', width: 280 } },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 24 } },
    },
    MuiBackdrop: {
      styleOverrides: { root: { backgroundColor: 'rgb(31 42 68 / 45%)' } },
    },
    MuiSelect: {
      defaultProps: { IconComponent: SelectArrow },
    },
    MuiRating: {
      defaultProps: {
        icon: ms('star', { style: { fontVariationSettings: "'FILL' 1" } }),
        emptyIcon: ms('star'),
      },
    },
    MuiStepLabel: {
      defaultProps: { slots: { stepIcon: StepIcon } },
    },
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          success: ms('check_circle'),
          info: ms('info'),
          warning: ms('warning'),
          error: ms('error'),
        },
        slots: { closeIcon: CloseIcon },
      },
      styleOverrides: {
        root: { borderRadius: 16, alignItems: 'center' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: tokens.line },
        head: {
          fontWeight: 700,
          backgroundColor: tokens.mist,
          color: tokens.ink,
        },
      },
    },
  },
});

export default theme;
