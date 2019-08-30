$("#noresult").hide()

$("#search").keyup(function () {
    emptyTable()
    var search = $("#search").val().toLowerCase();

    $(document).ajaxStart(function () {
        $("#result").text("");
        $("#btnSearch").text("searching");
        $("#btnSearch").attr("disabled", true);
        emptyTable();
    });

    $(document).ajaxStop(function () {
        $("#btnSearch").text("search");
        $("#btnSearch").attr("disabled", false);

    });
    
    $.ajax({
        url: "https://restcountries.eu/rest/v2/name/" + search,
        type: 'GET',
        error: function (e) {
            if (e.status == 404) {
                $("#noresult").show()
                $("#result").text("Number of Results: "+0);

            }
        },
        success: function (response) {
            var counter=0;
            $("#noresult").hide()
            console.log(response)
            if (response.length != 0) {
                for (let i = 0; i < response.length; i++) {
                    if (response[i].name.toLowerCase().substring(0, search.length) == search) {
                        counter++;
                        addRow(response[i].name, response[i].flag, response[i].alpha2Code, response[i].population)
                    }

                }
                $("#result").text("Number of Results: "+counter);
            }
        }
    })
})