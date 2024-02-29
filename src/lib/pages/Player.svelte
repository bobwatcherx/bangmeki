<script>
  export let id;
  import { onMount } from 'svelte';
  import { Link,navigate } from 'svelte-navigator';
 	import {
 		BASE_netlify,
 		BASE_DOMAIN,
 		shortlink,
 		key_api,
 		f_indo,
 		f_jepang,
 	total_folder_indo,
    total_folder_jepang
} from '../../base/domain.js'
  import { genreList } from '../../base/domain.js';
 	import Swal from 'sweetalert2';

  let loading = true;
  let relatedVideos = [];
  let currentpage = 1
  function setRandomFolderId() {
        const randomIndex = Math.floor(Math.random() * genreList.length);
        let resrandom = Object.values(genreList[randomIndex])[0];
        return resrandom;
    }

  let selectedGenre = setRandomFolderId(); 

  async function related() {
  loading = true; 
    let url = BASE_netlify + "/poop_byfolder";
    if (selectedGenre != "") {
       if (selectedGenre == f_indo) {
        currentpage = Math.floor(Math.random() * total_folder_indo) + 1;
    } else if (selectedGenre == f_jepang) {
        currentpage = Math.floor(Math.random() * total_folder_jepang) + 1;
    }
      url += `?fld_id=${selectedGenre}&page=${currentpage}&limit=50&key=${key_api}`;
    }
  try {
    const response = await fetch(url); 
    const data = await response.json();
    relatedVideos = data.videos;
  } catch (error) {
    console.error("Gagal mengambil video terkait:", error);
  } finally {
    loading = false; 
  }
}


  onMount(() => {
  setRandomFolderId()
    related();
  });

  function gotopage(myid) {
    id = myid;
    related();
  }

function opentutor() {
    Swal.fire({
      title: 'Tutorial Download BOKEP',
      html: `
      <div>
      <p style="font-weight:bold;color:red">Lu back aja Terus Setiap ada iklan </p>
      <video controls width="100%" autoplay="true" src="https://cdn.videy.co/8gbloQTg.mp4"></video>
      </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
    });
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

<div>
	<div class="container" style="margin-top: 10px;">
	<div style="display:flex;justify-content:space-between;">
		<button on:click={()=>navigate("/")} class="waves-effect btn "
	style="background-color: #b00c50;color:white;font-weight: bold;"
	>
		Kembali
	</button>
	
	<Link to="/tonton" class="waves-effect btn "
	style="background-color: blue;font-weight: bold;color:white"
	>
		Tonton nanti
	</Link>

	<Link to="/caribokep" class="waves-effect btn "
	style="background-color: #b00c50;font-weight: bold;color:white"
	>
		Cari Bokep
	</Link>
	</div>
</div>
	<div style="margin-top:10px">
		<iframe src={`${BASE_DOMAIN}/e/${id}`}
		allowfullscreen width="100%" height="330px"
		allowscrolling="no" 
		></iframe>
	</div>

	<!-- TOMBOL DOWNLOAD -->
	<div style="margin:10px">
		<a 
		 href={`https://cuty.io/quick?token=${shortlink}&url=${BASE_DOMAIN}/d/${id}`}
		 target="_blank"
		class="waves-effect btn"
		style="width: 100%;
		background-color: #b00c50;color:white;font-weight: bold;
		"> Download Bokep Disini </a>

		<!-- TUTOR -->
		<div class="mt-2 mb-2">
		<button class="btn btn-danger"
		on:click={opentutor}
		>Tutor Cara Download BOKEP</button>
		</div>
		<p style="color:red;font-weight: bold;
		text-align: center;background-color: white;
		">Lewatin Iklannya Kalo Mau download bokep</p>
	</div>

	<!-- RELATED -->
	<div class="container">
		<h5 style="font-weight:bold;color: white;">Video Lainnya</h5>
	</div>

		<div id="related" >
	{#if loading}
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
	<div class="container">
		<h4>Bokep Montok lainnya</h4>
	</div>
	  <div class="row g-0">
	  		{#each relatedVideos as video (video.id)}
	    <div class="col-6 col-md-4 col-lg-3 col-sm-6" >
	      <div class="card shadow" >
	        <div >
	          <img src={video.image} alt={video.title} style="width:100%;background-size:cover;">
	        </div>
	        <div  class="container">
	           <h6 style="font-weight:bold;color:#b00c50;font-size: 14px">{video.title.length > 40 ? `${video.title.slice(0, 40)}...` : video.title}</h6>
	          
	          <div >
	          <p style="color:#b00c50;font-weight: bold"> {video.date_formatted}</p>
	          </div>
	        </div>
	        <div style="display:flex;justify-content: space-around;">
            	<button class="btn waves-effect blue" style="background-color: blue;color:white;"
              on:click={simpanbokep(video)}
              >Simpan</button>

              <button on:click={()=>gotopage(video.id)} class="waves-effect btn waves-light"
              style="background-color: #b00c50;color:white;
              "
              >
              Nonton
            </button>
          </div>
	      </div>
	    </div>
	  {/each}
	  </div>
	 {/if}
	</div>
</div>

<style>
  
  .spinner-orange-only .circle {
  border-color: #f0e6cc ;
}
.row .col-6{
  margin:0px ;
  padding: 0px;
}
</style>
