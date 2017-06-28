var Q = require('q');

function step1() {
    console.log("step 1");
    return 1;
}

/* Simple function. Works ok!
function step2(i) {
    console.log("step 2");
    throw "error chungo";
    return i+1;
}
*/

/* Callback without deferred. Wrong!!!
function step2(i) {
    console.log("step 2");
    setTimeout(function() {
        console.log("timeout step2");
        return i+1;
    },1000);
}
*/

// Corrected version with deferred
function step2(i) {
    var deferred = Q.defer();
    console.log("step 2");
    setTimeout(function() {
        console.log("timeout step2");
        return deferred.resolve(i+1);
    },1000);
    return deferred.promise;
}

function step3(i) {
    console.log("step 3");
    return i+10;
}

Q.fcall(step1)
    .then(step2)
    .then(step3)
    .then(function(result) {
        console.log("RESULT is ", result);
    })
    .catch(function(err) {
        console.log("ERROR is ", err);
    })
    .done();
