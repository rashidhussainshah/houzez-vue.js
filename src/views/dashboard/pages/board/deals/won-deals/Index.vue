<template>
  <DashboardHeader :heading="$t('Won Deals')">
    <router-link :to="{name:'dashboard.create-deal'}" class="btn btn-primary">{{$t('Add New Deal')}}</router-link>
  </DashboardHeader>

  <section class="dashboard-content-wrap">
    <div class="deals-table-wrap">
      <NavPills tab="won"/>
      <NoDataMsg msg="You don't have any active deal yet!" v-if="wonDeals.length < 1"/>
      <template v-else>
        <div class="deal-content-wrap p-0">
          <Table
              :deals="wonDeals"
              :loading="loading"
              @delete-deal="(id) => deleteDeal(id)"
          />
        </div>
      </template>
    </div>
  </section>
</template>
<script setup>
import {onMounted, ref} from 'vue';
import {useConfirm, useDeal, useMessage, useNotification} from '@/stores/index.js';
import NavPills from "@/views/dashboard/pages/board/deals/components/NavPills.vue";
import {storeToRefs} from "pinia";
import Table from "@/views/dashboard/pages/board/deals/components/Table.vue";

const dealStore = useDeal();
const {wonDeals} = storeToRefs(dealStore);

const loading = ref(false);

const getDeals = async () => {
  loading.value = true;
  await dealStore.getWonDeals();
  loading.value = false;
}

const deleteDeal = async (id) => {
  useConfirm().Warning("Are you sure you want to delete this deal?")
      .then(async () => {
        try {
          const res = await dealStore.deleteDeal(id);

          if (res.status === 200) {
            useNotification().Success("Successfully deleted deal");
            await getDeals();
          } else {
            useNotification().Error(`Failed to delete deal`);
          }
        } catch (error) {
          useNotification().Error(`An error occurred ${error}`);
        }
      })
      .catch(() => {
        useMessage().Info("Request cancelled.")
      });

}

onMounted(() => getDeals())
</script>


