const express = require('express'),
	Differencify = require('differencify'),
	differencify = new Differencify({
		mismatchThreshold: 0.01,
        imageSnapshotPath: 'test/differencify_reports/'
	});

const app = express();
const port = 4321;

app.use(express.static('public'));

const server = app.listen(port, () => console.log(`Server listening on port: ${port}`));

module.exports = (async () => {
  // const result = await differencify
  //   .init({})
  //   .launch()
  //   .newPage()
  //   .setViewport({ width: 599, height: 600 })
  //   .goto('http://localhost:4321')
  //   .waitFor(1000)
  //   .screenshot()
  //   .toMatchSnapshot()
  //   .result((result) => {
  //    	return result;
  //   })
  //   .close()
  //   .end();
  const target = differencify.init({ chain: false });
  await target.launch();
  const page = await target.newPage();
  await page.setViewport({ width: 599, height: 600 })
  await page.goto('http://localhost:4321')
  await page.waitFor(1000);
  const image = await page.screenshot();
  const result = await target.toMatchSnapshot(image)
  await page.close();
  await target.close();
  server.close();
  return result;
})();
