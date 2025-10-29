import { Geist } from "next/font/google";
import { type Metadata } from "next";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Motion Experiments | Next.js + Motion.dev Animation Showcase",
  description:
    "Explore creative UI and animation experiments built with Next.js and Motion.dev. A modern playground for testing smooth transitions, interactive elements, and motion design concepts.",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={`${geist.className} min-h-screen w-full antialiased`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
