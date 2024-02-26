<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from './lib/pages/Home.svelte'
  import Player from './lib/pages/Player.svelte'
  import Request from './lib/pages/Request.svelte'
  import Caribokep from './lib/pages/Caribokep.svelte'

  import Navbarmenu from './lib/utils/Navbarmenu.svelte'
</script>


<Router>
    <div >
    <Navbarmenu/>
  <div>
    <Route path="/">
      <Home />
    </Route>
   
     <Route path="/request">
      <Request />
    </Route>
     <Route path="/caribokep">
      <Caribokep />
    </Route>
    <Route path="/player/:id" let:params>
      <Player id={params.id} />
    </Route>
    </div>
  </div>
</Router>