<template>
    <DashboardHeader heading="My Profile"/>
    <section class="dashboard-content-wrap">
            <div class="dashboard-content-inner-wrap">
                <div class="dashboard-content-block-wrap">
                    <Information/>
                    <SocialMedia/>
                    <ChangePassword/>
                    <DeleteAccount/>
                </div><!-- dashboard-content-block-wrap -->
            </div><!-- dashboard-content-inner-wrap -->
        </section><!-- dashboard-content-wrap -->
</template>

<script setup>
import ChangePassword from './ChangePassword.vue';
import DeleteAccount from './DeleteAccount.vue';
import Information from './Information.vue';
import SocialMedia from './SocialMedia.vue';
</script>