<script lang=ts>
    export let speed: number;
    export let stop: boolean = false
    
    let stopped = false;
    let hovering = false;
    let width: number;
    let height: number;

    let shift = Math.random()*10;
</script>

<div 
    bind:clientWidth={width}
    style={`--shift: ${-shift}%; height: ${height}px; --duration: ${Math.pow(width, 0.001)/((Math.abs(speed)+0.0001)/10)}s; --direction: ${speed < 0 ? "reverse" : "normal"}`} 
    class:stopped={stopped || hovering || stop} 
    on:mouseenter={() => hovering = true} 
    on:mouseleave={() => hovering = false} 
    on:click={() => stopped = !stopped} 
    class="marquee-container"
>
    <div bind:clientHeight={height} class="marquee-a"><slot/></div>
    <div class="marquee-b"><slot/></div>
</div>

<style>
    .marquee-container {
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .stopped .marquee-a {
        animation-play-state: paused;
    }

    .marquee-a {
        position: absolute;
        top: 0;
        left: var(--shift);
        height: fit-content;
        width: max-content;
        animation: scrollNormal var(--duration) linear 0s infinite var(--direction);
    }

    .stopped .marquee-b {
        animation-play-state: paused;
    }

    .marquee-b {
        position: absolute;
        top: 0;
        left: var(--shift);
        height: fit-content;
        width: max-content;
        animation: scrollMirror var(--duration) linear 0s infinite var(--direction);
    }

    @keyframes -global-scrollNormal {
        0% {
            transform: translateX(0%);
        }

        100% {
            transform: translateX(-100%);
        }
    }

    @keyframes -global-scrollMirror {
        0% {
            transform: translateX(100%);
        }

        100% {
            transform: translateX(0%);
        }
    }
</style>