const fs = require("fs");
const file = "templates/product.json";
let raw = fs.readFileSync(file, "utf8");
let jsonStr = raw.replace(/\/\*[\s\S]*?\*\//, "");
let data = JSON.parse(jsonStr);

const productDetails = data.sections.main.blocks["product-details"];
if (productDetails && productDetails.blocks) {
  // Add pills block under price
  productDetails.blocks["text_tumble_pills"] = {
    "type": "text",
    "settings": {
      "text": "<div class=\"tumble-pills\" style=\"display:flex; gap:8px; overflow-x:auto; padding:10px 0; border-bottom:1px solid #E5E5E5; margin-bottom:15px; white-space:nowrap;\"><span class=\"tumble-pill\" style=\"background:#F8F7F5; padding:6px 14px; border-radius:100px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; display:inline-flex; align-items:center; gap:6px;\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0Z\"/><path d=\"m15 9-6 6\"/><path d=\"M9 9h.01\"/></svg> Spillproof Surface</span><span class=\"tumble-pill\" style=\"background:#F8F7F5; padding:6px 14px; border-radius:100px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; display:inline-flex; align-items:center; gap:6px;\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9\"/><path d=\"M9 22V12h6v10M2 10.6L12 2l10 8.6\"/></svg> Machine Washable</span><span class=\"tumble-pill\" style=\"background:#F8F7F5; padding:6px 14px; border-radius:100px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; display:inline-flex; align-items:center; gap:6px;\"><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"/></svg> Cushioned Pad</span></div>",
      "type_preset": "paragraph"
    }
  };
  
  // Add The Tumble Difference trust bar below Add to Cart
  productDetails.blocks["text_tumble_trust"] = {
    "type": "text",
    "settings": {
      "text": "<div class=\"tumble-trust-bar\" style=\"background:#1A1A1A; color:#FFFFFF; padding:12px; text-align:center; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; border-radius:4px; margin-top:12px;\">Free Shipping & Free 30-Day Returns</div>",
      "type_preset": "paragraph"
    }
  };

  const order = productDetails.block_order;
  
  // Find variant picker or price and insert AFTER it
  const idx = order.findIndex(b => b === "price_a7krng" || b === "text_TMtYp8");
  if (!order.includes("text_tumble_pills")) {
    order.splice(idx > -1 ? idx + 2 : 3, 0, "text_tumble_pills");
  }

  // Find buy_buttons_eYQEYi and insert AFTER it
  const buyIndex = order.findIndex(b => b === "buy_buttons_eYQEYi");
  if (!order.includes("text_tumble_trust")) {
    order.splice(buyIndex > -1 ? buyIndex + 1 : 5, 0, "text_tumble_trust");
  }
}

// Add Custom Featured Section at the End
data.sections["tumble_feature_grid"] = {
  "type": "custom-liquid",
  "settings": {
    "custom_liquid": "<div style=\"background:#F8F7F5; padding:80px 20px; text-align:center; margin-top:40px; border-radius:8px;\"><h2 style=\"font-family:'DM Serif Display'; font-size:32px; margin-bottom:40px;\">Designed for real life.</h2><div style=\"max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:40px;\"><div><svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#1A1A1A\" stroke-width=\"1.5\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg><h3 style=\"font-family:'DM Serif Display'; font-size:22px; margin-bottom:10px; margin-top:16px;\">Washable</h3><p style=\"font-size:15px; color:#4A4A4A;\">Spills happen. Toss it in the wash.</p></div><div><svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#1A1A1A\" stroke-width=\"1.5\"><path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/></svg><h3 style=\"font-family:'DM Serif Display'; font-size:22px; margin-bottom:10px; margin-top:16px;\">Spillproof</h3><p style=\"font-size:15px; color:#4A4A4A;\">Liquids bead up and wipe away.</p></div><div><svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#1A1A1A\" stroke-width=\"1.5\"><path d=\"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\"/></svg><h3 style=\"font-family:'DM Serif Display'; font-size:22px; margin-bottom:10px; margin-top:16px;\">Cushioned</h3><p style=\"font-size:15px; color:#4A4A4A;\">Dual-layer pad for extra comfort.</p></div><div><svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#1A1A1A\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01\"/></svg><h3 style=\"font-family:'DM Serif Display'; font-size:22px; margin-bottom:10px; margin-top:16px;\">Non-Toxic</h3><p style=\"font-size:15px; color:#4A4A4A;\">Safe for kids and pets.</p></div></div></div>",
    "section_width": "page-width",
    "color_scheme": "scheme-1"
  }
};

if (!data.order.includes("tumble_feature_grid")) {
  const mainIndex = data.order.indexOf("main");
  if (mainIndex !== -1) {
    data.order.splice(mainIndex + 1, 0, "tumble_feature_grid");
  } else {
    data.order.push("tumble_feature_grid");
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log("Successfully updated product.json");
