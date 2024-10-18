function padLeft(padding, input) {
    if (typeof padding === "number") {
        // return " ".repeat(padding) + input;
    }
    return padding + input;
}
// typeof type guards
function printAll(str) {
    if (str && typeof str === "object") {
        for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
            var s = str_1[_i];
            console.log(s);
        }
    }
    else if (typeof str === "string") {
        console.log(str);
    }
    else {
        // do nothing
    }
}
// Truthiness narrowing
function getUsersOnlineMessage(numUsersOnline) {
    if (numUsersOnline) {
        return "There are ".concat(numUsersOnline, " online now!");
    }
    return "Nobody's here. :(";
}
Boolean("hello"); // type: boolean, value: true
// !!"world";
function multiplyAll(values, factor) {
    if (!values) {
        return values;
    }
    else {
        return values.map(function (x) { return x * factor; });
    }
}
var value = [2, 3, 4];
var factor = 2;
multiplyAll(value, factor);
