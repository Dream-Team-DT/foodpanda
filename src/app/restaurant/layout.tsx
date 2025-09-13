import Footer from "./_components/shared/Footer";
import Header from "./_components/shared/Header";
import Sidebar from "./_components/shared/Sidebar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="container relative mx-auto xl:grid grid-cols-9 gap-5 2xl:gap-12 mt-4">
        <div className="fixed xl:static top-0 h-screen z-40 xl:block col-span-2">
          <div className="sticky top-[100px] xl:p-4 h-[calc(100vh-65px)] xl:h-[calc(100vh-100px)]">
            <Sidebar />
          </div>
        </div>

        <main className="px-4 col-span-7 mt-6">{children}</main>
      </div>
      <Footer />
    </>
  );
}
