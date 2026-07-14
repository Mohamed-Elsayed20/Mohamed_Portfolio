(function () {
    'use strict';
    var VIEWS = {
        overview: { title: 'Mohamed Elshokhaby | Portfolio', fullbleed: false },
        '3d-models': { title: '3D Models | Mohamed Elshokhaby', fullbleed: true },
        demos: { title: 'Demos | Mohamed Elshokhaby', fullbleed: false },
        'demo-webgl': { title: 'Interactive 3D Gallery | Demos', fullbleed: false }, 
        'demo-headphones': { title: '3D Headphones Scroll | Demos', fullbleed: false }, 
        threejs: { title: 'Three.js | Mohamed Elshokhaby', fullbleed: false },
        contact: { title: 'Contact | Mohamed Elshokhaby', fullbleed: false }
    };
    var DEFAULT_VIEW = 'overview';

    var mainEl = document.querySelector('.viewport-content');
    var navLinks = document.querySelectorAll('.nav-item[data-view-link]');

    function currentHashView() {
        var hash = window.location.hash.replace('#', '');
        return VIEWS[hash] ? hash : DEFAULT_VIEW;
    }

    function renderView(viewName) {
        var view = VIEWS[viewName] || VIEWS[DEFAULT_VIEW];
        var name = VIEWS[viewName] ? viewName : DEFAULT_VIEW;


        document.querySelectorAll('[data-view]').forEach(function (section) {
            section.classList.remove('is-active');
            if (section.dataset.view === name) {
                
                setTimeout(() => {
                    section.classList.add('is-active');
                }, 10);
            }
        });

        navLinks.forEach(function (link) {
            link.classList.toggle('active', link.dataset.viewLink === name);
        });

        if (mainEl) {
            mainEl.classList.toggle('viewport-fullbleed', !!view.fullbleed);
        }

        document.title = view.title;

        if (!view.fullbleed) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function navigate() {
        renderView(currentHashView());
    }


    window.addEventListener('hashchange', navigate);
    document.addEventListener('DOMContentLoaded', function () {
        if (!window.location.hash) {
            window.location.hash = '#' + DEFAULT_VIEW;
        }
        navigate();
        initContactForm();
        initCardZoom(); 
    });


    function initCardZoom() {
        var overlay = document.querySelector('.card-overlay');

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'card-overlay';
            overlay.innerHTML = `
                <div class="zoomed-card">
                    <button class="zoomed-close-btn" aria-label="Close zoom overlay">✕</button>
                    <div class="zoomed-content"></div>
                </div>
            `;
            document.body.appendChild(overlay);
        }

        var zoomedContent = overlay.querySelector('.zoomed-content');
        var closeBtn = overlay.querySelector('.zoomed-close-btn');
        var cards = document.querySelectorAll('.card, .overview-card');

        cards.forEach(function (card) {
            card.style.cursor = 'pointer';

            card.addEventListener('click', function () {
                zoomedContent.innerHTML = card.innerHTML;
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });


        function closeOverlay() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeBtn.addEventListener('click', closeOverlay);

  
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                closeOverlay();
            }
        });


        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeOverlay();
            }
        });
    }

    function initContactForm() {
        var form = document.querySelector('.standard-form');
        if (!form) return;

        var status = form.querySelector('.form-status');
        var submitBtn = form.querySelector('.btn-submit');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }


            window.setTimeout(function () {
                if (status) {
                    status.textContent = 'Message sent successfully. I will get back to you soon.';
                    status.style.color = 'green';
                    status.style.marginTop = '15px';
                    status.classList.add('visible');
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
                form.reset();
            }, 800);
        });
    }
})();