import "./globals.css";
import GlobalUI from "../components/ui/GlobalUI";

export const metadata = {
  title: "Critter & Friends",
  description: "Master Project in Interactive Digital Media",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalUI />
        {children}
      </body>
    </html>
  );
}