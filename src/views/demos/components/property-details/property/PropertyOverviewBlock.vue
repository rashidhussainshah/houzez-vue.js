<template>
    <div class="property-overview-wrap property-section-wrap" id="property-overview-wrap">
        <div class="block-wrap">
            <div class="block-title-wrap d-flex justify-content-between align-items-center">
                <h2>{{ $t('Overview') }}</h2>
                <div><strong>{{ $t('Property ID') }}:</strong> {{ $filters.capitalize(property.property_id) }}</div>
            </div><!-- block-title-wrap -->
            <div class="d-flex property-overview-data">
                <ul class="list-unstyled flex-grow-1">
                    <li><strong>{{ $filters.capitalize(property.type) }}</strong></li>
                    <li class="property-overview-type">{{ $t('Type') }}</li>

                </ul>
                <ul class="list-unstyled flex-fill"> 
                    <li class="property-overview-item">
                        <i class="houzez-icon icon-bathroom-shower-1 mr-1"></i>
                        <strong>{{ property.bedrooms }}</strong>
                    </li>
                    <li class="h-beds">{{ $t('Bedrooms') }}</li>
                </ul>
                <ul class="list-unstyled flex-fill">
                    <li class="property-overview-item">
                        <i class="houzez-icon icon-bathroom-shower-1 mr-1"></i>
                        <strong>{{ property.bathrooms }}</strong>
                    </li>
                    <li class="h-baths">{{ $t('Bathrooms') }}</li>
                </ul>
                <ul class="list-unstyled flex-fill">
                    <li class="property-overview-item">
                        <i class="houzez-icon icon-car-1 mr-1"></i>
                        <strong>{{ property.garages }}</strong>
                    </li>
                    <li class="h-area">{{ $t('Garage') }}</li>
                </ul>
                <ul class="list-unstyled flex-fill">
                    <li class="property-overview-item">
                        <i class="houzez-icon icon-real-estate-dimensions-plan-1 mr-1"></i>
                        <strong>{{ property.area_size }}</strong>
                    </li>
                    <li class="h-area">{{ $t('Area Sq Ft') }}</li>
                </ul>   
                <ul class="list-unstyled flex-fill">
                    <li class="property-overview-item">
                        <i class="houzez-icon icon-real-estate-dimensions-map mr-1"></i>
                        <strong>{{ property.land_area }}</strong>
                    </li>
                    <li class="h-area">{{ $t('Lot Sq Ft') }}</li>
                </ul>
                <ul class="list-unstyled flex-fill">
                    <li class="property-overview-item">
                        <i class="houzez-icon icon-calendar-3 mr-1"></i>
                        <strong>{{ property.year_built }}</strong>
                    </li>
                    <li class="h-area">{{ $t('Year Built') }}</li>
                </ul>
            </div><!-- d-flex -->
        </div><!-- block-wrap -->
    </div><!-- property-overview-wrap -->
</template>

<script setup>

const props = defineProps({
  property: Object
});

</script>