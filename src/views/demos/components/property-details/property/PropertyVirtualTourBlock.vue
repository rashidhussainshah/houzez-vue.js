<template>
    <div class="property-virtual-tour-wrap property-section-wrap" id="property-virtual-tour-wrap">
	<div class="block-wrap">
		<div class="block-title-wrap d-flex justify-content-between align-items-center">
			<h2>{{ $t('360° Virtual Tour') }}</h2>
		</div><!-- block-title-wrap -->
		<div class="block-content-wrap">
			<div class="block-virtual-video-wrap">
				<!-- Copy & Pasted from YouTube -->
				<!-- <iframe width="853" height="480" src="https://my.matterport.com/show/?m=zEWsxhZpGba&play=1&qs=1" frameborder="0" allowfullscreen="allowfullscreen"></iframe> -->
				 <div class="block-video-wrap" v-html="iframeCode"></div>
			</div>
		</div><!-- block-content-wrap -->
	</div><!-- block-wrap -->
</div><!-- property-virtual-tour-wrap -->
</template>

<script>
export default {
    props: {
        iframeCode: {
            type: String,
            required: true
        }
    }
};
</script>