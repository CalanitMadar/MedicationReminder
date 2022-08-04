(function () {



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
    function report(){
        getEmail().then(email => {
            let html = "";

            fetch("/getReportList", {
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
                    "                <th>Name drug</th>\n" +
                    "                <th>Sunday</th>\n" +
                    "                <th>Monday</th>\n" +
                    "                <th>Tuesday</th>\n" +
                    "                <th>Wednesday</th>\n" +
                    "                <th>Thursday</th>\n" +
                    "                <th>Friday</th>\n" +
                    "                <th>Saturday</th>\n" +
                    "            </tr>"
                for (var i =0; i<res.list.length; i++) {
                    html +=
                        "<tr>"+
                        "<td>" + res.list[i][0]+"</td>" + " " +
                        "<td>" + res.list[i][1]+"</td>" + " " +
                        "<td>" + res.list[i][2]+"</td>" + " " +
                        "<td>" + res.list[i][3]+"</td>" + " " +
                        "<td>" + res.list[i][4]+"</td>" + " " +
                        "<td>" + res.list[i][5]+"</td>" + " " +
                        "<td>" + res.list[i][6]+"</td>" + " " +
                        "<td>" + res.list[i][7]+"</td>" + " " +
                        "</tr>";
                }
                document.getElementById("tableReport").innerHTML = html;
                fetch("/showTable", {
                    method: 'POST',
                    body: JSON.stringify({email: email}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            // }).then(res => {
            //     return res.json();
            // }).then(res => {//
            //     //console.log(res);
            //
            //     for (var i =0; i<res.list.length; i++) {
            //         html +=
            //             "<tr>"+
            //             "<td>" + res.list[0][i]+"</td>" + " " +
            //             "<td>" + res.list[1][i]+"</td>" + " " +
            //             "<td>" + res.list[2][i]+"</td>" + " " +
            //             "<td>" + res.list[3][i]+"</td>" + " " +
            //             "<td>" + res.list[4][i]+"</td>" + " " +
            //             "<td>" + res.list[5][i]+"</td>" + " " +
            //             "<td>" + res.list[6][i]+"</td>" + " " +
            //             "<td>" + res.list[7][i]+"</td>" + " " +
            //             "</tr>";
            //     }
                 document.getElementById("tableReport").innerHTML = html;
            //
             })
            console.log("ffffffffff")
        })
    }
//========================================================================================
    document.addEventListener('DOMContentLoaded', function () {
        report();

    }, false);


})()
