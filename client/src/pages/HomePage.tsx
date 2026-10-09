
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CollageBackground from "./loading/CollageBackground";

export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  tag: string;
  wrongImage: string;
  correctImage: string;
  color: string;
  locked?: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Air",
    price: 9,
    oldPrice: 999,
    tag: "99% OFF*",
    color: "bg-[#ff36d7]",
    wrongImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: 2,
    name: "Emotional Support Brick",
    price: 499,
    oldPrice: 500,
    tag: "THERAPIST APPROVED*",
    color: "bg-[#d7ff00]",
    locked: true,
    wrongImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  },
  {
    id: 3,
    name: "Invisible Headphones",
    price: 1299,
    oldPrice: 2999,
    tag: "NOW WITH SOUND*",
    color: "bg-[#00e5ff]",
    wrongImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: 4,
    name: "Suspiciously Small Sofa",
    price: 799,
    oldPrice: 8999,
    tag: "FITS ONE EMOTION",
    color: "bg-[#ff6a00]",
    wrongImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
  },
  {
    id: 5,
    name: "Existential Alarm Clock",
    price: 666,
    oldPrice: 1999,
    tag: "WAKE UP TO DREAD",
    color: "bg-[#a855f7]",
    wrongImage: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
  },
  {
    id: 6,
    name: "Premium Nothing",
    price: 4999,
    oldPrice: 5000,
    tag: "ONLY 0 LEFT",
    color: "bg-[#ff1744]",
    locked: true,
    wrongImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500&q=80",
  },
  {
    id: 7,
    name: "Suspicious Banana",
    price: 12,
    oldPrice: 1200,
    tag: "GOVERNMENT CLASSIFIED",
    color: "bg-[#39ff14]",
    wrongImage: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=80",
  },
  {
    id: 8,
    name: "Wi-Fi Enabled Spoon",
    price: 799,
    oldPrice: 899,
    tag: "5G CUTLERY",
    color: "bg-[#ffea00]",
    wrongImage: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80",
  },
  {
    id: 9,
    name: "Motivational Potato",
    price: 39,
    oldPrice: 399,
    tag: "LIFE COACH INCLUDED",
    color: "bg-[#ff8cdb]",
    wrongImage: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80",
  },
  {
    id: 10,
    name: "Luxury Cardboard Box",
    price: 1999,
    oldPrice: 2000,
    tag: "PRESTIGE SQUARE",
    color: "bg-[#00ff9c]",
    locked: true,
    wrongImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500&q=80",
  },
  {
    id: 11,
    name: "One Slightly Used Thought",
    price: 89,
    oldPrice: 999,
    tag: "MIND-BLOWING",
    color: "bg-[#7c3aed]",
    wrongImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80",
  },
  {
    id: 12,
    name: "Portable Monday",
    price: 699,
    oldPrice: 799,
    tag: "WEEKEND NOT INCLUDED",
    color: "bg-[#ff4500]",
    wrongImage: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&q=80",
  },
  {
    id: 13,
    name: "Luxury Air Guitar",
    price: 299,
    oldPrice: 3999,
    tag: "INVISIBLE STRINGS",
    color: "bg-[#00b4d8]",
    wrongImage: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=80",
  },
  {
    id: 14,
    name: "Professional Procrastinator Kit",
    price: 999,
    oldPrice: 1499,
    tag: "DELIVERY NEXT YEAR",
    color: "bg-[#f9a8d4]",
    wrongImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80",
  },
  {
    id: 15,
    name: "The Forbidden Purchase",
    price: 99999,
    oldPrice: 100000,
    tag: "YOU KNOW WHY",
    color: "bg-[#c6ff00]",
    locked: true,
    wrongImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
  },
  {
    id: 16,
    name: "Emergency Fake Mustache",
    price: 73,
    oldPrice: 7300,
    tag: "INSTANT DISGUISE*",
    color: "bg-[#ff36d7]",
    wrongImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=500&q=80",
  },
  {
    id: 17,
    name: "Wi-Fi Enabled Rock",
    price: 808,
    oldPrice: 8080,
    tag: "BUFFERING INCLUDED",
    color: "bg-[#00e5ff]",
    wrongImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=500&q=80",
  },
  {
    id: 18,
    name: "CEO's Emergency Excuse",
    price: 404,
    oldPrice: 4040,
    tag: "BLAME THE ALGORITHM",
    color: "bg-[#ff6a00]",
    wrongImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=80",
  },
  {
    id: 19,
    name: "Single Use Confidence",
    price: 1,
    oldPrice: 10000,
    tag: "EXPIRES IMMEDIATELY",
    color: "bg-[#39ff14]",
    wrongImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
  },
  {
    id: 20,
    name: "Luxury Box of Regret",
    price: 2026,
    oldPrice: 20260,
    tag: "NO RETURNS, NO FEELINGS",
    color: "bg-[#a855f7]",
    wrongImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80",
    correctImage: "https://images.unsplash.com/photo-1601652428538-7d9d9e9c6f7b?w=500&q=80",
  },
];

const cardStyles = [
  { shape: "rounded-[18px_4px_18px_4px]", height: 290, rotate: 0, hover: false, flip: false, vertical: false, imageHeight: 140, layout: "normal" },
  { shape: "rounded-none", height: 220, rotate: 0, hover: false, flip: true, vertical: true, imageHeight: 96, layout: "reverse" },
  { shape: "rounded-[28px]", height: 310, rotate: 0, hover: false, flip: false, vertical: false, imageHeight: 160, layout: "center" },
  { shape: "rounded-[0_24px_0_24px]", height: 250, rotate: -3, hover: false, flip: false, vertical: true, imageHeight: 112, layout: "side" },
  { shape: "rounded-[8px_28px_8px_28px]", height: 340, rotate: 0, hover: false, flip: true, vertical: false, imageHeight: 176, layout: "reverse" },
  { shape: "rounded-full", height: 250, rotate: 0, hover: false, flip: false, vertical: true, imageHeight: 96, layout: "circle" },
  { shape: "rounded-[0_0_28px_0]", height: 270, rotate: 2, hover: false, flip: false, vertical: false, imageHeight: 128, layout: "side" },
  { shape: "rounded-[24px_0_24px_0]", height: 300, rotate: 0, hover: false, flip: true, vertical: true, imageHeight: 144, layout: "reverse" },
  { shape: "rounded-[28px_6px_28px_6px]", height: 230, rotate: 0, hover: false, flip: false, vertical: false, imageHeight: 96, layout: "center" },
  { shape: "rounded-[0_0_0_28px]", height: 350, rotate: -2, hover: false, flip: true, vertical: false, imageHeight: 192, layout: "reverse" },
  { shape: "rounded-[20px_0_20px_0]", height: 240, rotate: 0, hover: false, flip: false, vertical: true, imageHeight: 112, layout: "side" },
  { shape: "rounded-lg", height: 290, rotate: 0, hover: false, flip: false, vertical: false, imageHeight: 160, layout: "normal" },
  { shape: "rounded-[26px_0_0_26px]", height: 260, rotate: 2, hover: false, flip: true, vertical: true, imageHeight: 128, layout: "reverse" },
  { shape: "rounded-[0_26px_0_0]", height: 320, rotate: 0, hover: false, flip: false, vertical: false, imageHeight: 176, layout: "side" },
  { shape: "rounded-[24px_24px_0_24px]", height: 280, rotate: 3, hover: false, flip: true, vertical: false, imageHeight: 144, layout: "center" },
];

const MOVING_PRODUCT_IDS = new Set([1, 3]);
const HOVER_ROTATE_PRODUCT_IDS = new Set([4, 8, 12, 17]);
const HOVER_FLIP_PRODUCT_IDS = new Set([5, 9, 14, 19]);

const portalImages = [
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=700&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80",
  "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=700&q=80",
];

const billboards = [
  {
    title: "THE SALE THAT DEFIES MATH",
    subtitle: "BUY NOTHING. GET NOTHING. SAVE EVERYTHING.",
    color: "bg-[#d7ff00]",
    stamp: "−9000%",
  },
  {
    title: "YOUR WALLET CALLED.",
    subtitle: "WE DECLINED THE CALL.",
    color: "bg-[#ff36d7]",
    stamp: "URGENT-ish",
  },
  {
    title: "LAST CHANCE TO REGRET THIS",
    subtitle: "OFFER MAY HAVE NEVER EXISTED.",
    color: "bg-[#00e5ff]",
    stamp: "ACT NOW??",
  },
];

const widgets = [
  {
    title: "YOU FOUND A COUPON!",
    text: "It expires when you understand the terms.",
    button: "CLAIM MAYBE",
    color: "bg-[#ffea00]",
  },
  {
    title: "CUSTOMER SUPPORT",
    text: "Your estimated wait time is 47 business years.",
    button: "WAIT PATIENTLY",
    color: "bg-[#ff36d7]",
  },
  {
    title: "LOYALTY LEVEL: CONFUSED",
    text: "You earned 0.0003 imaginary points.",
    button: "FEEL SPECIAL",
    color: "bg-[#39ff14]",
  },
];

const playChaosAudio = (src: string) => {
  const audio = new Audio(src);
  audio.play().catch((error: unknown) => {
    console.warn(`Could not play chaos audio: ${src}`, error);
  });
};

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [activeBillboard, setActiveBillboard] = useState(0);
  const [portalIndex, setPortalIndex] = useState(0);
  const [seconds, setSeconds] = useState(47);
  const [widgetIndex, setWidgetIndex] = useState(0);
  const [widgetVisible, setWidgetVisible] = useState(true);
  const [showFinePrint, setShowFinePrint] = useState(false);
  const [productNudges, setProductNudges] = useState<
    Record<number, { count: number; x: number; y: number }>
  >({});
  const [hoverAlert, setHoverAlert] = useState<number | null>(null);
  const [seenHoverAlerts, setSeenHoverAlerts] = useState<Record<number, boolean>>({});

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const nudgeProduct = (productId: number, element: HTMLElement) => {
    setProductNudges((previous) => {
      const current = previous[productId];
      if (current?.count >= 5) return previous;

      const rect = element.getBoundingClientRect();
      const padding = 8;
      const maxDistanceX = window.innerWidth * 0.4;
      const maxDistanceY = window.innerHeight * 0.3;
      const minX = Math.max(-maxDistanceX, padding - rect.left);
      const maxX = Math.min(maxDistanceX, window.innerWidth - padding - rect.right);
      const minY = Math.max(-maxDistanceY, padding - rect.top);
      const maxY = Math.min(maxDistanceY, window.innerHeight - padding - rect.bottom);
      const randomBetween = (min: number, max: number) =>
        min > max ? 0 : min + Math.random() * (max - min);

      return {
        ...previous,
        [productId]: {
          count: (current?.count ?? 0) + 1,
          x: Math.round(randomBetween(minX, maxX)),
          y: Math.round(randomBetween(minY, maxY)),
        },
      };
    });
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPortalIndex((previous) => (previous + 1) % portalImages.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 0) {
          setActiveBillboard((index) => (index + 1) % billboards.length);
          return 23 + Math.floor(Math.random() * 55);
        }
        return previous - 1;
      });
    }, 1000);

    const interruptions = window.setInterval(() => {
      setActiveBillboard((index) => (index + 1) % billboards.length);
      setSeconds(17 + Math.floor(Math.random() * 50));
    }, 11000);

    return () => {
      window.clearInterval(timer);
      window.clearInterval(interruptions);
    };
  }, []);

  useEffect(() => {
    if (widgetVisible) return;

    const timeout = window.setTimeout(() => {
      setWidgetIndex((index) => (index + 1) % widgets.length);
      setWidgetVisible(true);
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [widgetVisible]);

  useEffect(() => {
    const exhaustedProduct = products.find(
      (product) =>
        productNudges[product.id]?.count === 5 && !seenHoverAlerts[product.id],
    );
    if (!exhaustedProduct) return;

    setHoverAlert(exhaustedProduct.id);
    playChaosAudio("/audio/fbi-open-up_dwLhIFf.mp3");
    setSeenHoverAlerts((seen) => ({ ...seen, [exhaustedProduct.id]: true }));
  }, [productNudges, seenHoverAlerts]);

  const currentBillboard = billboards[activeBillboard];
  const currentWidget = widgets[widgetIndex];

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#16001f] text-black selection:bg-[#00ff9c]">
      <CollageBackground />
      {/* HEADER */}
      <header className="relative z-30 flex flex-wrap items-center justify-between gap-3 border-b-[5px] border-black bg-[#ff4d35] px-4 py-3 sm:px-6">
        <a
          href="#"
          className="rotate-[-2deg] text-3xl font-black tracking-tighter sm:text-4xl"
        >
          WORST<span className="text-[#d7ff00]">BUY</span>
          <span className="ml-1 text-xs align-top">®</span>
        </a>

        <div className="flex items-center gap-3 font-black">
          <span className="hidden text-xs uppercase sm:inline">
            The internet's least trusted store
          </span>
          <a
            href="/cart"
            className="border-[3px] border-black bg-[#00e5ff] px-3 py-2 text-sm shadow-[4px_4px_0_#7c3aed] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            CART [{cartCount}]
          </a>
        </div>
      </header>

      {/* MAIN THREE-ZONE LAYOUT */}
      <div className="relative z-10 mx-auto grid max-w-[1900px] grid-cols-1 items-start gap-5 p-3 sm:p-5 lg:grid-cols-[minmax(0,1fr)_100px_minmax(0,1.15fr)] lg:gap-4">

        {/* LEFT: INDEPENDENTLY SCROLLABLE PRODUCT WALL */}
        <section className="relative min-w-0 overflow-hidden lg:sticky lg:top-0 lg:h-[calc(100dvh-76px)] lg:overflow-x-auto lg:overflow-y-scroll lg:overscroll-contain lg:pr-3 lg:pb-8">
          <div className="relative z-10 mb-6 flex items-end justify-between gap-2 border-b-[5px] border-black bg-white/90 pb-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                Catalogue of questionable decisions
              </p>
              <h1 className="text-3xl font-black leading-none tracking-tighter sm:text-4xl">
                HOT MESS<span className="text-[#ff1744]">™</span>
              </h1>
            </div>
            <span className="rotate-6 bg-[#d7ff00] px-2 py-1 text-xs font-black">
              100% REAL*
            </span>
          </div>

          {/* CLUTTERED TWO-DIMENSIONAL PRODUCT WALL */}
          <div className="relative z-10 grid min-w-[1280px] grid-cols-4 items-start gap-x-4 gap-y-7 pb-8 pr-6">
            {filteredProducts.map((product, index) => {
              const style = cardStyles[index % cardStyles.length];
              const fullWidth = [1, 4, 8, 13].includes(index);
              const side = style.layout === "side";
              const circle = style.layout === "circle";
              const nudge = productNudges[product.id];
              const canEscape = MOVING_PRODUCT_IDS.has(product.id) && !product.locked;
              const canDrag = canEscape && nudge?.count >= 5;
              const rotatesOnHover = HOVER_ROTATE_PRODUCT_IDS.has(product.id);
              const flipsOnHover = HOVER_FLIP_PRODUCT_IDS.has(product.id);

              return (
                <motion.article
                  key={product.id}
                  drag={canDrag}
                  dragMomentum={false}
                  whileDrag={{ scale: 1.03, cursor: "grabbing", zIndex: 30 }}
                  onMouseEnter={(event) => {
                    if (canEscape) nudgeProduct(product.id, event.currentTarget);
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.78,
                    rotate: style.rotate * 2,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: nudge?.x ?? 0,
                    y: nudge?.y ?? 0,
                    rotate: style.rotate,
                  }}
                  whileHover={{
                    ...(canEscape ? { scale: 1.035 } : {}),
                    ...(rotatesOnHover ? { rotate: style.rotate + (index % 2 === 0 ? -8 : 8) } : {}),
                    ...(flipsOnHover ? { rotateY: 180 } : {}),
                    ...(canEscape || rotatesOnHover || flipsOnHover ? { zIndex: 20 } : {}),
                  }}
                  transition={{
                    duration: flipsOnHover ? 0.55 : 0.35,
                    delay: (index % 5) * 0.05,
                  }}
                  style={{
                    minHeight: `${style.height}px`,
                    marginTop: `${(index * 11) % 28}px`,
                    marginLeft: `${(index * 13) % 20}px`,
                    perspective: flipsOnHover ? "900px" : undefined,
                    transformStyle: flipsOnHover ? "preserve-3d" : undefined,
                  }}
                  className={`group relative isolate min-w-0 border-[4px] border-black p-3 shadow-[6px_6px_0_#ff00bb] ${
                    chaosColor(index)
                  } ${style.shape} ${canDrag ? "cursor-grab" : ""} ${
                    fullWidth ? "col-span-2" : ""
                  }`}
                >
                  {/* Floating discount sticker */}
                  <span
                    className={`absolute z-20 max-w-[85%] bg-black px-2 py-1 text-[9px] font-black text-[#d7ff00] ${
                      index % 3 === 0
                        ? "right-0 top-5 rotate-12"
                        : index % 3 === 1
                          ? "left-1 top-1 -rotate-12"
                          : "bottom-3 right-1 rotate-6"
                    }`}
                  >
                    {product.tag}
                  </span>

                  {/* Locked product */}
                  {product.locked && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#160018]/90 p-3 text-center text-[#d7ff00] backdrop-blur-[2px]">
                      <span className="text-5xl">🔒</span>
                      <p className="mt-3 text-sm font-black uppercase">
                        ACCESS DENIED
                      </p>
                      <p className="mt-2 text-[10px] font-bold leading-relaxed">
                        ONLY OPENS IF YOU ARE THE MOST MISERABLE MAN.
                      </p>
                      <button
                        onClick={() =>
                          window.alert(
                            "MISERY SCAN FAILED. PLEASE INCREASE YOUR EXISTENTIAL DREAD."
                          )
                        }
                        className="mt-3 border-[3px] border-[#d7ff00] bg-[#ff36d7] px-2 py-2 text-[9px] font-black text-black"
                      >
                        PROVE YOUR MISERY
                      </button>
                    </div>
                  )}

                  {/* Mirrored content, including text, on selected cards */}
                  <div
                    className={`flex min-w-0 flex-col gap-3 ${
                      style.layout === "reverse" ? "flex-col-reverse" : ""
                    } ${side ? "flex-row items-center" : ""} ${
                      circle ? "items-center justify-center text-center" : ""
                    }`}
                    style={
                      style.flip
                        ? { transform: "scaleX(-1)" }
                        : undefined
                    }
                  >
                    {/* Wrong image corrects itself on hover */}
                    <div
                      className={`relative min-w-0 shrink-0 overflow-hidden border-[3px] border-black bg-[#00e5ff] ${
                        side ? "w-[48%]" : "w-full"
                      } ${circle ? "w-[85%] rounded-full" : ""}`}
                      style={{ height: `${style.imageHeight}px` }}
                    >
                      <img
                        src={product.wrongImage}
                        alt={`Mismatched image for ${product.name}`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                      />
                      <img
                        src={product.correctImage}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <span className="absolute bottom-1 left-1 bg-[#ffea00] px-1 py-0.5 text-[8px] font-black">
                        IMAGE ERROR*
                      </span>
                    </div>

                    {/* Variable product typography */}
                    <div className={`min-w-0 flex-1 ${side ? "self-center" : ""}`}>
                      <h2
                        className={`break-words font-black leading-[0.9] tracking-tighter ${
                          style.vertical
                            ? "text-xs sm:text-sm"
                            : index % 3 === 0
                              ? "text-2xl"
                              : "text-base sm:text-lg"
                        }`}
                        style={
                          style.vertical
                            ? {
                                writingMode: "vertical-rl",
                                transform:
                                  index % 2 === 0
                                    ? "rotate(180deg)"
                                    : undefined,
                                maxHeight: "115px",
                              }
                            : undefined
                        }
                      >
                        {product.name}
                      </h2>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-xl font-black">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-black/60 line-through">
                          ₹{product.oldPrice.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <p className="mt-2 text-[9px] font-black uppercase">
                        {index % 3 === 0
                          ? "BUY BEFORE WE CHANGE OUR MINDS"
                          : index % 3 === 1
                            ? "QUESTIONABLE VALUE"
                            : "NO REFUNDS FOR YOUR FEELINGS"}
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={product.locked}
                    onClick={() => {
                      setCartCount((count) => count + 1);
                      const cart = JSON.parse(
                        window.localStorage.getItem("worstbuy-cart") ?? "[]",
                      ) as number[];
                      window.localStorage.setItem(
                        "worstbuy-cart",
                        JSON.stringify([...cart, product.id]),
                      );
                      window.location.assign("/cart");
                    }}
                    className={`relative z-10 mt-3 w-full border-[3px] border-black px-2 py-2 text-[10px] font-black ${
                      product.locked
                        ? "cursor-not-allowed bg-[#777] text-white"
                        : "bg-[#ffea00] hover:bg-[#00e5ff]"
                    }`}
                  >
                    {product.locked
                      ? "LOCKED FOREVER 🔒"
                      : "MAKE A BAD DECISION +"}
                  </button>
                </motion.article>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="border-[5px] border-dashed border-black bg-[#ff36d7] p-6 text-center">
              <p className="text-3xl">🕵️</p>
              <p className="mt-2 font-black">PRODUCT NOT FOUND.</p>
              <p className="text-sm">It has probably changed its identity.</p>
            </div>
          )}

          <button
            onClick={() => setShowFinePrint((visible) => !visible)}
            className="mt-6 w-full border-[3px] border-black bg-[#00e5ff] p-3 text-left text-xs font-black"
          >
            LEGAL NONSENSE — {showFinePrint ? "HIDE −" : "READ MORE +"}
            {showFinePrint && (
              <p className="mt-2 font-normal leading-relaxed">
                Discounts are calculated by our imaginary mathematics
                department. Products may not improve your life. WORSTBUY
                accepts responsibility for absolutely nothing.
              </p>
            )}
          </button>
        </section>

        {/* MIDDLE: TALL VERTICAL SEARCH TOWER */}
        <aside className="relative z-20 min-w-0 lg:sticky lg:top-0 lg:h-[100dvh] lg:max-h-[100dvh] lg:overflow-hidden">
          <div className="border-[4px] border-black bg-[#d7ff00] p-3 shadow-[6px_6px_0_#ff00bb]">
            <div className="flex items-center justify-between lg:flex-col lg:gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest">
                FIND IT
              </span>
              <motion.span
                animate={{ rotate: [0, 180, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl"
              >
                ↯
              </motion.span>
            </div>

            <div className="my-4 rotate-[-2deg] border-[3px] border-black bg-[#ff36d7] p-2">
              <p className="text-center text-[10px] font-black uppercase">
                Search, you coward
              </p>
            </div>

            <label
              htmlFor="worstbuy-search"
              className="block text-center text-xs font-black uppercase leading-tight [writing-mode:vertical-rl] [text-orientation:mixed]"
            >
              FIND YOUR REGRET
            </label>

            <input
              id="worstbuy-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try brick..."
              className="mt-3 block h-64 w-full min-w-0 border-[3px] border-black bg-white px-2 py-3 text-center text-sm font-bold [writing-mode:vertical-rl] [text-orientation:mixed] placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-[#ff36d7]"
            />

            <button
              onClick={() => setQuery("")}
              className="mt-3 w-full border-[3px] border-black bg-[#ff6a00] px-2 py-3 text-xs font-black hover:bg-[#00e5ff]"
            >
              RESET BRAIN ↺
            </button>

            <div className="mt-5 border-t-[3px] border-black pt-4">
              <p className="text-[10px] font-black uppercase">Results left</p>
              <p className="mt-2 text-4xl font-black">
                {filteredProducts.length}
              </p>
            </div>

            <motion.div
              animate={{ rotate: [-4, 4, -4], y: [0, 4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="mt-6 border-[3px] border-black bg-[#a855f7] p-2 text-center"
            >
              <span className="text-2xl">👁️</span>
              <p className="mt-2 text-[10px] font-black">
                WE KNOW WHAT YOU WANT
              </p>
            </motion.div>

            <p className="mt-6 text-center text-[9px] font-black uppercase">
              Search vertically.
              <br />
              Think horizontally.
            </p>
          </div>
        </aside>

        {/* RIGHT: MAIN BILLBOARD AREA */}
        <section className="relative min-w-0">
          {/* Developer damage control */}
          <section className="relative mb-5 border-[4px] border-black bg-[#00e5ff] p-3 shadow-[5px_5px_0_#ff36d7]">
            <span className="absolute -right-2 -top-3 rotate-6 bg-[#ffea00] px-2 py-1 text-[9px] font-black">
              DEFINITELY HUMAN
            </span>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.15em]">
                  Meet the people responsible
                </p>
                <h3 className="mt-1 text-2xl font-black leading-none tracking-tighter sm:text-3xl">
                  THE DEVELOPERS
                </h3>
                <p className="mt-1 max-w-xs text-[10px] font-bold">
                  Two developers. Zero adult supervision.
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <motion.div
                  whileHover={{ rotate: -5, scale: 1.05 }}
                  className="w-20 border-[3px] border-black bg-[#ff36d7] p-1 shadow-[3px_3px_0_#111] sm:w-24"
                >
                  <div className="aspect-square overflow-hidden border-2 border-black bg-white">
                    <img
                      src="/images/muneeb-removebg-preview.png"
                      alt="Muneeb, developer"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="mt-1 text-[10px] font-black">MUNEEB</p>
                </motion.div>
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="w-20 border-[3px] border-black bg-[#d7ff00] p-1 shadow-[3px_3px_0_#111] sm:w-24"
                >
                  <div className="aspect-square overflow-hidden border-2 border-black bg-white">
                    <img
                      src="/images/chinmayi-removebg-preview.png"
                      alt="Chinmayi, developer"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="mt-1 text-[10px] font-black">CHINMAYI</p>
                </motion.div>
              </div>
            </div>
          </section>

          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="rounded-[48%_52%_44%_56%/58%_44%_56%_42%] border-[5px] border-white bg-white/95 px-4 py-2 text-2xl font-black tracking-tighter text-[#16001f] shadow-[0_0_0_4px_#00e5ff] sm:text-3xl">
              AD-POCALYPSE
            </h2>
            <span className="animate-pulse bg-[#ff1744] px-2 py-1 text-[10px] font-black text-white">
              LIVE-ish
            </span>
          </div>

          {/* Main billboard */}
          <motion.div
            layout
            onHoverStart={() =>
              setActiveBillboard((index) => (index + 1) % billboards.length)
            }
            className={`relative cursor-crosshair overflow-hidden border-[5px] border-black ${currentBillboard.color} p-4 shadow-[7px_7px_0_#ff00bb] sm:p-6`}
          >
            <motion.span
              key={currentBillboard.stamp}
              initial={{ scale: 2, rotate: 20, opacity: 0 }}
              animate={{ scale: 1, rotate: -8, opacity: 1 }}
              className="absolute right-3 top-3 z-10 border-[3px] border-black bg-[#ff6a00] px-3 py-2 text-sm font-black shadow-[3px_3px_0_black] sm:text-xl"
            >
              {currentBillboard.stamp}
            </motion.span>

            <p className="text-[10px] font-black uppercase tracking-[0.2em]">
              The promotion of the moment
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentBillboard.title}
                initial={{ x: 80, opacity: 0, rotate: 3 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                exit={{ x: -70, opacity: 0, rotate: -3 }}
                transition={{ duration: 0.25 }}
                className="relative z-0 py-6"
              >
                {currentBillboard.title === "LAST CHANCE TO REGRET THIS" && (
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-4xl font-black leading-[0.9] tracking-tighter sm:text-5xl xl:text-6xl">
                        {currentBillboard.title}
                      </h3>
                      <p className="mt-4 max-w-xs text-xs font-black sm:text-sm">
                        {currentBillboard.subtitle}
                      </p>
                    </div>
                    <img
                      src="/images/shock.webp"
                      alt="Shocked customer seeing the last chance offer"
                      className="h-24 w-24 shrink-0 rotate-[-6deg] border-[4px] border-black bg-white object-contain shadow-[5px_5px_0_#ff1744] sm:h-32 sm:w-32"
                    />
                  </div>
                )}
                {currentBillboard.title === "THE SALE THAT DEFIES MATH" && (
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-4xl font-black leading-[0.9] tracking-tighter sm:text-5xl xl:text-6xl">
                        {currentBillboard.title}
                      </h3>
                      <p className="mt-4 max-w-xs text-xs font-black sm:text-sm">
                        {currentBillboard.subtitle}
                      </p>
                    </div>
                    <img
                      src="/images/math.webp"
                      alt="Chaotic mathematics reaction"
                      className="h-36 w-36 shrink-0 border-[4px] border-black bg-white object-contain shadow-[5px_5px_0_#ff1744] sm:h-48 sm:w-48"
                    />
                  </div>
                )}
                {currentBillboard.title === "YOUR WALLET CALLED." && (
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-4xl font-black leading-[0.9] tracking-tighter sm:text-5xl xl:text-6xl">
                        {currentBillboard.title}
                      </h3>
                      <p className="mt-4 max-w-xs text-xs font-black sm:text-sm">
                        {currentBillboard.subtitle}
                      </p>
                    </div>
                    <img
                      src="/images/money.webp"
                      alt="Money reaction image"
                      className="h-36 w-36 shrink-0 border-[4px] border-black bg-white object-contain shadow-[5px_5px_0_#ff1744] sm:h-48 sm:w-48"
                    />
                  </div>
                )}
                {currentBillboard.title !== "LAST CHANCE TO REGRET THIS" && (
                  currentBillboard.title !== "THE SALE THAT DEFIES MATH" &&
                  currentBillboard.title !== "YOUR WALLET CALLED." && (
                  <>
                    <h3 className="max-w-[85%] text-4xl font-black leading-[0.9] tracking-tighter sm:text-5xl xl:text-6xl">
                      {currentBillboard.title}
                    </h3>
                    <p className="mt-4 max-w-xs text-xs font-black sm:text-sm">
                      {currentBillboard.subtitle}
                    </p>
                  </>
                  )
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t-[4px] border-black pt-3">
              <p className="text-[10px] font-black uppercase">
                OFFER EXPIRES IN
              </p>
              <div className="bg-black px-3 py-2 font-mono text-2xl font-black text-[#d7ff00]">
                00:{seconds.toString().padStart(2, "0")}
              </div>
            </div>
          </motion.div>

          {/* Competing advertisements */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.04, rotate: -2 }}
              onHoverStart={() =>
                setActiveBillboard((index) => (index + 1) % billboards.length)
              }
              className="relative min-w-0 border-[4px] border-black bg-[#ff6a00] p-4 shadow-[5px_5px_0_#00e5ff]"
            >
              <span className="absolute -right-2 -top-2 rotate-12 bg-[#d7ff00] px-2 py-1 text-[9px] font-black">
                BREAKING
              </span>
              <p className="text-[10px] font-black">SPECIAL ANNOUNCEMENT</p>
              <h3 className="mt-5 text-3xl font-black leading-none tracking-tighter">
                FREE
                <br />
                SHIPPING*
              </h3>
              <img
                src="/images/freeshipping.webp"
                alt="Chaotic cat celebrating free shipping"
                className="mt-3 h-32 w-full border-[4px] border-black bg-white object-cover shadow-[4px_4px_0_#d7ff00]"
              />
              <p className="mt-3 text-[10px] font-bold">
                *For one pixel of your order.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04, rotate: 2 }}
              className="min-w-0 border-[4px] border-black bg-[#ff36d7] p-4 shadow-[5px_5px_0_#d7ff00]"
            >
              <p className="text-[10px] font-black">CUSTOMER TESTIMONIAL</p>
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="my-3 text-4xl"
              >
                ⭐⭐⭐
              </motion.div>
              <img
                src="/images/sonmeme.webp"
                alt="Crying son reaction to the confusing shopping experience"
                className="mb-3 h-36 w-full border-[4px] border-black bg-white object-contain shadow-[4px_4px_0_#d7ff00]"
              />
              <p className="text-sm font-black leading-tight">
                "I have never been more confused."
              </p>
              <p className="mt-2 text-[10px] font-bold">
                — A person we made up
              </p>
            </motion.div>
          </div>

          {/* Random image portal */}
          <div className="mt-6 border-[4px] border-black bg-[#d7ff00] p-3 shadow-[5px_5px_0_#ff1744]">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-black uppercase">
                Interdimensional product portal
              </h3>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="text-xl"
              >
                ✳
              </motion.span>
            </div>

            <div className="relative h-44 overflow-hidden border-[4px] border-black bg-[#ff36d7] sm:h-64">
              <AnimatePresence mode="wait">
                <motion.img
                  key={portalIndex}
                  src={portalImages[portalIndex]}
                  alt="A randomly changing portal image"
                  initial={{
                    opacity: 0,
                    scale: 1.12,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    filter: "blur(8px)",
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>

              <span className="absolute left-2 top-2 bg-[#ffea00] px-2 py-1 text-[9px] font-black">
                SIGNAL UNSTABLE
              </span>
              <span className="absolute bottom-2 right-2 bg-[#ff1744] px-2 py-1 text-[9px] font-black text-white">
                REALITY LOADING...
              </span>
            </div>

            <p className="mt-2 text-[10px] font-black">
              OUR IMAGE DEPARTMENT HAS LOST CONTROL OF THE TIMELINE.
            </p>
          </div>

          {/* Attention-seeking widgets */}
          <AnimatePresence>
            {widgetVisible && (
              <motion.aside
                key={widgetIndex}
                initial={{ x: 100, opacity: 0, rotate: 5 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                exit={{ x: 100, opacity: 0, rotate: -5 }}
                transition={{ duration: 0.35 }}
                className={`relative mt-6 border-[4px] border-black ${currentWidget.color} p-4 shadow-[6px_6px_0_#00e5ff]`}
                aria-live="polite"
              >
                <button
                  onClick={() => setWidgetVisible(false)}
                  aria-label="Close this promotion"
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center border-[3px] border-black bg-[#00e5ff] text-lg font-black hover:bg-[#ff1744]"
                >
                  ×
                </button>

                <p className="pr-8 text-lg font-black tracking-tight">
                  {currentWidget.title}
                </p>
                <p className="mt-2 max-w-sm text-sm font-bold">
                  {currentWidget.text}
                </p>
                <button
                  onClick={() => setWidgetVisible(false)}
                  className="mt-3 border-[3px] border-black bg-[#7c3aed] px-3 py-2 text-xs font-black text-white hover:bg-[#ff1744]"
                >
                  {currentWidget.button} →
                </button>
              </motion.aside>
            )}
          </AnimatePresence>

          <footer className="mt-8 border-t-[5px] border-black bg-[#ffea00] py-5 text-[10px] font-black uppercase">
            WORSTBUY © 2026 · YOUR REGRET IS OUR REVENUE
          </footer>
        </section>
      </div>

      {/* FLOATING EMERGENCY SALE */}
      <motion.button
        onClick={() =>
          setActiveBillboard((index) => (index + 1) % billboards.length)
        }
        animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed bottom-4 right-4 z-40 max-w-[150px] border-[4px] border-black bg-[#ff1744] px-3 py-3 text-left text-xs font-black text-white shadow-[5px_5px_0_#d7ff00] sm:bottom-6 sm:right-6"
      >
        🚨 EMERGENCY SALE
        <br />
        <span className="text-[9px]">
          THIS BUTTON DOES SOMETHING*
        </span>
      </motion.button>

      <AnimatePresence>
        {hoverAlert !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed inset-0 z-50 grid place-items-center bg-[#ffea00]/80 p-3 [background-image:repeating-linear-gradient(135deg,#7c3aed_0_12px,transparent_12px_24px)] sm:p-6"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="hover-alert-title"
          >
            <div className="relative w-full max-w-2xl border-[12px] border-double border-black bg-[#ff1744] p-3 text-center text-[#d7ff00] shadow-[18px_18px_0_#00e5ff] sm:p-6">
              <button
                type="button"
                onClick={() => setHoverAlert(null)}
                aria-label="Close system warning"
                className="absolute -right-4 -top-5 z-10 border-[5px] border-black bg-[#d7ff00] px-3 py-1 text-3xl font-black leading-none text-black shadow-[4px_4px_0_#7c3aed] hover:bg-[#00ff9c]"
              >
                ×
              </button>

              <div className="mx-auto mb-5 w-full max-w-xl border-[8px] border-black bg-[#00e5ff] p-2 shadow-[-9px_9px_0_#d7ff00]">
                <img
                  src="/images/5hoversdetected.webp"
                  alt="System evidence image"
                  className="h-64 w-full bg-white object-contain sm:h-80"
                />
                <p className="mt-2 bg-black px-1 text-sm font-black text-[#ffea00]">
                  EVIDENCE??? PROBABLY!!!
                </p>
              </div>
              <p className="bg-[#00ff9c] px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black">
                !!! AUTOMATED DESPERATION SCANNER: SCREAMING !!!
              </p>
              <h2 id="hover-alert-title" className="mt-4 border-[5px] border-black bg-[#d7ff00] px-2 py-2 text-4xl font-black leading-none tracking-tighter text-[#7c3aed] shadow-[-6px_6px_0_#00e5ff] sm:text-6xl">
                SYSTEM HAS DETECTED YOUR DESPERATENESS.
              </h2>
              <p className="mt-4 text-xl font-black text-white sm:text-2xl">
                Please stop clicking things. The products are frightened.
              </p>
              <p className="mt-3 border-[5px] border-dotted border-black bg-[#7c3aed] p-3 text-sm font-black text-[#ffea00]">
                Congratulations, you chose online shopping over touching grass.
                The product is now emotionally unavailable and draggable.
              </p>
              <button
                type="button"
                onClick={() => setHoverAlert(null)}
                className="mt-6 border-[7px] border-black bg-[#00e5ff] px-5 py-4 text-lg font-black text-black shadow-[8px_8px_0_#d7ff00] hover:bg-[#00ff9c]"
              >
                FINE, CLOSE THIS EMBARRASSMENT →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function chaosColor(index: number): string {
  const colors = [
    "bg-[#ff36d7]",
    "bg-[#d7ff00]",
    "bg-[#00e5ff]",
    "bg-[#ff6a00]",
    "bg-[#a855f7]",
    "bg-[#ff1744]",
    "bg-[#39ff14]",
    "bg-[#ffea00]",
    "bg-[#7c3aed]",
    "bg-[#00ff9c]",
    "bg-[#ff8cdb]",
    "bg-[#ff4500]",
    "bg-[#00b4d8]",
    "bg-[#f9a8d4]",
    "bg-[#c6ff00]",
  ];

  return colors[index % colors.length];
}
