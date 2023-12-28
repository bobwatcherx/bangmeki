<script>
  import { onMount ,afterUpdate} from 'svelte';
  import {base_api,apikey} from '../../configapi/api.js'
  import {Link} from 'svelte-navigator'
  let videos = []
 let loading = true;

 
 // const url  = "https://corsany-1-g0403094.deta.app/https://poophd.com/api/list?key=raQu2lrd&folder=9DVR9eBBSMH"
 const url  = "https://pooptest.vercel.app/jepang"


  let currentpage = 1
   async function getapi(page){
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    videos = data.videos;
     loading = false;
  }

  onMount(async () => {
    await getapi(currentpage)
  });

  afterUpdate(async () => {
    await getapi(currentpage);
  });

  async function gotoPage(page) {
    if (page >= 1 ) {
      loading = true
      currentpage = page;
      await getapi(currentpage);
    }
  }
</script>


{#if loading}
  <!-- Tampilkan spinner atau indikator loading di sini -->
<div style="display:flex;flex-direction:column;justify-content:center;
  margin: 50px;
"
> 
<div class="preloader-wrapper active">
  <div class="spinner-layer spinner-orange-only">
    <div class="circle-clipper left">
      <div class="circle"></div>
    </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>
</div>
<br>
<h5 style="color:white">Sedang Nyari BOKEP ....</h5>
<br>
<p>Jika Terlalu lama bisa refresh kembali atau close buka lagi</p>
</div>


{:else}
<div class="row">
  {#each videos as video (video.id)}
    <div class="col m4 xl4 mb-4 s12">
      <div style="margin:10px;padding: 10px;
      background-color: black;border-radius: 30px;
      " class="z-depth-4">
        <Link class="linkto" to={`/player/${video.id}`}>
          <img src={video.image} alt={video.title} 
          style="width:100%;background-size: cover;border-radius: 30px;"
          />
        <div class="card-body">
          <h6 style="font-weight:bold">{video.title}</h6>

          <div style="display:flex;justify-content:space-evenly;">
             <p class="card-text">Durasi : {video.duration}</p>
          <p class="card-text">Diupload : {video.date_formatted}
         </p>
          </div>
          <p class="card-text">Ditonton : {video.views}</p>

          <div style="display:flex;justify-content: end;">
            <!-- ACTION -->
              <Link to={`/player/${video.id}`} class="waves-effect btn waves-light"
              style="background-color: #fabb0f;color: black;
              border-radius: 30px;
              "
              >
              Nonton
            </Link>
          </div>
        </div>
        </Link>

      </div>
    </div>
  {/each}
</div>
  <div class="row">
    <div style="display:flex;justify-content: space-evenly;">
      <button class="waves-effect btn waves"
      style="background-color:#fabb0f;color: black;" 
       on:click="{() => gotoPage(currentpage - 1)}" disabled="{currentpage === 1}">Previous</button>
    <button on:click="{() => gotoPage(currentpage + 1)}"
      class="waves-effect btn waves"
      style="background-color:#fabb0f;color: black;" 
        >Next</button>
    </div>
  </div>

{/if}

<style>
  
  .spinner-orange-only .circle {
  border-color: #f0e6cc ;
}
</style>
