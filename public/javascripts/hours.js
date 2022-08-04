let arrayOfTimeHours = [];
let arrayOfTimeMinutes = [];
let arrayHoursAndMinutes = [];

(function () {
    //========================================================================================
//========================================================================================
    async function getEmail() {

        const res = await fetch("/email", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(e => {
        });

        const mail =
            await res.json();
        return mail.email;
    }


//========================================================================================
    //הוספת שעה
    function add(){
         var hoursClock = document.getElementById("hoursClock").value;
         var minutesClock = document.getElementById("minutesClock").value;

         arrayOfTimeHours.push(hoursClock);
         arrayOfTimeMinutes.push(minutesClock);


         let html = "";
         for (var i =0; i<arrayOfTimeMinutes.length; i++) {
             html += "<option>" + arrayOfTimeHours[i] + ":" + arrayOfTimeMinutes[i] +" </option>";
         }
        document.getElementById("mySelectHours").innerHTML = html;
         console.log(hoursClock + ":" + minutesClock)
         var a = String(hoursClock + ":" + minutesClock)
        arrayHoursAndMinutes.push(a);
         console.log(arrayHoursAndMinutes)


        getEmail().then(email => {

            fetch("/getListHoursAndMinutes", {
                method: 'POST',
                body: JSON.stringify({email: email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    return res.json();
                }).then(res => {
                if (res.listHM == "") {
                    return arrayHoursAndMinutes;
                }

            })
        })
     }
//========================================================================================
    function remove(){
        var x = document.getElementById("mySelectHours");
        var x = document.getElementById("mySelectHours");
        arrayOfTimeMinutes.splice(x.selectedIndex, 1);//מחיקה מהמערך של השעות את השעה הרצויה
        arrayOfTimeHours.splice(x.selectedIndex, 1);//מחיקה מהמערך של הדקות את השעה שנבחרה
        x.remove(x.selectedIndex);//מחיקת השעה מהרשימה המוצגת של html
    }
   //========================================================================================
    document.addEventListener('DOMContentLoaded', function () {

        document.querySelector("#Add").addEventListener("click", add);
        document.querySelector("#remove").addEventListener("click", remove);
    }, false);
})()
