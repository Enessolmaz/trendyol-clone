import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./Components/Layout";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Trendyol</title>
      <body className={inter.className +  " bg-[#131313] min-h-screen "}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
