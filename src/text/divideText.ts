const SPACE: string = " ";

export function divideText(text: string): [string, string] {
    if (isSentence(text)) {
        const words = text.split(SPACE);
        const midSentence = Math.ceil(words.length / 2);

        return [
            words.slice(0, midSentence).join(SPACE) + SPACE,
            words.slice(midSentence).join(SPACE)
        ];
    } else {
        const middle = text.length / 2;

        return [text.substr(0, middle), text.substr(middle, text.length - 1)];
    }
}

const isSentence = (text: string) => text.includes(SPACE);
