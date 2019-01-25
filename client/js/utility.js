// Mobile nav


function mobileNav() {
	const x = document.getElementsByClassName('mobile-nav')[0];
	if (x.style.display === 'block') {
		x.style.display = 'none';
	} else {
		x.style.display = 'block';
	}
}
