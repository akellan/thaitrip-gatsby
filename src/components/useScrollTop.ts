export function getScrollTop() {
    return document.documentElement.scrollTop + document.body.scrollTop;
}

export function setScrollTop(position: number) {
    if (document.documentElement.scrollTop !== 0) {
        document.documentElement.scrollTop = position;
    } else {
        document.body.scrollTop = position;
    }
}
