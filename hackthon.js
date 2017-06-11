

$(document).ready(function() {
    $('#userInputitem').hide()
    $('#submit').hide()    
    var city;
    $('#next').click(function() {
        $('.heading').text('Enter your Crop name.')
        city =  $('#userInputCity').val()
        console.log(city)
        $('#userInputCity').hide()
        $('#userInputitem').show()
        $('#next').hide()
        $('#submit').show()
    })

    $('#submit').click(function() {
        var crop =  $('#userInputitem').val()
        var result = $('#showResult')
        console.log(crop)
        $.ajax({
            type: "GET",
            url: "https://data.gov.in/api/datastore/resource.json",
            data: {
                "resource_id": "9ef84268-d588-465a-a308-a864a43d0070",
                "api-key": "8bf2c12265b0783e5f322fbe581913eb",
                "filters[state]": city,
                "filters[commodity]": crop,
                "sort[modal_price]": "asc"
//                "limit":1,
//                "long":2.0
                
            },


            success: function(data) {
                var records = data.records;
                console.log(data)
                var pooriHTML = "";

                for (var i = 0; i < records.length; i++) {
                   {
                        pooriHTML = pooriHTML + `<div class="well col-md-6 col-xs-12" style="width: 500px; text-align: center">
                                                 Minimum Price is ` + data.records[i].min_price + '<br/>' +
                                                `Maximum Price is ` + data.records[i].max_price + '<br>'  +
                                                `Nearest Market ` + data.records[i].market + '<br>'  +
                                                `Model Price is ` + data.records[i].modal_price + '<br>'  +
                                                    
                        `</div>`;
                    }
                }
                
                result.html(pooriHTML);
            }
        });
    });
    })
        
                