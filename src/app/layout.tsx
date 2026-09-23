import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#d4af37",
};
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/site/navbar";
import { withBasePath } from "@/lib/paths";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "IPvsem.ru — Сообщество Авторов",
  description:
    "Депонирование, патентование, стратегия и типография в одном экспертном центре ПатентВсем. Свидетельства, которые принимают суды. Методички, которых нет у других.",
  keywords: [
    "Сообщество Авторов",
    "депонирование",
    "патент",
    "Роспатент",
    "интеллектуальная собственность",
    "авторское право",
    "типография",
    "патентный портфель",
    "ПатентВсем",
  ],
  authors: [{ name: "Сообщество Авторов" }],
  icons: {
    icon: withBasePath("/LOGO.png"),
  },
  openGraph: {
    title: "IPvsem.ru — Сообщество Авторов",
    description:
      "Ваш нематериальный актив под защитой экспертов. Депонирование за 24 часа, регистрация в Роспатенте, стратегия портфеля и типография.",
    siteName: "IPvsem.ru — Сообщество Авторов",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t='light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${roboto.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}