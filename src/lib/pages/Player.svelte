<script>
  export let id;
  import { onMount } from 'svelte';
  import { Link,navigate } from 'svelte-navigator';
  import {base_api,apikey} from '../../configapi/api.js'
  let loading = true;
  let relatedVideos = [];

  let max_page = 900
  
  async function related() {
  const jepang_url = "https://pooptest.vercel.app/film?kode_film=9DVR9eBBSMH";
  const indo_url = "https://pooptest.vercel.app/film?kode_film=ropbn60oORX";
  const page_select = Math.floor(Math.random() * max_page) + 1; // Menghasilkan angka acak antara 1 hingga 46

  loading = true; // Menampilkan indikator loading

  try {
    const selected_url = Math.random() < 0.5 ? indo_url : jepang_url; // Memilih URL secara acak
    const response = await fetch(`${selected_url}&page=${page_select}` ); // Mengambil data dengan URL terpilih dan nomor halaman terpilih
    const data = await response.json();
    relatedVideos = data.videos;
  } catch (error) {
    console.error("Gagal mengambil video terkait:", error);
  } finally {
    loading = false; // Sembunyikan indikator loading setelah data diambil
  }
}


  onMount(() => {
    related();
  });

  function gotopage(myid) {
    id = myid;
    related();
  }
   function handleContextMenu(event) {
    event.preventDefault();
  }
</script>

<div>
	<div class="container" style="margin-top: 10px;">
	<div style="display:flex;justify-content:space-between;">
		<button on:click={()=>navigate(-1)} class="waves-effect btn "
	style="background-color: #e68c07;font-weight: bold;"
	>
		Kembali
	</button>
	<button on:click={()=>navigate(1)} class="waves-effect btn "
	style="background-color: #e68c07;font-weight: bold;"
	>
		Setelahnya
	</button>
	<Link to="/caribokep" class="waves-effect btn "
	style="background-color: #5eff08;font-weight: bold;color:black"
	>
		Cari Bokep
	</Link>
	</div>
</div>
	<div style="margin-top:10px">
		<iframe src={`https://doodss.pro/e/${id}`}
		allowfullscreen width="100%" height="330px"
		allowscrolling="no" 
		></iframe>
	</div>

	<!-- TOMBOL DOWNLOAD -->
	<div style="margin:10px">
		<a 
		 href={`https://cuty.io/quick?token=3c2f8445e662326c2ebcd8d60&url=https://doodss.pro/d/${id}`}
		 target="_blank"
		class="waves-effect btn"
		on:contextmenu="{handleContextMenu}"
		style="width: 100%;
		background-color: #ff6edb;color:black;font-weight: bold;
		"> Download Bokep Disini </a>
		<p style="color:red;font-weight: bold;
		text-align: center;background-color: white;
		">Lewatin Iklan ouo.io Kalo Mau download bokep</p>
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
	  		{#each relatedVideos as video (video.id)}
	    <div class="col-md-4 col-lg-4 col-xs-6" >
	      <div class="card" on:click={()=>gotopage(video.id)}>
	        <div class="card-image">
	          <img src={video.image} alt={video.title} style="width:100%;background-size:cover;">
	        </div>
	        <div class="card-content" style="color:white;background-color:black">
	          <span style="font-size: 15px;font-weight: bold">{video.title}</span>
	          <p>Durasi: {video.duration}</p>
	          
	          <div style="display:flex;justify-content:space-evenly;">
	          	<p>Views: {video.views}</p>
	          <p>Tanggal: {video.date_formatted}</p>
	          </div>
	        </div>
	        <div  style="background-color:#ff9903;padding:10px">
	          <button 
	          style="color: black;font-weight: bold;
	          text-align: center;font-size: 18px;
	          background-color:#ff9903;border:0px;
	          "
	          on:click={()=>gotopage(video.id)}>Nonton Sekarang</button>
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
</style>
