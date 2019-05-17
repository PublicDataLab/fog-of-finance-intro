(function () {
    let world, countryMetadata, countriesGeo, countriesId, mapDimensions;
    let $geoMap = d3.select('.globe__map');
    let projection = d3.geoOrthographic();
    let geoGenerator = d3.geoPath().projection(projection);
    let graticule = d3.geoGraticule();
    let p0 = [0, 0];

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

    // this script is inspired by various blocks from Mike Bostock and Peter Cook
    Promise.all([d3.json('https://cdn.jsdelivr.net/npm/world-atlas@1/world/50m.json'), d3.tsv('https://cdn.jsdelivr.net/npm/world-atlas@1/world/50m.tsv', ({ iso_n3, iso_a2, name_long }) => [iso_a2, [iso_n3, name_long]])]).then(function (values) {
        world = values[0];
        countryMetadata = values[1];
        setupMap();
    }).catch(function (error) {
        console.log(error);
    });

    function setupMap() {
        // console.log(world);
        const land = topojson.feature(world, world.objects.land);
        const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
        countriesGeo = new Map(topojson.feature(world, world.objects.countries).features.map(country => {
            return [country.id, country]
        }));
        const sphere = ({ type: 'Sphere' });
        // console.log(countryMetadata);
        countriesId = new Map(countryMetadata);
        // console.log(countries);
        // console.log(countriesId);
        mapDimensions = document.querySelector('.globe__map').getBoundingClientRect();
        const width = mapDimensions.width;
        const height = mapDimensions.height;
        const shorterSide = Math.min(width, height);
        const margins = { 'top': shorterSide * 0.25, 'left': shorterSide * 0.15 };
        projection.scale(width / 1.8)
            .translate([shorterSide / 2, shorterSide / 2])
            .center([0, 0])
            // .rotate([0, 0, 0]);
            .rotate([-15, -35, 0]);

        let svg = $geoMap.append('svg')
            .attr('width', width)
            .attr('height', height);
        let mapLayer = svg.append('g')
            .classed('world-map', true)
            .style('transform', `translate(${margins.left}px, ${margins.top}px)`);
        // draw graticule
        svg.append('g')
            .classed('graticule map-feature', true)
            .style('transform', `translate(${margins.left}px, ${margins.top}px)`)
            .append('path')
            .datum(graticule())
            .attr('d', geoGenerator);

        // draw world and countries
        mapLayer.append('path')
            .classed('world map-feature', true)
            .datum(land)
            .attr('d', geoGenerator);

        mapLayer.append('path')
            .classed('map-borders map-feature', true)
            .datum(borders)
            .attr('d', geoGenerator);

    }

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