import { bootstrapExtra } from "@workadventure/scripting-api-extra"
bootstrapExtra();

//import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";

var currentPopup = undefined;
var isCoWebSiteOpened =  false;
var currentWebsite = undefined;
var urlTutorial = "https://db-planet.deutschebahn.com/pages/telefonie/apps/content/workadventure-erste-schritte";
//var urlFeedback = "mailto:DB.Systel.CommunicationServices.EVS@deutschebahn.com";
var urlFeedback = "https://forms.office.com/Pages/ResponsePage.aspx?id=nC2noeZJbU-a9lqvoRg7_f26WHDvlOFNi_8Y43fECOdUMDVDTUpUUDRONkxHMzdLQ09WRlQxUUZSMS4u";
var urlInfo = "https://db.de/workadventure";
var urlInfoOrder = "https://dbserviceportal.service-now.com/serviceportal?id=sc_cat_item&category_sys_id=undefined&sys_id=0fa1b33e1b4bf010159842229b4bcb0e";

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

var zoneFeedback = "feedback";
var zoneTutorial = "start-info";
var zoneInfo = "info";
var zoneInfoOrder = "info-order";
var zoneTableTennis = "tabletennis";

var pongMsg = "Pong gegeneinander?\n\n1.Wählen Sie Online-Mehrspielermodus\n" +
"2.Wählen Sie 'Beiläufig'\n3.Geben Sie eine Zimmernummer ein und klicken Sie auf 'Zimmer ändern'\n" +
"4. Teilen Sie die Zimmernummer Ihrem Partner mit\n\n" +
"Die Steuerung funktioniert mit den Pfeiltasten."

WA.room.onEnterLayer(zoneTutorial).subscribe(() => {
  currentPopup =  WA.ui.openPopup("popUpTutorial","Tutorial ansehen?",[
  {
    label: "OK",
    callback: (popup => {
      WA.nav.openTab(urlTutorial);
      isCoWebSiteOpened = true;
      closePopUp();
    })
  }]);
})

WA.room.onLeaveLayer(zoneTutorial).subscribe(() => {
  closePopUp();

  if (isCoWebSiteOpened) {
    WA.nav.closeCoWebSites();
    isCoWebSiteOpened = false;
  }
})

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

WA.room.onEnterLayer(zoneInfo).subscribe(() => {
  currentPopup =  WA.ui.openPopup("popUpInfo","Willkommen im EVS-Teambüro! Sprich uns gerne direkt an und komm bei uns vorbei! \n Mehr zu Workadventure auf ...",[
  {
    label: "DB Planet",
    callback: (popup => {
      WA.nav.openTab(urlInfo);
      isCoWebSiteOpened = true;
      closePopUp();
    })
  }]);
})

WA.room.onLeaveLayer(zoneInfo).subscribe(() => {
  closePopUp();

  if (isCoWebSiteOpened) {
    WA.nav.closeCoWebSites();
    isCoWebSiteOpened = false;
  }
})

WA.room.onEnterLayer(zoneInfoOrder).subscribe(() => {
  currentPopup =  WA.ui.openPopup("popUpInfoOrder","Ihr möchtet auch ein eigenes Teambüro mit kurzer Info zu euch? Hier könnt ihr dies beantragen.",[
  {
    label: "Digitalportal",
    callback: (popup => {
      WA.nav.openTab(urlInfoOrder);
      isCoWebSiteOpened = true;
      closePopUp();
    })
  }]);
})

WA.room.onLeaveLayer(zoneInfoOrder).subscribe(() => {
  closePopUp();

  if (isCoWebSiteOpened) {
    WA.nav.closeCoWebSites();
    isCoWebSiteOpened = false;
  }
})

WA.room.onEnterLayer(zoneTableTennis).subscribe(() => {
  currentPopup =  WA.ui.openPopup("popUpTableTennis", pongMsg, [
  {
    label: "Verstanden",
    callback: (popup => {
      isCoWebSiteOpened = true;
      closePopUp();
    })
  }]);
})

WA.room.onLeaveLayer(zoneTableTennis).subscribe(() => {
  closePopUp();

  if (isCoWebSiteOpened) {
    WA.nav.closeCoWebSites();
    isCoWebSiteOpened = false;
  }
})

// start: mox scripting
const buttons = [
    {
      label: "Reset",
      className: "error",
      callback: () =>
        (WA.state.votePos = WA.state.voteNeg = WA.state.voteNeut = 0)
    }
  ]
  
  // Waiting for the API to be ready
  WA.onInit()
    .then(() => {
      console.log("Scripting API ready")
      console.log("Player tags: ", WA.player.tags)
  
      let website
      WA.room.onEnterLayer("infoPopup").subscribe(() => {
        openInfoWebsite().then(_website => (website = _website))
      })
  
      WA.room.onLeaveLayer("infoPopup").subscribe(() => {
        website.visible = false
      })
  
      WA.room.onEnterLayer("votePos").subscribe(() => {
        console.log("VotePos: ", WA.state.votePos)
        WA.state.votePos++
      })
      WA.room.onLeaveLayer("votePos").subscribe(() => {
        console.log("VotePos: ", WA.state.votePos)
        if (WA.state.votePos === 0) return
        WA.state.votePos--
      })
      WA.room.onEnterLayer("voteNeg").subscribe(() => {
        console.log("voteNeg: ", WA.state.voteNeg)
        WA.state.voteNeg++
      })
      WA.room.onLeaveLayer("voteNeg").subscribe(() => {
        console.log("voteNeg: ", WA.state.voteNeg)
        if (WA.state.voteNeg === 0) return
        WA.state.voteNeg--
      })
      WA.room.onEnterLayer("voteNeut").subscribe(() => {
        console.log("voteNeut: ", WA.state.voteNeut)
        WA.state.voteNeut++
      })
      WA.room.onLeaveLayer("voteNeut").subscribe(() => {
        console.log("voteNeut: ", WA.state.voteNeut)
        if (WA.state.voteNeut === 0) return
        WA.state.voteNeut--
      })
  
      let voteResetPopup
      WA.room.onEnterLayer("voteRes").subscribe(() => {
        voteResetPopup = WA.ui.openPopup(
          "resetPopup",
          "Soll das Voting zurückgesetzt werden?",
          buttons
        )
      })
      WA.room.onLeaveLayer("voteRes").subscribe(() => {
        voteResetPopup.close()
      })
  
      // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
      bootstrapExtra()
        .then(() => {
          console.log("Scripting API Extra ready")
        })
        .catch(e => console.error(e))
    })
    .catch(e => console.error(e))
  
  async function openInfoWebsite() {
    return await WA.ui.website.open({
      url: "https://tstosius.github.io/worktest/info.html",
      position: {
        vertical: "middle",
        horizontal: "middle"
      },
      size: {
        width: "50vh",
        height: "50vh"
      }
    })
  }
  
  WA.ui.actionBar.addButton({
            id:"minimap",
            type:"action",
            imageSrc:"data:image/png;base64,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",
            toolTip:"Minimap",
            callback: async () => {
				if (currentWebsite !== undefined) {
                    currentWebsite.close();
                    currentWebsite = undefined;
                } else {
                    currentWebsite = await WA.nav.openCoWebSite("../minimap.html",true);
                }
            }
        })

  export {}