<script>
  import { Link } from 'svelte-navigator';
  let nontonNanti = JSON.parse(localStorage.getItem('nonton-nanti')) || [];
  import Swal from 'sweetalert2';

  function hapusfilm(id) {
    nontonNanti = nontonNanti.filter(video => video.id !== id);
    localStorage.setItem('nonton-nanti', JSON.stringify(nontonNanti));
    Swal.fire({
      icon: 'success',
      title: 'Berhasil Dihapus dari nonton nanti',
      position: 'top-center', 
      showConfirmButton: false,
      timer: 2000
    });
  }
</script>

<div class=" mt-2 mb-3" style="display: flex;justify-content: space-around;">
  <Link to="/" class="btn btn-primary">Kembali</Link>
  <Link to="/caribokep" class="btn btn-secondary">cari Bokep</Link>
</div>

<div class="container">
  <h5>Daftar Bokep Nonton Nanti</h5>
  
</div>
{#if nontonNanti.length > 0}
  <div class="row">
     {#each nontonNanti.slice().reverse() as video}
      <div class="col-6 col-md-4 mb-3 col-sm-6">
        <div class="card">
          <img src={video.image} class="card-img-top" alt={video.title}>
          <div class="card-body">
            <h6 style="font-weight:bold;color:#b00c50;font-size: 14px">{video.title.length > 40 ? `${video.title.slice(0, 40)}...` : video.title}</h6>
            <p style="font-weight: bold">{video.date_formatted}</p>
            <div style="display: flex;justify-content: space-between;">
              <button class="btn btn-danger" on:click={() => hapusfilm(video.id)}>Hapus</button>
              <Link to={`/player/${video.id}`} class="btn btn-primary" style="color:white;">Nonton</Link>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="container">
    <p>Tidak ada bokep yang disimpan untuk ditonton nanti.</p>
  </div>
{/if}

<style>
  .row .col-6 {
    padding: 0px;
    margin:0px;
  }
</style>
