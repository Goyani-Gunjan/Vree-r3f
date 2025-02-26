// labelManager.js — Handle label creation and rendering

import {
    CSS2DRenderer,
    CSS2DObject,
  } from "three/addons/renderers/CSS2DRenderer.js";
  import generalStore from "../Stores/GeneralStore";
  import { reaction } from "mobx";
  
  // Initialize CSS2D Renderer
  export function createLabelRenderer() {
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth * 0.6, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0";
    labelRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(labelRenderer.domElement);
  
    window.addEventListener("resize", () => {
      labelRenderer.setSize(window.innerWidth * 0.6, window.innerHeight);
    });
  
    return labelRenderer;
  }
  
  export function createLabel(text, position = { x: 0, y: 0.5, z: 0 }) {
    const labelWrapper = document.createElement("label");
    labelWrapper.className = "label";
    labelWrapper.style.pointerEvents = "auto";
  
    labelWrapper.style.display = "inline-flex";
    labelWrapper.style.alignItems = "center";
    labelWrapper.style.justifyContent = "center";
    labelWrapper.style.gap = "10px";
    labelWrapper.style.cursor = "pointer";
    labelWrapper.style.background = "#4c0080";
    labelWrapper.style.color = "#fff";
    labelWrapper.style.fontFamily = "Arial, sans-serif";
    labelWrapper.style.padding = "3px 7px";
    labelWrapper.style.borderRadius = "20px";
    labelWrapper.style.border = "2px solid #A673FF";
    labelWrapper.style.fontSize = "14px";
  
    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "modelLabel";
    radioButton.style.margin = "0px";
    radioButton.style.cursor = "pointer";
    radioButton.style.accentColor = "#A673FF";
    radioButton.style.color = "#A673FF";
    radioButton.style.fontSize = "14px";
    radioButton.style.appearance = "none";
    radioButton.style.width = "16px";
    radioButton.style.height = "16px";
    radioButton.style.border = "2px solid #A673FF";
    radioButton.style.borderRadius = "50%";
    radioButton.style.display = "inline-block";
    radioButton.style.backgroundColor = "#4c0080";
    radioButton.style.position = "relative";
    radioButton.style.top = "3px";
  
  //   radioButton.checked = generalStore.selectedCard === text;
  if (generalStore.selectedCard === text) {
      radioButton.style.backgroundColor = "#A673FF"; 
      radioButton.style.borderColor = "#fff";
    } else {
      radioButton.style.backgroundColor = "#4c0080"; 
      radioButton.style.borderColor = "#A673FF";
    }
    console.log(`Initial selected card: ${generalStore.selectedCard}`);
  
    const labelText = document.createElement("span");
    labelText.textContent = text;
    labelText.style.marginLeft = "5px";
    labelText.style.lineHeight = "1";
    labelText.style.display = "inline-block";
  
    // Assemble the label
    labelWrapper.appendChild(radioButton);
    labelWrapper.appendChild(labelText);
    labelWrapper.onclick = () => {
      generalStore.setSelectedCard(text);
      // radioButton.checked = true;
      console.log(`Selected card: ${text}`);
    };
  
    reaction(
      () => generalStore.selectedCard,
      (selectedCard) => {
      //   radioButton.checked = selectedCard === text;
      if (selectedCard === text) {
          radioButton.style.backgroundColor = "#c464da"; 
          radioButton.style.borderColor = "#fff";
        } else {
          radioButton.style.backgroundColor = "#a561ce"; 
          radioButton.style.borderColor = "#A673FF";
        }
      }
    );
  
    const labelObject = new CSS2DObject(labelWrapper);
    labelObject.position.set(position.x, position.y, position.z);
  
    return labelObject;
  }
  
  // Render labels
  export function renderLabels(labelRenderer, scene, camera) {
    labelRenderer.render(scene, camera);
  }