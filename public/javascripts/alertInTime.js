var time;

(function () {

    function alert(){
        fetch("/checkDatabase", {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log("inside");

        clearTimeout( time);

        time =   setTimeout(alert, 60000);

    }
//========================================================================================
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(alert, 60000);
        console.log("outside");

    }, false);
})()
