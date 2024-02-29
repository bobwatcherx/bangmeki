<!-- Loadfilm.svelte -->
<script>
  import { onMount } from 'svelte';
  import { 
    BASE_netlify,
    key_api,
    f_indo,
    f_jepang,
    total_folder_indo,
    total_folder_jepang
     } from '../../base/domain.js';
  import Swal from 'sweetalert2';
  import { Link } from 'svelte-navigator';

  let videos = [];
  let loading = true;
  let currentpage = 1
  export let folder_id;



  async function getapi() {
    loading = true
    let url = BASE_netlify + "/poop_byfolder"; 


    if (folder_id != "") {
       if (folder_id == f_indo) {
        currentpage = Math.floor(Math.random() * total_folder_indo) + 1;
    } else if (folder_id == f_jepang) {
        currentpage = Math.floor(Math.random() * total_folder_jepang) + 1;
    }

    }
    url += `?fld_id=${folder_id}&key=${key_api}&page=${currentpage}&limit=50`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    videos = data.videos;
    loading = false;
  }

  onMount(async () => {
    await getapi();
  });

  async function tambahbokep() {
    let url = BASE_netlify + "/poop_byfolder"; 
     if (folder_id != "") {
       if (folder_id == f_indo) {
        currentpage = Math.floor(Math.random() * total_folder_indo) + 1;
    } else if (folder_id == f_jepang) {
        currentpage = Math.floor(Math.random() * total_folder_jepang) + 1;
    }

    }
    url += `?fld_id=${folder_id}&key=${key_api}&page=${currentpage}&limit=50`;
    
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
   $: {
    if (folder_id !== "") {
      getapi()
    }
  }

  function simpanbokep(video) {
    let nontonNanti = JSON.parse(localStorage.getItem('nonton-nanti')) || []; 
    nontonNanti.push(video); 
    localStorage.setItem('nonton-nanti', JSON.stringify(nontonNanti)); 
     Swal.fire({
      toast:true,
      icon: 'success',
      title: 'Berhasil Disimpan Ke nonton nanti',
      position: 'top-center', 
      showConfirmButton: false,
      timer: 2000
    });
  }

</script>

{#if loading}
  <!-- Tampilkan spinner atau indikator loading di sini -->
  <div style="display:flex;flex-direction:column;justify-content:center;margin: 50px;">
    <div class="spinner-border text-danger" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <br>
    <h5>Sedang Nyari BOKEP ....</h5>
    <br>
    <p>Jika Terlalu lama bisa refresh kembali atau close buka lagi</p>
  </div>
{:else}
  <div class="row g-0">
    {#each videos as video }
      <div class="col-6 col-md-4 col-lg-3 col-sm-6">
        <div class="card shadow">
          <img src={video.image} alt={video.title} style="width:100%;background-size: cover;width: 100%;" />
          <div class="container">
            <h6 style="font-weight:bold;color:#b00c50;font-size: 14px">{video.title.length > 40 ? `${video.title.slice(0, 40)}...` : video.title}</h6>
            <div>
              <p style="font-weight: bold">{video.date_formatted}</p>
            </div>
            <div style="display:flex;justify-content: space-between;">
              <button class="btn waves-effect blue" style="background-color: blue;color:white;"
              on:click={simpanbokep(video)}
              >Simpan</button>
              <!-- ACTION -->
              <Link to={`/player/${video.id}`} class="waves-effect btn waves-light" style="background-color: #b00c50;color:white;">Nonton</Link>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <div style="display:flex;justify-content: center;margin-top: 20px">
    <button on:click="{() => tambahbokep()}" class="waves-effect btn waves zoom-in-out" style="background-color:#fabb0f;color: black;">Tambah Bokep BANG</button>
  </div>
{/if}

<style>
  .spinner-orange-only .circle {
    border-color: #f0e6cc;
  }
  .row .col-6 {
    margin:0px;
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
