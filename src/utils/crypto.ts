interface Base {
    encrypt(secret: string, password: string): Promise<string>
    decrypt(encrypted: string, password: string): Promise<string>
}

class WebCrypto implements Base {
    protected readonly crypto: Crypto

    protected enc: TextEncoder
    protected dec: TextDecoder

    protected bytes: {
        [name: string]: number
    }

    constructor() {
        this.crypto = window.crypto
        this.enc = new TextEncoder()
        this.dec = new TextDecoder()

        this.bytes = {
            salt: 16,
            iv: 22,
        }
    }

    // eslint-disable-next-line
    private buffToBase64(buff: any) {
        return btoa(String.fromCharCode.apply(null, buff))
    }

    private base64ToBuff(b64: string) {
        return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
    }

    private async getKeyFromPassword(password: string) {
        return this.crypto.subtle.importKey('raw', this.enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey'])
    }

    private async getKey(keyFromPassword: CryptoKey, salt: Uint8Array) {
        return this.crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256',
            },
            keyFromPassword,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        )
    }

    async encrypt(secret: string, password: string) {
        const keyFromPassword = await this.getKeyFromPassword(password)
        const salt = this.crypto.getRandomValues(new Uint8Array(this.bytes.salt))

        const key = await this.getKey(keyFromPassword, salt)
        const iv = this.crypto.getRandomValues(new Uint8Array(this.bytes.iv))
        const encoded = this.enc.encode(secret)

        const ciphertext = await this.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            key,
            encoded
        )

        const cipher = new Uint8Array(ciphertext)
        const buffer = new Uint8Array(salt.byteLength + iv.byteLength + cipher.byteLength)
        buffer.set(salt, 0)
        buffer.set(iv, salt.byteLength)
        buffer.set(cipher, salt.byteLength + iv.byteLength)

        return this.buffToBase64(buffer)
    }

    async decrypt(encrypted: string, password: string) {
        const encryptedBuffer = this.base64ToBuff(encrypted)
        const salt = encryptedBuffer.slice(0, this.bytes.salt)
        const iv = encryptedBuffer.slice(this.bytes.salt, this.bytes.salt + this.bytes.iv)
        const ciphertext = encryptedBuffer.slice(this.bytes.salt + this.bytes.iv)

        const keyFromPassword = await this.getKeyFromPassword(password)
        const key = await this.getKey(keyFromPassword, salt)

        try {
            const decryptedEncoded = await this.crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: iv,
                },
                key,
                ciphertext
            )

            return this.dec.decode(decryptedEncoded)
        } catch (e) {
            throw new Error('Failed to decrypt!')
        }
    }
}

export default WebCrypto
