import express from 'express';
import validator from 'html-validator';

const app = express();
const port = 4323;


export async function val() {
    app.use(express.static('public'));

    const server = app.listen(port, () => console.log(`VL Server listening on port: ${port}`));
    const localFile = 'http://localhost:' + port;
    const options = {
        url: localFile,
        isLocal: true,
        format: 'json'
    };

    const result = await validator(options);

    const errArray = result.messages.filter(function(el) {
        return el.type === 'error';
    });

    await server.close();
    return errArray;
};