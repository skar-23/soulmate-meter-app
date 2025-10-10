
export const getZodiacSign = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";

    return "";
};

export const getZodiacSymbol = (sign: string): string => {
    const symbols: { [key: string]: string } = {
        "Aries": "♈",
        "Taurus": "♉",
        "Gemini": "♊",
        "Cancer": "♋",
        "Leo": "♌",
        "Virgo": "♍",
        "Libra": "♎",
        "Scorpio": "♏",
        "Sagittarius": "♐",
        "Capricorn": "♑",
        "Aquarius": "♒",
        "Pisces": "♓",
    };
    return symbols[sign] || "";
};

export const calculateLifePathNumber = (date: Date): number => {
    const fullDate = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString();
    let sum = fullDate.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }

    return sum;
};


export const getZodiacCompatibility = (sign1: string, sign2: string): number => {
    const elementMap: { [key: string]: string } = {
        "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
        "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
        "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
        "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water",
    };

    const element1 = elementMap[sign1];
    const element2 = elementMap[sign2];

    if (element1 === element2) return 95;
    if ((element1 === "Fire" && element2 === "Air") || (element1 === "Air" && element2 === "Fire")) return 85;
    if ((element1 === "Earth" && element2 === "Water") || (element1 === "Water" && element2 === "Earth")) return 80;
    if ((element1 === "Fire" && element2 === "Water") || (element1 === "Water" && element2 === "Fire")) return 60;
    if ((element1 === "Earth" && element2 === "Air") || (element1 === "Air" && element2 === "Earth")) return 50;

    return 70;
};
