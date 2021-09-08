import { PhotoDome } from "@babylonjs/core/Helpers/photoDome";
import { DeviceOrientationCamera } from "@babylonjs/core/Cameras/deviceOrientationCamera";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

import { CreateUI } from "./controller/UiController";
import { GetAllFurnitures } from "./service/FurnitureServices";

export const canvas = document.getElementById("renderCanvas");

export const engine = new Engine(canvas, true, {
  stencil: true,
  deterministicLockstep: true,
  lockstepMaxSteps: 4
});
export const scene = new Scene(engine);

//cameras
export const sensorCam = new DeviceOrientationCamera("sensorCam", new Vector3(0, 0, 1), scene);
export const arcCam = new ArcRotateCamera('arcCam', -5.491336344773743, 1.5994894971766154, 0, new Vector3.Zero(), scene);
arcCam.radius = 200 
arcCam.lowerRadiusLimit = 80;
arcCam.upperRadiusLimit = 320;
scene.activeCamera = arcCam;
scene.activeCamera.attachControl(canvas, true);

//criando domo root
let photoDome = new PhotoDome('photoDome', null, scene)
photoDome.material.diffuseTexture.dispose();
scene.getMaterialByName('photoDome_material').clone();
scene.getMaterialByName('photoDome_material').dispose(true, true, true);
scene.getTransformNodeByName('photoDome').dispose(false, true);

//engine
window.addEventListener("resize", () => engine.resize());
engine.runRenderLoop(() => scene.render());

//pagina carregada
window.addEventListener("load", () => {
  const LoadWithFetchData = async () => {
    let data = await GetAllFurnitures();
    
    CreateUI(data);
    SceneLoader.Append("./", "domeMesh.glb", scene, function (scene) {
      scene.meshes[1].isVisible = false;
      scene.meshes[1].isPickable = false;
      document.getElementById("function-variant-select").click();
      document.getElementById("function-main-loader").style.display = 'none';
    });
  }
  LoadWithFetchData();
}, false);