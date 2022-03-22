import WebCrypto from './crypto'

const manifest_version_three: boolean = chrome.runtime.getManifest().manifest_version === 3

export default {
    ...chrome,
    browserAction: {
        setBadgeText: (details: object, callback?: VoidFunction) => {
            if (manifest_version_three) {
                return chrome.action.setBadgeText(details as chrome.action.BadgeTextDetails, callback)
            }

            return chrome.browserAction.setBadgeText(details as chrome.browserAction.BadgeTextDetails, callback)
        },
    },
    webCrypto: new WebCrypto(),
}
