<template>
    <div class="widget widget-wrap widget-featured-property">
	<div class="widget-header">
		<h3 class="widget-title">
			Featured Properties
		</h3><!-- widget-title -->
	</div><!-- widget-header -->
	<div class="widget-body">
		<FeaturedPropertyItem />
		<FeaturedPropertyItem />
		<FeaturedPropertyItem />
		<FeaturedPropertyItem />
	</div><!-- widget-body -->
</div><!-- widget-featured-property -->
</template>

<script setup>
import FeaturedPropertyItem from './template/FeaturedPropertyItem.vue';
</script>