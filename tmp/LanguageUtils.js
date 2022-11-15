"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDateAgo = exports.convertDate = void 0;
/* eslint-disable linebreak-style */
function convertDate(rawDate, source) {
    const dateString = rawDate.toLowerCase();
    const monthObject = source.dateMonths;
    let date = null;
    for (const typeOfTime in monthObject) {
        if (dateString.includes(monthObject[typeOfTime].toLowerCase())) {
            date = dateString.replace(monthObject[typeOfTime].toLowerCase(), typeOfTime.toLowerCase());
        }
    }
    if (!date || String(date) == 'Invalid Date')
        throw new Error('Failed to parse chapter date! TO DEV: Please check if the entered months reflect the sites months');
    return new Date(date);
}
exports.convertDate = convertDate;
function convertDateAgo(date, source) {
    const dateString = date.toLowerCase();
    const timeObject = source.dateTimeAgo;
    //Get type of time that has passed
    let timeType = null;
    for (const typeOfTime in timeObject) {
        for (const item of timeObject[typeOfTime]) {
            if (dateString.includes(item.toLowerCase())) {
                timeType = typeOfTime;
            }
        }
    }
    //Now we have the type of time that has passed, this can be anything from a "week" to a "year".
    //Now we need to get the amount of time that has passed.
    let timeAgoAmount = null;
    const RegExAgoAmount = /(\d+)/.exec(date);
    if (RegExAgoAmount && RegExAgoAmount[1])
        timeAgoAmount = Number(RegExAgoAmount[1]);
    if (!timeAgoAmount || isNaN(timeAgoAmount) || !timeType) {
        console.log(`Failed to parse time ago format! Either timeType:${timeType} or timeAgoAmount:${timeAgoAmount} is null.`);
        //Since this isn't really important, log it and return null. These titles will just be excluded from the updated section.
        return null;
    }
    //Now we have the time type and number.
    //Now we generate the new date!
    let time = null;
    switch (timeType) {
        case 'now':
            time = new Date(Date.now());
            break;
        case 'yesterday':
            time = new Date(Date.now() - 86400000);
            break;
        case 'years':
            time = new Date(Date.now() - (timeAgoAmount * 31556952000));
            break;
        case 'months':
            time = new Date(Date.now() - (timeAgoAmount * 2592000000));
            break;
        case 'weeks':
            time = new Date(Date.now() - (timeAgoAmount * 604800000));
            break;
        case 'days':
            time = new Date(Date.now() - (timeAgoAmount * 86400000));
            break;
        case 'hours':
            time = new Date(Date.now() - (timeAgoAmount * 3600000));
            break;
        case 'minutes':
            time = new Date(Date.now() - (timeAgoAmount * 3600000));
            break;
        case 'seconds':
            time = new Date(Date.now() - (timeAgoAmount * 3600000));
            break;
        default:
            time = null;
            break;
    }
    if (String(time) == 'Invalid Date')
        time = null; //Check if it's valid or not, if not return null, parser will know what to do!
    return time;
}
exports.convertDateAgo = convertDateAgo;
