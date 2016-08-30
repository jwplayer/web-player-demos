

if (!Streamroot.p2pAvailable) {

    document.querySelector("#graph-container").setAttribute("style","display:none");
    document.querySelector("#warning-not-compatible").setAttribute("style","display:block");  
} 

 var checkExist = setInterval(function() {
     if (document.querySelector('#p2pGraph').length) {
         clearInterval(checkExist);
         document.querySelector('#p2pGraph > svg')
         .setAttribute('width', '100%');
     }
 }, 100);

 var updatePeersColor = setInterval(function() {
     if(!window.SR_DISPLAY_INTERFACE){
         console.log("window.SR_DISPLAY_INTERFACE not defined yet");
         return;
     }

     var newStats= window.SR_DISPLAY_INTERFACE.getStats();
     var peersBox = document.getElementById('peers').parentNode;

     peersBox.className = newStats.peers.count > 0 ? 'p2p-box has-peers' : 'p2p-box has-no-peers';
 }, 500);

var startDebug = function() {
    var graph = document.getElementById('p2pGraph');
    if(!graph){
        document.body.appendChild(document.createElement('br'));
        graph = document.createElement('div');
        graph.id = 'p2pGraph';
        graph = document.body.appendChild(graph);
    }
    graph.width = '1000';
    var debug = document.createElement('div');
    debug.id = 'debug';
    document.body.appendChild(debug);
    d3.select('#debug').html("                        <div>" +
                             "<div style='display:inline-block'>" +
                             "<br>" +
                             "<div id='legend'>" +
                             "</div>" +
                             "</div>" +
                             "<div id='statusbox' style='display:inline-block; vertical-align:middle'>" +
                             "<ul class='panel' >" +
                             "<li class='h4'>Connected to tracker: <span class='strong' id='status'></span></li>" +
                             "<li class='h4' >Peers connected to you : <span class='strong' id='peers'></span></li>" +
                             "<li class='h4'>Bandwidth savings : <span class='strong' id='percent'></span></li>" +
                             "</ul>" +
                             "</div>" +
                             "</div>");
    var stat_size = 60;
    var plotting = false;
    var timer;
    var previousTotalCDN = 0;
    var previousPartialCDN = 0;

    d3.select('#status').html(false.toString());
    d3.select('#status').style('color','red');
    d3.select('#peers').html(0);
    d3.select('#percent').html('0%');
    var stats = [];
    for(var j=0;j<2;j++) {
        stats[j] = [];
        for(var i = 0; i<stat_size; i++) {
            stats[j][i] = {
                x:i-stat_size,
                y:0
            };
        }
    }

    var graph = new Rickshaw.Graph({
        element: graph,
        width: 1000,
        height: 210,
        renderer: 'area',
        unstack: false,
        stroke: true,
        series: [{
            data:stats[1],
            name:'P2P traffic',
            color: 'rgba(0, 153, 173, 0.6)',
            stroke: 'rgba(0,0,0,.15)',
            renderer: 'area'
        },{
            data:stats[0],
            name:'CDN traffic',
            color: 'rgba(255, 150, 0, 0.6)',
            stroke: 'rgba(0,0,0,.15)',
            renderer : 'area'
        }]
    });

    var yAxis = new Rickshaw.Graph.Axis.Y({
        graph: graph,
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT
    });
    yAxis.render();
    var xAxis = new Rickshaw.Graph.Axis.X({
        graph: graph
    });
    xAxis.render();

    var hoverDetail = new Rickshaw.Graph.HoverDetail( {
        graph: graph,
        formatter: function(series, x, y) {
            return series.name + ': ' + getFormattedFilesize(y) + '<br>'+'<span class="date">' + x + ' seconds</span>';
        }
    } );
    var legend = new Rickshaw.Graph.Legend({
        graph: graph,
        element: document.querySelector('#legend')
    });
    var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
        graph: graph,
        legend: legend
    });

    graph.render();

    d3.selectAll('.rickshaw_graph > svg > g.y_ticks.plain > g > text').attr('dy','-0.3em');
    d3.selectAll('.rickshaw_graph > svg > g.x_ticks_d3.plain > g.tick > text').attr('x','1.3em');


    var addTitle = function() {
        d3.select('svg').append('text')
        .attr('x',300)
        .attr('y',25)
        .style('fill','#ddd')
        .style('font-size', 18)
        .style('text-anchor', 'middle')
        .text('P2P/CDN traffic');
        d3.selectAll('path').attr('stroke-width','4');
    };
    addTitle();

    function getFormattedFilesize(fileSizeInBytes) {
        if(fileSizeInBytes === 0) {
            return '0 kB';
        }
        var i = -1;
        var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    }
    var createStat = function(){
        if(plotting===false) {
            plotting=true;
            timer = window.setInterval(function() {
                for(var i=0;i<stat_size-1;i++) {
                    for(var j = 0; j<2; j++) {
                        stats[j][i].y= stats[j][i+1].y;
                    }
                }
                if(!window.SR_DISPLAY_INTERFACE){
                    console.log("window.SR_DISPLAY_INTERFACE not defined yet");
                    return;
                }
                
                var newStats= window.SR_DISPLAY_INTERFACE.getStats();
                d3.select('#status').html(newStats.tracker.connected.toString());
                if(newStats.tracker.connected===false) {
                    d3.select('#status').style('color','red');
                }else {
                    d3.select('#status').style('color','green');
                }
                d3.select('#peers').html(newStats.peers.count);
                var percent = 100*newStats.download.p2pDownloaded/(newStats.download.p2pDownloaded+newStats.download.cdnDownloaded);
                d3.select('#percent').html(percent.toPrecision(3)+'%');
                var cdnDL = newStats.download.cdnDownloaded - previousTotalCDN;
                previousTotalCDN = newStats.download.cdnDownloaded;
                previousPartialCDN = cdnDL;
                stats[0][stat_size-1].y = newStats.download.cdnDownloaded;
                stats[1][stat_size-1].y = newStats.download.p2pDownloaded;
                graph.update();
                d3.selectAll('.rickshaw_graph > svg > g.y_ticks.plain > g > text').attr('dy','-0.3em');
                d3.selectAll('.rickshaw_graph > svg > g.x_ticks_d3.plain > g.tick > text').attr('x','1.25em');
                test = d3.selectAll('.rickshaw_graph > svg > g.x_ticks_d3.plain > g.tick > text')//.attr('x','1.25em');
                addTitle();
            },1000);
        }
    };
    var finished = function () {
        clearInterval(timer);
        plotting = false;
    };


    createStat();
};

window.addEventListener('load', startDebug);