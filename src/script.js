import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { getLayersMap } from "@workadventure/scripting-api-extra";
import { levelUp } from "@workadventure/quests";

bootstrapExtra();

console.log("Script started successfully")

var currentPopup = undefined;
var isCoWebSiteOpened =  false;
var currentWebsite = undefined;
var urlFeedback = "https://forms.office.com/Pages/ResponsePage.aspx?id=nC2noeZJbU-a9lqvoRg7_f26WHDvlOFNi_8Y43fECOdUMDVDTUpUUDRONkxHMzdLQ09WRlQxUUZSMS4u";

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

var zoneFeedback = "feedback";

WA.room.onEnterLayer(zoneFeedback).subscribe(() => {
  currentPopup =  WA.ui.openPopup("popUpFeedback","Hier kannst du Feedback abgeben.",[
  {
    label: "Feedback",
    callback: (popup => {
        WA.nav.openCoWebSite(urlFeedback);
        isCoWebSiteOpened = true;
        closePopUp();
    })
  }]);
})

WA.room.onLeaveLayer(zoneFeedback).subscribe(() => {
  closePopUp();

  if (isCoWebSiteOpened) {
    WA.nav.closeCoWebSites();
    isCoWebSiteOpened = false;
  }
})


// Waiting for the API to be ready
WA.onInit()
.then(() => {
  console.log("Scripting API ready")
  console.log("Player tags: ", WA.player.tags)

  //initTables();
  // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
  bootstrapExtra()
  .then(() => {
    console.log("Scripting API Extra ready")
  })
  .catch(e => console.error(e))

  // mox table lock
  initTables();
})
.catch(e => console.error(e))


/**********************************************************************
 *  add Minimap to map
 */  
WA.ui.actionBar.addButton({
  id:"minimap",
  type:"action",
  imageSrc:"https://buenni86.github.io/systel-openspace/map_logo.png",
  toolTip:"Minimap",
  callback: async () => {
    if (currentWebsite !== undefined) {
      currentWebsite.close();
      currentWebsite = undefined;
      } else {
        //currentWebsite = await WA.nav.openCoWebSite("../minimap.html",true);
        WA.ui.modal.openModal({
        title: "Minimap",
        src: 'https://buenni86.github.io/systel-openspace/minimap.html',
        allow: "fullscreen",
        allowApi: true,
        position: "right",
      });
      }
    }
})


/******************************************************
 * Mox functions
 */

const tablenameJoto = "tableStatusMox1";
const tablenameKanto = "tableStatusKanto";
const tablenameHoenn = "tableStatusHoenn";

let jotoLayer = null;
let kantoLayer = null;
let hoennLayer = null;

export function initTables() {
  console.log("Mox 'Table' module loaded");

  getLayersMap().then((layer) => {
    jotoLayer = layer
      .get("areas")
      .objects.find((object) => object.name === "Mox1");
    let tableConfig = JSON.parse(WA.state.loadVariable(tablenameJoto));
    if (!Object.keys(tableConfig).includes("playerCount")) {
      tableConfig = { playerCount: 0 };
      WA.state.saveVariable(tablenameJoto, JSON.stringify(tableConfig));
      console.log(
        "After Saving: ",
        JSON.parse(WA.state.loadVariable(tablenameJoto))
      );
    }
  });

  WA.room.area.onEnter("Mox1").subscribe(() => {
    incrementPlayerCount(tablenameJoto);
    if (isTableLocked(tablenameJoto)) {
      pushPlayer(jotoLayer);
    } else {
      WA.ui.actionBar.addButton({
        id: "lockTable",
        label: "Toggle Table Lock",
        callback: (event) => {
          console.log(event);
          toggleTableLock(tablenameJoto);
        },
      });
    }
  });

  WA.room.area.onLeave("Mox1").subscribe(() => {
    decrementPlayerCount(tablenameJoto);
  });
}

WA.onInit().then(async () => {
	
    console.log("Scripting API ready")
    console.log("Player tags: ", WA.player.tags)
    var pos= await WA.player.getPosition()
   if(pos.x<2100){
        currentPopup =   WA.ui.openPopup(popUpStart, startMsg,[
    
        {
            label: "OK",
            callback: (popup => {
                closePopUp();
            })
        }]);

   }
    
WA.room.onEnterLayer("pollZone").subscribe(() => {
  WA.ui.actionBar.addButton({
    id:"closePoll",
    type:"action",
    imageSrc:"https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=close",
    toolTip:"Close Poll",
    callback: async () => {
      if(WA.state.pollOpen === true){
        switch(WA.player.state.vote){
          case "pos":
            console.log("yes quest xp granted")
            levelUp("yes_sayer_quest", 100);
            break;
          case "neg":
            console.log("no quest xp granted")
            levelUp("no_sayer_quest", 100);
            break;
          case "neut":
            console.log("neut quest xp granted")
            levelUp("neutral_sayer_quest", 100);
            break;
          case "0":
            break;
        }
      }
      WA.state.pollOpen = false;
      console.log(WA.state.pollOpen)
    }
  })

  WA.ui.actionBar.addButton({
    id:"resetPoll",
    type:"action",
    imageSrc:"https://flaticons.net/icon.php?slug_category=application&slug_icon=command-reset",
    toolTip:"Reset Poll",
    callback: async () => {
      WA.state.pollOpen = true;
      WA.state.voteNeg = 0;
      WA.state.votePos = 0,
      WA.state.voteNeut = 0,
      console.log(WA.state.pollOpen)
      }
  })
})

WA.room.onLeaveLayer("pollZone").subscribe(() => {
  WA.ui.actionBar.removeButton("resetPoll");
  WA.ui.actionBar.removeButton("closePoll");
})

WA.room.onEnterLayer("votePos").subscribe(() => {
  if(WA.state.pollOpen === true){  
    WA.player.state.vote = "pos";
    console.log(WA.player.state.vote) 
    console.log("VotePos: ", WA.state.votePos)
    WA.state.votePos++
  }
})
WA.room.onLeaveLayer("votePos").subscribe(() => {
  WA.player.state.vote = "0";
  if(WA.state.pollOpen === true){
    console.log("VotePos: ", WA.state.votePos)
    console.log(WA.player.state.vote)
    if (WA.state.votePos === 0) return
    WA.state.votePos--
  }
})
WA.room.onEnterLayer("voteNeg").subscribe(() => {
  if(WA.state.pollOpen === true){
    console.log("voteNeg: ", WA.state.voteNeg)
    WA.player.state.vote = "neg";
    console.log(WA.player.state.vote)
    WA.state.voteNeg++
  }
})
WA.room.onLeaveLayer("voteNeg").subscribe(() => {
  WA.player.state.vote = "0";
  if(WA.state.pollOpen === true){
    console.log("voteNeg: ", WA.state.voteNeg)
    console.log(WA.player.state.vote)
    if (WA.state.voteNeg === 0) return
    WA.state.voteNeg--
    }
})
WA.room.onEnterLayer("voteNeut").subscribe(() => {
  if(WA.state.pollOpen === true){
    console.log("voteNeut: ", WA.state.voteNeut)
    WA.player.state.vote = "neut";
    console.log(WA.player.state.vote)
    WA.state.voteNeut++
  }
})
WA.room.onLeaveLayer("voteNeut").subscribe(() => {
  WA.player.state.vote = "0";
  if(WA.state.pollOpen === true){
    console.log("voteNeut: ", WA.state.voteNeut)
    console.log(WA.player.state.vote)
    if (WA.state.voteNeut === 0) return
    WA.state.voteNeut--
  }
})
WA.room.onEnterLayer("talkingZoneLayer").subscribe(() => {
  console.log("zone works");
  levelUp("access_meeting_zone", 5);
})
    

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready")
    
      })
      .catch(e => console.error(e))
  })


//Grating XP for opening doors

const door_layers = ["autodoors/autoRoom0","autoRoom1outside","autodoors/autoRoom2","autodoors/autoRoom1inside","autodoors/autoRoom3","autodoors/autoRoom4","autodoors/autoRoom5","autodoors/autoRoomWired"];
for(let i = 0; i < door_layers.length; i++){
  WA.room.onEnterLayer(door_layers[i]).subscribe(() => {
    console.log("zone works");
    levelUp("door_opener", 5);
  })
}

/**
 * Load the current table status and increment the player counter
 * @param {string} tableName Name of the variable from Tiled which holds the table status
 */
function incrementPlayerCount(tableName) {
  let tableStatus = JSON.parse(WA.state.loadVariable(tableName));
  tableStatus.playerCount = tableStatus.playerCount + 1;
  WA.state.saveVariable(tableName, JSON.stringify(tableStatus));
  console.log("After increment", JSON.parse(WA.state.loadVariable(tableName)));
}

/**
 * Load the current table status and decrement the player counter
 * @param {string} tableName Name of the variable from Tiled which holds the table status
 */
function decrementPlayerCount(tableName) {
  WA.ui.actionBar.removeButton("lockTable");
  const tableStatus = JSON.parse(WA.state.loadVariable(tableName));
  tableStatus.playerCount = tableStatus.playerCount - 1;
  if (tableStatus.playerCount <= 0) {
    tableStatus.playerCount = 0;
    tableStatus.locked = false;
  }
  WA.state.saveVariable(tableName, JSON.stringify(tableStatus));
  console.log("After decrement", JSON.parse(WA.state.loadVariable(tableName)));
}

function isTableLocked(tableName) {
  return JSON.parse(WA.state.loadVariable(tableName)).locked;
}

/**
 * Load the current table status and invert the current 'lock' status
 * @param {tableName} tableName Name of the variable from Tiled which holds the table status
 */
function toggleTableLock(tableName) {
  let tableStatus = JSON.parse(WA.state.loadVariable(tableName));
  tableStatus.locked = !tableStatus.locked;
  WA.state.saveVariable(tableName, JSON.stringify(tableStatus));
}

/**
 *
 * @param {currentLayer} currentLayer The actual layer from the getLayers() method
 */
function pushPlayer(currentLayer) {
  WA.controls.disablePlayerControls();
  WA.player.getPosition().then((pos) => {
    const x = currentLayer.x + currentLayer.width + currentLayer.width * 0.03;
    const y = pos.y;
    WA.player.moveTo(x, y, 50).finally(() => {
      WA.controls.restorePlayerControls();
    });
  });
}
export {}