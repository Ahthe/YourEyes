import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="manifest" href="manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-title" content="visionarypath" />
        <meta name="application-name" content="visionarypath" />
        <meta name="title" content="visionarypath" />
        <title key="title">visionarypath</title>
        <meta
          name="description"
          content="An AI-powered lens into the world for the visually impaired."
        />
      </Head>
      <body className="overscroll-none w-screen h-screen overflow-hidden margin-0">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
