'use strict';

//Highlighting current navigation link
highlightNav();

//Checking which appearance navigation and ad should take on
mainNavMode();
categoryNavMode();
advertisement();

lazyLoad();

window.addEventListener('resize', () => {
	mainNavMode();
	categoryNavMode();
	advertisement();
});

const navigationHamburger = new Toggle( "hamburger", "main-nav", "click" );
const categoryDropdown = new Toggle( "category-toggle", "category-list", "click" );
const menuDropdown = new Toggle("menu-dropdown-toggle", "dropdown-menu", "click");

function highlightNav() {
	const currentLink = window.location.pathname;
	const links = document.querySelectorAll('#menu > li > a');

	for (let link of links) {
		if (link.getAttribute('href') == currentLink) {
			link.classList.add('current');
		}
	};
};

function mainNavMode() {
	const width = document.documentElement.clientWidth;
	const mainNav = document.getElementById('main-nav');

	if (width > 768) {
		mainNav.classList.remove('side-nav');
		mainNav.classList.add('expanded-nav');
	} else {
		mainNav.classList.remove('expanded-nav');
		mainNav.classList.add('side-nav');
	}
};

function categoryNavMode() {
	const width = document.documentElement.clientWidth;
	const categorySelector = document.getElementById('category-list');
	const categoryToggle = document.getElementById('category-toggle');

	if (width > 768) {
		categoryToggle.classList.remove('visible');
		categoryToggle.classList.remove('is-active');
		categorySelector.classList.add('visible');
		categorySelector.classList.remove('open');
	} else {
		categorySelector.classList.remove('visible');
		categoryToggle.classList.add('visible');
	}
};

function advertisement() {
	const width = document.documentElement.clientWidth;
	const ad = document.getElementById('ad');

	if (width > 1024) {
		ad.dataset.src='img/advertisement_160x600.jpg'
	} else {
		ad.dataset.src='img/advertisement_600x160.jpg'
	}
};

function Toggle(toggle, list, event) {
	this.toggle = document.getElementById( toggle );
	this.list = document.getElementById( list );
	this.event = event;

	this.toggle.addEventListener(this.event, () => {
		if (this.toggle.classList.contains("is-active")) {
			this.toggle.classList.remove("is-active");
			this.list.classList.remove("open");
		} else {
			this.toggle.classList.add("is-active");
			this.list.classList.add("open");
		}
	});
};

function lazyLoad() {
	const lazyImg = document.querySelectorAll('img.lazy-img');

	const imgObserver = new IntersectionObserver( (entries) => {
		entries.forEach( (entry) => {
			if (entry.isIntersecting) {
				let img = entry.target;
				img.src = img.dataset.src;
			}
		})
	});

	for (let img of lazyImg) {
		imgObserver.observe(img);
	};
};