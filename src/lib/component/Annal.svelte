<script>
  import { onMount ,afterUpdate} from 'svelte';
 import {BASE_API} from '../../base/domain.js'
  import {Link} from 'svelte-navigator'
  let videos = []
 let loading = true;

 
 // const url  = "https://corsany-1-g0403094.deta.app/https://poophd.com/api/list?key=raQu2lrd&folder=F0K2rRlBbJF"
 const url  =  BASE_API + "/film?kode_film=F0K2rRlBbJF"



  let currentpage = 1
   async function getapi(page){
    const response = await fetch(`${url}&page=${page}`);
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
<div class="spinner-border text-danger" role="status">
  <span class="sr-only">Loading...</span>
</div>
<br>
<h5 >Sedang NYARI BOKEP ....</h5>
<br>
<p>Jika Terlalu lama bisa refresh kembali atau close buka lagi</p>
</div>


{:else}
<div class="row g-0">
  {#each videos as video (video.id)}
    <div class="col-6 col-md-4 col-lg-4 col-sm-6">
      <div class="card shadow">
          <img src={video.image} alt={video.title} 
          style="width:100%;background-size: cover"
          />
        <div class="card-body">
         <h6 style="font-weight:bold;color:#b00c50;font-size: 14px">{video.title.length > 40 ? `${video.title.slice(0, 40)}...` : video.title}</h6>
          <div >
             <p class="card-text">{video.duration}</p>
          <p class="card-text" style="color:#b00c50;font-weight: bold"> {video.date_formatted}
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
.row .col-6{
  margin:0px ;
  padding: 0px;
}
</style>
