// Scripts for the graph.html page

var graphModel = {
    trace1: {
        x: [],
        y: [],
        mode: 'markers',
        type: 'scatter', 
        name: 'Songs',
        text: [],
        marker: { 
            size: 12,
            color: numeric.linspace(1, 50, 50)
            // gradient: {
            //     type: "horizontal",
            //     color: "red"
            // }
        }
    },
    layout: {
        xaxis: {
            title: "X Axis",
            titlefont: {
                family: "Courier New, monospace",
                size: 18,
                color: "black"
            }
        },
        yaxis: {
            title: "Y Axis",
            titlefont: {
                family: "Courier New, monospace",
                size: 18,
                color: "black"
            }
        },
        title:'Song Feature Comparison'
    }
}

function graph(data) {
    for (var name in data) {
        graphModel.trace1.text.push(name);
        graphModel.trace1.x.push(data[name]["energy"]);
        graphModel.layout.xaxis.title = "Energy";
        graphModel.trace1.y.push(data[name]["danceability"]);
        graphModel.layout.yaxis.title = "Danceability";
    }
}

/* Formats list of artists into a single string for display */
function getArtistsList(artists) {
    resultString = "";
    artists.forEach((artist) => {
        resultString = resultString + ", " + artist["name"];
    });
    return resultString;
}

$(function() {
    GRAPH = document.getElementById("track-graph");
    Plotly.newPlot(GRAPH, [graphModel.trace1], graphModel.layout);
});
