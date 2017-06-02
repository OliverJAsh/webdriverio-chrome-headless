import * as webdriverio from 'webdriverio';

// Headless is supported in Chrome >= 58. Not currently stable, so using dev
// build.
const CHROME_BIN_PATH = '/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome';

const main = () => {
    const options = {
        // Default ChromeDriver port
        port: 9515,
        desiredCapabilities: {
            browserName: 'chrome',
            chromeOptions: {
                binary: CHROME_BIN_PATH,
                args: [
                    'headless',
                    // Use --disable-gpu to avoid an error from a missing Mesa
                    // library, as per
                    // https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
                    'disable-gpu',
                ],
            },
        },
    };
    return webdriverio
        .remote(options)
        .init()
        .url('http://www.google.com')
        .getTitle().then(title => {
            console.log({ title });
        })
        .end();
};

// Cast to native Promise so we get warnings for unhandled promise rejections.
Promise.resolve(main());
