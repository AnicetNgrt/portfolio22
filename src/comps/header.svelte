<div class="header">
    <div class="content">
        <slot/>
    </div>
</div>

<style lang=sass>
    @import "../styles/helpers.sass"

    @import "../styles/helpers.sass"

    .header   
        z-index: -1
        position: sticky
        top: 0
        height: calc(100vh - 0rem)
        @include for-size(tablet-landscape-up)
            height: calc(100vh - 1rem)
        max-width: 100%
        width: 100%
        padding: 0.2rem

    .content
        width: 100%
        height: 100%
        border: double 0.5rem $c5
</style>