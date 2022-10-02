import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



const box_s = 80;
const box_size = box_s + 1;


const speed_multiplier = 2;
const camera_distance = 2.3 * box_size;


function  particle_colision(){
    for(let i = 0; i < circle_array.length; i++) {
        for(let j = i+1; j < circle_array.length; j++) {
            elastic_colision(circle_array[i], circle_array[j]);
        }
    }
}

// wall hitting detector boundry -box_size to box_size
function colision_detect(circle) {
    
    if(circle.position.x <= -box_s || circle.position.x >= box_s  || circle.position.y <= -box_s  || circle.position.y >= box_s ) {
        return true;
    }

    return false;
}

//particle particle colision
function elastic_colision(particle_1, partcle_2){

    const distance = Math.sqrt(Math.pow(particle_1.position.x - partcle_2.position.x, 2) + Math.pow(particle_1.position.y - partcle_2.position.y, 2));

    if(distance <= 2) {
        const temp_x = particle_1.velocity_x;
        const temp_y = particle_1.velocity_y;

        particle_1.velocity_x = partcle_2.velocity_x;
        particle_1.velocity_y = partcle_2.velocity_y;

        partcle_2.velocity_x = temp_x;
        partcle_2.velocity_y = temp_y;
    }

}

// mirror the axis
function mirror_the_axis(circle) {
    if(circle.position.x < -box_s) {
        // circle.position.x = -box_size;
        circle.velocity_x = -circle.velocity_x;
    }
    if(circle.position.x > box_s) {
        // circle.position.x = box_size;
        circle.velocity_x = -circle.velocity_x;
    }
    if(circle.position.y < -box_s) {
        // circle.position.y = -box_size;
        circle.velocity_y = -circle.velocity_y;
    }
    if(circle.position.y > box_s ){
        // circle.position.y = box_size;
        circle.velocity_y = -circle.velocity_y;
    }
}

//resize manager
window.addEventListener('resize', () => {
    //update the camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    //update the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//double click
window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if(!fullscreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

//scene 
const scene = new THREE.Scene();

//camera 
const camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
scene.add(camera);
camera.position.z = camera_distance;


//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);2

//draw 4 line to make a square
const geometry_line = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -box_size, -box_size, 0,
    box_size, -box_size, 0,
    box_size, box_size, 0,
    -box_size, box_size, 0,
    -box_size, -box_size, 0
]);
//creating the box

geometry_line.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material_line = new THREE.LineBasicMaterial({color: 0x0000ff});
const line = new THREE.Line(geometry_line, material_line);
scene.add(line);


//create a circle
const geometry = new THREE.CircleGeometry(1, 30);
const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: false 
});
//create an array of particles
const circle_array = ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19','c20', 'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29', 'c30', 'c31', 'c32', 'c33', 'c34', 'c35', 'c36', 'c37', 'c38', 'c39', 'c40', 'c41', 'c42', 'c43', 'c44', 'c45', 'c46', 'c47', 'c48', 'c49', 'c50', 'c51', 'c52', 'c53', 'c54', 'c55', 'c56', 'c57', 'c58', 'c59', 'c60', 'c61', 'c62', 'c63', 'c64', 'c65', 'c66', 'c67', 'c68', 'c69', 'c70', 'c71', 'c72', 'c73', 'c74', 'c75', 'c76', 'c77', 'c78', 'c79', 'c80', 'c81', 'c82', 'c83', 'c84', 'c85', 'c86', 'c87', 'c88', 'c89', 'c90', 'c91', 'c92', 'c93', 'c94', 'c95', 'c96', 'c97', 'c98', 'c99', 'c100', 'c101', 'c102', 'c103', 'c104', 'c105', 'c106', 'c107', 'c108', 'c109', 'c110', 'c111', 'c112', 'c113', 'c114', 'c115', 'c116', 'c117', 'c118', 'c119', 'c120', 'c121', 'c122', 'c123', 'c124', 'c125', 'c126', 'c127', 'c128', 'c129', 'c130', 'c131', 'c132', 'c133', 'c134', 'c135', 'c136', 'c137', 'c138', 'c139', 'c140', 'c141', 'c142', 'c143', 'c144', 'c145', 'c146', 'c147', 'c148', 'c149', 'c150', 'c151', 'c152', 'c153', 'c154', 'c155', 'c156', 'c157', 'c158', 'c159', 'c160', 'c161', 'c162', 'c163', 'c164', 'c165', 'c166', 'c167', 'c168', 'c169', 'c170', 'c171', 'c172', 'c173', 'c174', 'c175', 'c176', 'c177', 'c178', 'c179', 'c180', 'c181', 'c182', 'c183', 'c184', 'c185', 'c186', 'c187', 'c188', 'c189', 'c190', 'c191', 'c192', 'c193', 'c194', 'c195', 'c196', 'c197', 'c198', 'c199', 'c200', 'c201', 'c202', 'c203', 'c204', 'c205', 'c206', 'c207', 'c208', 'c209', 'c210', 'c211', 'c212', 'c213', 'c214', 'c215', 'c216', 'c217', 'c218', 'c219', 'c220', 'c221', 'c222', 'c223', 'c224', 'c225', 'c226', 'c227', 'c228', 'c229', 'c230', 'c231', 'c232', 'c233', 'c234', 'c235', 'c236', 'c237', 'c238', 'c239', 'c240', 'c241', 'c242', 'c243', 'c244', 'c245', 'c246', 'c247', 'c248', 'c249', 'c250', 'c251', 'c252', 'c253', 'c254', 'c255', 'c256', 'c257', 'c258', 'c259', 'c260', 'c261', 'c262', 'c263', 'c264', 'c265', 'c266', 'c267', 'c268', 'c269', 'c270', 'c271', 'c272', 'c273', 'c274', 'c275', 'c276', 'c277', 'c278', 'c279', 'c280', 'c281', 'c282', 'c283', 'c284', 'c285', 'c286', 'c287', 'c288', 'c289', 'c290', 'c291', 'c292', 'c293', 'c294', 'c295', 'c296', 'c297', 'c298', 'c299', 'c300', 'c301', 'c302', 'c303', 'c304', 'c305', 'c306', 'c307', 'c308', 'c309', 'c310', 'c311', 'c312', 'c313', 'c314', 'c315', 'c316', 'c317', 'c318', 'c319', 'c320', 'c321', 'c322', 'c323', 'c324', 'c325', 'c326', 'c327', 'c328', 'c329', 'c330', 'c331', 'c332', 'c333', 'c334', 'c335', 'c336', 'c337', 'c338', 'c339', 'c340', 'c341', 'c342', 'c343', 'c344', 'c345', 'c346', 'c347', 'c348', 'c349', 'c350', 'c351', 'c352', 'c353', 'c354', 'c355', 'c356', 'c357', 'c358', 'c359', 'c360', 'c361', 'c362', 'c363', 'c364', 'c365', 'c366', 'c367', 'c368', 'c369', 'c370', 'c371', 'c372', 'c373', 'c374', 'c375', 'c376', 'c377', 'c378', 'c379', 'c380', 'c381', 'c382', 'c383', 'c384', 'c385', 'c386', 'c387', 'c388', 'c389', 'c390', 'c391', 'c392', 'c393', 'c394', 'c395', 'c396', 'c397', 'c398', 'c399', 'c400', 'c401', 'c402', 'c403', 'c404', 'c405', 'c406', 'c407', 'c408', 'c409', 'c410', 'c411', 'c412', 'c413', 'c414', 'c415', 'c416', 'c417', 'c418', 'c419', 'c420', 'c421', 'c422', 'c423', 'c424', 'c425', 'c426', 'c427', 'c428', 'c429', 'c430', 'c431', 'c432', 'c433', 'c434', 'c435', 'c436', 'c437', 'c438', 'c439', 'c440', 'c441', 'c442', 'c443', 'c444', 'c445', 'c446', 'c447', 'c448', 'c449', 'c450', 'c451', 'c452', 'c453', 'c454', 'c455', 'c456', 'c457', 'c458', 'c459', 'c460', 'c461', 'c462', 'c463', 'c464', 'c465', 'c466', 'c467', 'c468', 'c469', 'c470', 'c471', 'c472', 'c473', 'c474', 'c475','c476','c477','c478'];
for(let i = 0; i < circle_array.length; i++) {
    circle_array[i] = new THREE.Mesh(geometry, material);


    circle_array[i].position.x = Math.random() * (box_size-2) - (box_size-0.5);
    circle_array[i].position.y = Math.random() * (box_size-2) - (box_size-0.5);


    circle_array[i].velocity_x = Math.random() * 0.1 - 0.05;
    circle_array[i].velocity_y = Math.random() * 0.1 - 0.05;
    //give them unique colors
    circle_array[i].material.color.set(0x0000ff * i * 250);
    scene.add(circle_array[i]);
}


//clock
const clock = new THREE.Clock();


//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false; //to remove the movement 
controls.enableRotate = false; //to remove x and y ax


//animation function
function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    line.material.color.setHSL(elapsedTime * 0.1, 10, 0.5);

    //move all the circles
    for(let i = 0; i < circle_array.length; i++) {
        circle_array[i].position.x += circle_array[i].velocity_x * speed_multiplier;
        circle_array[i].position.y += circle_array[i].velocity_y * speed_multiplier; 
    }

    //detect wall collision
    for(let i = 0; i < circle_array.length; i++) {

        if(colision_detect(circle_array[i])) {
            mirror_the_axis(circle_array[i]);
        }

    }

    //check the particle collision
    particle_colision();

    renderer.render(scene, camera);
}

animate();