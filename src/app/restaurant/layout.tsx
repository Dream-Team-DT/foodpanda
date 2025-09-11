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
        <div className="hidden xl:block col-span-2">
          <div className="sticky top-[100px] p-4 h-[calc(100vh_-_100px)]">
            <div className="size-full border border-fp-gray rounded-2xl">
              <Sidebar />
            </div>
          </div>
        </div>

        <main className="px-4 col-span-7 mt-6">{children}</main>
      </div>
      <Footer />
    </>
  );
}
