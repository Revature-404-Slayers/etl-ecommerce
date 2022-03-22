//Research Questions
// Charts
// What is the average quantity of items purchased per transaction? not a graph, just a dynamic div?
// How much does each customer spend on average^^^
// Which days of the week are best for product sales? Barchart

// Table
// How much does each customer spend on average Per Country?
// Extra question: What is the average quantity of items purchased per transaction? per country?
$(document).ready(function () {
    getAllResearch();
});
function overallSpent(){
   let xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function () {
       if (xhr.readyState == 4 && xhr.status == 200){
            let response = JSON.parse(xhr.responseText);

//            let dirtyVsClean = (response.length/2000) * 100;
//            document.getElementById("averageProducts").innerHTML = `<b>Average Products Purchased Per Transaction: </b>${dirtyVsClean}% Clean Data`;
//                console.log(response.length);
                let cleanVsDirty = (response.length/2000) * 100;
            document.getElementById("averageAmount").innerHTML = `<b>Sales Averages: </b>${cleanVsDirty}% Clean Data`;
                console.log(response.length);


            let transCount = 0;
            totalSales = 0;
            totalQty = 0;
            for(let i = 0; i < response.length; i++){
                if(response[i].paymentTxnSuccess == 'Y'){
                    totalSales += (response[i].price * response[i].qty);
                    totalQty += response[i].qty;
                    transCount++;
                }
            }
            let averageSales = (totalSales/transCount).toFixed(2);
            let averageQty = (totalQty/transCount).toFixed(0);
<<<<<<< HEAD
            console.log(averageQty);
            document.getElementById("Q2").innerHTML = `<b>Average Spent Per Transaction:</b> ${averageSales}<br></br> <b>Average Quantity Bought Per Transaction:</b> ${averageQty}`;
//            document.getElementById("Q2").innerHTML = `<b>Average Quantity:</b> ${averageQty}`;
=======
            document.getElementById("Q2").innerHTML = `<b>Average Sales:</b> ${averageSales}`;
            document.getElementById("Q1").innerHTML = `<b>Average Quantity:</b> ${averageQty}`;
>>>>>>> e35137bc22a9b18d515293ce84fb7f9c0e772bc6
       }

   }
   xhr.open("GET", "http://localhost:8080/ETL-E-Commerce/question3", true);
   xhr.send();
}


function getAllResearch(){
    let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);
                console.log(response);

                let dirtyVsClean = (response.length/2000) * 100;
                document.getElementById("reportsCharts").innerHTML = `<b>Reports: </b>${dirtyVsClean}% Clean Data`; 
                    console.log(response.length);

                
//            let x = document.getElementById("researchTable");
//            x.remove();

            let table = document.createElement("table");
            table.setAttribute("id", "researchTable");
            table.setAttribute("class", "table table-striped table-bordered table-sort sortable");
            let thead = document.createElement("thead");
            thead.setAttribute("id", "thead");
            let tbody = document.createElement("tbody");
            tbody.setAttribute("id", "tbody");
            table.appendChild(thead);
            table.appendChild(tbody);
            document.getElementById("researchDiv").appendChild(table);
            // Create table header array
            let header = [
                "Country",
                "Average Sale Per Transaction",
                "Average Quantity of Items Per Sale"
            ];
            // Create table header row
            let headerRow = document.createElement("tr");
            header.forEach(function (header) {
                let th = document.createElement("th");
                th.setAttribute("style", "cursor: pointer");
                th.innerHTML = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);

            // push response into researchArray
            let researchArray = [];
            for (let i = 0; i < response.length; i++) {
                let research = response[i];
                researchArray.push(research);
            }
            //
            let countries = [];
            let totalSales = []
            let totalProductSold = [];
            let totalSuxTrans= [];

            for(let i = 0; i < researchArray.length; i++){
                if (countries.indexOf(researchArray[i].country) == -1) { // if the country doesnt exist in country array
                    countries.push(researchArray[i].country); // push into country array
                    totalSales.push(0); // array of sales
                    totalProductSold.push(0); // array of quantities
                    totalSuxTrans.push(0);

                }
                let countryIndex = countries.indexOf(researchArray[i].country); // finds in countries the index of the country that matches the country at I of research array
                if (researchArray[i].paymentTxnSuccess == 'Y'){
                    totalSales[countryIndex] += researchArray[i].totalPrice; // if transaction is successful, add total price at i to total sales at the countries index
                    totalProductSold[countryIndex] += researchArray[i].qty; // country product sold if payment successful
                    totalSuxTrans[countryIndex]++;

                }
             }

            for (let i = 0; i < countries.length; i++) {
                let row = document.createElement("tr");
                let country = document.createElement("td");
                country.innerHTML = countries[i];
                row.appendChild(country);

                let sale = document.createElement("td");
                sale.innerHTML = (totalSales[i] == 0) ? "0" : ((totalSales[i]/totalSuxTrans[i]).toFixed(2));//((totalSales[i]/totalSuxTrans[i]).toFixed(2));
                row.appendChild(sale);

                let qty = document.createElement("td");
                qty.innerHTML = (totalProductSold[i] == 0) ? "0" : ((totalProductSold[i]/totalSuxTrans[i]).toFixed(0));//((totalProductSold[i]/totalSuxTrans[i]).toFixed(2));
                row.appendChild(qty);
                tbody.appendChild(row);

//                table.append(row);
            }
            sorttable.makeSortable(table);

        }
    }
    xhr.open("GET", "http://localhost:8080/ETL-E-Commerce/research", true);
    xhr.send();
    getDayBarChart();
    overallSpent();
}

function getDayBarChart(){
    // let chartStatus = Chart.getChart("barChart");
    // if (chartStatus != undefined) {
    //     chartStatus.destroy();
    // }
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);
            const labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const data = [0, 0, 0, 0, 0, 0, 0];


            let dirtyVsClean = (response.length/2000) * 100;
            document.getElementById("salesByDay").innerHTML = `<b>Sales by Day: </b>${dirtyVsClean}% Clean Data`; 
            console.log(response.length);
        
            // put all dates in response into an array called dates
            for (let i = 0; i < response.length; i++) {
//          datesArr.push(response.orderDate[i]);
            const d = new Date(response[i].orderDate);
            let day = d.getDay();
                if (day == 0) {
                    data[0]++;
                } else if (day == 1) {
                    data[1]++;
                } else if (day == 2) {
                    data[2]++;
                } else if (day == 3) {
                    data[3]++;
                } else if (day == 4) {
                    data[4]++;
                } else if (day == 5) {
                    data[5]++;
                } else {
                    data[6]++;
                }
            }
            let ctx = document.getElementById('barChart').getContext('2d');
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sales by Day of Week',
                        data: data,
                        backgroundColor: 'rgba(0, 40, 255, 0.59)',
                        borderColor: 'rgba(0, 40, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
    xhr.open("GET", "http://localhost:8080/ETL-E-Commerce/orders", true);
    xhr.send();

}