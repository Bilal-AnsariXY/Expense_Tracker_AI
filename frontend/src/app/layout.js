

import "./globals.css";

import ReduxProvider from "../store/ReduxProvider";

export const metadata = {
  title: "Expense Tracker AI",
  description: "Expense Tracker with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}