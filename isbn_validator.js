function validateISBN(isbn) {
    const isbnPattern = /^(?:\d{9}[\dXx]|\d{13})$/;
    const cleanedISBN = isbn.replace(/[-\s]/g, '');
    if (!isbnPattern.test(cleanedISBN)) {
        return false;
    }
    if (cleanedISBN.length === 10) {
        return validateISBN10(cleanedISBN);
    } else if (cleanedISBN.length === 13) {
        return validateISBN13(cleanedISBN);
    }

    return false;
}

function validateISBN10(isbn) {
    let checksum = 0;
    for (let i = 0; i < 9; i++) {
        checksum += parseInt(isbn.charAt(i)) * (10 - i);
    }

    let lastChar = isbn.charAt(9).toUpperCase();
    if (lastChar === 'X') {
        checksum += 10;
    } else {
        checksum += parseInt(lastChar);
    }

    return checksum % 11 === 0;
}

function validateISBN13(isbn) {

    let checksum = 0;
    for (let i = 0; i < 12; i++) {
        checksum += (i % 2 === 0) ? parseInt(isbn.charAt(i)) : parseInt(isbn.charAt(i)) * 3;
    }

    return (10 - (checksum % 10)) === parseInt(isbn.charAt(12));
}

const isbn = "978-0-306-40615-7";
const isValid = validateISBN(isbn);

if (isValid) {
    console.log(`${isbn} is a valid ISBN.`);
} else {
    console.log(`${isbn} is not a valid ISBN.`);
}
