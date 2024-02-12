<script>
  import { onMount } from 'svelte';
 import {BASE_API} from '../../base/domain.js'
  import Swal from 'sweetalert2';
  import {f_indo} from '../../configapi/api.js'
  import {Link} from 'svelte-navigator'
  let videos = []
 let loading = true;

 
  let currentpage = 1

const url  = BASE_API + "/film?kode_film=" + f_indo

async function getapi(){
    const response = await fetch(`${url}`);
    const data = await response.json();
    videos = data.videos;
     loading = false;
  }

  onMount(async () => {
    await getapi()
  });
async function tambahbokep(){
    const response = await fetch(`${url}`);
    const data = await response.json();
    videos = [...videos, ...data.videos];
      Swal.fire({
      icon: 'success',
      title: 'GW Tambahin Bokep Lagi . Biar GACENG',
      position: 'top-end', // Set the position to top-end
      showConfirmButton: false, // Hide the "OK" button
      timer: 2000 
    });
  }
  

  async function gotoPage(page) {
    if (page >= 1 ) {
      currentpage = page;
      await tambahbokep();
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
<h5 >Sedang Nyari BOKEP ....</h5>
<br>
<p>Jika Terlalu lama bisa refresh kembali atau close buka lagi</p>
</div>


{:else}
<div class="row g-0">
  {#each videos as video (video.id)}
    <div class="col-6 col-md-4 col-lg-3 col-sm-6">
      <div  class=" card shadow">
          <img src={video.image} alt={video.title} 
          style="width:100%;background-size: cover;
          width: 100%;"
          />
        <div class="container">
          <h6 style="font-weight:bold;color:#b00c50;font-size: 14px">{video.title.length > 40 ? `${video.title.slice(0, 40)}...` : video.title}</h6>

          <div >
             <p>{video.duration}</p>
          <p style="color:#b00c50;font-weight: bold">{video.date_formatted}
         </p>
          </div>
             <p >Ditonton : {video.views}</p>


          <div style="display:flex;justify-content: end;">
            <!-- ACTION -->
              <Link to={`/player/${video.id}`} class="waves-effect btn waves-light"
              style="background-color: #b00c50;color:white;
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
    <div style="display:flex;justify-content: center;margin-top: 20px">
    <button on:click="{() => gotoPage(currentpage + 1)}"
      class="waves-effect btn waves zoom-in-out "
      style="background-color:#fabb0f;color: black;" 
        >Tambah Bokep BANG</button>
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
.zoom-in-out {
    animation: zoomInOut 1.5s infinite alternate; /* Adjust the animation duration as needed */
    transform-origin: center;
  }

  @keyframes zoomInOut {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }
</style>
