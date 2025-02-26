import { makeObservable, observable, action } from "mobx";

class GeneralStore{
    selectedCard="Frame";
    originalTempleTexture = null;
    originalFrameTexture = null;


    constructor(){
        makeObservable(this, {
            selectedCard: observable,
            setSelectedCard: action,
            originalTempleTexture : observable,
            originalFrameTexture : observable,
            setOriginalTempleTexture : action,
            setOriginalFrameTexture : action,


        })
    }

    setSelectedCard(card){
        this.selectedCard = card;
    }
    setOriginalTempleTexture(texture){
        this. originalTempleTexture  = texture;
    }
    setOriginalFrameTexture(frame){
        this. originalFrameTexture  = frame;
    }
}
const generalStore = new GeneralStore();
export default generalStore;