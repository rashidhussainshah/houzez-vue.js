/**
 * @fileOverview This file defines a Pinia store for managing user profile and modification.
 *
 * @feature Store Name: `userProfile`.
 *
 * @export The store is exported as `useProfile` for use in auth user information.
 *
 * @author https://webpenter.com
 * @date 13 Jan,2025
 */

import {defineStore} from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useProfile = defineStore("userProfile", {
    state: () => ({
        profile: {
            user:{},
            profile_picture:{},
            user_information:{},
            social_links:{},
        },
        errors: null,
        baseUrl:'/profile'
    }),

    getters: {
        getProfile: state => {
            return state.profile;
        },
    },

    actions: {
        /**
         * @feature the user's profile information from the server.
         * @returns {Promise<Object>} - Resolves with the server's response containing the user's profile data.Rejects with the server's error response if the request fails.
         */
        async getProfileInfo () {
            try {
                const url = `${this.baseUrl}/get-information`;
                const res = await axiosInstance.get(url);

                this.setProfile(res.data.profile);

                return new Promise(resolve => {
                    return resolve(res);
                })
            } catch (error) {
                if (error.response && error.response.data) {
                    this.errors = error.response;
                }

                return new Promise(reject => {
                    return reject(error.response);
                })
            }
        },

        /**
         * @feature Updates the user's profile picture by sending a POST request to the server.
         * @param {FormData} profile_picture - The profile picture data to be uploaded.
         * @returns {Promise<void>} - Resolves when the profile picture is successfully updated.Rejects with the server's error response if the update fails.
         */
        async updateProfilePicture(profile_picture)  {
            try {
                const url = `${this.baseUrl}/update-picture`;
                const res = await axiosInstance().post(url, profile_picture);
                this.setProfile(res.data.profile);

                return new Promise(resolve => {
                    resolve(res);
                })
            } catch (error) {
                if (error.response.data) {
                    this.errors = error.response;
                }

                return new Promise(reject => {
                    return reject(error.response);
                })
            }
        },
        setProfile(profile) {
            this.profile.user = profile.user;
            this.profile.profile_picture = profile.avatar.profile_picture;
            this.profile.user_information = profile.user_information;
            this.profile.social_links = profile.social_links;
        }

    }
})