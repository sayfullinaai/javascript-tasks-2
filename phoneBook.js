'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

function isValidPhone(phone){
    var regExpOfPhone1 = /^\+?\d{0,3}\s*\(\d{3}\)\s*\d{3}(?:-|\s+)?\d(?:-|\s+)?\d{3}$/;
    var regExpOfPhone2 = /^\+?\d{0,3}\s*\d{3}\s*\d{3}(?:-|\s+)?\d(?:-|\s+)?\d{3}$/;
    var regExpOfPhone3 = /^\d{3}\s*\d{3}(-?|\s+)?\d(-?|\s+)?\d{3}$/;
    return regExpOfPhone1.test(phone) || regExpOfPhone2.test(phone)|| regExpOfPhone3.test(phone);
}

function isValidEmail(email){
    var regExpOfEmail = /^\w+\@{1}[-(\w|а-я|А-Я)]+[\.\w|а-я|А-Я]+[\.\w|а-я|А-Я]+$/i;
    return regExpOfEmail.test(email);
}
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    if (name === null || (! isValidPhone(phone)) || (! isValidEmail(email))){
        return 'Incorrect entered data.';
    }
    phoneBook.push({
        name: name,
        phone: phone,
        email: email
    });

};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    if(query === 'undefined'){
        return '--';
    }
    for (var i = 0; i < phoneBook.length; i++){
    if(phoneBook[i].name.indexOf(query) >= 0 || phoneBook[i].phone.indexOf(query) >= 0 || phoneBook[i].email.indexOf(query) >= 0){
        console.log('Record(s)containing these ' + phoneBook[i].name + ' , ' + phoneBook[i].phone + ' , ' + phoneBook[i].email + ' data.');
    }
}
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    if(query === 'undefined'){
        return '--';
    }
    for (var i = 0; i < phoneBook.length; i++){
        if(phoneBook[i].name.indexOf(query) >= 0 || phoneBook[i].phone.indexOf(query) >= 0 || phoneBook[i].email.indexOf(query) >= 0){
            var deleted = phoneBook.splice(i, 1);
            console.log('Deleted: ' + deleted[0].name+ ' '+deleted[0].phone+' '+deleted[0].email);
        }
    }

};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {

    // Ваша чёрная магия здесь

};
