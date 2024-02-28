<script>
    import {Link } from 'svelte-navigator'
    import { genreList } from '../../base/domain.js';
    import Loadfilm from '../component/Loadfilm.svelte';
    import {onMount} from 'svelte'

    function setRandomFolderId() {
        const randomIndex = Math.floor(Math.random() * genreList.length);
        let resrandom = Object.values(genreList[randomIndex])[0];
        return resrandom;
    }

    function handleGenreChange(event) {
        if(event.target.value == ""){
            selectedGenre = setRandomFolderId()
            alert(selectedGenre)
        }
        selectedGenre = event.target.value;
    }


    let selectedGenre = setRandomFolderId(); 

    onMount(()=>{
    setRandomFolderId();
    })
</script>


<div class="mt-2 p-2">
    <Link to="/tonton" class="btn btn-primary">Daftar Nonton nanti</Link>
</div>

<div class="card mt-2 p-2 mb-2 shadow-lg">
    <div class="container">
        <h6 style="font-weight: bold">Pilih Genre Bokep </h6>
        <form>
            {#each genreList as item}
                <div class="form-check" style="display: inline-block; margin-right: 10px;">
                    <input class="form-check-input" type="radio" bind:group={selectedGenre} value={Object.values(item)[0]} on:change={handleGenreChange}>
                    <label class="form-check-label"
                    style="font-weight: bold;" 
                    >{Object.keys(item)[0]}</label>
                </div>
            {/each}
        </form>
    </div>
</div>

<div>
    <Loadfilm folder_id={selectedGenre} />
</div>

<style>
    .form-check {
        white-space: nowrap; 
    }
</style>
