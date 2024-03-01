import { ToastGlobal } from "@/components/toast";

export default function AdminLayout({ children }) {
  return (
    <>
    <ToastGlobal />
    {children}
    </>
  );
}
