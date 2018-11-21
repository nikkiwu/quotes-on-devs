(function ($) {
    $document.ready(function () {
        $('#new-quote-button').on('click', function (event) {
            event.preventDefault();
            console.log('click');
        });

        function getQuote() {
            $.ajax({
                method: 'GET',
                url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
            }).done(function (data) {


            }).fail(function (err) {

            });
        }
    })

})(JQuery);