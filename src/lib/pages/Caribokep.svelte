<script>
  import { onMount ,afterUpdate} from 'svelte';
 import {BASE_netlify,key_api} from '../../base/domain.js'
  import Swal from 'sweetalert2';
  import {Link,navigate} from 'svelte-navigator'
  let videos = []
 let loading = true;
 let searchTitle = "sextb"
 
  let currentpage = 1
  let selectedOption = "100";

  const options = [50, 100, 300,500];
const url  = BASE_netlify + "/poop_cari" 

async function getapi(page){
  loading = true
   let searchTerm = searchTitle; 
    if(searchTerm == ""){
      searchTerm = "sextb"
    }
    const response = await fetch(`${url}?title=${searchTitle}&page=${page}&limit=${selectedOption}`);
    const data = await response.json();
    videos = data.videos;
     loading = false;
  }

  onMount(async () => {
    await getapi(currentpage)
  });


  async function gotoPage(page) {
    if (page >= 1 ) {
      loading = true
      currentpage = page;
      await getapi(currentpage);
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


<!-- CARI -->
<div class="container " style="margin:20px">
  <button on:click={()=>navigate(-1)}
    class="btn" 
    style="background-color: #ff8c08;color:black;"
    >Kembali</button>
    <Link to="/tonton" class="waves-effect btn "
  style="background-color: blue;font-weight: bold;color:white"
  >
    Tonton nanti
  </Link>

</div>
<div style="margin:30px">
  <p style="font-size:15px;font-weight: bold;">Lu cari bokep yang lu mau disini</p>
  <input type="text" 
  bind:value={searchTitle}
  name="" style="padding:3px;width: 100%;"
  placeholder="cari bokep lu mau disini bos" 
  >
  <span >Pilih banyak Bokep : </span>
  <select bind:value={selectedOption}>
    {#each options as option}
      <option value={option}>{option + ' Bokep'}</option>
    {/each}
  </select>
  <br>
  <button class="btn btn-success mt-2" 
  style="font-weight:bold" 
  type="button"
  on:click={()=>getapi(currentpage)}
  >Cari bokep Sekarang</button>
</div>

<div class="container">
  <h5 style="font-weight: bold">Bokep Jepang Terbaru</h5>
</div>
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
<h5 >Sedang NYARI BOKEP YG LU MAU ....</h5>
<br>
<p>Jika Terlalu lama bisa refresh kembali atau close buka lagi</p>
</div>


{:else}
<div class="row g-0 mb-2">
  {#each videos as video (video.id)}
    <div class="col-6 col-md-3 col-lg-3 col-sm-6">
      <div class="card shadow">
          <img src={video.image} alt={video.title} 
          style="width:100%;background-size: cover;"
          />
        <div class="card-body">
          <h6 style="font-weight:bold;color:#b00c50;font-size: 14px">{video.title.length > 40 ? `${video.title.slice(0, 40)}...` : video.title}</h6>
          <div >
          <p class="card-text"  style="color:#b00c50;font-weight: bold">{video.date_formatted}
         </p>
          </div>


          <div style="display:flex;justify-content: space-around;">
            <!-- ACTION -->
            <button class="btn waves-effect blue" style="background-color: blue;color:white;"
              on:click={simpanbokep(video)}
              >Simpan</button>
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
