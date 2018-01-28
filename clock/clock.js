document.addEventListener('DOMContentLoaded', function() {

  const nums = [
    "nums/0.svg",
    "nums/1.svg",
    "nums/2.svg",
    "nums/3.svg",
    "nums/4.svg",
    "nums/5.svg",
    "nums/6.svg",
    "nums/7.svg",
    "nums/8.svg",
    "nums/9.svg",
    "nums/colon.svg"
  ];


  const one = document.getElementById("one");
  const imgOne = one.getElementsByTagName('img')[0];

  const two = document.getElementById("two");
  const imgTwo = two.getElementsByTagName('img')[0];

  const three = document.getElementById("three");
  const imgThree = three.getElementsByTagName('img')[0];

  const four = document.getElementById("four");
  const imgFour = four.getElementsByTagName('img')[0];

  const five = document.getElementById("five");
  const imgFive = five.getElementsByTagName('img')[0];

  const six = document.getElementById("six");
  const imgSix = six.getElementsByTagName('img')[0];

  const seven = document.getElementById("seven");
  const imgSeven = seven.getElementsByTagName('img')[0];

  const eight = document.getElementById("eight");
  const imgEight = eight.getElementsByTagName('img')[0];

  const nine = document.getElementById("nine");
  const imgNine = nine.getElementsByTagName('img')[0];

  const ten = document.getElementById("ten");
  const imgTen = ten.getElementsByTagName('img')[0];

  //Functions

  function milli() {
    //returns float from 0 to 1
    return new Date().getMilliseconds() / 1000;
  }

  function second() {
    //returns int from 0 to 59
    return new Date().getSeconds();
  }

  function minute() {
    //returns int from 0 to 59
    return new Date().getMinutes();
  }

  function hour() {
    //returns int from 0 to 24
    return new Date().getHours();
  }

  function splitTime(t) {
    //takes int(12) returns array[1, 2]
    if (t < 10) {
      t1 = 0;
      t2 = t;
    } else {
      t1 = Math.floor(t / 10);
      t2 = t % 10;
    }
    return [t1, t2];
  }

  function nextHour(h) {
    //takes array[1,2] returns array[2,3]
    let h1 = h[0] + 1;
    let h2 = h[1] + 1;
    if (h2 >= 9) {
      h2 = 0
    } else if (h1 > 2 && h2 > 3) {
      h2 = 0
    }
    if (h1 > 2) {
      h1 = 0;
    }
    return [h1, h2];
  }

  function nextMinute(m) {
    //takes array[1,2] returns array[2,3]
    let m1 = m[0] + 1;
    let m2 = m[1] + 1;
    if (m2 >= 9) {
      m2 = 0
    }
    if (m1 >= 5) {
      m1 = 0;
    }
    return [m1, m2];
  }


  function clock() {

    let h = splitTime(hour());
    let m = splitTime(minute());

    let nextH = nextHour(h);
    let nextM = nextMinute(m);

    one.style.transform = 'scaleY(' + 1 + ')';
    imgOne.setAttribute('src', nums[h[0]]);
    imgTwo.setAttribute('src', nums[h[1]]);

    imgFour.setAttribute('src', nums[m[0]]);
    imgFive.setAttribute('src', nums[m[1]]);

    imgSix.setAttribute('src', nums[nextH[0]]);
    imgSeven.setAttribute('src', nums[nextH[1]]);

    imgNine.setAttribute('src', nums[nextM[0]]);
    imgTen.setAttribute('src', nums[nextM[1]]);


    let min2 = (second() + milli()) / 60;
    let upperMinutes2 = 2 - min2 * 2;
    let lowerMinutes2 = min2 * 2;

    five.style.transform = 'scaleY(' + upperMinutes2 + ')';
    ten.style.transform = 'scaleY(' + lowerMinutes2 + ')';
    five.style.opacity = min2 > 0.99 ? 0.3 : 1;

    let min1 = minute() % 10 + min2;
    min1 = min1 / 10;
    let upperMinutes1 = 2 - min1 * 2;
    let lowerMinutes1 = min1 * 2;

    four.style.transform = 'scaleY(' + upperMinutes1 + ')';
    nine.style.transform = 'scaleY(' + lowerMinutes1 + ')';
    four.style.opacity = min1 > 0.999 ? 0 : 1;

    let hour2 = minute() % 60 + min2;
    hour2 = hour2 / 60;
    let upperHour2 = 2 - hour2 * 2;
    let lowerHour2 = hour2 * 2;

    two.style.transform = 'scaleY(' + upperHour2 + ')';
    seven.style.transform = 'scaleY(' + lowerHour2 + ')';
    two.style.opacity = hour2 > 0.9999 ? 0 : 1;


    let hour1 = hour() % 10 + hour2;
    if (hour() > 20) {
      hour1 = hour1 / 4;
    } else {
      hour1 = hour1 / 10;
    }

    let upperHour1 = 2 - hour1 * 2;
    let lowerHour1 = hour1 * 2;

    one.style.transform = 'scaleY(' + upperHour1 + ')';
    six.style.transform = 'scaleY(' + lowerHour1 + ')';
    one.style.opacity = hour1 > 0.99999 ? 0 : 1;

    eight.style.opacity = second() % 2 ? 0.1 : 1;

    requestAnimationFrame(clock)
  }

  window.requestAnimationFrame(clock);


});
