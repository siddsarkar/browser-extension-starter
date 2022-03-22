# browser-extension-starter

> Cross-browser extension boilerplate - with support for both mv2 and mv3 manifest versions.

Screenshot of extension options:

![Sample extension options output](media/previewer.png)

## Features

-   Get desired extension outputs:
    -   Firefox (mv2)
    -   Chromium (mv3)
-   Use npm dependencies thanks to Webpack.
-   Out of the box [TypeScript](https://www.typescriptlang.org/) support
-   Universal api interact with [Extensions API](https://developer.chrome.com/docs/extensions/reference/)
-   [Tailwind CSS](https://tailwindcss.com/) support out of the box

## Getting started

### 1️⃣ Create your own copy

1. Click [<kbd>Use this template</kbd>](https://github.com/fregante/browser-extension-template/generate) to make a copy of your own. 😉

### 🛠 Build locally

1. Checkout the copied repository to your local machine eg. with `git clone https://github.com/my-username/my-awesome-extension/`
1. Run `npm install` to install all required dependencies
1. Run `npm run build`

The build step will create the `dist` folder, this folder will contain the generated extensions for both chrome and firefox

### 🏃 Run the extension

Using [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) is recommened for automatic reloading and running in a dedicated browser instance. Alternatively you can load the extension manually (see below).

1. Run `npm run dev` to watch and run extensions for chrome and firefox simultaneously
    > Alternatively you can run `npm run dev:chrome` for chrome and `npm run dev:firefox` for firefox only

The above step will automatically fire up firefox and chrome with extension loaded, to verify installation go to url [chrome://extensions/](chrome://extensions/) for chrome and [about:addons](about:addons) for firefox

#### Manually

You can also [load the extension manually in Chrome](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#google-chrome-opera-vivaldi) or [Firefox](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#mozilla-firefox).

### ✏️ Make the first change

1. For example, edit `"name"` key in `manifests\manifest.chrome.json` to your desired name for your extension
1. Go back to your browser, reload and see the change take effect

Note: Firefox will automatically reload content scripts when the extension is updated, Chrome requires you to reload the page to reload the content scripts.

### 📕 Read the documentation

Here are some websites you should refer to:

-   [Chrome extensions’ API list](https://developer.chrome.com/docs/extensions/reference/)
-   [Firefox WebExtensions API list](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)

## License

<p xmlns:dct="http://purl.org/dc/terms/" xmlns:vcard="http://www.w3.org/2001/vcard-rdf/3.0#">
    To the extent possible under law,
    <a rel="dct:publisher" href="https://siddsarkar.github.io/">
        <span property="dct:title">Siddhartha Sarkar</span>
    </a>
    has waived all copyright and related or neighboring rights to
    <span property="dct:title">browser-addon-template</span>.
    This work is published from: <span property="vcard:Country" datatype="dct:ISO3166" content="IN" about="https://siddsarkar.github.io/">India</span>.
    <br/>
    <a rel="license" href="http://creativecommons.org/publicdomain/zero/1.0/">
        <img src="https://licensebuttons.net/p/zero/1.0/88x31.png" style="border-style: none;" alt="CC0" />
    </a>
</p>
