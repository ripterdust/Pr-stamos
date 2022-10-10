export const atob = (base64: string) => {
    return Buffer.from(base64, 'base64').toString('binary')
}

export const insecureDecrypt = (encoded: any, salt: any) => {
    const textToChars = (text: string) => text.split('').map((c) => c.charCodeAt(0))
    const applySaltToChar = (code: any) => textToChars(salt).reduce((a, b) => a ^ b, code)
    return encoded
        .match(/.{1,2}/g)
        .map((hex: any) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode: any) => String.fromCharCode(charCode))
        .join('')
}
