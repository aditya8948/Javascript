// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// Problem : givenn a arrray of temperature of one day , calculate the temperaturn aplitude , there  might be soome sensor error

// temprature amplitude = max tem - min tem
const calciTemp = function (temps) {
  let maxTemp = temps[0];
  let minTemp = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const temp = temps[i];

    if (typeof temp !== "number") continue;

    if (temp > maxTemp) maxTemp = temp;
    if (temp < minTemp) minTemp = temp;
  }

  return maxTemp - minTemp;
};
const tempratures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

console.log(`Amplitude temperature = ${calciTemp(tempratures)}`);
