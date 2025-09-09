import localFont from 'next/font/local';

export const Acumin = localFont({
  src: [
    {
      path: '../fonts/Acumin-RPro.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-acumin',
  display: 'swap',
});