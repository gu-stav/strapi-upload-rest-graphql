import fetch from 'node-fetch';
import { FormData, Blob } from "formdata-node"
import { FormDataEncoder } from  "form-data-encoder"
import { Readable } from "stream"
import fs from 'fs';

const invoice = fs.readFileSync('./blob.png');

async function post() {
    var form = new FormData();
    form.append('files', new Blob([invoice], { type: null }));

    const encoder = new FormDataEncoder(form)

    const options = {
        method: "post",
        headers: encoder.headers,
        body: Readable.from(encoder)
    };

    return fetch('http://localhost:1337/api/upload', options);
}

async function postGraphQL() {
    var form = new FormData();
    form.append('operations', JSON.stringify({
        "query": "mutation UploadFile($file: Upload!) { upload(file: $file) { data { attributes { name } } } }",
        "operationName": "UploadFile",
        "variables": {
            "file": null
        }
    }));
    form.append('map', JSON.stringify({ "File": ["variables.file"] }));
    form.append('File', new Blob([invoice], { type: '' }));

    const encoder = new FormDataEncoder(form)

    const options = {
        method: "post",
        headers: encoder.headers,
        body: Readable.from(encoder)
    };

    return fetch('http://localhost:1337/graphql', options);
}

(async () => {
    await post();
    await postGraphQL();
})()
