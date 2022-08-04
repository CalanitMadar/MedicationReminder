(function () {
    //========================================================================================
    //========================================================================================
    function deleteDrugFromList() {
        var x = document.getElementById("listDrugOption");
        x.remove(x.selectedIndex);//מחיקת תרופה מהרשימה המוצגת של html
    }
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
    //פונקציה למחיקת תרופה גם מהמסד נתונים וגם מהרשימה שמוצגת למשתמש
    function deleteDrug(){
        var drugName;
        drugName = document.getElementById("listDrugOption").value;

        console.log(drugName)

        getEmail().then(email => {
            fetch("/remove", {
                method: 'POST',
                body: JSON.stringify({drugName: drugName, email: email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    return res.json();
                })
        })


        deleteDrugFromList();//קריאה לפונקציה שמוחקת את השם של התרופה מהרשימה של HTML


    }

//========================================================================================
    document.addEventListener('DOMContentLoaded', function () {
        //deleteDrug()
        document.querySelector("#deleteDrug").addEventListener("click", deleteDrug);
    }, false);
})()
