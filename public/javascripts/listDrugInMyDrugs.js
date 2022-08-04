(function () {
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
    function addDrugList(){

        getEmail().then(email => {
            let html = "";

            fetch("/listMyDrugs", {
                method: 'POST',
                body: JSON.stringify({email: email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    return res.json();
                }).then(res => {//
                for (var i =0; i<res.list.length; i++) {
                    html += "<option>" + res.list[i] +" </option>";
                }
                document.getElementById("listDrugOption").innerHTML = html;
            })
                .catch(e => {});
        })
    }

//========================================================================================
    document.addEventListener('DOMContentLoaded', function () {
        addDrugList();
        //document.querySelector("#saveStockMedication").addEventListener("click", addDrugList);

    }, false);


})()
