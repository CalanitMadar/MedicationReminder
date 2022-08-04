(function () {


// //========================================================================================
//     function lock() {
//         console.log("ccccccccc");
//
//
//
//
//     }
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
//     function myDetails(){
//
//         getEmail().then(email=>
//             fetch("/displayDetails", {
//                 method: 'POST',
//                 body:JSON.stringify({email:email}),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }}).then(res=>{
//                     res.json();
//             })
//                 .then(res => {//אם הגיע לכאן קיבלנ תשובה טובה
//                     //return res.json();
//                     document.getElementById("emailDetail").innerHTML = res;
//                     window.location.href = "/show";
//
//                 })
//                 .then(res => {
//
//             })
//         )
//     }


//========================================================================================
    function list_contacts(){
        getEmail().then(email => {
            let html = "";

            fetch("/getContactList", {
                method: 'POST',
                body: JSON.stringify({email: email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    return res.json();
                }).then(res => {//
                    //console.log(res);
                html+="  <tr>\n" +
                    "                <th>First Name</th>\n" +
                    "                <th>Last Name</th>\n" +
                    "                <th>cellphone number</th>\n" +
                    "                <th>Email</th>\n" +
                    "                <th>Type</th>\n" +
                    "            </tr>"
                for (var i =0; i<res.list.length; i++) {
                    html +=
                        "<tr>"+
                        "<td>" + res.list[i][0]+"</td>" + " " +
                        "<td>" + res.list[i][1]+"</td>" + " " +
                        "<td>" + res.list[i][2]+"</td>" + " " +
                        "<td>" + res.list[i][3]+"</td>" + " " +
                        "<td>" + res.list[i][4]+"</td>" + " " +
                        "</tr>";
                }
                document.getElementById("listContact").innerHTML = html;
            })
        })
    }
//========================================================================================
    document.addEventListener('DOMContentLoaded', function () {
        list_contacts();
        //document.querySelector("#listContact").addEventListener("click", list_contacts);

    }, false);


})()
