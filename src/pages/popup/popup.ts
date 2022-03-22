'use-strict'

import api from '../../utils/api'

interface Credentials {
    rollno: string
    password: string
    questions: {
        [key: string]: string
    }
}

interface Settings {
    theme: 'dark' | 'light' | 'auto'
    autoLogin: boolean
}

async function initializePopup() {
    const stored = await api.storage.local.get()

    console.group('Storage keys: ')
    for (const key in stored) if (Object.prototype.hasOwnProperty.call(stored, key)) console.log(key, ' : ', JSON.stringify(stored[key]))
    console.groupEnd()

    const { settings, credentials } = stored

    if (!settings) {
        const defaultSettings: Settings = {
            theme: 'light',
            autoLogin: true,
        }

        api.storage.local.set({ credentials: defaultSettings })
    }

    if (!credentials) {
        const defaultCredentials: Credentials = {
            rollno: '',
            password: '',
            questions: {},
        }

        api.storage.local.set({ credentials: defaultCredentials })
    }
}

initializePopup()
