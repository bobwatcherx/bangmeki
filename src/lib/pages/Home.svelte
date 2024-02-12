<script >
import Semua from '../component/Semua.svelte' 
import Indo from '../component/Indo.svelte' 
import Jepang from '../component/Jepang.svelte' 
import {Link} from 'svelte-navigator' 

 let activeTab = 1; // Menentukan tab aktif secara default

  function setActiveTab(tabNumber) {
    activeTab = tabNumber;
  }

</script>


<div>
<div class="container mt-2">
  <h5>Pilih Genre Bokep</h5>
</div>
<div class="tab-container" style="margin:10px">
  <div class="tab " on:click={() => setActiveTab(1)}>Semua</div>
  <div class="tab " on:click={() => setActiveTab(2)}>INDO</div>
  <div class="tab" on:click={() => setActiveTab(3)}>Jepang</div>

</div>
  
<div style="margin:10px;">
  <Link to="/caribokep" class="btn shadow"
    style="width: 100%;background-color: #b00c50;color:white;font-weight: bold;margin-bottom: 20px"
  >Cari BOKEP Lu Mau</Link>

 
</div>

	<div class="content">
    {#if activeTab === 1}
  <div style="margin:10px">
    <h5 style="color:#ab074b;font-weight: bold;">Semua Bokep Paling MONTOK</h5>
  </div>
    <Semua />
  {:else if activeTab === 2}
  <div style="margin:10px">
  	<h5 style="color:#ab074b;font-weight: bold;">Bokep Indo</h5>
  </div>
    <Indo />
  {:else if activeTab === 3}
     <div style="margin:10px">
    <h5 style="color:#b00c50;font-weight: bold;">Bokep Jepang</h5>
  </div>
    <Jepang />
  <!-- Tambahkan blok lain untuk komponen tambahan -->
  {/if}
</div>
</div>

<style>
  .tab-container {
    display: flex;
    overflow-x: auto; /* Aktifkan scroll horizontal */
    white-space: nowrap; /* Hindari wrapping ke baris berikutnya */
  }

  .tab {
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    font-weight: bold;
  }

  

  .content {
    width: 100%; /* Pastikan konten memenuhi lebar */
  }
</style>