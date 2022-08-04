//פונקציה שבודקת האם שתי הסיסמאות זהות אם לא היא מוציאה הודעת שגיאה
function checkPassword() {
    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;

    if (password1 != password2) {
        let html = "<p class = 'text-white'> passwords don't match</p>";
        document.getElementById("error").innerHTML = html;
        return false;
    }
    else
    {
        return true;
    }
}

//================================================================================================
//פונקציה שבודקת האם בשם פרטי וגם בשם משפחה יש רק אותיות ולא משהו אחר ומחזירה הודעת שגיאה בהתאם
function allLetter()
{
    let html = '';
    let first_name = document.getElementById("firstName").value;
    let last_name = document.getElementById("lastName").value;
    var letters = !/^[A-Za-z]+$/;

    if(/^[a-zA-Z]/.test(first_name) && /^[a-zA-Z]/.test(last_name))
    {
        return true;
    }
    else
    {
        html = "<p class = text-white'> name must be letters</p>";
        document.getElementById("errorName").innerHTML = html;
        return false;
    }
}

//================================================================================================

function checkDataIsNotEmpty()
    {
        let html = '';

        //----------------------------------------------------------------------------
        //נבדוק שהמשתמש בחר לפחות שעה אחת
        var x = document.getElementById("mySelect").options.length;
        if(x === 0){
            html = "<p class = text-white'>Please select at least one hour</p>";
            document.getElementById("errorMessageAlertOrDay").innerHTML = html;
            return false;
        }

        //----------------------------------------------------------------------------
        //נקבל את כל הימים ונבדוק שהמשתמש בחר לפחות אחד
        
        var checkBoxSunday = document.getElementById("Sunday");
        var checkBoxMonday = document.getElementById("Monday");
        var checkBoxTuesday = document.getElementById("Tuesday");
        var checkBoxWednesday = document.getElementById("Wednesday");
        var checkBoxThursday = document.getElementById("Thursday");
        var checkBoxFriday = document.getElementById("Friday");
        var checkBoxSaturday = document.getElementById("Saturday");

        //----------------------------------------------------------------------------
        //נקבל את סוגי ההתראות ונבדוק שהמשתמש בחר לפחות אחד
        var checkBoxSMS = document.getElementById("SMS");
        var checkBoxEmail = document.getElementById("Email");
        var checkBoxphoneCall = document.getElementById("phoneCall");

        //----------------------------------------------------------------------------
        //בדיקה שהמשתמש הקליד את השם של התרופה לפני ששלח את הטופס
        var name_drug = (document.getElementById("myInput").value);
        if(name_drug == "")
        {
            html = "<p class = text-white'>please enter name of drug</p>";
            document.getElementById("errorMessageAlertOrDay").innerHTML = html;
            return false;
        }
        //----------------------------------------------------------------------------
        if ((checkBoxSunday.checked == true || checkBoxMonday.checked == true ||
            checkBoxTuesday.checked == true || checkBoxWednesday.checked == true ||
            checkBoxThursday.checked == true || checkBoxFriday.checked == true ||
            checkBoxSaturday.checked == true) &&
            (checkBoxSMS.checked == true ||checkBoxEmail.checked == true ||checkBoxphoneCall.checked == true)) {
            return true;
        }
        else
        {
            html = "<p class = text-white'>You have not selected at least one day or at least one alert</p>";
            document.getElementById("errorMessageAlertOrDay").innerHTML = html;
            return false;
        }
    }

//=========================================================
//=========================================================

