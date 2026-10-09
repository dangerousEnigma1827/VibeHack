
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import Captcha from "./pages/Captcha";
import CartPage from "./pages/CartPage";

export default function App() {
  const path = window.location.pathname;

  if (path === "/" || path === "/homepage") {
    return <HomePage />;
  }

  if (path === "/loading") {
    return <LoadingPage onEnterStore={() => window.location.assign("/captcha")} />;
  }

  if (path === "/captcha") {
    return <Captcha onSuccess={() => undefined} />;
  }

  if (path === "/cart") {
    return <CartPage />;
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#16001f] p-8 text-center text-white">
      <div>
        <h1 className="text-6xl font-black">404</h1>
        <p className="mt-3 text-xl">This page was probably out of stock.</p>
      </div>
    </main>
  );
}
