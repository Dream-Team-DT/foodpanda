import Footer from "./_components/shared/footer/Footer";
import Navbar from "./_components/shared/navbar/Navbar";


export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
