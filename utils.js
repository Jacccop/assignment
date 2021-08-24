export default class Utils {
    static getDateToday() {
        var today = new Date();
        return `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    }

    static normalizeText(text) {
        return text.replace(/\s{2,}/g, ' ');
    }
}
