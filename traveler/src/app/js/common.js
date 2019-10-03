'use strict';

const $ = require('jquery');
const popper = require('popper.js');
const bootstrap = require('bootstrap');

$(document).on("DOMContentLoaded", () => {
	$('.carousel').css('display', 'block');
	modalWindow();
	fadingElem();
	lazyImg();
});

function modalWindow() {
	const modal = $('#modal'),
		  modalOverlay = $('#modal-overlay'),
		  closeButton = $('#close-button'),
		  openButton = $('#map-image'),
		  contactsLink = $('#modal a'),
		  mapMark = $('.map-mark');

	const toggleModal = () => {
		modal.toggleClass("opened");
		modalOverlay.toggleClass("opened");
	};

	closeButton.click( () => {
		toggleModal();
	});

	openButton.click( () => {
		toggleModal();
	});

	mapMark.click( () => {
		toggleModal();
	});

	contactsLink.click( () => {
		toggleModal();
	});
};

function fadingElem() {
	const targetElem = document.querySelectorAll('.fading');

	if ('IntersectionObserver' in window) {
		const fadingElemObserver = new IntersectionObserver( (entries) => {
			entries.forEach( (entry) => {
				if (entry.isIntersecting) {
					let elem = entry.target;
					elem.classList.add('fade-in');
				}
			})
		});
		targetElem.forEach( (el) => {
			fadingElemObserver.observe(el);
		});
	} else {
		for (let i = 0; i < targetElem.length; i++) {
			targetElem[i].classList.add('fade-in');
		}
	}
};

function lazyImg() {
	const targetImg = document.querySelectorAll('img.lazy-img');

	if ('IntersectionObserver' in window) {
		const lazyImgObserver = new IntersectionObserver( (entries) => {
			entries.forEach( (entry) => {
				if (entry.isIntersecting) {
					let img = entry.target;
					img.src = img.dataset.src;
				}
			})
		});
		targetImg.forEach( (i) => {
			lazyImgObserver.observe(i);
		});	
	} else {
		for (let i = 0; i < targetImg.length; i++) {
			targetImg[i].src = targetImg[i].dataset.src;
		}
	}
};