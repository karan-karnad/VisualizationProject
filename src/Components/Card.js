import React, { useState, useEffect } from 'react'
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Sound, Tools } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; 


let box;
let csvArr = [];

let samplearr = [
  {'x':1,'y':1,'z':1},
  {'x':2,'y':2,'z':2},
  {'x':3,'y':3,'z':3},
]
const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;


  samplearr.forEach((element,index) => {
    debugger
    const graphBox = new MeshBuilder.CreateBox(`box-${index}`, { size: 0.5 }, scene);
    graphBox.position.x = element.x
    graphBox.position.y = element.y
    graphBox.position.z = element.z
  });
  

  // Our built-in 'box' shape.
//   box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

//   // Move the box upward 1/2 its height
//   box.position.y = 1;

//   // Our built-in 'ground' shape.
//   MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

//   //Adding sound
//   const sound = new Sound("sound", "https://freesound.org/people/Connum/sounds/23874/", scene, null, {autoplay: true, loop: true});
// //Leave time for the sound file to load before playing it
//     sound.play();

//   const box1 = new MeshBuilder.CreateBox("box", {}); //unit cube
//   box1.scaling = new Vector3(3, 8, 4);

//   box1.rotation.y = Math.PI / 4;
//   box1.rotation.y = Tools.ToRadians(45);

//   const roof =  MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 4, tessellation: 3}, scene);
//   roof.scaling.x = 0.75;
//   roof.rotation.z = Math.PI / 2;
//   roof.position.y = 5; 
//   roof.position.x = 0;
//   roof.position.z = 1;


};

const onRender = (scene) => {
    if (box !== undefined) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();
  
      const rpm = 10;
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

    if (csvArr.length !== 0 && csvArr.length !== 5) {
      createGraph(scene)
    }
  };


const getInputValue = (event) => {
  const x = document.getElementById("X").value
  const y = document.getElementById("Y").value
  const z = document.getElementById("Z").value

//  box.position.x = x;
//  box.position.y = y;
//  box.position.z = z;
}

const csvToArray = (str, delimiter = ",") => {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index].replace("\r", "");
      return object;
    }, {});
    console.log(el)
    return el;
  });

  // return the array

  return arr;
}

const createGraph = (scene) => {
  csvArr.forEach((element,index) => {
    console.log(element)
    const graphBox = new MeshBuilder.CreateBox(`box-${index}`, { size: 2 }, scene);
    // graphBox.position.x = parseInt(element[index]['X-cord']);
    // graphBox.position.y = parseInt(element[index]['Y-cord']);
    // graphBox.position.z = 1;
  });
}

const readFile = () => {
        var reader = new FileReader();
        reader.onload = function () {
            document.getElementById('out').innerHTML = reader.result;
            console.log(reader.result)
            const arrayConverted = csvToArray(reader.result)
            csvArr.push(arrayConverted);
            
        };
        // start reading the file. When it is done, calls the onload event defined above.
        const textDataFromCSV = reader.readAsText(document.getElementById('csv').files[0]);
        


}

const Card = () => {

const [todo, setTodo] = useState([])
const [csvArr, setCsvArr] = useState([])

useEffect(() => {
    fetch('/api').then(response => response.json()).then(data => console.log(data))
},[])
    return (
    <div>    
        <div>
        <input type="text" id="X" name="name" placeholder="X Axis" required minlength="4" maxlength="8" size="10" ></input>
        <input type="text" id="Y" name="name" placeholder="Y Axis" required minlength="4" maxlength="8" size="10"></input>
        <input type="text" id="Z" name="name" placeholder="Z Axis" required minlength="4" maxlength="8" size="10"></input>
        <input type="button" value="Submit" id="Z" name="name" placeholder="Z Axis" required minlength="4" maxlength="8" size="10" onClick={getInputValue}></input>
        </div>
        <p>Select local CSV File:</p>
        <input id="csv" type="file" onChange={readFile}></input>

        <output id="out">
            file contents will appear here
        </output>
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    </div>)
    }

export default Card