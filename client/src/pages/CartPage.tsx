import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { products } from "./HomePage";
import CollageBackground from "./loading/CollageBackground";

const CART_KEY = "worstbuy-cart";

export default function CartPage() {
  const [cartIds, setCartIds] = useState<number[]>(() => {
    try {
      return JSON.parse(window.localStorage.getItem(CART_KEY) ?? "[]") as number[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const audio = new Audio("/audio/explosion-meme_dTCfAHs.mp3");
    void audio.play().catch((error: unknown) => {
      console.warn("Could not play cart arrival audio.", error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const cartItems = useMemo(() => {
    const quantities = new Map<number, number>();
    cartIds.forEach((id) => quantities.set(id, (quantities.get(id) ?? 0) + 1));
    return [...quantities.entries()]
      .map(([id, quantity]) => ({
        product: products.find((item) => item.id === id),
        quantity,
      }))
      .filter(
        (item): item is { product: (typeof products)[number]; quantity: number } =>
          item.product !== undefined,
      );
  }, [cartIds]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const clearCart = () => {
    window.localStorage.removeItem(CART_KEY);
    setCartIds([]);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#16001f] p-4 text-black sm:p-8">
      <CollageBackground />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 border-b-[6px] border-black bg-[#ff4d35] p-4 shadow-[8px_8px_0_#7c3aed]">
        <a href="/" className="text-3xl font-black tracking-tighter sm:text-5xl">
          WORST<span className="text-[#d7ff00]">BUY</span>
        </a>
        <span className="rotate-2 bg-[#d7ff00] px-2 py-1 text-xs font-black">
          CART OF CONSEQUENCES
        </span>
      </header>

      <section className="relative z-10 mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-[1fr_300px]">
        <div className="border-[6px] border-black bg-[#00e5ff] p-4 shadow-[9px_9px_0_#ff1744]">
          <p className="text-[10px] font-black uppercase tracking-[0.25em]">
            You clicked the button. Incredible.
          </p>
          <h1 className="mt-2 text-5xl font-black leading-none tracking-tighter">
            YOUR BAD
            <br />
            DECISIONS
          </h1>

          {cartItems.length === 0 ? (
            <div className="mt-6 border-[5px] border-dashed border-black bg-[#ff36d7] p-8 text-center">
              <p className="text-6xl">🛒</p>
              <p className="mt-3 text-xl font-black">YOUR CART IS EMPTY.</p>
              <p className="mt-2 text-xs font-bold">
                Even your shopping cart has better judgment than you.
              </p>
              <a
                href="/"
                className="mt-5 inline-block border-[4px] border-black bg-[#d7ff00] px-4 py-3 text-sm font-black shadow-[5px_5px_0_#000]"
              >
                GO MAKE A MISTAKE
              </a>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {cartItems.map(({ product, quantity }, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-3 border-[4px] border-black p-3 shadow-[5px_5px_0_#000] ${product.color}`}
                >
                  <img
                    src={product.correctImage}
                    alt={product.name}
                    className="h-20 w-20 shrink-0 border-[3px] border-black bg-white object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-black">REGRET #{index + 1}</p>
                    <h2 className="truncate text-xl font-black">{product.name}</h2>
                    <p className="text-xs font-bold">
                      ₹{product.price.toLocaleString("en-IN")} × {quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const next = cartIds.filter((id) => id !== product.id);
                      window.localStorage.setItem(CART_KEY, JSON.stringify(next));
                      setCartIds(next);
                    }}
                    className="border-[3px] border-black bg-[#ff1744] px-2 py-2 text-[10px] font-black text-white"
                  >
                    DELETE
                  </button>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit border-[6px] border-black bg-[#ffea00] p-4 shadow-[-8px_8px_0_#00ff9c]">
          <p className="text-[10px] font-black uppercase">Financial damage</p>
          <div className="mt-4 flex items-end justify-between border-b-[4px] border-black pb-3">
            <span className="font-black">Subtotal-ish</span>
            <span className="text-2xl font-black">₹{total.toLocaleString("en-IN")}</span>
          </div>
          <p className="mt-4 text-xs font-black">
            Shipping: FREE* <br />
            *Only emotionally.
          </p>
          <button
            onClick={() => window.alert("PAYMENT FAILED SUCCESSFULLY.")}
            disabled={cartItems.length === 0}
            className="mt-6 w-full border-[4px] border-black bg-[#ff36d7] px-3 py-4 text-lg font-black shadow-[5px_5px_0_#000] disabled:cursor-not-allowed disabled:opacity-50"
          >
            CHECKOUT REGRET →
          </button>
          <button
            onClick={clearCart}
            disabled={cartItems.length === 0}
            className="mt-4 w-full border-[3px] border-black bg-[#7c3aed] px-3 py-2 text-xs font-black text-white disabled:opacity-50"
          >
            CLEAR EVERYTHING
          </button>
          <a
            href="/"
            className="mt-5 block text-center text-xs font-black underline"
          >
            ← RETURN TO BAD SHOPPING
          </a>
        </aside>
      </section>
    </main>
  );
}
