const express = require('express'),
	Differencify = require('differencify'),
	differencify = new Differencify({
		mismatchThreshold: 0.01,
        imageSnapshotPath: 'test/differencify_reports/'
	});

const app = express();
const port = 4324;

app.use(express.static('public'));

const server = app.listen(port, () => console.log(`VR Server listening on port: ${port}`));

module.exports = (async () => {
  const target = differencify.init({ chain: false });
  await target.launch();
  const page = await target.newPage();
  await page.setViewport({ width: 599, height: 600 });
  await page.goto('http://localhost:' + port);
  await page.waitFor(1000);
  const image = await page.screenshot();
  const result = await target.toMatchSnapshot(image);
  await page.close();
  await target.close();
  server.close();
  return result;
})();
