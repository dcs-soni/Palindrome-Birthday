const userBirthDate = document.querySelector("#birthdate");
const checkButton = document.querySelector(".check");
const resultStatement = document.querySelector(".result");

function reverseStr(str) {
    return str.split().reverse().join("");
}


function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToStr(date) {
    var dateStr = { day: '', month: '', year: ''};

    if (date.day < 10) {
        dateStr.day = '0' + date.day;

    }else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;

    }else {
        dateStr.month = date.month.toString();
    }


    dateStr.year = date.year.toString();

    return dateStr;
}


function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.date + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.date + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.date;
    var ddmmyy = dateStr.date + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.date + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.date;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;

    for(var i=0; i<listOfPalindromes.length; i++) {
        if(isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag;
}


function isLeapYear(year) {
    if(year % 400 === 0) {
        return true;

    }

    if(year % 100 === 0) {
        return false;
    }
    if(year % 4 === 0) {
        return true;
    }

    return false;
}

function getNextDate(date) {
    var day = date.day;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month == 2) {
        //check leap year
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month++;
            }
        }else {
            if(day > 28) {
                day = 1;
                month++;
            }
        }
    }

    else {
        if(day > daysInMonth[month - 1]);
        day = 1;
        month++;
    }


    if(month > 12) {
        month = 1;
        year++;
    }


    return {
        day: day,
        month: month,
        year: year
    }
}


function getNextPalindromDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

var date = {
    day: 31,
    month: 1,
    year: 2020
}

function clickHandler() {
    var bdayStr = userBirthDate.value;


    if(bdayStr !== '') {
        var listOfDate = bdayStr.split("-");

        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome) {
            resultStatement.innerText = "Yuppie! Your Birthdate is a Palindrome";
        } else {
            var [ctr, nextDate] = getNextPalindromDate(date);
            resultStatement.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!`;
        }
    }
}

checkButton.addEventListener("click", clickHandler);