import type { RetailProduct } from "@/lib/square/types";
import { formatMoney } from "@/lib/square/types";
import { publicConfig } from "@/lib/public-config";

const site = publicConfig.square.onlineSiteUrl.replace(/\/$/, "");

export const squareRetailProducts: RetailProduct[] = [
  {
    id: "PAGK2VOJL6USU5DPOTBY77Q6",
    name: "Wicked wet brushes",
    description: "",
    price: formatMoney(1000),
    squareUrl: `${site}/product/wicked-wet-brushes/10`,
    source: "square",
  },
  {
    id: "MN4EDPX6JEFNV3K25H2FHYML",
    name: "Tinsel hair clip",
    description: "",
    price: formatMoney(750),
    squareUrl: `${site}/product/tinsel-hair-clip/11`,
    source: "square",
  },
  {
    id: "4-tinsel-strands",
    name: "4 Tinsel strands",
    description: "",
    price: formatMoney(2800),
    squareUrl: `${site}/product/4-tinsel-strands/12`,
    source: "square",
  },
  {
    id: "mini-cuticle-oil",
    name: "Mini cuticle oil",
    description: "",
    price: formatMoney(200),
    squareUrl: `${site}/product/mini-cuticle-oil/13`,
    source: "square",
  },
  {
    id: "single-lotion",
    name: "Single lotion",
    description: "",
    price: formatMoney(800),
    squareUrl: `${site}/product/single-lotion/3`,
    source: "square",
  },
  {
    id: "pedi-in-a-box",
    name: "Pedi in a box",
    description: "",
    price: formatMoney(1000),
    squareUrl: `${site}/product/pedi-in-a-box/5`,
    source: "square",
  },
  {
    id: "1-hair-bow",
    name: "1 Hair bow",
    description: "",
    price: formatMoney(500),
    squareUrl: `${site}/product/1-hair-bow/6`,
    source: "square",
  },
  {
    id: "2-hair-bows",
    name: "2 hair bows",
    description: "",
    price: formatMoney(1000),
    squareUrl: `${site}/product/2-hair-bows/7`,
    source: "square",
  },
  {
    id: "scrunchies",
    name: "Scrunchies",
    description: "",
    price: formatMoney(100),
    squareUrl: `${site}/product/scrunchies/8`,
    source: "square",
  },
];
