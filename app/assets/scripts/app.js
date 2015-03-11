
/**
 * Smash targets below this line
 * -----------------------------
 */

(function(win, doc) {

    var w = win.innerWidth,
        h = win.innerHeight,

        scene,
        camera,
        renderer,
        geometry,
        sphere,
        material,
        cubes = [],
        light,
        pageX = null,
        pageY = null,
        X = 0,
        Y = 0,
        count = 0,

        // Some rad colours, should we need any.
        colours = [
            '#ed5565',
            '#da4453',
            '#fc6e51',
            '#e9573f',
            '#ffce54',
            '#fcbb42',
            '#a0d468',
            '#8cc152',
            '#48cfad',
            '#37bc9b',
            '#4fc1e9',
            '#3bafda',
            '#5d9cec',
            '#4a89dc',
            '#ac92ec',
            '#967adc',
            '#ec87c0',
            '#d770ad',
            '#f5f7fa',
            '#e6e9ed',
            '#ccd1d9',
            '#aab2bd',
            '#656d78',
            '#434a54'
        ];

    function randomColour() {
        return colours[Math.floor(Math.random() * colours.length)];
    }

    function render(){
        for ( var i in cubes ) {
            // if ( i % 2 === 0 ) {
                cubes[i].rotation.x -= Math.sin(count + i) / 10;
                cubes[i].rotation.y -= Math.sin(count + i) / 10;
                cubes[i].rotation.z -= Math.sin(count + i) / 10;
            // } else {
                // cubes[i].rotation.x += .0001 * i/5;
                // cubes[i].rotation.y += .0001 * i/5;    
                // cubes[i].rotation.z += .0001 * i/5;
            // }
        }

        // X = 0;
        // Y = 0;
        
        count+= 0.0001;
        renderer.render(scene, camera);
        window.requestAnimationFrame(render);
    }

    function addcube(x,y) {
        cubes.push(new THREE.Mesh(geometry, material));
        material = new THREE.MeshPhongMaterial({ color: randomColour() });
        cubes[cubes.length-1].position.x = (Math.floor(Math.random() * 6) - 3);
        cubes[cubes.length-1].position.y = (Math.floor(Math.random() * 6) - 3);
        scene.add(cubes[cubes.length-1]);
    }

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, w/h, 0.1, 1000 );
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor( 0xffffff, 1);
        renderer.setSize( w, h );
        document.body.appendChild( renderer.domElement );

        sphere = new THREE.SphereGeometry( 2.5, 32, 32 );
        geometry = new THREE.BoxGeometry( 3, 3, 3 );        
        material = new THREE.MeshPhongMaterial({ color: randomColour() });

        // scene.add( new THREE.Mesh(sphere, material));        
        
        for ( var i = 0, l = 128; i < l; i++ ) {
            cubes.push(new THREE.Mesh( geometry, material ));            
            scene.add( cubes[cubes.length-1] );
        }

        camera.position.z = 5;

        light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light.position.set( 0, 0, 9 );
        scene.add( light );

        $('canvas').on('mousemove', function(e){
            if ( pageX == null ) {
                pageX = e.pageX;
                pageY = e.pageY;
            } else {
                X = (pageX - e.pageX) / 300;
                Y = (pageY - e.pageY) / 300;
                pageX = e.pageX;
                pageY = e.pageY;
            }
        });

        $('canvas').on('click', function(e) {
            addcube(e.pageX, e.pageY);
        });

        window.requestAnimationFrame(render);
    }

    $(init);

})(window,document);