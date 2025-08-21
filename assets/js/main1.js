!function () {
    "use strict";

    let e = (sel, all = !1) => (sel = sel.trim(), all ? [...document.querySelectorAll(sel)] : document.querySelector(sel)),
        t = (type, sel, listener, all = !1) => {
            let selectEl = e(sel, all);
            if (selectEl) {
                if (all) selectEl.forEach(el => el.addEventListener(type, listener));
                else selectEl.addEventListener(type, listener);
            }
        },
        i = (el, listener) => {
            el.addEventListener("scroll", listener);
        };

    let navLinks = e("#navbar .scrollto", !0);

    let setActiveNav = () => {
        let position = window.scrollY + 200;
        navLinks.forEach(navLink => {
            if (!navLink.hash) return;
            let section = e(navLink.hash);
            if (!section) return;
            if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
                navLink.classList.add("active");
            } else {
                navLink.classList.remove("active");
            }
        });
    };

    window.addEventListener("load", setActiveNav);
    i(document, setActiveNav);

    let scrollToSection = (hash) => {
        let header = e("#header");
        let offset = header.offsetHeight;
        if (!header.classList.contains("header-scrolled")) offset -= 10;
        let elementPos = e(hash).offsetTop;
        window.scrollTo({
            top: elementPos - offset,
            behavior: "smooth"
        });
    };

    let header = e("#header");
    if (header) {
        let headerScrolled = () => {
            if (window.scrollY > 100) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }
        };
        window.addEventListener("load", headerScrolled);
        i(document, headerScrolled);
    }

    let backtotop = e(".back-to-top");
    if (backtotop) {
        let toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add("active");
            } else {
                backtotop.classList.remove("active");
            }
        };
        window.addEventListener("load", toggleBacktotop);
        i(document, toggleBacktotop);
    }

    function initAOS() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }

    // === Mobile nav toggle for <img> ===
    t("click", ".mobile-nav-toggle", function () {
        let navbar = e("#navbar");
        navbar.classList.toggle("navbar-mobile");

        // this is the <img>
        if (navbar.classList.contains("navbar-mobile")) {
            this.src = "assets/img/x.svg";
            this.alt = "Close";
        } else {
            this.src = "assets/img/list.svg";
            this.alt = "Menu";
        }
    });

    t("click", ".navbar .dropdown > a", function (event) {
        if (e("#navbar").classList.contains("navbar-mobile")) {
            event.preventDefault();
            this.nextElementSibling.classList.toggle("dropdown-active");
        }
    }, true);

    t("click", ".scrollto", function (event) {
        if (e(this.hash)) {
            event.preventDefault();
            let navbar = e("#navbar");
            if (navbar.classList.contains("navbar-mobile")) {
                navbar.classList.remove("navbar-mobile");

                // reset icon to list.svg
                let toggleImg = e(".mobile-nav-toggle");
                toggleImg.src = "assets/img/list.svg";
                toggleImg.alt = "Menu";
            }
            scrollToSection(this.hash);
        }
    }, true);

    window.addEventListener("load", () => {
        if (window.location.hash && e(window.location.hash)) {
            scrollToSection(window.location.hash);
        }
    });

    window.addEventListener("load", () => {
        let portfolioContainer = e(".portfolio-container");
        if (portfolioContainer) {
            let iso = new Isotope(portfolioContainer, {
                itemSelector: ".portfolio-item",
                layoutMode: "fitRows"
            });

            let portfolioFilters = e("#portfolio-flters li", true);

            t("click", "#portfolio-flters li", function (event) {
                event.preventDefault();
                portfolioFilters.forEach(function (el) {
                    el.classList.remove("filter-active");
                });
                this.classList.add("filter-active");
                iso.arrange({
                    filter: this.getAttribute("data-filter")
                });
                initAOS();
            }, true);
        }
    });

    GLightbox({
        selector: ".portfokio-lightbox"
    });

    new Swiper(".portfolio-details-slider", {
        speed: 400,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true
        }
    });

    new Swiper(".testimonials-slider", {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: "auto",
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 40
            },
            1200: {
                slidesPerView: 3
            }
        }
    });

    window.addEventListener("load", () => {
        initAOS();
    });

}();
