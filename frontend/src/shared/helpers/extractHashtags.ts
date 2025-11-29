export function extractHashtags(text: string) {
    const parts = text.split(' ')
    const hashtags = parts.filter(p => p.startsWith('#'))
    const cleanText = parts.filter(p => !p.startsWith('#')).join(' ')

    return {hashtags, cleanText}
}