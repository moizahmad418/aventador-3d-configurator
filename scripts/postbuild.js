/**
 * Post-build step for GitHub Pages.
 *
 * .nojekyll — Pages runs uploads through Jekyll by default, which silently drops
 * files and folders whose names begin with an underscore. This empty file turns
 * that off, so the build output is served exactly as webpack produced it.
 *
 * No 404.html is needed here: this app is a single page with no client-side
 * routing, so there are no deep links to fall back from.
 */

const fs = require('fs');
const path = require('path');

const build = path.join(__dirname, '..', 'build');

if (!fs.existsSync(build)) {
    console.error('postbuild: build/ not found — run the build first.');
    process.exit(1);
}

fs.writeFileSync(path.join(build, '.nojekyll'), '');

console.log('Postbuild complete: build/.nojekyll written.');
