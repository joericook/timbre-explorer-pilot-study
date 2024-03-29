//Import views
import Welcome from "./views/Welcome.js";
import Info from "./views/Info.js";
import Consent from "./views/Consent.js";
import ConsentDl from "./views/ConsentDl.js";
import Headphones from "./views/Headphones.js";
import Background from "./views/Background.js";
import Walkthrough from "./views/Walkthrough.js";
import Training1 from "./views/Training1.js";
import Testing1 from "./views/Testing1.js";
import Feedback1 from "./views/Feedback1.js";
import Training2 from "./views/Training2.js";
import Testing2 from "./views/Testing2.js";
import Feedback2 from "./views/Feedback2.js";
import Testing3 from "./views/Testing3.js";
import Feedback3 from "./views/Feedback3.js";
import Conclusion from "./views/Conclusion.js";

// Enables forward and back navigation with historyAPI
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    // routes are defined in here
    const routes = [
        { path: "/", view: Welcome },
        { path: "/info", view: Info },
        { path: "/consent", view: Consent },
        { path: "/consentdl", view: ConsentDl },
        { path: "/headphones", view: Headphones },
        { path: "/background", view: Background },
        { path: "/walkthrough", view: Walkthrough },
        { path: "/training1", view: Training1 },
        { path: "/testing1", view: Testing1 },
        { path: "/feedback1", view: Feedback1 },
        { path: "/training2", view: Training2 },
        { path: "/testing2", view: Testing2 },
        { path: "/feedback2", view: Feedback2 },
        { path: "/testing3", view: Testing3 },
        { path: "/feedback3", view: Feedback3 },
        { path: "/conclusion", view: Conclusion },
    ];
    
    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        // Return a new object containing the route and a boolean value 'isMatch' 
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    // 'match' equals the 'route' object with the matching path
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    // If path doesn't have a match, it routes to the landing page (could link to 404 page)
    if (!match) {
        match = {
            route: routes[0],
            isMatch:true
        };
    }

    // Create new instance of view that matched the route
    const view = new match.route.view();

    // Some paths send html to overlay
    // others send html to taskContainer
    if (['/', '/info', '/consent', '/consentdl', '/headphones', '/background', '/testing1', '/feedback1',
         '/testing2', '/feedback2', '/testing3', '/feedback3'].includes(match.route.path)) {
        //console.log("overlayContent");
        document.querySelector("#overlayContent").innerHTML = await view.getHtml();
        document.getElementById("overlay").style.display = "block";

        // If path matches testing1 append the quiz script to the document body
        if (['/testing1'].includes(match.route.path)) {
            let test1Script = document.createElement("script");
            test1Script.src = "static/js/test1.js";
            document.getElementById("overlayContent").append(test1Script);
        }
        else if (['/testing2'].includes(match.route.path)) {
            let test2Script = document.createElement("script");
            test2Script.src = "static/js/test2.js";
            document.getElementById("overlayContent").append(test2Script);
        }
        else if (['/testing3'].includes(match.route.path)) {
            let test3Script = document.createElement("script");
            test3Script.src = "static/js/test3.js";
            document.getElementById("overlayContent").append(test3Script);
        }
    }   
    else {
        //console.log("taskContainer");
        document.querySelector("#taskContainer").innerHTML = await view.getHtml();
        document.getElementById("overlay").style.display = "none";

        // If path matches training1 append the quiz script to the document body
        if (['/training1'].includes(match.route.path)) {
            let train1Script = document.createElement("script");
            train1Script.src = "static/js/train1.js";
            document.getElementById("taskContainer").append(train1Script);
        }
        else if (['/training2'].includes(match.route.path)) {
            let train2Script = document.createElement("script");
            train2Script.src = "static/js/train2.js";
            document.getElementById("taskContainer").append(train2Script);
        }
    }
    
    // Scroll to top of the divs when updating contents
    document.getElementById("overlay").scrollTo(0, 0);

    //console.log(match.route.view);
    //console.log(match.route.path);
};

// Enable navigating forward and back
// DEV USE ONLY, this should be disabled in deployment 
//window.addEventListener("popstate", router);

// When page loads
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        // If the clicked element has 'data-link' attribute, prevent default link following
        // and navigate to href of the element
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});

// Alert when user attempts to reload page
window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault();
    // returnValue must be set to show alert on chrome
    e.returnValue = '';
  });

/* REFERENCES */
/***************************************************************************************
*    Title: Building a Single Page App without frameworks
*    Authors: Dom (dcode)
*    Date: 2020
*    Availability: https://dev.to/dcodeyt/building-a-single-page-app-without-frameworks-hl9
*
***************************************************************************************/