import Navbar from "@/components/navs/client/navbar";
import Footer from "@/components/navs/client/footer";
import ReduxProvider from "@/redux/Provider";
import { ToastGlobal } from "@/components/toast";

export const metadata = {
  title: "Inicio | Comercial Eben ezer",
};

export default function ClienteLayout({ children }) {
  return (
    <main className="flex flex-col min-h-screen w-full justify-between bg-white">
      <ReduxProvider>
        <ToastGlobal />
        <Navbar />
        <div className="mt-[60px] tablet:mt-[100px]">{children}</div>
        <Footer />
      </ReduxProvider>
    </main>
  );
}
