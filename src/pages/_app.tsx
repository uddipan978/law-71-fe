import type { AppProps } from "next/app"
import Head from "next/head"
// import { useRouter } from "next/router"
import { ToastContainer } from "react-toastify"
import { ThemeProvider } from "next-themes"
//styles
import "@/assets/styles/globals.css"
import "react-toastify/dist/ReactToastify.css"

// redux
import { Provider } from "react-redux"
import { store, persistor } from "@/toolkit/store"
import { PersistGate } from "redux-persist/integration/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {() => (
          <>
            <Head>
              <title>LAW 71</title>
              {/* <link rel="canonical" href={canonicalUrl} /> */}
              <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=6"
              />
              <meta name="description" content="Generative AI for Lawyers" />
            </Head>
            <ThemeProvider attribute="class" defaultTheme="light">
              <Component {...pageProps} />
            </ThemeProvider>
            <ToastContainer
              position="bottom-center"
              hideProgressBar
              autoClose={2000}
              draggable={false}
              closeButton={false}
              limit={1}
              toastClassName={
                "!bg-fill-light-inverted dark:!bg-fill-dark-inverted !rounded-xl !text-font-light-inverted dark:!text-font-dark-inverted text-p1-regular !px-3 !py-2.5 !min-h-0 !opacity-80"
              }
              className={"!w-fit"}
            />
            </>
        )}
      </PersistGate>
    </Provider>
  )
}
