//as of July 2026, this does check only plugging to the router,
//no actual Internet tunnel is checked,
//because of CORS unresolved problem,
(function(){
    window.b$l.methods.setsupInternetChecker = setsupInternetChecker;

    function setsupInternetChecker({
        //example: pingsiteURL='href='https://ko-fi.com/L4L618688P';
        PING_SITE_URL, //which site to disturb
        doThisWhenStatusUpdates //what to do when on/off line
    }){
        // 2. Real-time event listeners for immediate updates
        //window.addEventListener("online", async () => {
        window.addEventListener("online", () => {
            setTimeout( ()=>{
                doThisWhenStatusUpdates(hasInternetAccess());
            },

            //this is a patch in hope that after physical connection
            //internent connection will be established in this time
            4000

            );
            //not implemented because of CORS problems:
            //const online = await hasInternetAccess();
            //doThisWhenStatusUpdates(online);
        });

        window.addEventListener("offline", () => {
            //Definitely offline if the browser throws this event
            doThisWhenStatusUpdates(false);

        });
        return hasInternetAccess;

        //credit: https://www.google.com/search?q=how+to+test+is+internet+connected+from+javascript+web+page&oq=how+to+test+is+internet+connected+from+javascript+web+page&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRiPAtIBCTM2Mjg2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8
        // 1. Core function to verify true internet access
        function hasInternetAccess() {
        //async function hasInternetAccess() {
            //If the browser says we are offline locally,
            //don't bother fetching
            if (!navigator.onLine) return false;
            return true;
            /*
            //not implemented, unsolved CORS problems when on line
            try {
                //Fetch a tiny asset with a cache-busting timestamp
                const response = await fetch( PING_SITE_URL, {
                    //HEAD request only downloads
                    //headers, saving bandwidth
                    method: "HEAD",
                    cache: "no-store"
                });
                return response.ok; // Returns true if status is 200-299
            } catch (error) {
                return false; // Network error or timeout means no real internet
            }
            */
        }
    }
})();


/*
 * not implemented yet
// 3. Optional: Polling fallback to detect silent drops
//    (e.g., every 10 seconds)
setInterval(async () => {
  const online = await hasInternetAccess();
  doThisWhenStatusUpdates(online);
}, 10000);

function doThisWhenStatusUpdates(isOnline) {
  if (isOnline) {
    console.log("Connected to the internet!");
  } else {
    console.log("No internet access.");
  }
}
*/
