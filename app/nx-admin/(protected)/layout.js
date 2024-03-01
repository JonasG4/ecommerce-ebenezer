import Siderbar from "@/components/navs/admin/siderbar";

export const metadata = {
  title: "Dashboard"
}

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="flex w-full max-h-screen bg-gray-100">
        <Siderbar />
        <section className="w-full flex flex-col overflow-hidden">
          <div className="w-full h-full overflow-hidden">
            {children}
          </div>
        </section>
      </div>
    </>
  );
}
