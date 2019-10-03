// little functions

exports.timeDelay = function (t) { // It shows the time delay after an error
    t = Math.round(t / 1000);
    if (t<60) return t + ' sec';
    else return Math.round(t / 60) + ' min';
};
