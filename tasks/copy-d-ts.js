const fs = require('fs');
fs.copyFile('./src/pasuunaplugin.d.ts', './dist/pasuunaplugin.d.ts', (err) => {
	if (err) throw err;
	console.log('Typings copied to dist');
});
