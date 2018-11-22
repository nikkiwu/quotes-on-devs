(function ($) {

    $(document).ready(function () {
        let lastPage = '';
        $('#new-quote-button').on('click', function (event) {
            event.preventDefault();
            lastPage = document.URL;

            $.ajax({

                method: 'GET',
                url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',

                success: function (data) {
                    const post = data.shift();

                    $('.entry-content').html(post.content.rendered);
                    $('.entry-title').html(post.title.rendered);

                    if (post._qod_quote_source !== '' && post._qod_quote_source_url !== '') {
                        $('.source').html(', <a href="' + post._qod_quote_source_url + '" target="_blank">' + post._qod_quote_source + '</a>');
                    }

                    else if (post._qod_quote_source !== '' && post._qod_quote_source_url === '') {
                        $('.source').html(', ' + post._qod_quote_source);
                    }

                    else {
                        $('.source').html('');
                    }


                    history.pushState(null, null, qod_vars.home_url + '/' + post.slug);

                }

            });

            $(window).on('popstate', function () {
                window.location.replace(lastPage);
            });


            $('quote-submission-form').on('submit', function (event) {
                event.preventDefault();
                postQuote();


            });

            function postQuote() {
                $.ajax({
                    method: 'POST',
                    url: qod_vars.rest_url + 'wp/v2/posts',
                    data: {
                        title: 'quoteTitle',
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-WP-Nonce', qod_vars.nonce);
                    }
                }).done(function () {
                    console.log('response');
                }).fail(function () {
                    console.log('hello');
                });

            }

        }); // end of doc ready
    })
})(jQuery);



