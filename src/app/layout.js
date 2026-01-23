export const metadata = {
  title: "Minimal Portfolio",
  description: "The Most fanstastic and Flawless Portfolio in the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
