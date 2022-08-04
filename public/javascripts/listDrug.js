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

            fetch("/saveStockMedication", {
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
                document.getElementById("listDrugs").innerHTML = html;
            })
                .catch(e => {});


            // fetch("/ok", {
            //     method: 'POST',
            //     body: JSON.stringify({email: email}),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
        })



    }

//========================================================================================
//     function goHomePage(){
//         console.log("vcvcvcvcvvc")
//
//         getEmail().then(email => {
//
//             fetch("/ok", {
//                 method: 'POST',
//                 body: JSON.stringify({email: email}),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//         })
//     }
//========================================================================================
    document.addEventListener('DOMContentLoaded', function () {
        addDrugList();
        //document.querySelector("#stock").addEventListener("click", goHomePage);

    }, false);


})()
