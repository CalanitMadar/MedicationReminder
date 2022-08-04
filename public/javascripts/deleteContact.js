(function () {
    //========================================================================================
    //========================================================================================
    function deleteContactFromList() {
        var x = document.getElementById("emailContactRemove");
        x.remove(x.selectedIndex);//מחיקת איש קשר מהרשימה המוצגת של html
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
    //פונקציה למחיקת איש קשר גם מהמסד נתונים וגם מהרשימה שמוצגת למשתמש
    function deleteContact(){
        var contactName;
        contactName = document.getElementById("emailContactRemove").value;


        console.log(contactName)

        getEmail().then(email => {
            fetch("/deleteContact", {
                method: 'POST',
                body: JSON.stringify({contactName: contactName, emailUser: email, emailContact:contactName}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    return res.json();
                })
        })


        deleteContactFromList();//קריאה לפונקציה שמוחקת את האיש קשר מהרשימה של HTML
        window.location.reload();//ריענון הדף של אנשי הקשר מייד לאחר מחיקת איש קשר כדי שהוא לא יוצג למשתמש

    }
//========================================================================================
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector("#deleteContact").addEventListener("click", deleteContact);
    }, false);
})()
