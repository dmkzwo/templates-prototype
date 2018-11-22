'use strict';

const $ = require('jquery');
const Utils = require('helpers/Utils');


class SearchLayer {

    constructor($wrapper) {
        Utils.logInfo('search layer constructor');

        this.$wrapper = $wrapper;
        this.isMoving = false;
        this.isOpen = false;

        //this.initScrollWatchers();

        $('.js-search-layer-toggle').on(
            'click',
            this.handleToggleClick.bind(this)
        );

        $('.js-header-search-layer-close').on(
            'click',
            this.handleToggleClick.bind(this)
        );


    }


    // Event Handlers

    handleToggleClick(e) {
        e.preventDefault();

        if (this.isMoving) {
            return;
        }

        this.isMoving = true;

        this.positionSearchLayer();

        if (this.isOpen) {
            this.deactivateLayer();
        } else {
            this.activateLayer();
        }

        //var _self = this;
        setTimeout(function() {
            this.isMoving = false;
        }.bind(this), 500);

    }

// initScrollWatchers() {
    //     const elementToWatch = $('.js-top-navigation');
    //     const elementWatcher = scrollMonitor.create(elementToWatch);
    //
    //     elementWatcher.stateChange(function () {
    //         setTimeout(this.positionSearchLayer(), 100);
    //         //this.positionSearchLayer();
    //     }.bind(this));
    //
    //     const elementToWatch2 = $('.js-main-navigation');
    //     const elementWatcher2 = scrollMonitor.create(elementToWatch2);
    //
    //     elementWatcher2.stateChange(function () {
    //         setTimeout(this.positionSearchLayer(), 100);
    //         //this.positionSearchLayer();
    //     }.bind(this));
    //
    // }

    positionSearchLayer() {
        if (this.isSticky()) {
            this.$wrapper.css('top', $('.fr-main-navigation__header').height());
        } else {
            this.$wrapper.css('top', $('.js-top-navigation').height() - $(window).scrollTop());
        }
    }

    isSticky() {
        return $('body').hasClass('js-main-navigation-sticky');
    }

    close() {
        if (this.isOpen) {
            this.deactivateLayer();
        }
    }

    activateLayer() {
        this.$wrapper.addClass('js-header-search-layer-open');
        this.$wrapper.find('a').attr('tabIndex', 0);
        this.isOpen = true;
    }

    deactivateLayer() {
        this.$wrapper.removeClass('js-header-search-layer-open');
        this.$wrapper.find('a').attr('tabIndex', -1);
        this.isOpen = false;
    }
}

export default SearchLayer;
