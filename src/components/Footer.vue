<template>
    <footer class="bg-gradient-to-t from-[#D05A2F] to-[#6A2E18] text-white w-full pt-12 pb-6">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

            <!-- LOGO + ADDRESS + SOCIALS -->
            <div class="space-y-4">
            <!-- Logo -->
            <div class="flex gap-10">
                <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/logo.png" alt="Her Hair Bang Logo" class="h-16 w-auto" />
            </div>

            <!-- Address -->
            <p class="text-sm opacity-90 leading-relaxed">
                London, United Kingdom
            </p>

            <!-- Contact Lines -->
            <div class="text-sm space-y-6">
                <p class="font-semibold">GET DIRECTION</p>
                <p class="flex items-center gap-2">
                <span class="text-sm"><img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/messageicon.png" alt=""></span> shop@herhairbang.com
                </p>
            </div>

            <!-- Social Icons -->
            <div class="flex items-center gap-6 text-xl">
                <a href="#" class="hover:opacity-60">
                    <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/fblogo.png" alt="">
                </a>
                <a href="#" class="hover:opacity-60">
                    <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/ig_icon.png" alt="">
                </a>
                <a href="#" class="hover:opacity-60">
                    <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/tiktoklogo.png" alt="">
                </a>
            </div>
            </div>

            <!-- INFORMATION -->
            <div class="space-y-3">
            <h3 class="font-medium text-lg">Information</h3>
            <ul class="space-y-6 text-sm opacity-90">
                <li><a href="#" class="hover:opacity-60">Head Size Guide</a></li>
                <li><RouterLink to="/contact-us" class="hover:opacity-60">Contact us</RouterLink></li>
                <li><a class="hover:opacity-60">Career</a></li>
                <li><a href="#" class="hover:opacity-60">My Account</a></li>
            </ul>
            </div>

            <!-- CUSTOMER SERVICES -->
            <div class="space-y-3">
            <h3 class="font-medium text-lg">Customer Services</h3>
            <ul class="space-y-6 text-sm opacity-90">
                <li><RouterLink to="/shipping">Shipping</RouterLink></li>
                <li><RouterLink to="/refund" class="hover:opacity-60">Return & Refund</RouterLink></li>
                <li><RouterLink to="/privacy">Privacy & Policy</RouterLink></li>
                <li><RouterLink to="/terms-condition" class="hover:opacity-60">Terms & Conditions</RouterLink></li>
                <li><RouuterLink to="/FAQ" class="hover:opacity-60">Order FAQs</RouuterLink></li>
                <li><RouterLink to="/cart">My Wishlist</RouterLink></li>
            </ul>
            </div>

            <!-- NEWSLETTER -->
            <div class="space-y-3">
            <h3 class="font-medium text-lg">News letter</h3>
            <p class="text-sm opacity-90 leading-relaxed">
                Sign up to our news letter and be the first to know about our sales
            </p>

            <!-- Email Input -->
            <div class="p-[3px] rounded-lg">
                <div class="relative rounded-6xl bg - white">
                    <input 
                    type="text" 
                    placeholder="Email Address.." 
                    class="w-full bg-white text-black rounded-full p-[12px] text-sm focus:outline-none h-[48px] w-[296px]"
                    />
                    <button class="absolute top-1/2 -translate-y-1/2 right-0 opacity-70 hover:opacity-100">
                    <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mynaui_send.png" alt="">
                    </button>
                </div>
                </div>

            </div>
        </div>

        <!-- BOTTOM BAR -->
        <div class="border-t border-[#5A2410] mt-10 pt-4">
            <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between text-sm opacity-80">
            <p>2025 HerHairBang. All Rights Reserved.</p>
            <p>Powered by Next-It Services</p>
            </div>
        </div>
    </footer>

</template>