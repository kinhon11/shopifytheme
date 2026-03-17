const fs = require('fs');

// 1. Fix Footer
const footerFile = 'c:\\\\Users\\\\Kinh\\\\Downloads\\\\CodeShopify\\\\theme_export__xophia-2-myshopify-com-horizon__17MAR2026-1005am\\\\sections\\\\footer.liquid';
let footer = fs.readFileSync(footerFile, 'utf8');

// The giant Xophia text usually has "footer-block__heading" and "{{ shop.name }}".
// We will replace shop.name appearing in h2 tags with a small stylish image logo.
footer = footer.replace(
  /<h2 class="footer-block__heading[^>]*>\\s*{{ shop\.name }}\\s*<\/h2>/gi, 
  '<h2 class="footer-block__heading"><img src="{{ \\\'Xophia-logo.png\\\' | asset_img_url: \\\'400x\\\' }}" alt="{{ shop.name }}" style="max-width: 150px;"></h2>'
);
fs.writeFileSync(footerFile, footer);
console.log('Footer updated.');

// 2. Fix Header Padding
const headerFile = 'c:\\\\Users\\\\Kinh\\\\Downloads\\\\CodeShopify\\\\theme_export__xophia-2-myshopify-com-horizon__17MAR2026-1005am\\\\sections\\\\header.liquid';
let header = fs.readFileSync(headerFile, 'utf8');

if (!header.includes('.header-fix-ecobio')) {
  header += `
{% style %}
.header-fix-ecobio {}
.header { padding-top: 10px !important; padding-bottom: 10px !important; min-height: 60px !important; }
.header__heading-logo { max-width: 140px !important; width: 140px !important; height: auto !important; }
.header-wrapper { max-height: 80px; }
.header__inline-menu { display: flex; justify-content: center; width: 100%; }
.list-menu--inline { display: flex; gap: 40px; }
/* The "EUR" currency pill is too large and red, usually it's a select element */
.disclosure__button { padding: 8px 16px !important; border-radius: 20px; font-size: 14px; background: transparent; border: 1px solid #ddd; color: #111; }
/* EcoBio products */
.product-card-wrapper { text-align: center; }
.product-card-wrapper img { margin: 0 auto; display: block; border-radius: 10px; }
.price { color: #E43F5A; font-weight: bold; }
{% endstyle %}
`;
  fs.writeFileSync(headerFile, header);
  console.log('Header CSS forced.');
}
