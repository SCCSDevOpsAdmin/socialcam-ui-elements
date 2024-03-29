export default class DomHandler {
    static browser: any;
    static innerWidth(el: HTMLElement) {
        if (el) {
            let width = el.offsetWidth;
            let style = getComputedStyle(el);

            width +=
                parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            return width;
        }
        return 0;
    }

    static width(el: HTMLElement) {
        if (el) {
            let width = el.offsetWidth;
            let style = getComputedStyle(el);

            width -=
                parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            return width;
        }
        return 0;
    }

    static getBrowserLanguage() {
        alert('Dom Handler getBrowserLanguage Not Implemented');
        //    return navigator.userLanguage
        //        || (navigator.languages && navigator.languages.length && navigator.languages[0])
        //        || navigator.language
        //        || navigator.browserLanguage
        //        || navigator.systemLanguage
        //        || 'en';
    }

    static getWindowScrollTop() {
        let doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }
    static getWindowScrollLeft() {
        let doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }
    static getOuterWidth(el: HTMLElement, margin?: any) {
        if (el) {
            let width = el.offsetWidth || el.getBoundingClientRect().width;
            if (margin) {
                let style = getComputedStyle(el);
                width +=
                    parseFloat(style.marginLeft) +
                    parseFloat(style.marginRight);
            }
            return width;
        }
        return 0;
    }

    static getOuterHeight(el: HTMLElement, margin?: boolean) {
        if (el) {
            let height = el.offsetHeight || el.getBoundingClientRect().height;

            if (margin) {
                let style = getComputedStyle(el);
                height +=
                    parseFloat(style.marginTop) +
                    parseFloat(style.marginBottom);
            }

            return height;
        }
        return 0;
    }

    static getClientHeight(el: HTMLElement, margin: boolean) {
        if (el) {
            let height = el.clientHeight;

            if (margin) {
                let style = getComputedStyle(el);
                height +=
                    parseFloat(style.marginTop) +
                    parseFloat(style.marginBottom);
            }

            return height;
        }
        return 0;
    }

    static getClientWidth(el: HTMLElement, margin: boolean) {
        if (el) {
            let width = el.clientWidth;

            if (margin) {
                let style = getComputedStyle(el);
                width +=
                    parseFloat(style.marginLeft) +
                    parseFloat(style.marginRight);
            }

            return width;
        }
        return 0;
    }

    static getViewport() {
        let win = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            w = win.innerWidth || e.clientWidth || g.clientWidth,
            h = win.innerHeight || e.clientHeight || g.clientHeight;
        return { width: w, height: h };
    }

    static getOffset(el: HTMLElement) {
        if (el) {
            let rect = el.getBoundingClientRect();

            return {
                top:
                    rect.top +
                    (window.pageYOffset ||
                        document.documentElement.scrollTop ||
                        document.body.scrollTop ||
                        0),
                left:
                    rect.left +
                    (window.pageXOffset ||
                        document.documentElement.scrollLeft ||
                        document.body.scrollLeft ||
                        0),
            };
        }

        return {
            top: 'auto',
            left: 'auto',
        };
    }

    static index(element: HTMLElement) {
        if (element) {
            let children = element?.parentNode?.childNodes;
            let num = 0;
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    if (children[i] === element) return num;
                    if (children[i].nodeType === 1) num++;
                }
            }
        }
        return -1;
    }

    static addMultipleClasses(element: HTMLElement, className: string) {
        if (element && className) {
            if (element.classList) {
                let styles = className.split(' ');
                for (let i = 0; i < styles.length; i++) {
                    element.classList.add(styles[i]);
                }
            } else {
                let styles = className.split(' ');
                for (let i = 0; i < styles.length; i++) {
                    element.className += ' ' + styles[i];
                }
            }
        }
    }

    static removeMultipleClasses(element: HTMLElement, className: string) {
        if (element && className) {
            if (element.classList) {
                let styles = className.split(' ');
                for (let i = 0; i < styles.length; i++) {
                    element.classList.remove(styles[i]);
                }
            } else {
                let styles = className.split(' ');
                for (let i = 0; i < styles.length; i++) {
                    element.className = element.className.replace(
                        new RegExp(
                            '(^|\\b)' +
                                styles[i].split(' ').join('|') +
                                '(\\b|$)',
                            'gi'
                        ),
                        ' '
                    );
                }
            }
        }
    }

    static addClass(element: HTMLElement | null, className: string) {
        if (element && className) {
            if (element.classList) element.classList.add(className);
            else element.className += ' ' + className;
        }
    }

    static removeClass(element: HTMLElement, className: string) {
        if (element && className) {
            if (element.classList) element.classList.remove(className);
            else
                element.className = element.className.replace(
                    new RegExp(
                        '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
                        'gi'
                    ),
                    ' '
                );
        }
    }

    static hasClass(element: any, className: string) {
        if (element) {
            if (element.classList) return element.classList.contains(className);
            else
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(
                    element.className
                );
        }
    }

    static find(element: HTMLElement, selector: string): any[] {
        return element ? Array.from(element.querySelectorAll(selector)) : [];
    }

    static findSingle(element: HTMLElement | null, selector: string): any {
        if (element) {
            return element.querySelector(selector);
        }
        return null;
    }
    static getHeight(el: HTMLElement) {
        if (el) {
            let height = el.offsetHeight;
            let style = getComputedStyle(el);

            height -=
                parseFloat(style.paddingTop) +
                parseFloat(style.paddingBottom) +
                parseFloat(style.borderTopWidth) +
                parseFloat(style.borderBottomWidth);

            return height;
        }
        return 0;
    }

    static getWidth(el: HTMLElement) {
        if (el) {
            let width = el.offsetWidth;
            let style = getComputedStyle(el);

            width -=
                parseFloat(style.paddingLeft) +
                parseFloat(style.paddingRight) +
                parseFloat(style.borderLeftWidth) +
                parseFloat(style.borderRightWidth);

            return width;
        }
        return 0;
    }

    static alignOverlay(
        overlay: HTMLElement,
        target: HTMLElement,
        appendTo?: string,
        calculateMinWidth: boolean = true
    ) {
        if (overlay && target) {
            if (appendTo === 'self') {
                this.relativePosition(overlay, target);
            } else {
                calculateMinWidth &&
                    (overlay.style.minWidth =
                        DomHandler.getOuterWidth(target) + 'px');
                this.absolutePosition(overlay, target);
            }
        }
    }

    static absolutePosition(element: HTMLElement, target: HTMLElement) {
        if (element) {
            let elementDimensions = element.offsetParent
                ? { width: element.offsetWidth, height: element.offsetHeight }
                : this.getHiddenElementDimensions(element);
            let elementOuterHeight = elementDimensions.height;
            let elementOuterWidth = elementDimensions.width;
            let targetOuterHeight = target.offsetHeight;
            let targetOuterWidth = target.offsetWidth;
            let targetOffset = target.getBoundingClientRect();
            let windowScrollTop = this.getWindowScrollTop();
            let windowScrollLeft = this.getWindowScrollLeft();
            let viewport = this.getViewport();
            let top, left;
            if (
                targetOffset.top + targetOuterHeight + elementOuterHeight >
                viewport.height
            ) {
                top = targetOffset.top + windowScrollTop - elementOuterHeight;
                if (top < 0) {
                    top = windowScrollTop;
                }
                element.style.transformOrigin = 'bottom';
            } else {
                top = targetOuterHeight + targetOffset.top + windowScrollTop;
                element.style.transformOrigin = 'top';
            }
            if (
                targetOffset.left + targetOuterWidth + elementOuterWidth >
                viewport.width
            )
                left = Math.max(
                    0,
                    targetOffset.left +
                        windowScrollLeft +
                        targetOuterWidth -
                        elementOuterWidth
                );
            else left = targetOffset.left + windowScrollLeft;
            element.style.top = top + 'px';
            element.style.left = left + 'px';
        }
    }
    static relativePosition(element: HTMLElement, target: HTMLElement) {
        if (element) {
            let elementDimensions = element.offsetParent
                ? { width: element.offsetWidth, height: element.offsetHeight }
                : this.getHiddenElementDimensions(element);
            const targetHeight = target.offsetHeight;
            const targetOffset = target.getBoundingClientRect();
            const viewport = this.getViewport();
            let top, left;
            if (
                targetOffset.top + targetHeight + elementDimensions.height >
                viewport.height
            ) {
                top = -1 * elementDimensions.height;
                if (targetOffset.top + top < 0) {
                    top = -1 * targetOffset.top;
                }
                element.style.transformOrigin = 'bottom';
            } else {
                top = targetHeight;
                element.style.transformOrigin = 'top';
            }
            if (elementDimensions.width > viewport.width) {
                // element wider then viewport and cannot fit on screen (align at left side of viewport)
                left = targetOffset.left * -1;
            } else if (
                targetOffset.left + elementDimensions.width >
                viewport.width
            ) {
                // element wider then viewport but can be fit on screen (align at right side of viewport)
                left =
                    (targetOffset.left +
                        elementDimensions.width -
                        viewport.width) *
                    -1;
            } else {
                // element fits on screen (align with target)
                left = 0;
            }
            element.style.top = top + 'px';
            element.style.left = left + 'px';
        }
    }
    static flipfitCollision(
        element: HTMLElement,
        target: any,
        my = 'left top',
        at = 'left bottom',
        callback: any
    ) {
        if (element && target) {
            const targetOffset = target.getBoundingClientRect();
            const viewport = this.getViewport();
            const myArr = my.split(' ');
            const atArr = at.split(' ');
            const getPositionValue = (arr: any, isOffset: any) =>
                isOffset
                    ? +arr.substring(arr.search(/(\+|-)/g)) || 0
                    : arr.substring(0, arr.search(/(\+|-)/g)) || arr;
            const position = {
                my: {
                    x: getPositionValue(myArr[0], false),
                    y: getPositionValue(myArr[1] || myArr[0], false),
                    offsetX: getPositionValue(myArr[0], true),
                    offsetY: getPositionValue(myArr[1] || myArr[0], true),
                },
                at: {
                    x: getPositionValue(atArr[0], false),
                    y: getPositionValue(atArr[1] || atArr[0], false),
                    offsetX: getPositionValue(atArr[0], true),
                    offsetY: getPositionValue(atArr[1] || atArr[0], true),
                },
            };
            const myOffset = {
                left: () => {
                    const totalOffset =
                        position.my.offsetX + position.at.offsetX;
                    return (
                        totalOffset +
                        targetOffset.left +
                        (position.my.x === 'left'
                            ? 0
                            : -1 *
                              (position.my.x === 'center'
                                  ? this.getOuterWidth(element, false) / 2
                                  : this.getOuterWidth(element, false)))
                    );
                },
                top: () => {
                    const totalOffset =
                        position.my.offsetY + position.at.offsetY;
                    return (
                        totalOffset +
                        targetOffset.top +
                        (position.my.y === 'top'
                            ? 0
                            : -1 *
                              (position.my.y === 'center'
                                  ? this.getOuterHeight(element, false) / 2
                                  : this.getOuterHeight(element, false)))
                    );
                },
            };
            const alignWithAt = {
                count: {
                    x: 0,
                    y: 0,
                },
                left: function () {
                    const left = myOffset.left();
                    const scrollLeft = DomHandler.getWindowScrollLeft();
                    element.style.left = left + scrollLeft + 'px';

                    if (this.count.x === 2) {
                        element.style.left = scrollLeft + 'px';
                        this.count.x = 0;
                    } else if (left < 0) {
                        this.count.x++;
                        position.my.x = 'left';
                        position.at.x = 'right';
                        position.my.offsetX *= -1;
                        position.at.offsetX *= -1;

                        this.right();
                    }
                },
                right: function () {
                    const left =
                        myOffset.left() +
                        DomHandler.getOuterWidth(target, false);
                    const scrollLeft = DomHandler.getWindowScrollLeft();
                    element.style.left = left + scrollLeft + 'px';

                    if (this.count.x === 2) {
                        element.style.left =
                            viewport.width -
                            DomHandler.getOuterWidth(element, false) +
                            scrollLeft +
                            'px';
                        this.count.x = 0;
                    } else if (
                        left + DomHandler.getOuterWidth(element, false) >
                        viewport.width
                    ) {
                        this.count.x++;

                        position.my.x = 'right';
                        position.at.x = 'left';
                        position.my.offsetX *= -1;
                        position.at.offsetX *= -1;

                        this.left();
                    }
                },
                top: function () {
                    const top = myOffset.top();
                    const scrollTop = DomHandler.getWindowScrollTop();
                    element.style.top = top + scrollTop + 'px';

                    if (this.count.y === 2) {
                        element.style.left = scrollTop + 'px';
                        this.count.y = 0;
                    } else if (top < 0) {
                        this.count.y++;

                        position.my.y = 'top';
                        position.at.y = 'bottom';
                        position.my.offsetY *= -1;
                        position.at.offsetY *= -1;

                        this.bottom();
                    }
                },
                bottom: function () {
                    const top =
                        myOffset.top() +
                        DomHandler.getOuterHeight(target, false);
                    const scrollTop = DomHandler.getWindowScrollTop();
                    element.style.top = top + scrollTop + 'px';

                    if (this.count.y === 2) {
                        element.style.left =
                            viewport.height -
                            DomHandler.getOuterHeight(element, false) +
                            scrollTop +
                            'px';
                        this.count.y = 0;
                    } else if (
                        top + DomHandler.getOuterHeight(target, false) >
                        viewport.height
                    ) {
                        this.count.y++;

                        position.my.y = 'bottom';
                        position.at.y = 'top';
                        position.my.offsetY *= -1;
                        position.at.offsetY *= -1;

                        this.top();
                    }
                },
                center: function (axis: any) {
                    if (axis === 'y') {
                        const top =
                            myOffset.top() +
                            DomHandler.getOuterHeight(target, false) / 2;
                        element.style.top =
                            top + DomHandler.getWindowScrollTop() + 'px';

                        if (top < 0) {
                            this.bottom();
                        } else if (
                            top + DomHandler.getOuterHeight(target, false) >
                            viewport.height
                        ) {
                            this.top();
                        }
                    } else {
                        const left =
                            myOffset.left() +
                            DomHandler.getOuterWidth(target, false) / 2;
                        element.style.left =
                            left + DomHandler.getWindowScrollLeft() + 'px';

                        if (left < 0) {
                            this.left();
                        } else if (
                            left + DomHandler.getOuterWidth(element, false) >
                            viewport.width
                        ) {
                            this.right();
                        }
                    }
                },
            };

            alignWithAt[position.at.x]('x');
            alignWithAt[position.at.y]('y');

            if (this.isFunction(callback)) {
                callback(position);
            }
        }
    }

    static findCollisionPosition(position: string) {
        if (position) {
            const isAxisY = position === 'top' || position === 'bottom';
            const myXPosition = position === 'left' ? 'right' : 'left';
            const myYPosition = position === 'top' ? 'bottom' : 'top';

            if (isAxisY) {
                return {
                    axis: 'y',
                    my: `center ${myYPosition}`,
                    at: `center ${position}`,
                };
            }

            return {
                axis: 'x',
                my: `${myXPosition} center`,
                at: `${position} center`,
            };
        }
    }

    static getParents(element: any, parents: any = []): any {
        return element['parentNode'] === null
            ? parents
            : this.getParents(
                  element.parentNode,
                  parents.concat([element.parentNode])
              );
    }

    static getScrollableParents(element: any) {
        let scrollableParents = [];

        if (element) {
            let parents = this.getParents(element);
            const overflowRegex = /(auto|scroll)/;
            const overflowCheck = (node: any) => {
                let styleDeclaration = node ? getComputedStyle(node) : null;
                return (
                    styleDeclaration &&
                    (overflowRegex.test(
                        styleDeclaration.getPropertyValue('overflow')
                    ) ||
                        overflowRegex.test(
                            styleDeclaration.getPropertyValue('overflowX')
                        ) ||
                        overflowRegex.test(
                            styleDeclaration.getPropertyValue('overflowY')
                        ))
                );
            };

            for (let parent of parents) {
                let scrollSelectors =
                    parent.nodeType === 1 && parent.dataset['scrollselectors'];
                if (scrollSelectors) {
                    let selectors = scrollSelectors.split(',');
                    for (let selector of selectors) {
                        let el = this.findSingle(parent, selector);
                        if (el && overflowCheck(el)) {
                            scrollableParents.push(el);
                        }
                    }
                }

                if (parent.nodeType !== 9 && overflowCheck(parent)) {
                    scrollableParents.push(parent);
                }
            }
        }

        return scrollableParents;
    }

    static getHiddenElementOuterHeight(element: HTMLElement) {
        if (element) {
            element.style.visibility = 'hidden';
            element.style.display = 'block';
            let elementHeight = element.offsetHeight;
            element.style.display = 'none';
            element.style.visibility = 'visible';

            return elementHeight;
        }
        return 0;
    }

    static getHiddenElementOuterWidth(element: HTMLElement) {
        if (element) {
            element.style.visibility = 'hidden';
            element.style.display = 'block';
            let elementWidth = element.offsetWidth;
            element.style.display = 'none';
            element.style.visibility = 'visible';

            return elementWidth;
        }
        return 0;
    }

    static getHiddenElementDimensions(element: HTMLElement) {
        let dimensions = {
            width: 0,
            height: 0,
        };
        if (element) {
            element.style.visibility = 'hidden';
            element.style.display = 'block';
            dimensions = Object.assign(dimensions, {
                width: element.offsetWidth,
                height: element.offsetHeight,
            });
            element.style.display = 'none';
            element.style.visibility = 'visible';
        }
        return dimensions;
    }

    static fadeIn(element: HTMLElement, duration: any) {
        if (element) {
            element.style.opacity = '0';

            let last = +new Date();
            let opacity = 0;
            let tick = function () {
                opacity =
                    +element.style.opacity +
                    (new Date().getTime() - last) / duration;
                element.style.opacity = opacity.toString();
                last = +new Date();

                if (+opacity < 1) {
                    (window.requestAnimationFrame(tick) &&
                        requestAnimationFrame(tick)) ||
                        setTimeout(tick, 16);
                }
            };

            tick();
        }
    }

    static fadeOut(element: HTMLElement, duration: any) {
        if (element) {
            let opacity = 1,
                interval = 50,
                gap = interval / duration;

            let fading = setInterval(() => {
                opacity -= gap;

                if (opacity <= 0) {
                    opacity = 0;
                    clearInterval(fading);
                }

                element.style.opacity = opacity.toString();
            }, interval);
        }
    }

    static getUserAgent() {
        return navigator.userAgent;
    }

    static isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent); // && !window['MSStream'];
    }

    static isAndroid() {
        return /(android)/i.test(navigator.userAgent);
    }

    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0; // || (navigator.msMaxTouchPoints > 0));
    }

    static isFunction(obj: any) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }

    static appendChild(element: HTMLElement, target: any) {
        if (this.isElement(target)) target.appendChild(element);
        else if (target.el && target.el.nativeElement)
            target.el.nativeElement.appendChild(element);
        else throw new Error('Cannot append ' + target + ' to ' + element);
    }

    static removeChild(element: HTMLElement, target: any) {
        if (this.isElement(target)) target.removeChild(element);
        else if (target.el && target.el.nativeElement)
            target.el.nativeElement.removeChild(element);
        else throw new Error('Cannot remove ' + element + ' from ' + target);
    }

    static isElement(obj: any) {
        return typeof HTMLElement === 'object'
            ? obj instanceof HTMLElement
            : obj &&
                  typeof obj === 'object' &&
                  obj !== null &&
                  obj.nodeType === 1 &&
                  typeof obj.nodeName === 'string';
    }

    static scrollInView(container: HTMLElement, item: HTMLElement) {
        let borderTopValue =
            getComputedStyle(container).getPropertyValue('borderTopWidth');
        let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
        let paddingTopValue =
            getComputedStyle(container).getPropertyValue('paddingTop');
        let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        let containerRect = container.getBoundingClientRect();
        let itemRect = item.getBoundingClientRect();
        let offset =
            itemRect.top +
            document.body.scrollTop -
            (containerRect.top + document.body.scrollTop) -
            borderTop -
            paddingTop;
        let scroll = container.scrollTop;
        let elementHeight = container.clientHeight;
        let itemHeight = this.getOuterHeight(item, false);

        if (offset < 0) {
            container.scrollTop = scroll + offset;
        } else if (offset + itemHeight > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    }

    static clearSelection() {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            } else if (
                window.getSelection().removeAllRanges &&
                window.getSelection().rangeCount > 0 &&
                window.getSelection().getRangeAt(0).getClientRects().length > 0
            ) {
                window.getSelection().removeAllRanges();
            }
        } else if (document['selection'] && document['selection'].empty) {
            try {
                document['selection'].empty();
            } catch (error) {
                //ignore IE bug
            }
        }
    }

    static calculateScrollbarWidth(el?: HTMLElement): number {
        if (el) {
            let style = getComputedStyle(el);
            return (
                el.offsetWidth -
                el.clientWidth -
                parseFloat(style.borderLeftWidth) -
                parseFloat(style.borderRightWidth)
            );
        } else {
            // if (this.calculateScrollbarWidth != null)
            //     return this.calculateScrollbarWidth;

            let scrollDiv = document.createElement('div');
            scrollDiv.className = 'cs-scrollbar-measure';
            document.body.appendChild(scrollDiv);

            let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);

            //this.calculatedScrollbarWidth = scrollbarWidth;

            return scrollbarWidth;
        }
    }
    static getBrowser() {
        if (!this.browser) {
            let matched = this.resolveUserAgent();
            this.browser = {};
            if (matched.browser) {
                this.browser[matched.browser] = true;
                this.browser['version'] = matched.version;
            }
            if (this.browser['chrome']) {
                this.browser['webkit'] = true;
            } else if (this.browser['webkit']) {
                this.browser['safari'] = true;
            }
        }
        return this.browser;
    }

    static isExist(element: HTMLElement) {
        return (
            element !== null &&
            typeof element !== 'undefined' &&
            element.nodeName &&
            element.parentNode
        );
    }
    static hasDOM() {
        return !!(
            typeof window !== 'undefined' &&
            window.document &&
            window.document.createElement
        );
    }

    static resolveUserAgent() {
        let ua = navigator.userAgent.toLowerCase();
        let match =
            /(chrome)[ ]([\w.]+)/.exec(ua) ||
            /(webkit)[ ]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            (ua.indexOf('compatible') < 0 &&
                /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
            [];

        return {
            browser: match[1] || '',
            version: match[2] || '0',
        };
    }

    static isVisible(element: HTMLElement) {
        return element && element.offsetParent != null;
    }

    static getFocusableElements(element: HTMLElement | null, selector = '') {
        if (element == null) {
            return [];
        }
        let focusableElements = DomHandler.find(
            element,
            `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
               [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
               input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
               select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
               textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
               [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
               [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`
        );

        let visibleFocusableElements = [];
        for (let focusableElement of focusableElements) {
            if (
                getComputedStyle(focusableElement).display !== 'none' &&
                getComputedStyle(focusableElement).visibility !== 'hidden'
            )
                visibleFocusableElements.push(focusableElement);
        }

        return visibleFocusableElements;
    }

    static getFirstFocusableElement(element: HTMLElement, selector?: any) {
        const focusableElements = DomHandler.getFocusableElements(
            element,
            selector
        );
        return focusableElements.length > 0 ? focusableElements[0] : null;
    }

    static getLastFocusableElement(element: HTMLElement, selector: any) {
        const focusableElements = DomHandler.getFocusableElements(
            element,
            selector
        );
        return focusableElements.length > 0
            ? focusableElements[focusableElements.length - 1]
            : null;
    }

    static focus(el: any, scrollTo?: any) {
        const preventScroll = scrollTo === undefined ? true : !scrollTo;
        el && document.activeElement !== el && el.focus({ preventScroll });
    }

    static getCursorOffset(
        el: HTMLElement,
        prevText: string,
        nextText: string,
        currentText: string
    ) {
        if (el) {
            let style = getComputedStyle(el);
            let ghostDiv = document.createElement('div');
            ghostDiv.style.position = 'absolute';
            ghostDiv.style.top = '0px';
            ghostDiv.style.left = '0px';
            ghostDiv.style.visibility = 'hidden';
            ghostDiv.style.pointerEvents = 'none';
            ghostDiv.style.overflow = style.overflow;
            ghostDiv.style.width = style.width;
            ghostDiv.style.height = style.height;
            ghostDiv.style.padding = style.padding;
            ghostDiv.style.border = style.border;
            ghostDiv.style.overflowWrap = style.overflowWrap;
            ghostDiv.style.whiteSpace = style.whiteSpace;
            ghostDiv.style.lineHeight = style.lineHeight;
            ghostDiv.innerHTML = prevText.replace(/\r\n|\r|\n/g, '<br />');

            let ghostSpan = document.createElement('span');
            ghostSpan.textContent = currentText;
            ghostDiv.appendChild(ghostSpan);

            let text = document.createTextNode(nextText);
            ghostDiv.appendChild(text);
            document.body.appendChild(ghostDiv);

            const { offsetLeft, offsetTop, clientHeight } = ghostSpan;

            document.body.removeChild(ghostDiv);

            return {
                left: Math.abs(offsetLeft - el.scrollLeft),
                top: Math.abs(offsetTop - el.scrollTop) + clientHeight,
            };
        }

        return {
            top: 'auto',
            left: 'auto',
        };
    }

    static invokeElementMethod(element: any, methodName: string, args: any) {
        element[methodName].apply(element, args);
    }

    static isClickable(element: any) {
        const targetNode = element.nodeName;
        const parentNode =
            element.parentElement && element.parentElement.nodeName;

        return (
            targetNode === 'INPUT' ||
            targetNode === 'TEXTAREA' ||
            targetNode === 'BUTTON' ||
            targetNode === 'A' ||
            parentNode === 'INPUT' ||
            parentNode === 'TEXTAREA' ||
            parentNode === 'BUTTON' ||
            parentNode === 'A' ||
            this.hasClass(element, 'p-button') ||
            this.hasClass(element.parentElement, 'p-button') ||
            this.hasClass(element.parentElement, 'p-checkbox') ||
            this.hasClass(element.parentElement, 'p-radiobutton')
        );
    }

    static applyStyle(element: any, style: any) {
        if (typeof style === 'string') {
            element.style.cssText = style;
        } else {
            for (let prop in style) {
                element.style[prop] = style[prop];
            }
        }
    }

    static exportCSV(csv: any, filename: String) {
        alert('Dom Handler exportCSV Not Implemented');
        //    let blob = new Blob([csv], {
        //        type: 'application/csv;charset=utf-8;'
        //    });
        //    if (window.navigator.msSaveOrOpenBlob) {
        //        navigator.msSaveOrOpenBlob(blob, filename + '.csv');
        //    }
        //    else {
        //        const isDownloaded = DomHandler.saveAs({ name: filename + '.csv', src: URL.createObjectURL(blob) });
        //        if (!isDownloaded) {
        //            csv = 'data:text/csv;charset=utf-8,' + csv;
        //            window.open(encodeURI(csv));
        //        }
        //    }
    }

    static saveAs(file: any) {
        if (file) {
            let link = document.createElement('a');
            if (link.download !== undefined) {
                const { name, src } = file;

                link.setAttribute('href', src);
                link.setAttribute('download', name);
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                return true;
            }
        }

        return false;
    }

    static createInlineStyle(nonce: any) {
        let styleElement = document.createElement('style');
        try {
            if (!nonce) {
                nonce = process.env.REACT_APP_CSS_NONCE;
            }
        } catch (error) {
            // NOOP
        }

        nonce && styleElement.setAttribute('nonce', nonce);
        document.head.appendChild(styleElement);
        return styleElement;
    }

    static removeInlineStyle(styleElement: any) {
        if (this.isExist(styleElement)) {
            try {
                document.head.removeChild(styleElement);
            } catch (error) {
                // style element may have already been removed in a fast refresh
            }
            styleElement = null;
        }
        return styleElement;
    }

    static getTargetElement(target: any) {
        if (!target) return null;
        if (target === 'document') {
            return document;
        } else if (target === 'window') {
            return window;
        } else if (
            typeof target === 'object' &&
            target.hasOwnProperty('current')
        ) {
            return this.isExist(target.current) ? target.current : null;
        } else {
            const isFunction = (obj: any) =>
                !!(obj && obj.constructor && obj.call && obj.apply);
            const element = isFunction(target) ? target() : target;
            return (element && element.nodeType === 9) || this.isExist(element)
                ? element
                : null;
        }
    }

    static addStyles(element: any, styles: any = {}) {
        if (element) {
            Object.entries(styles).forEach(
                ([key, value]) => (element.style[key] = value)
            );
        }
    }
}
