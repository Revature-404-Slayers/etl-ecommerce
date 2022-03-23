//Marketing Questions
// CHARTS
// What is the top selling category of items?
// How does the popularity of products change throughout the year? (by most popular product each month) line graph
// What times have the highest traffic of sales?

// TABLES
//What is the top selling category of items Per Country? (country table- most popular item)
//How does the popularity of products change throughout the year Per Country? (country table - view button)
//Which locations see the highest traffic of sales?(country table - highest city)
//What times have the highest traffic of sales? Per Country? (country table-highest traffic)
indForLineChart=5
indForLineArr=[]
globalResponse=[]
function $(x) {
    return document.getElementById(x)
}
x=0;

let catUrl="http://localhost:8080/ETL-E-Commerce/order/category"
/* function drawChart() {
    // Define the chart to be drawn.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Element');
    data.addColumn('number', 'Percentage');
    data.addRows([
      ['Nitrogen', 0.78],
      ['Oxygen', 0.21],
      ['Other', 0.01]
    ]);

    var options = {
        backgroundColor: '#1b232e'
    }

    // Instantiate and draw the chart.
    var chart = new google.visualization.PieChart($('my-pie-chart'));
    chart.draw(data, options);
  } */

  function drawDataComp() {
    let chartData = new google.visualization.arrayToDataTable([
      ['Data', 'Clean', 'Dirty'],
      [1000, 732, 268]
    ])

    let chart = new google.visualization.BarChart(document.getElementById('bar-div'));
    let options = {
      bars: 'horizontal',
      width: '900',
      backgroundColor: '#363c4d',
      hAxis: {
        textStyle: {
          color: '#ffffff'
        }
      },
      vAxis: {
        textStyle: {
          color: '#ffffff'
        }
      },
      legend: {
        textStyle: {
          color: '#ffffff'
        }
      }
    }

  }


    function getQ3Data(){
      //     Transactions failed:
      //     access fail/success
      //     calculate percentage
      //     Display in pie chart
        select=document.getElementById('q3Div')
      
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
              let response = JSON.parse(xhr.responseText);
              
              
              let dirtyVsClean = (response.length/2000) * 100;
              document.getElementById("barChartHeader").innerHTML = `<b>Transactions per Month/Time,per Country
              : </b>${dirtyVsClean}% Clean Data`;
                  console.log(response.length);

                  let cleanVsDirty = (response.length/2000) * 100;
              document.getElementById("ProductPop").innerHTML = `<b>Transactions per Category Selected,per Country
              : </b>${cleanVsDirty}% Clean Data`;
                  console.log(response.length);
             globalResponse=response
             getByCountry();
             if(x<1){
             getCountrysAndDrDown(response,'2','3')

            }
            x++;
            /*grab the value of the element in the drop down menu for the barchart check if it is for a specific country or all countrys also check
            the other drop down menu to see if it is all countrys. Based on the results perform slightly different functions that differ only by parameter amount
            */

            if(document.getElementById("3").value=='All Countrys'||document.getElementById("select x category").value=='country'){
              arr=populateBarChart(response,11,document.getElementById("select x category").value);
              getCountrysAndDrDown(response,'2','3')
              
              xlabel = changeLabels(arr[0],document.getElementById("select x category").value);
              
            }else{
             arr=populateBarChart1(response,11,document.getElementById("select x category").value,document.getElementById("3").value);
             xlabel = changeLabels(arr[0],document.getElementById("select x category").value);
            }
            /*create tha bar chart based on the data returned within the if else statement above 'arr' will have a structure like [['label','label1',...],[1,2,5,6,9,...]]
            as an example */
                  let ctx = document.getElementById('Q3').getContext('2d');
                  let chartStatus = Chart.getChart('Q3');
                  if (chartStatus != undefined) {
                      chartStatus.destroy();
                  }

                  let myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: xlabel,
                        datasets: [{
                            label: 'top tansactions per location',
                            data: arr[1],
                            backgroundColor: ['rgba(0, 182, 0, .75)', 'rgba(237, 20, 0, .75)'],
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                display: false,
                                beginAtZero: true
                            }
                        },
                    }
                });
              }
          }
          xhr.open("GET", "http://localhost:8080/ETL-E-Commerce/marketing", true);
          xhr.send();
      
  } 
  // function for a specific country selected. the value is how many bars you would like on the chart
function populateBarChart1(data,value,breakdown,country){
  labelArr=[]
  barHeightArr=[]
  centralArray=[]
  packagedArray=[]
    map=new Map();
   
 //keys are set by the field desired
    for(i=0; i<data.length;i++){
      if(data[i].country==country){
        map.set(data[i][breakdown],0)
      }
        
       

    }
    for(i=0; i<data.length;i++){
  //values for keys are increased by occurence/transaction based on if the country matches the specified criteria
      if(data[i].country==country){
      
      map.set(data[i][breakdown],map.get(data[i][breakdown])+1)
    }
     
    }
  const iterator1 = map.entries();
  /* map is broken down and repackaged for sorting purposes orginal structure is {key:value, key:val1,....} now after for loop below is
    [[key,val],[key1,val1],..]
  */ 
    for(const val of iterator1){
        arr1=[]
        arr1.push(val[0])
        arr1.push(val[1])
        centralArray.push(arr1)

    }
    /*the new array structure is then sorted below by the val in each sub array so if you had [[key,2][key1,1],...]
    it will now be [[key1,1][key,2],...]*/

    newarr=centralArray.sort(function compare(a,b){
        if(a[1]>b[1]){
            return 1
        }else if(a[1]<b[1]){
            return -1
        }else{
            return 0
        }

    })
    //the array is split and packaged int seprate array [1,2,3,...],[key,key1,...] and put into a final array to be returned
    //final array 'packaged array' [[key,key1,...][1,2,3,....]]
    for(i=0;i<newarr.length;i++){
        labelArr.push(newarr[i][0])
        barHeightArr.push(newarr[i][1])
    }
    /* the product categorys are maxed out at 7 so weird things happen when you use the values to determine the bars for that category
    below is where that is delt with
    */
    if(breakdown!='productCategory'){
        packagedArray.push(labelArr.splice(labelArr.length-value-1,labelArr.length))
        packagedArray.push(barHeightArr.splice(barHeightArr.length-value-1,barHeightArr.length))
    }else{
        packagedArray.push(labelArr)
        packagedArray.push(barHeightArr)
    }
    console.log(map)
    console.log(packagedArray)
    return packagedArray;
      
    
}
//function for all countrys selected. Same work flow as the above function but no country criteria being filtered by
function populateBarChart(data,value,breakdown){
  
  labelArr=[]
  barHeightArr=[]
  centralArray=[]
  packagedArray=[]
    map=new Map();
   
 
    for(i=0; i<data.length;i++){
       
        map.set(data[i][breakdown],0)
       
        
       

    }
    for(i=0; i<data.length;i++){
      
      
      map.set(data[i][breakdown],map.get(data[i][breakdown])+1)
      
     
    }
  const iterator1 = map.entries();

    for(const val of iterator1){
        arr1=[]
        arr1.push(val[0])
        arr1.push(val[1])
        centralArray.push(arr1)

    }
    newarr=centralArray.sort(function compare(a,b){
        if(a[1]>b[1]){
            return 1
        }else if(a[1]<b[1]){
            return -1
        }else{
            return 0
        }

    })
    for(i=0;i<newarr.length;i++){
        labelArr.push(newarr[i][0])
        barHeightArr.push(newarr[i][1])
    }
    
    if(breakdown!='productCategory'){
        packagedArray.push(labelArr.splice(labelArr.length-value-1,labelArr.length-1))
        packagedArray.push(barHeightArr.splice(barHeightArr.length-value-1,barHeightArr.length-1))
    }else{
        packagedArray.push(labelArr)
        packagedArray.push(barHeightArr)
    }
    console.log(map)
    console.log(packagedArray)
    return packagedArray;
      
    
}
/*country drop down is created if it doesnt exist for the barchart
if it does exist the div is cleared and it is recreated*/
function getCountrysAndDrDown(data,divId,setAttribId){
//maping the keys as each country
  map=new Map();
  for(i=0; i<data.length;i++){
    if(map.get(data[i].country)==undefined){
    map.set(data[i].country,0)}

}
//creating a select element with options as countrys and id attribute as a integer or whatever desired
//onchange attribute added so chart updates whenever the the value of the select is changed
div=document.getElementById(divId)
div.innerHTML=""
select=document.createElement('select')
select.setAttribute('onchange',"getQ3Data()")
select.setAttribute('id',setAttribId)
option1=document.createElement('option')
option1.innerHTML="All Countrys"
option1.setAttribute('value','All Countrys')
 select.append(option1)

for(let key of map.keys()){
//options created plus appended to select based on map keys and values of the options created
 option=document.createElement('option')
 option.innerHTML=key
 option.setAttribute('value',key)
 select.append(option)
  

}
//select is appended to div.
div.append(select);

}

//function to change numeric labels from timeOfDay and months to better formated labels
function changeLabels(xData,value){
  xlabels =[]
  if(value == "qty" || value == "country" || value == "city" || value == "productCategory")
  {
    for (i = 0; i<xData.length;i++){
      xlabels.push(xData[i])
    }

  }
  else if(value == "timeOfDay"){
    for (i = 0; i<xData.length;i++){
      if (xData[i] == 0) {
        xlabels.push("12 AM")
      }
      if (xData[i] > 12) {
        newtime = xData[i] - 12;
        xlabels.push(newtime +' PM')
      }
      if (xData[i] < 12 && xData[i] > 0) {
        xlabels.push(xData[i]+' AM')
      }
      if(xData[i]==12){
        xlabels.push(xData[i]+' PM')
      }

    }


  }
  else if(value == "months"){
    for (i = 0; i<xData.length;i++){
      if (xData[i] == 1) {
        xlabels.push("January")
      }
      if (xData[i] == 2) {
        xlabels.push("February")
      }
      if (xData[i] == 3) {
        xlabels.push("March")
      }
      if (xData[i] == 4) {
        xlabels.push("April")
      }
      if (xData[i] == 5) {
        xlabels.push("May")
      }
      if (xData[i] == 6) {
        xlabels.push("June")
      }
      if (xData[i] == 7) {
        xlabels.push("July")
      }
      if (xData[i] == 8) {
        xlabels.push("August")
      }
      if (xData[i] == 9) {
        xlabels.push("September")
      }
      if (xData[i] == 10) {
        xlabels.push("October")
      }
      if (xData[i] == 11) {
        xlabels.push("November")
      }
      if (xData[i] == 12) {
        xlabels.push("December")
      }

    }

  }
  
  return xlabels;

}
/*same function as before where a select is created with country options but the 
div is not initially cleared so you can keep createing them*/
function getCountrysNoCleared(data,divId,setAttribId){
  map=new Map();
  for(i=0; i<data.length;i++){
    if(map.get(data[i].country)==undefined){
    map.set(data[i].country,0)}

}
div=document.getElementById(divId)

select=document.createElement('select')
select.setAttribute('onchange',"createLineChart()")
select.setAttribute('id',setAttribId)

for(let key of map.keys()){

 option=document.createElement('option')
 option.innerHTML=key
 option.setAttribute('value',key)
 select.append(option)
  

}
div.append(select);

}
/*similar to the bar chart except when the values are sorted they are sorted by the keys ('timeOfDay' or 'months')*/
function populateLineChart(data,breakdown,country){
  
  labelArr=[]
  barHeightArr=[]
  centralArray=[]
  packagedArray=[]
    map=new Map();
   
 
    for(i=0; i<data.length;i++){
      if(data[i].country==country){
        map.set(data[i][breakdown],0)
      }
        
       

    }
    for(i=0; i<data.length;i++){
      if(data[i].country==country){
      
      map.set(data[i][breakdown],map.get(data[i][breakdown])+1)
    }
     
    }
    //the one array different from the last function now can be either 0-23 for all hours or 1-12 for months no need to use the keys as labels
    if(breakdown=="timeOfDay"){
      for(i=0;i<24;i++){
          labelArr.push(i);
      }
      //increase the value array corresponding to the selected field 'timeOfDay'
      for(t=0;t<labelArr.length;t++){
        if(map.get(labelArr[t])==undefined){
          barHeightArr.push(0)
        }else{
          barHeightArr.push(map.get(labelArr[t]))
        }
      }

    }else{
    for(i=1;i<13;i++){
        labelArr.push(i);
    }
     //increase the value array corresponding to the selected field 'months'
    for(t=0;t<labelArr.length;t++){
      if(map.get(labelArr[t])==undefined){
        barHeightArr.push(0)
      }else{
        barHeightArr.push(map.get(labelArr[t]))
      }
    }

    }
  
   //arrays are packaged together like before 
    
console.log(map);

packagedArray.push(labelArr) 
packagedArray.push(barHeightArr)
console.log(packagedArray);
return packagedArray
}
    
//when the addition buttun is clicked a global variable will be increased and put into an array 'indForLineArr'
//below objects are created for the datasets for the line chart based on the data returned from populate line chart and how many values are in the array
function createObjects(){
  
  labels1=[]
  datasets1=[]
  for(k=0;k<indForLineArr.length;k++){

    let obj1={
      label: document.getElementById(`${indForLineArr[k]}`).value,
      fill: false,
      //colors randomized for each line
      borderColor: `rgba(${getRandInt(0, 225)}, ${getRandInt(0, 225)},${getRandInt(0, 225)},${getRandInt(0, 225)} )`,
      data: populateLineChart(globalResponse,document.getElementById("select x category1").value,
      document.getElementById(`${indForLineArr[k]}`).value)[1]
      
    }
    //obj pushed to dataset1 for every obj
    datasets1.push(obj1);
  }

  //time of day charts
  //labels created for x axis should be the same for every object so just selecting the first object and the labels of that object(array)
  labels1=populateLineChart(globalResponse,document.getElementById("select x category1").value,
  document.getElementById(`${indForLineArr[0]}`).value)[0]
  //labels changed to look nicer for timeOfday and months
  LineChrtLabels = changeLabels(labels1,document.getElementById("select x category1").value)
  data2={
    labels:LineChrtLabels,//switch for new labels
    datasets:datasets1
  }
  //below just used for testing line chart format
  data={
    labels:[3,1,2],
    datasets:[{data:[1,3,4]}]
  }
  console.log(data2)
return data2

}
//when the addition button is pressed create a new select and repopulate the chart also increase indForLineChart
function additionButtonPressed(){
  getCountrysNoCleared(globalResponse,"lineId",indForLineChart);
  indForLineArr.push(indForLineChart)
  indForLineChart++;
  createLineChart()
  
}
//when the sub button is pressed delete the last select and repopulate the chart also decrease indForLineChart
function subtractionButtonPressed(){
  document.getElementById(`${indForLineChart-1}`).remove()
  indForLineArr.pop(indForLineChart)
  indForLineChart--;
  createLineChart()
  
  
}
//the peak of creating the chart lives here every function needed is invoked in order to create the chart here
function createLineChart(){
  let ctx = document.getElementById("lineChart").getContext('2d');
  let chartStatus = Chart.getChart("lineChart");
  if (chartStatus != undefined) {
      chartStatus.destroy();
  }
  let lineChart = new Chart(ctx, {
    type: 'line',
    data: createObjects(),
    options: {
      responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                display: false,
                                beginAtZero: true
                            }
     
    }
  }});
}
//function used for random colors in line chart
function getRandInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)}
  
  
function createTable(data){
    map=new Map();
    //inner maps are never used they were used before when we had a snowflake designed schema and querying from an inner fact table
    //innerMap0=new Map();
    //innerMap1=new Map();
    //innerMap2=new Map();
    startVal=0;
    topProductType=''
    for(i=0; i<data.length;i++){
        //maps are dynamically created based on the values of the fields returned for our objects and how they are needed to be structured
        if(map.get(data[i].country)==undefined){
        map.set(data[i].country,new Map())}
       

        if(map.get(data[i].country).get(data[i]['months'])==undefined){
            map.get(data[i].country).set(data[i]['months'],new Map())}
        if(map.get(data[i].country).get(data[i]['months']).get(data[i]['productCategory'])==undefined){
          map.get(data[i].country).get(data[i]['months']).set(data[i]['productCategory'],0) 
        }
           
        
        
        
    }
    console.log(map)
   //everything is aggregated based on country
    for(i=0; i<data.length;i++){
      map.get(data[i].country).get(data[i]['months']).set(data[i]['productCategory'],
      map.get(data[i].country).get(data[i]['months']).get(data[i]['productCategory'])+1
      )
      
        
        
    }
    
 //get the topPaymentType per country  
for(i=0;i<data.length;i++){
    for(let key of map.get(data[i].country).get(data[i]['months']).keys()){
        if(map.get(data[i].country).get(data[i]['months']).get(key)>startVal){
            topProductType=key
            startVal=map.get(data[i].country).get(data[i]['months']).get(key)
        }


    }
//set the 'TopPaymentType value to be the top payment type per country
    map.get(data[i].country).get(data[i]['months']).set('TopProduct',topProductType)
    topPaymentType=''
    startVal=0



}
console.log(map)


return map;
    }

    function getByCountry(){
      mainMap=createTable(globalResponse);
  //     aggregate payment type
  //     aggregate quantity (total Sales)
  //     aggregate Revenue
      let x = document.getElementById("mgmtStatsTable");
      x.remove();
  
      let table = document.createElement("table");
      table.setAttribute("id", "mgmtStatsTable");
      table.setAttribute("class", "table table-striped table-bordered table-sort sortable");
      let thead = document.createElement("thead");
      thead.setAttribute("id", "thead");
      let tbody = document.createElement("tbody");
      tbody.setAttribute("id", "tbody");
      table.appendChild(thead);
      table.appendChild(tbody);
      document.getElementById("mgmtDiv").appendChild(table);
  
      // Create table header array
      let header = [
          "Country",
          "Month",
          "Top Product"]
  
      // Create table header row
      let headerRow = document.createElement("tr");
      header.forEach(function (header) {
          let th = document.createElement("th");
          th.setAttribute("style", "cursor: pointer");
          th.innerHTML = header;
          headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
  
  
   
      // Create table arrays with no duplicate countries
    
  
      
      // Create table body
      for (let key of mainMap.keys()) {
        for(let key1 of mainMap.get(key).keys()){
          
          let row = document.createElement("tr");
          let country = document.createElement("td");
          country.innerHTML = key;
          
          row.appendChild(country);
          let month = document.createElement("td");
          month.innerHTML = key1;
          
          row.appendChild(month);
          let topProductType = document.createElement("td");
          topProductType.innerHTML = mainMap.get(key).get(key1).get('TopProduct');
         
          row.appendChild(topProductType)
      
  //        table.append(row);
  tbody.appendChild(row);
        }
  
     
      
  
  
  }
    
  }
  
