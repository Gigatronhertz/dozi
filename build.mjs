// Builds dist/app.js: the DOZI design-system components (ds/components) and the site
// screens (src/) compiled from JSX into one plain script. No runtime Babel.
//   npm install && npm run build
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { transformSync } from 'esbuild';

const comps = ['brand/Logo', 'icons/FashionIcon', 'hardware/Rivet', 'hardware/Stitched', 'hardware/LeatherPatch', 'hardware/Zipper', 'hardware/ZipSeam',
  'core/Button', 'core/ArrowLink', 'core/Eyebrow', 'core/Tag', 'commerce/Price', 'commerce/Swatch', 'commerce/OptionChip', 'commerce/ProductCard',
  'forms/TextField', 'forms/Select', 'forms/QuantityStepper'].map(p => 'ds/components/' + p + '.jsx');
const screens = ['data.js', 'store.jsx', 'Header.jsx', 'Footer.jsx', 'Home.jsx', 'Shop.jsx', 'Product.jsx', 'Studio.jsx', 'BagDrawer.jsx', 'App.jsx'].map(n => 'src/' + n);

let src = [...comps, ...screens].map(f => readFileSync(f, 'utf8')
  .replace(/^import .*$/gm, '')
  .replace(/^export (default )?(function|const)/gm, '$2')).join('\n');
src = '(function(){\n' + src + '\nReactDOM.createRoot(document.getElementById("root")).render(<App />);\n})();';

const out = transformSync(src, { loader: 'jsx', minify: true, target: 'es2018', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment', legalComments: 'none' });
mkdirSync('dist', { recursive: true });
writeFileSync('dist/app.js', out.code);
console.log('dist/app.js', (out.code.length / 1024).toFixed(1) + ' KB');
