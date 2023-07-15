<script lang="ts">
export let user
</script>

<div
    class="bg-main-500 border border-main-300 rounded-md p-2 text-gray-400"
    id="email">
    <p class="text-lg font-bold text-white">Your Email</p>
    <p class="text-xs">
        Your email is used to login to your account, and is used to send you
        notifications. Your email is kept private, and is not visible to other
        users.
    </p>
    <input
        type="email"
        class="mt-2 text-sm w-full rounded-md border border-main-300 bg-main-600 p-1 text-white transition focus:outline-none"
        value="{user.email}"
        placeholder="{user.email}" />
    <p class="text-xs text-right text-gray-400">
        You'll be emailed about the change.
    </p>
</div>
