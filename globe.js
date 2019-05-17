(function () {
    const $globeTexts = document.querySelectorAll('.globe__text');
    let timeout;

    let globeObserver = enterView({
        selector: '.globe__marker',
        enter: function (el) {
            animateGlobe(el.id.replace('globe', 'step'), true);
        },
        exit: function (el) {
            animateGlobe(el.id.replace('globe', 'step'), false);
        },
        offset: 0
    });

    function animateGlobe(step, isEntering) {
        // console.log(isEntering ? 'entered ' : 'exited ', step);
        document.querySelector('em.highlighted').classList.remove('highlighted');

        switch (step) {
            case 'step1':
                if (isEntering) {
                    document.querySelectorAll('.links path').forEach(function (el) { el.classList.remove('blurred') });
                    document.querySelector('.globe__text p.step1 em:first-child').classList.add('highlighted');
                    document.querySelector('.globe__text p.step1').classList.add('shown');
                } else {
                    document.querySelector('.globe__text p.step1').classList.remove('shown');
                    document.querySelector('.globe__text.step1 p:first-child em').classList.add('highlighted');
                    window.clearTimeout(timeout);
                    timeout = window.setTimeout(function () {
                        document.querySelectorAll('.links path').forEach(function (el) { el.classList.add('blurred') });
                    }, 300);
                }
                break;

            case 'step2':
                if (isEntering) {
                    document.querySelector('.globe__text span.step2 em').classList.add('highlighted');
                    document.querySelector('.globe__text span.step2').classList.add('shown');
                } else {
                    document.querySelector('.globe__text p.step1 em:first-child').classList.add('highlighted');
                    document.querySelector('.globe__text span.step2').classList.remove('shown');
                }
                break;

            case 'step3':
                if (isEntering) {
                    document.querySelector('.globe__text em.step3').classList.add('highlighted');
                    document.querySelector('.globe__text.step1').classList.remove('shown');
                    document.querySelector('.globe__text.step3').classList.add('shown');
                } else {
                    document.querySelector('.globe__text span.step2 em').classList.add('highlighted');
                    document.querySelector('.globe__text.step3').classList.remove('shown');
                    document.querySelector('.globe__text.step1').classList.add('shown');
                }
                break;

            case 'step4':
                if (isEntering) {
                    document.querySelector('.globe__text span.step4 em').classList.add('highlighted');
                    document.querySelector('.globe__text span.step4').classList.add('shown');
                } else {
                    document.querySelector('.globe__text em.step3').classList.add('highlighted');
                    document.querySelector('.globe__text span.step4').classList.remove('shown');
                }
                break;

            case 'step5':
                if (isEntering) {
                    document.querySelector('.globe__text span.step5 em').classList.add('highlighted');
                    document.querySelector('.globe__text span.step5').classList.add('shown');
                } else {
                    document.querySelector('.globe__text span.step4 em').classList.add('highlighted');
                    document.querySelector('.globe__text span.step5').classList.remove('shown');
                }
                break;

            default:
                break;
        }
    }

})();