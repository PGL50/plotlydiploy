

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    // console.log(sampleNames); 
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // console.log(result);    
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
      var samples = data.samples;
      // console.log(samples) ;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var selectedSample = samples.filter(sampleObj => sampleObj.id == sample);
  
    console.log(selectedSample) ;

    //  5. Create a variable that holds the first sample in the array.
    // var firstSample = samples[0];
    // console.log(firstSample) ;

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    otuId = selectedSample.map(sampleObj => sampleObj.otu_ids);
    otuLabel = selectedSample.map(sampleObj => sampleObj.otu_labels);
    sampleValue = selectedSample.map(sampleObj => sampleObj.sample_values);
    
    // console.log(otuId) ;
    // console.log(otuLabel) ;
    // console.log(sampleValue) ;


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    // var test = selectedSample[0].slice(0,10).map(sampleObj => sampleObj.otu_ids).reverse() ;
    // console.log(test)

    top10Id = otuId[0].slice(0,10).reverse()
    // console.log(top10Id)
    top10Label = otuLabel[0].slice(0,10).reverse()
    // console.log(top10Label)
    top10Value = sampleValue[0].slice(0,10).reverse()
    // console.log(top10Value)

    // // 8. Create the trace for the bar chart. 

    var trace1 = 
      {
        x: top10Value, 
        y: toString(top10Id),
        text: top10Label,
        type: "bar" ,
        orientation: "h"

    } ;

    barData=[trace1] ;

    // ];
    // // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      yaxis : {text: `OTU ${top10Id}`}
     
    };
  //   // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", barData, barLayout);
  });
}





// // Sort the data by Greek search results
// var sortedByGreekSearch = data.sort((a, b) => b.greekSearchResults - a.greekSearchResults);

// // Slice the first 10 objects for plotting
// slicedData = sortedByGreekSearch.slice(0, 10);

// // Reverse the array to accommodate Plotly's defaults
// reversedData = slicedData.reverse();