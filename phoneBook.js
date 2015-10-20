'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

function isValidPhone(phone) {
    if (typeof phone === 'undefined' || typeof phone !== 'string') {
        console.log('The phone is not entered or an invalid format');
    } else {
        var regExpOfPhone1 = /^\+?\d{0,3}\s*\(\d{3}\)\s*\d{3}(?:-|\s+)?\d(?:-|\s+)?\d{3}$/;
        var regExpOfPhone2 = /^\+?\d{0,3}\s*\d{3}\s*\d{3}(?:-|\s+)?\d(?:-|\s+)?\d{3}$/;
        return regExpOfPhone1.test(phone) || regExpOfPhone2.test(phone);
    }
}

function isValidEmail(email) {
    if (typeof email === 'undefined' || typeof email !== 'string') {
        console.log('The email is not entered or an invalid format');
    } else {
        var regExpOfEmail =/^[^@]+@(?:[^@]+\.)+[^@]+$/i;
        return regExpOfEmail.test(email);
    }
}
/*
 Функция добавления записи в телефонную книгу.
 На вход может прийти что угодно, будьте осторожны.
 */
module.exports.add = function add(name, phone, email) {
    if (typeof name === 'undefined' || name === null || name === '' ||
        (!isValidPhone(phone)) || (!isValidEmail(email))) {
        console.log('Incorrect entered data.');
    } else {
        phoneBook.push({
            name: name,
            phone: phone,
            email: email
        });
        console.log('Record ' + name + ' ' + phone + ' ' + email + ' ' + 'added');
    }

};

/*
 Функция поиска записи в телефонную книгу.
 Поиск ведется по всем полям.
 */
function doIfEmptyQuery(query) {
    if (typeof query === 'undefined' || query === null ||
        query === '') {
        for (var i = 0; i < phoneBook.length; i++) {
            console.log(phoneBook[i].name + ' ' + phoneBook[i].phone + ' ' + phoneBook[i].email);
        }
    } else {
        return false;
    }
}

function writeMessage(resultQuery, action) {
    if (resultQuery.length !== 0) {
        for (var i = 0; i < resultQuery.length; i++) {
            console.log(action + ': ' + resultQuery[i].name + ' ' + resultQuery[i].phone + ' ' +
                resultQuery[i].email);
        }
    } else {
        console.log('Record not found');
    }
}

function findQuery(query) {
    if (doIfEmptyQuery(query) === false) {
        var resultQuery = [];
        for (var i = 0; i < phoneBook.length; i++) {
            var person = phoneBook[i];
            if (person.name.indexOf(query) >= 0 || person.phone.indexOf(query) >= 0 ||
                person.email.indexOf(query) >= 0) {
                resultQuery.push(person);
            }
        }
        return resultQuery;
    }
}
module.exports.find = function find(query) {
    return writeMessage(findQuery(query), 'Found');
};

/*
 Функция удаления записи в телефонной книге.
 */
module.exports.remove = function remove(query) {
    var request = findQuery(query);
    for (var i = 0; i < request.length; i++) {
        phoneBook.slice(i, 1);
    }
    return writeMessage(request, 'Deleted');
};

/*
 Функция импорта записей из файла (задача со звёздочкой!).
 */
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    var discreteData = data.split('\n');
    var countExport = 0;
    for (var i = 0; i < discreteData.length; i++) {
        var record = discreteData[i].split(';');
        if (module.exports.add(record[0], record[1], record[2])) {
            countExport++;
        }
    }
    console.log('Added entries: ' + countExport);
};

/*
 Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
 */

function repeatLine(typeOfLine, numberOfRepeat) {
    var repeat = '';
    for (var i = 0; i < numberOfRepeat; i++) {
        repeat += typeOfLine;
    }
    return repeat;
}
module.exports.showTable = function showTable() {
    var maxName = 0;
    var maxPhone = 0;
    var maxEmail = 0;
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].name.length > maxName) {
            maxName = phoneBook[i].name.length;
        }
        if (phoneBook[i].phone.length > maxPhone) {
            maxPhone = phoneBook[i].phone.length;
        }
        if (phoneBook[i].email.length > maxEmail) {
            maxEmail = phoneBook[i].email.length;
        }
    }
    var maxSize = Math.max(maxName, maxPhone, maxEmail);
    var space = ' ';
    var borderLine = '*';
    var internalLines = '-';
    var len = phoneBook.length - 1;
    console.log(repeatLine(borderLine, maxSize * 3 + 10));
    console.log(borderLine + space + space + 'Name' + repeatLine(space, maxSize - 4) + '|' +
        space + space + 'Phone' + repeatLine(space, maxSize - 5) + '|' +
        space + space + 'Email' + repeatLine(space, maxSize - 5) + borderLine);
    console.log(repeatLine(internalLines, maxSize * 3 + 10));
    for (var j = 0; j < phoneBook.len; j++) {
        var person = phoneBook[j];
        console.log
        (borderLine + space + space + person.name +
            repeatLine(space, (maxSize - person.name.length)) +
            '|' + space + space + person.phone +
            repeatLine(space, (maxSize - person.phone.length)) +
            '|' + space + space + person.email +
            repeatLine(space, (maxSize - person.email.length)) + borderLine);
        console.log(repeatLine(internalLines, maxSize * 3 + 10));
    }
    console.log
    (borderLine + space + space + phoneBook[len].name +
        repeatLine(space, (maxSize - phoneBook[len].name.length)) +
        '|' + space + space + phoneBook[len].phone +
        repeatLine(space, (maxSize - phoneBook[len].phone.length)) +
        '|' + space + space + phoneBook[len].email +
        repeatLine(space, (maxSize - phoneBook[len].email.length)) + borderLine);
    console.log(repeatLine(borderLine, maxSize * 3 + 10));
};


