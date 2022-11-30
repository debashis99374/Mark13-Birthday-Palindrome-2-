function reverseStr(str) {
  var splitString = str.split("");
  var reverseSplitChars = splitString.reverse();
  var joinSplitedReversedString = reverseSplitChars.join("");
  return joinSplitedReversedString;
}

function isPalindrome(str) {
  var rvrcstring = reverseStr(str);

  return str === rvrcstring;
}
function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}


function getAllDateFormatsInString(date) {
  var datestr = convertDateToStr(date);

  var ddmmyyyy = datestr.day + datestr.month + datestr.year;
  var mmddyyyy = datestr.month + datestr.day + datestr.year;
  var yyyymmdd = datestr.year + datestr.month + datestr.day;
  var ddmmyy = datestr.day + datestr.month + datestr.year.slice(-2);
  var mmddyy = datestr.month + datestr.day + datestr.year.slice(-2);
  var yyddmm = datestr.year.slice(-2) + datestr.day + datestr.month;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];

}


function isAllDateFormatsPalendrome(date) {
  var listOfAllDateFormats = getAllDateFormatsInString(date);
  var boolianValue = false;
  for (let i = 0; i < listOfAllDateFormats.length; i++) {
    if (isPalindrome(listOfAllDateFormats[i])) {
      boolianValue = true;
      break;
    }
  }
  return boolianValue;
}
function leapyear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}
function nextDay(date) {

  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (leapyear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  }
}
function nextPalindromeDate(date) {
  var dayCount = 0;
  var nxtDate = nextDay(date);
  while (1) {
    dayCount++;
    var nextPalindromeDate = isAllDateFormatsPalendrome(nxtDate);
    if (nextPalindromeDate) {
      break;
    }
    nxtDate = nextDay(nxtDate);
  }
  return [dayCount, nxtDate];
}


var bDay = document.querySelector("#input");
var bttnHandler = document.querySelector("#bttn");
var Output = document.querySelector("#output");

function bDayPalinderomeChecker() {
  var bdayString = bDay.value;

  if (bdayString !== "") {
    var listOfDates = bdayString.split("-");
    var date = {
      day: Number(listOfDates[2]),
      month: Number(listOfDates[1]),
      year: Number(listOfDates[0])
    };
    var PalindromeBday = isAllDateFormatsPalendrome(date);
    if (PalindromeBday) {
      Output.innerHTML = "yuppy your Birthday is  a Palindrome......"
    } else {
      var [dayCount, nxtDate] = nextPalindromeDate(date);
      Output.innerHTML = `Next Palindrome date is ${nxtDate.day}-${nxtDate.month}-${nxtDate.year} which is ${dayCount} days from Today...`
    }
  }
}

bttnHandler.addEventListener("click", bDayPalinderomeChecker);