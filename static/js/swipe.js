$(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container', {

        on: {

            init: function () {
                console.log("SwiperInit")
            },

            slidePrevTransitionStart: function () {
                console.log("PrevSlide")
            },

            slideNextTransitionEnd: function () {
                console.log("NextSlide")
            },
        },

        // Optional parameters
        direction: 'horizontal',
        speed: 500,
    })
});