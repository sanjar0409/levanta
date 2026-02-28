/** @format */

;(function () {
  'use strict'

  var FEATURES = [
    'Monthly Theme (video + PDF)',
    'Weekly Growth Challenges',
    'Digital Habit Tracker',
    'Private Community Access',
    'Audio Mindset Sessions',
    'Creator Bonus Content',
    'Monthly Live Session (Zoom on Replay)',
    'Member Recognition / Badge System',
    'Personal Coaching Drop or Q&A Clip',
    'Elite Badge',
  ]

  var TIERS = [
    { name: 'ESSENCE', level: 'Level 1', active: 3, featured: false },
    { name: 'CORE', level: 'Level 2', active: 4, featured: false },
    { name: 'RISE', level: 'Level 3', active: 7, featured: false },
    { name: 'ELITE', level: 'Level 4', active: 10, featured: false },
  ]

  function iconCheck() {
    return (
      '<svg class="icon-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M5 12L10 17L19 8" stroke="#35D435" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>'
    )
  }

  function iconX() {
    return (
      '<svg class="icon-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M6 6L18 18M18 6L6 18" stroke="#989898" stroke-width="2.5" stroke-linecap="round"/>' +
      '</svg>'
    )
  }

  function renderFeature(text, on) {
    return (
      '<li class="tier-feature tier-feature--' +
      (on ? 'on' : 'off') +
      '">' +
      (on ? iconCheck() : iconX()) +
      '<span>' +
      text +
      '</span></li>'
    )
  }

  function renderTier(tier) {
    var features = FEATURES.map(function (f, i) {
      return renderFeature(f, i < tier.active)
    }).join('')
    var levelNum = tier.level.replace(/\D/g, '') || ''
    var cardClass =
      'tier-card animate-on-scroll' +
      (tier.featured ? ' tier-card--featured' : '')
    return (
      '<article class="' +
      cardClass +
      '">' +
      '<div class="tier-card__glow" aria-hidden="true"></div>' +
      '<div class="tier-card__badge" aria-hidden="true">' +
      levelNum +
      '</div>' +
      '<div class="tier-card__body">' +
      '<div class="tier-card__header">' +
      '<h3 class="tier-card__name">' +
      tier.name +
      '</h3>' +
      '<span class="tier-card__level">' +
      tier.level +
      '</span></div>' +
      '<ul class="tier-features" role="list">' +
      features +
      '</ul>' +
      '<p class="tier-card__coming">Coming soon...</p>' +
      '</div></article>'
    )
  }

  function initTiers() {
    var container = document.getElementById('tiers-container')
    if (!container) return
    container.innerHTML = TIERS.map(renderTier).join('')
  }

  function initHeaderScroll() {
    var header = document.querySelector('.site-header')
    if (!header) return
    var threshold = 20
    function onScroll() {
      header.classList.toggle(
        'site-header--scrolled',
        window.scrollY > threshold,
      )
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  function initScrollAnimations() {
    var els = document.querySelectorAll('.animate-on-scroll')
    if (!els.length) return
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add('is-visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach(function (el) {
      observer.observe(el)
    })
  }

  function initTiersSlider() {
    var wrapper = document.querySelector('.tiers-slider-wrapper')
    var container = document.getElementById('tiers-container')
    var prevBtn = wrapper && wrapper.querySelector('.tiers-slider__btn--prev')
    var nextBtn = wrapper && wrapper.querySelector('.tiers-slider__btn--next')
    if (!wrapper || !container || !prevBtn || !nextBtn) return

    var SLIDER_BREAKPOINT = 1694
    var mql = window.matchMedia('(max-width: ' + SLIDER_BREAKPOINT + 'px)')

    function updateButtonsVisibility() {
      var isSlider = mql.matches
      prevBtn.setAttribute('aria-hidden', !isSlider)
      nextBtn.setAttribute('aria-hidden', !isSlider)
    }

    function scrollTiers(direction) {
      if (!mql.matches) return
      var cards = container.querySelectorAll('.tier-card')
      if (!cards.length) return
      var firstCard = cards[0]
      var cardWidth = firstCard.offsetWidth
      var gap = 26
      var scrollAmount = cardWidth + gap
      container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      })
    }

    prevBtn.addEventListener('click', function () {
      scrollTiers(-1)
    })
    nextBtn.addEventListener('click', function () {
      scrollTiers(1)
    })

    mql.addEventListener('change', updateButtonsVisibility)
    updateButtonsVisibility()
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTiers()
    initTiersSlider()
    initHeaderScroll()
    initScrollAnimations()
  })
})()
