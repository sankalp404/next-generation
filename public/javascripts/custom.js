function getNextGeneration() {
        var data = {
            'M': JSON.parse($('#columns').val()),
            'N': JSON.parse($('#rows').val()),
            'liveCells' : JSON.parse($('#liveCells').val())
        };

        $.ajax({
            url: '/nextgeneration',
            jsonp: 'callback',
            dataType: 'jsonp',
            data: data,
            success: function(response) {
                drawGeneration(response);
            }
        });
    }

function drawGeneration(response){
    console.log(response);
    $("#result").html("<kbd>Result: " + JSON.stringify(response) + "</kbd>");
}
