/**
 * @fileOverview List of route configurations for the application.
 *
 * @description Contains route definitions for various views and components.
 *
 * @feature Includes metadata for authentication requirements, titles, and other settings.
 * @feature Used to define the navigation structure and dynamic component imports.
 *
 * @author https://webpenter.com
 * @date 15 Dec,2024
 */

import { createRouter, createWebHistory } from 'vue-router';
import {DEFAULT_TITLE} from "@/constants";
import {useToken} from "@/stores/index.js";

const routes = [
    /***
     * @route 'localhost:3000/'
     * @name app
     * @prefix app
     * @auth not-required
     ***/
    {
        path: '/',
        name:'app',
        redirect:'/',
        component:() => import('@/views/app/layout/Index.vue'),
        children:[
            /***
             * @route App/Home
             ***/
            {
                path: '/',
                name:'app.home',
                component:() => import('@/views/app/pages/home/Index.vue'),
                meta:{ title:'Home' }
            },

            /***
             * @route App/Add-New-Property
             ***/
            {
                path: '/add-new-property',
                name:'app.add-new-property',
                component:() => import('@/views/app/pages/add-new-property/Index.vue'),
                meta:{ title:'Add Property' }
            },

            /***
             * @route App/Properties
             ***/
            {
                path: '/properties',
                name:'app.properties',
                component:() => import('@/views/app/pages/properties/Index.vue'),
                meta:{ title:'Properties' }
            },

            /***
             * @route App/Property
             ***/
            {
                path: '/property',
                name:'app.property',
                component:() => import('@/views/app/pages/property/Index.vue'),
                meta:{ title:'Property' }
            },

            /***
             * @route App/Realtor
             ***/
            {
                path: '/realtor',
                name:'app.realtor',
                component:() => import('@/views/app/pages/realtor/Index.vue'),
                meta:{ title:'Realtor' }
            },

            /***
             * @route App/Search-Results
             ***/
            {
                path: '/search-results',
                name:'app.search-results',
                component:() => import('@/views/app/pages/search-results/Index.vue'),
                meta:{ title:'Search Results' }
            },
            /***
             * @route App/Search-Results
             ***/
            {
                path: '/search-results',
                name:'app.search-results',
                component:() => import('@/views/app/pages/search-results/Index.vue'),
                meta:{ title:'Search Results' }
            },
            /***
             * @route App/Register
             ***/
            {
                path: '/register',
                name:'app.register',
                component:() => import('@/views/app/pages/auth/register/Index.vue'),
                meta:{ title:'Register', guest:true }
            },
            /***
             * @route App/Login
             ***/
            {
                path: '/login',
                name:'app.login',
                component:() => import('@/views/app/pages/auth/login/Index.vue'),
                meta:{ title:'Login', guest:true }
            },
        ]
    },

    /***
     * @route 'localhost:3000/dashboard/'
     * @name dashboard
     * @prefix dashboard
     * @auth required
     ***/
    {
        path: '/dashboard',
        name:'dashboard',
        redirect:'/dashboard/crm',
        meta: { auth: true },
        component:() => import('@/views/dashboard/layout/Index.vue'),
        children:[
            /***
             * @route Dashboard/Board-CRM
             * @route Dashboard/Board-CRM-Active-Deals
             * @route Dashboard/Board-CRM-Enquiries
             * @route Dashboard/Board-CRM-Leads
             ***/
            {
                path: '/dashboard/crm',
                name:'dashboard.crm',
                component:() => import('@/views/dashboard/pages/board/crm/Index.vue'),
                meta:{ title:'Activities' }
            },
            {
                path: '/dashboard/crm-deals',
                name:'dashboard.crm-deals',
                component:() => import('@/views/dashboard/pages/board/crm-deals/Index.vue'),
                meta:{ title:'Deals' }
            },
            {
                path: '/dashboard/crm-won-deals',
                name: 'dashboard.won-deals',
                component: () => import('@/views/dashboard/pages/board/crm-deals/won-deals/Index.vue'),
                meta: { title: 'Won Deals' }
            },
            {
                path: '/dashboard/crm-lost-deals',
                name: 'dashboard.lost-deals',
                component: () => import('@/views/dashboard/pages/board/crm-deals/lost-deals/Index.vue'),
                meta: { title: 'Lost Deals' }
            },
            {
                path: '/dashboard-import-csv',
                name: 'dashboard.importCsv',
                component: () => import('@/views/dashboard/pages/board/crm-deals/ImportCsv.vue'),
                meta: { title: 'Import Csv' }
            },
            {
                path: '/dashboard/crm-enquiries',
                name:'dashboard.crm-enquiries',
                component:() => import('@/views/dashboard/pages/board/crm-enquiries/Index.vue'),
                meta:{ title:'Enquiries' }
            },
            {
                path: '/dashboard/crm-lead-enquiry-from-property-detail-page',
                name: 'dashboard.crm-lead-enquiry-from-property-detail-page',
                component: () => import('@/views/dashboard/pages/board/crm-enquiries/CrmLeadEnquiryFromPropertyDetailPage.vue'),
                meta: { title: 'Enquiries Details' }
            },

            {
                path: '/dashboard/crm-leads',
                name: 'dashboard.crm-leads',
                component: () => import('@/views/dashboard/pages/board/crm-leads/Index.vue'), // Default view
                meta: { title: 'Leads' }
            },
            {
                path: '/dashboard/crm-lead-enquiries',
                name: 'dashboard.crm-lead-enquiries',
                component: () => import('@/views/dashboard/pages/board/crm-leads/CrmLeadEnquiries.vue'), // Enquiries view
                meta: { title: 'Lead Enquiries' }
            },
            {
                path: '/dashboard/crm-lead-events',
                name: 'dashboard.crm-lead.events',
                component: () => import('@/views/dashboard/pages/board/crm-leads/CrmLeadEvents.vue'),
                meta: { title: 'Lead Events' }
            },
            {
                path: '/dashboard/crm-lead-listings-viewed',
                name: 'dashboard.crm-lead.listings-viewed',
                component: () => import('@/views/dashboard/pages/board/crm-leads/CrmLeadListingsViewed.vue'),
                meta: { title: 'Lead Listings Viewed' }
            },
            {
                path: '/dashboard/crm-lead-saved-searches',
                name: 'dashboard.crm-lead-saved-searches',
                component: () => import('@/views/dashboard/pages/board/crm-leads/CrmLeadSavedSearches.vue'),
                meta: { title: 'Lead Saved Searches' }
            },


            /* ---------------- Insight ------------------ */
            {
                path: '/dashboard/insight',
                name:'dashboard.insight',
                component:() => import('@/views/dashboard/pages/insight/Index.vue'),
                meta:{ title:'Insight' }
            },

            /***
             * @route Dashboard/My-Properties
             * @route Dashboard/Published-Properties
             * @route Dashboard/Pending-Properties
             * @route Dashboard/Expired-Properties
             * @route Dashboard/Draft-Properties
             * @route Dashboard/Hold-Properties
             * @route Dashboard/Disapproved-Properties
             ***/
            {
                path: '/dashboard/my-properties',
                name:'dashboard.my-properties',
                component:() => import('@/views/dashboard/pages/my-properties/all/Index.vue'),
                meta:{ title:'My Properties' }
            },
            {
                path: '/dashboard/my-properties/published',
                name:'dashboard.my-properties.published',
                component:() => import('@/views/dashboard/pages/my-properties/published/Index.vue'),
                meta:{ title:'Published Properties' }
            },
            {
                path: '/dashboard/my-properties/pending',
                name:'dashboard.my-properties.pending',
                component:() => import('@/views/dashboard/pages/my-properties/pending/Index.vue'),
                meta:{ title:'Pending Properties' }
            },
            {
                path: '/dashboard/my-properties/expired',
                name:'dashboard.my-properties.expired',
                component:() => import('@/views/dashboard/pages/my-properties/expired/Index.vue'),
                meta:{ title:'Expired Properties' }
            },
            {
                path: '/dashboard/my-properties/draft',
                name:'dashboard.my-properties.draft',
                component:() => import('@/views/dashboard/pages/my-properties/draft/Index.vue'),
                meta:{ title:'Draft Properties' }
            },
            {
                path: '/dashboard/my-properties/hold',
                name:'dashboard.my-properties.hold',
                component:() => import('@/views/dashboard/pages/my-properties/hold/Index.vue'),
                meta:{ title:'Hold Properties' }
            },
            {
                path: '/dashboard/my-properties/disapproved',
                name:'dashboard.my-properties.disapproved',
                component:() => import('@/views/dashboard/pages/my-properties/disapproved/Index.vue'),
                meta:{ title:'Disapproved Properties' }
            },

            /***
             * @route Dashboard/Create-Listing/Get-Package
             * @route Dashboard/Create-Listing/Select-Package
             * @route Dashboard/Create-Listing/Payment-Complete-Order
             * @route Dashboard/Create-Listing/Payment-Create-Account
             * @route Dashboard/Create-Listing/Payment-Completed
             * @route Dashboard/Create-Listing/Step-1 to Step-12
             * @route Dashboard/Create-Listing/Listing-Done
             ***/
            {
                path: '/dashboard/create-listing/get-package',
                name:'dashboard.create-listing.get-package',
                component:() => import('@/views/dashboard/pages/create-listing/package/get-package/Index.vue'),
                meta:{ title:'Get Package' }
            },
            {
                path: '/dashboard/create-listing/select-package',
                name:'dashboard.create-listing.select-package',
                component:() => import('@/views/dashboard/pages/create-listing/package/select-package/Index.vue'),
                meta:{ title:'Select Package' }
            },
            {
                path: '/dashboard/create-listing/complete-order',
                name:'dashboard.create-listing.complete-order',
                component:() => import('@/views/dashboard/pages/create-listing/payment/complete-order/Index.vue'),
                meta:{ title:'Complete Order' }
            },
            {
                path: '/dashboard/create-listing/create-account',
                name:'dashboard.create-listing.create-account',
                component:() => import('@/views/dashboard/pages/create-listing/payment/create-account/Index.vue'),
                meta:{ title:'Create Account' }
            },
            {
                path: '/dashboard/create-listing/payment-completed',
                name:'dashboard.create-listing.payment-completed',
                component:() => import('@/views/dashboard/pages/create-listing/payment/payment-completed/Index.vue'),
                meta:{ title:'Create Account' }
            },
            {
                path: '/dashboard/create-listing/step-1',
                name:'dashboard.create-listing.step-1',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-1/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-2',
                name:'dashboard.create-listing.step-2',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-2/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-3',
                name:'dashboard.create-listing.step-3',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-3/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-4',
                name:'dashboard.create-listing.step-4',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-4/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-5',
                name:'dashboard.create-listing.step-5',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-5/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-6',
                name:'dashboard.create-listing.step-6',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-6/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-7',
                name:'dashboard.create-listing.step-7',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-7/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-8',
                name:'dashboard.create-listing.step-8',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-8/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-9',
                name:'dashboard.create-listing.step-9',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-9/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-10',
                name:'dashboard.create-listing.step-10',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-10/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-11',
                name:'dashboard.create-listing.step-11',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-11/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/step-12',
                name:'dashboard.create-listing.step-12',
                component:() => import('@/views/dashboard/pages/create-listing/create-listing/step-12/Index.vue'),
                meta:{ title:'Create Listing' }
            },
            {
                path: '/dashboard/create-listing/completed',
                name:'dashboard.create-listing.completed',
                component:() => import('@/views/dashboard/pages/create-listing/completed/Index.vue'),
                meta:{ title:'Create Listing' }
            },

            /***
             * @route Dashboard/Favorite-Properties
             ***/
            {
                path: '/dashboard/favorite-properties',
                name:'dashboard.favorite-properties',
                component:() => import('@/views/dashboard/pages/favorite-properties/Index.vue'),
                meta:{ title:'Favorite Properties' }
            },

            /***
             * @route Dashboard/Saved-Searches
             ***/
            {
                path: '/dashboard/saved-searches',
                name:'dashboard.saved-searches',
                component:() => import('@/views/dashboard/pages/saved-searches/Index.vue'),
                meta:{ title:'Saved Searches' }
            },

            /***
             * @route Dashboard/Invoices
             ***/
            {
                path: '/dashboard/invoices',
                name:'dashboard.invoices',
                component:() => import('@/views/dashboard/pages/invoices/Index.vue'),
                meta:{ title:'Invoices' }
            },

            /***
             * @route Dashboard/Messages
             ***/
            {
                path: '/dashboard/messages',
                name:'dashboard.messages',
                component:() => import('@/views/dashboard/pages/messages/Index.vue'),
                meta:{ title:'Messages' }
            },

            /***
             * @route Dashboard/My-Profile
             ***/
            {
                path: '/dashboard/my-profile',
                name:'dashboard.my-profile',
                component:() => import('@/views/dashboard/pages/my-profile/Index.vue'),
                meta:{ title:'My Profile' }
            },
        ]
    },

    /*** ---------------
     * @route 302-Unauthorized
     ***/
    {
        path: "/unauthorized",
        name: "unauthorized",
        component: () => import('@/components/pages/Unauthorized302.vue'),
        meta: { title: "302 Unauthorized" },
    },
    /*** ---------------
     * @route 403-Unauthorized
     ***/
    {
        path: "/access-denied",
        name: "access-denied",
        component: () => import('@/components/pages/AccessDenied403.vue'),
        meta: { title: "403 Access Denied", auth: true  },
    },
    /*** ---------------
     * @route 404-Page-Not-Found
     ***/
    {
        path: "/:pathMatch(.*)",
        name: "not-found-404",
        component: () => import('@/components/pages/NotFound404.vue'),
        meta: { title: "404 Not Found" },
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior () {
     return { top: 0, behavior: 'smooth' }
  }
});

router.beforeEach((to, from, next) => {
    /**
     * @feature Retrieve the token for authentication from the token store "Pinia"
     **/
    const token = useToken().getToken;
    console.log("Token Val: ", token);

    /**
     * @feature Check if the current route requires authentication but no valid token is present.
     * @feature Redirect to the login page if the route requires authentication and the user is not logged in.
     * @feature Check if the current route is for guest users only, but a valid token exists.
     * @feature Redirect to the "access-denied" if the user is already authenticated and trying to access a guest-only route.
     * @feature Allow navigation to the route if no guard conditions are triggered.
     **/
    if (to.meta.auth && token === null) {
        next({ name: 'app.login' });
    }
    else if (to.meta.guest && token !== null) {
        next({ name: 'access-denied' });
    }
    else {
        next();
    }

    /**
     *  @feature Set the document title dynamically based on the meta property of the current route.
     *  @feature Append a suffix "- baseTitle" if a title is defined in store "Pinia", otherwise fallback to the default title.
     **/
    const baseTitle = 'Houzez' || DEFAULT_TITLE;
    document.title = to?.meta.title ? `${to.meta.title} - ${baseTitle}` : baseTitle;
});

export default router;
