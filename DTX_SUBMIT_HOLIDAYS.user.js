// ==UserScript==
// @name         DTX_SUBMIT_HOLIDAYS
// @namespace    capgemini.com
// @version      1.1
// @updateURL    https://github.com/martin-armstrong/dtx-submit-holidays/raw/master/DTX_SUBMIT_HOLIDAYS.user.js
// @downloadURL  https://github.com/martin-armstrong/dtx-submit-holidays/raw/master/DTX_SUBMIT_HOLIDAYS.user.js
// @description  Fixes for DTX MyHolidays and SubmitHolidays pages
// @author       martin.armstrong@capgemini.com
// @match        https://*/*/DTX.NET/*
// @match        https://*/DTX.NET/*
// @match        http://*/*/DTX.NET/*
// @match        http://*/DTX.NET/*
// @grant        none
// ==/UserScript==

(function(){
    'use strict';

//actually select project when you select it, so you don't have to press Enter
if(window.location.href.indexOf("SubmitHolidays.aspx")>-1) {
    var projectsDropdown = document.getElementById('G_wcProjectsApplyxxGrid');
    if(projectsDropdown) {
        projectsDropdown.addEventListener("mousedown", function(){
            setTimeout(function(){
                if ( document.forms[0].hdnprojStatus.value== "CHANGED") {
                    document.forms[0].submit();
                    postbackToAuthorisers = true; // ???
                    return false;
                }}, 100);
        });
    }

    //fix setApplyButton as the input no longer has an ID (gets the apply buttons to appear)
    setApplyButton = function setApplyButton(visibility) {
        var grid = igtbl_getGridById("dgHolidaySubmitClaims");
        for(var i = 0; i < grid.Rows.length; i++) {
             var row = document.querySelector("input[name='i_"+i+"']")
             if(row) {
                row.style.visibility = visibility ;
             }
         }
       }
}

//allows you to actually select holiday entries
if(window.location.href.indexOf("MyHolidays.aspx")>-1) {
    setTimeout(function(){
        document.querySelectorAll(".uwgMyHolidays-0-10-cbc").forEach((el)=>{el.onchange=(event)=>{igtbl_chkBoxChange(event,"uwgMyHolidays");}})
    }, 500);
}

})();
