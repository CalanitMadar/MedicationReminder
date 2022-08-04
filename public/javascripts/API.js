// (function () {
//
//     const searchcountry = async searchBox => {
//         const res = await fetch('https://api.fda.gov/drug/drugsfda.json?count=openfda.brand_name.exact');
//         //const res = await fetch('../data/drug-drugsfda-0001-of-0001.json');
//         const drugs = await res.json();
//
//         // console.log(drugs["results"][0]["term"]);
//         console.log(drugs);
//
//         //Get Entered Data
//
//         let fits = drugs.results.filter(drug => {
//             const regex = new RegExp(`^${searchBox}`, 'gi');
//             return drug.term.match(regex);//|| country.abbr.match(regex);
//         });
//
//         if (searchBox.length === 0) {
//             fits = [];
//             countryList.innerHTML = '';
//         }
//
//         for (var i = 0; i<fits.length; i++){
//             console.log(fits[i].term);
//         }
//         outputHtml(fits);
//     };
//
// // show results in HTML
//     const outputHtml = fits => {
//         if (fits.length > 0) {
//             const html = fits.map(fit => `
//
// <div class="row">
//     <div class="col s12">
//                 <h6 class="card-title m1"><a>${fit.term}</a>      </h6>
//                     <div class="card-action">
//                     </div>
//         </div>
//     </div>
//     `)
//                 .join('');
//
//             document.getElementById('countryList').innerHTML = html;
//         }
//     };
//
//
//     document.addEventListener('DOMContentLoaded', function () {
//         document
//             .getElementById('search')
//             .addEventListener('input', () => searchcountry(search.value));
//
//     }, false);
//
// // (${
// //                    // fit.abbr
// //                 })<span class="blue-text m-4"> ${fit.capital}</span>*/
//
// })();
