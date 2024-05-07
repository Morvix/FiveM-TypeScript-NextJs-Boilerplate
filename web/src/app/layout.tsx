"use client"
import "./globals.css";
import '@mantine/core/styles.css';
import { Provider } from "react-redux";
import store from "@/store";

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider store={store}>
          <MantineProvider>{children}</MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
