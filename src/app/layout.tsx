// import type { Metadata } from "next";
// import { ClerkProvider } from "@clerk/nextjs";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "CampusFlow - User",
//   description: "ERP SIH - User side login/signup",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body>{children}</body>
//       </html>
//     </ClerkProvider>
//   );
// }
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ERP Portal",
  description: "Admin & Student login system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
