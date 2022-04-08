const Diff = require('diff');
const Diff2html = require('diff2html');

export default async function handler(req, res) {
    const { grades_asset_url, grades_asset_content_base64 } = req.body;

    const response = await fetch(grades_asset_url, { mode: 'no-cors' });
    const data = await response.text();
    // convert from base64 to ascii
    let grades_asset_content;
    let asset_url_content;
    grades_asset_content = Buffer.from(grades_asset_content_base64, 'base64').toString('ascii');
    asset_url_content = data;

    // check the content of the grades_asset (which is on the blockchain)
    // with the content of the url
    // keep all added and removed parts to construct a file (if anything has changed)
    let added = [], removed = [];
    const diff = Diff.diffLines(grades_asset_content, asset_url_content);

    diff.forEach(part => {
        if (part.added) added.push(part.value);
        if (part.removed) removed.push(part.value);
    });

    const diffJson = Diff2html.parse(Diff.createTwoFilesPatch('file_from_blockchain.bau', 'file_from_url.bau', grades_asset_content, asset_url_content));
    const diffHtml = Diff2html.html(diffJson, {
        drawFileList: true,
        fileListToggle: false,
        fileListStartVisible: false,
        fileContentToggle: false,
        matching: 'lines',
        outputFormat: 'side-by-side',
        synchronisedScroll: true,
        highlight: true,
        renderNothingWhenEmpty: false,
    });

    if (added.length == 0 && removed.length == 0) return res.status(200).json({ error: false });
    else {
        let grades_asset_content_blob = [], asset_url_content_blob = [];
        grades_asset_content_blob.push(grades_asset_content);
        asset_url_content_blob.push(asset_url_content);
        return res.status(200).json({ error: true, diff: diffHtml, blockchainContent: grades_asset_content_blob, urlContent: asset_url_content_blob });
    }
}