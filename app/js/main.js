'use strict';

function getAll(selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}

var rootEl = document.documentElement;
var $modals = getAll('.modal');
var $modalButtons = getAll('.rules');
var $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');
var $burger = getAll('.navbar-burger');
var $deviders = getAll('.devider');
var $headerbackground = getAll('.is-background');

if ($modalButtons.length > 0) {
  $modalButtons.forEach(function ($el) {
    $el.addEventListener('click', function () {
      var target = $el.dataset.target;
      closeBG();
      openModal(target);
    });
  });
}

if ($deviders.length > 0) {
  $deviders.forEach(function ($el) {
    $el.addEventListener('click', function () {	
		var target = $el.dataset.target;			
		var $target = document.getElementById(target);
		var $selector = document.getElementById('selected');
		if ($target.classList.contains('is-active')) {
			$el.innerHTML="добавить новый";				
			$target.classList.remove('is-active');
			$target.classList.add('is-hidden');											
			$selector.classList.remove('is-hidden');
			$selector.classList.add('is-active');			
		} else {
			$el.innerHTML="скрыть добавление нового";
			$target.classList.remove('is-hidden');
			$target.classList.add('is-active');	
			var $target = document.getElementById('devider');
			$selector.classList.remove('is-active');
			$selector.classList.add('is-hidden');				
		}    
    });
  });
}

if ($headerbackground.length > 0) {
  $headerbackground.forEach(function (headerbackgroundImage) {
    var bgImage = headerbackgroundImage.dataset.image;
    headerbackgroundImage.style.backgroundImage = 'url(' + bgImage + ')';
  });
}

if ($modalCloses.length > 0) {
  $modalCloses.forEach(function ($el) {
    $el.addEventListener('click', function () {
      closeModals();
    });
  });
}

document.addEventListener('keydown', function (event) {
  var e = event || window.event;
  if (e.keyCode === 27) {
    closeModals();
  }
});

function openModal(target) {
  var $target = document.getElementById(target);
  $target.classList.add('is-active');
}

function closeBG() {
  rootEl.classList.add('is-clipped');
}

function closeModals() {
  rootEl.classList.remove('is-clipped');
  $modals.forEach(function ($el) {
    $el.classList.remove('is-active');
  });
}

function closeMenus(target) {
  var $target = document.getElementById(target);
  $target.classList.remove('is-active');
}

document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {

    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

  // Get all "is-tab" elements
  var $isTabs = Array.prototype.slice.call(document.querySelectorAll('.is-tab'), 0);
  if ($isTabs.length > 0) {
    var removeAllIsActive = function removeAllIsActive() {
      $isTabs.forEach(function ($el) {
        $el.classList.remove('is-active');
      });
    };

    $isTabs.forEach(function ($el) {
      $el.addEventListener('click', function () {
        removeAllIsActive();
        $el.classList.add('is-active');
      });
    });
  }
});
