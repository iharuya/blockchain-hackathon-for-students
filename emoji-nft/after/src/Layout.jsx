import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import { Main } from "./components/Main"
export const Layout = () => {
  return (
    <>
      <Header />
      <main className="p-4 min-h-screen">
        <Main />
      </main>
      <Footer />
    </>
  )
}
