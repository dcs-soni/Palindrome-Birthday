const userBirthDate = document.querySelector("#birthdate");
const checkButton = document.querySelector(".check");
const resultStatement = document.querySelector(".result");

function reverseStr(str) {
    console.log(str);
    return str.split("").reverse().join("");
}


function isStrPalindrome(str) {
    console.log(str);
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
    // var dateStr = convertDateToStr(date);

    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    console.log([ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm]);

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var palindromeList = [];

    for(var i=0; i<listOfPalindromes.length; i++) {
        var result = isStrPalindrome(listOfPalindromes[i]);
        palindromeList.push(result);
    }
    return palindromeList;
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
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2) {
        //check leap year
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month = 3;
            }
        }else {
            if(day > 28) {
                day = 1;
                month = 3;
            }
        }
    }

    else {
        if(day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }  
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
        var dateStr = convertDateToStr(nextDate);
        var resultList = checkPalindromeForAllDateFormats(dateStr);
        for (let i=0; i< resultList.length; i++) {
            if(resultList[i]) {
                return [ctr, nextDate];
            }
        }

        nextDate = getNextDate(nextDate);
    }
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      } else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        } else {
          day = 28;
        }
      } else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
}
  
function getPreviousPalindromeDate(date) {
    var previousDate = getPreviousDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = convertDateToStr(previousDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, previousDate];
        }
      }
      previousDate = getPreviousDate(previousDate);
    }
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

        var dateStr = convertDateToStr(date);
        var list = checkPalindromeForAllDateFormats(dateStr);
        var isPalindrome = false;

        for (let i=0; i< list.length; i++){
            if(list[i]) {
                isPalindrome = true;
                break;
            }
        }

        if(!isPalindrome) {
           const [ctr1, nextDate] = getNextPalindromDate(date);
           const [ctr2, prevDate] = getPreviousPalindromeDate(date);

           if (ctr1 > ctr2) {
            resultStatement.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
          } else {
            resultStatement.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
          }
        } else {
          resultStatement.innerText = "Yay! Your birthday is palindrome!";
        
        }
    }
}

checkButton.addEventListener("click", clickHandler);