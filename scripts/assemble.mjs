import { rmSync, cpSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

function copyDir(src, dest) {
  if (!existsSync(src)) {
    throw new Error(`Source folder tidak ditemukan: ${src}`);
  }
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
}

rmSync(dist, { recursive: true, force: true });

// Root = apps/hub (berisi inline portal & admin switcher)
copyDir(path.join(root, 'apps/hub/dist'), dist);

// /admin -> aplikasi panitia (build dengan base '/admin/')
copyDir(path.join(root, 'apps/admin/dist'), path.join(dist, 'admin'));

// /portal -> aplikasi publik & santri (build dengan base '/portal/')
copyDir(path.join(root, 'apps/portal/dist'), path.join(dist, 'portal'));

console.log('Assembly selesai:');
console.log('  /           <- apps/hub  (hub + switcher)');
console.log('  /admin/     <- apps/admin');
console.log('  /portal/    <- apps/portal');