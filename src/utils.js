export const getWeek = (date) => {
    var newYear = new Date(date.getFullYear(), 0, 1);
    var day = newYear.getDay();
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((date.getTime() - newYear.getTime() -
        (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;

    let weeknum = Math.floor((daynum + day - 1) / 7);
    if (day < 4) {
        weeknum = Math.floor((daynum + day - 1) / 7) + 1;
        if (weeknum > 52) {
            let nYear = new Date(date.getFullYear() + 1, 0, 1);
            let nday = nYear.getDay();
            nday = nday >= 0 ? nday : nday + 7;
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    return weeknum;
};

export const dayNames = [
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag',
    'Söndag'
];

export const forEach = function (obj, callback) {
    var ret = [];
    for (var key in obj) {
        var item = obj[key];
        var data = callback(item, key);
        if (data)
            ret.push(data);
    }
    return ret;
}

export const safeName = (val) =>
    val
        .toLowerCase()
        .replace(/å/ig, 'a')
        .replace(/ö/ig, 'o')
        .replace(/ä/ig, 'a');

const fakeUser = { fake: true };
const fakeAuth = {
    onAuthStateChanged: (cb) => { fakeAuth.cb = cb; },
    signInAnonymously: () => { fakeAuth.cb(fakeUser); return Promise.resolve(fakeUser); }
}
const fakeDb = {
    ref: _ => {
        return {
            on: (val, cb) => {
                cb({ exists: () => { return false; } });
            },
            off: () => { }
        }
    }
}

export const auth = window.firebase ? window.firebase.auth() : fakeAuth;
export const db = window.firebase ? window.firebase.database() : fakeDb;
