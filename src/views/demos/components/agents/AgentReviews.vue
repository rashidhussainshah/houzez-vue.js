<template>
    <div class="property-review-wrap property-section-wrap" id="property-review-wrap">
        <div class="block-title-wrap review-title-wrap d-flex align-items-center">
            <h2>{{ props.reviews.length }} {{ $t('Reviews') }}</h2>
            <OverallRating :value="averageRating" />
            <!-- <ReviewsSortBy /> -->
            <a class="btn btn-primary btn-slim" href="#property-review-form">{{ $t('Leave a Review') }}</a>
        </div>

        <ul class="review-list-wrap list-unstyled">
            <Review v-for="(review, index) in paginatedReviews" :key="index" :review="review" />
        </ul>

        <div class="pagination-wrap" v-if="totalPages > 1">
            <nav>
                <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="goToPage(currentPage - 1)">
                    <i class="houzez-icon icon-arrow-left-1"></i>
                    </a>
                </li>
                <li
                    v-for="page in totalPages"
                    :key="page"
                    class="page-item"
                    :class="{ active: page === currentPage }"
                >
                    <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="goToPage(currentPage + 1)">
                    <i class="houzez-icon icon-arrow-right-1"></i>
                    </a>
                </li>
                </ul>
            </nav>
        </div>

        <div class="block-wrap" id="property-review-form">
            <div class="block-title-wrap">
                <h3>{{ $t('Leave a Review') }}</h3>
            </div><!-- block-title-wrap -->
            <div class="block-content-wrap">
                <!-- Error Alert -->
                <div v-if="errors?.data?.errors && Object.keys(errors.data.errors).length"
                    class="alert alert-danger alert-dismissible fade show" role="alert">
                    <ul>
                        <li v-for="(error, key) in errors.data.errors" :key="key">
                            {{ error[0] }}
                        </li>
                    </ul>
                    <button type="button" class="close" @click="errors = {}">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!-- alert -->
                <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ successMessage }}
                    <button type="button" class="close" @click="successMessage = ''">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!-- alert -->
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>{{ $t('Title') }}</label>
                            <input class="form-control" :placeholder="$t('Enter a title')" type="text" v-model="form.title">
                        </div>
                    </div><!-- col-md-6 col-sm-12 -->
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>{{ $t('Rating') }}</label>
                            <select class="form-control" v-model="form.rating">
                                <option disabled value="">{{ $t('Select a rating') }}</option>
                                <option value="1">{{ $t('1 Star - Poor') }}</option>
                                <option value="2">{{ $t('2 Star - Fair') }}</option>
                                <option value="3">{{ $t('3 Star - Average') }}</option>
                                <option value="4">{{ $t('4 Star - Good') }}</option>
                                <option value="5">{{ $t('5 Star - Excellent') }}</option>
                            </select><!-- selectpicker -->
                        </div>
                    </div><!-- col-md-6 col-sm-12 -->
                    
                    <div class="col-sm-12 col-xs-12">
                        <div class="form-group form-group-textarea">
                            <label>{{ $t('Review') }}</label>
                            <textarea class="form-control" rows="5" :placeholder="$t('Write a review')"
                                v-model="form.comment"></textarea>
                        </div>
                    </div><!-- col-sm-12 col-xs-12 -->
                    <div class="col-sm-12 col-xs-12">
                        <button class="btn btn-secondary btn-sm-full-width" @click.prevent="submitReview">
                            <span v-if="loading">{{ $t('Submitting') }}...</span>
                            <span v-else>{{ $t('Submit') }}</span>
                        </button>
                    </div><!-- col-sm-12 col-xs-12 -->
                </div><!-- row -->
            </div><!-- block-content-wrap -->
        </div><!-- block-wrap -->
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import OverallRating from '../../components/property-details/property/template/OverallRating.vue';
import ReviewsSortBy from '../../components/property-details/property/template/ListingSortBy.vue';
import Review from '../../components/property-details/property//template/Review.vue';
import { useAgent } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
     reviews: {
    type: Array,
    required: true,
    default: () => []
  },
  agent: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const averageRating = computed(() => {
  if (!props.reviews.length) return 0;
  const total = props.reviews.reduce((sum, review) => sum + review.rating, 0);
  return parseFloat((total / props.reviews.length).toFixed(1)); // ✅ fixed
});

// Store
const reviewStore = useAgent();
const { reviews, errors, loading } = storeToRefs(reviewStore);

// Success message
const successMessage = ref('');

// Review form data
const form = ref({
    agent_id: props.agent.id,
    title: '',
    rating: '',
    comment: ''
});


// Submit review
const submitReview = async () => {
    successMessage.value = '';
    reviewStore.errors = {};
    reviewStore.loading = true;

    try {
        await reviewStore.addReview(form.value);

        const hasErrors = Object.keys(reviewStore.errors.value?.data?.errors || {}).length > 0;

        if (!hasErrors) {
            successMessage.value = t('Your review has been submitted');

            form.value = {
                agent_id: props.agent.id,
                title: '',
                rating: '',
                comment: ''
            };
        }
    } catch (error) {
        // Error already stored in store
    } finally {
        reviewStore.loading = false;
    }
};


// 👉 Pagination Logic
const currentPage = ref(1);
const perPage = 4;

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return props.reviews.slice(start, end); // ✅ from props
});

const totalPages = computed(() => {
  return Math.ceil(props.reviews.length / perPage); // ✅ from props
});

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
</script>