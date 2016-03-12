$('.single-items').slick({
	dots: true,
	infinite: false,
	arrows: false,
	speed: 250,
	initialSlide: 0,
	mobileFirst: true,
	responsive: [
	{
		breakpoint: 769,
		settings: "unslick"
	},
	{
		breakpoint: 768,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		}
	}]
});