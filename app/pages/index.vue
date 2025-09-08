<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'


// Reusable components moved to separate files
import SlideCard from '@/components/SlideCard.vue'
import ResourceCard from '@/components/ResourceCard.vue'
import Dropdown from '@/components/Dropdown.vue'


// Filters (mock)
const locations = ['Vị trí hiện tại', 'Nhơn Trạch', 'Long Thành']
const types = ['Tất cả', 'Đất nền', 'Nhà phố', 'Biệt thự']
const prices = ['Tất cả', 'Dưới 1 tỷ', '1-2 tỷ', 'Trên 2 tỷ']
const filters = ref({ location: locations[0], type: types[0], price: prices[0] })


// Swiper refs map
const swipers = ref({})
const swiperModules = [Navigation, A11y, Autoplay]
const setRef = (name, instance) => (swipers.value[name] = instance)
const next = (name) => swipers.value[name]?.slideNext()
const prev = (name) => swipers.value[name]?.slidePrev()


// Listings data (mock)
const exploreListings = [
  { id: 1, title: 'Khu dân cư Phú Thạnh', img: '/1-15651645335071869680987.jpg', address: 'Phú Thạnh, Nhơn Trạch, Đồng Nai', beds: '100m² – 200m²', price: '1.2 tỷ – 2.5 tỷ' },
  { id: 2, title: 'Đất nền Long Tân', img: '/1-15651645335071869680987.jpg', address: 'Long Tân, Nhơn Trạch, Đồng Nai', beds: '80m² – 150m²', price: '950 triệu – 1.8 tỷ' },
  { id: 3, title: 'Nhà phố Hiệp Phước', img: '/1-15651645335071869680987.jpg', address: 'Hiệp Phước, Nhơn Trạch, Đồng Nai', beds: '120m² – 180m²', price: '1.7 tỷ – 2.9 tỷ' },
  { id: 4, title: 'Biệt thự Đại Phước', img: '/1-15651645335071869680987.jpg', address: 'Đại Phước, Nhơn Trạch, Đồng Nai', beds: '200m² – 300m²', price: '2.5 tỷ – 4 tỷ' }
]

// --- Support form (lead capture) ---
const supportForm = ref({
  name: '',
  email: '',
  need: 'Mua',
  message: '',
  query: '',
  subscribe: true,
})
const supportLoading = ref(false)
const supportSuccess = ref(false)
const supportError = ref(false)

const setPreset = (kw) => {
  supportForm.value.query = kw
}

const submitSupport = async () => {
  supportError.value = false
  supportSuccess.value = false

  // validate email tối giản để tránh lỗi escape chuỗi khi build
  const email = supportForm.value.email.trim()
  if (!email || email.indexOf('@') === -1) {
    supportError.value = true
    return
  }

  supportLoading.value = true
  try {
    // Gửi về API của bạn (VD: Nitro route /api/support)
    // const { data, error } = await useFetch('/api/support', { method: 'POST', body: supportForm.value })
    // if (error.value) throw error.value

    // demo giả lập gửi thành công
    await new Promise(r => setTimeout(r, 800))
    supportSuccess.value = true

    // Reset nhẹ nhàng, giữ query người dùng
    supportForm.value.name = ''
    supportForm.value.email = ''
    supportForm.value.message = ''
  } catch (e) {
    supportError.value = true
  } finally {
    supportLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-ink text-black">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-ink/80 backdrop-blur border-b border-black/10">
      <div class="container-std flex items-center justify-between py-4">
        <div class="flex items-center gap-2">
          <img src="/logo_phat_dat_bat_don_san.png" alt="Phát Đạt Bất Động Sản" class="h-[50px]" />
          <span class="sr-only">Phát Đạt Bất Động Sản</span>
        </div>
        <nav class="hidden md:flex items-center gap-6 text-sm text-mute">
          <a href="#explore" class="hover:text-black">Khám phá</a>
          <a href="#rent" class="hover:text-black">Cho thuê</a>
          <a href="#own" class="hover:text-black">Mua bán</a>
          <a href="#manage" class="hover:text-black">Quản lý</a>
          <a href="#resources" class="hover:text-black">Tài nguyên</a>
        </nav>
        <div class="flex items-center gap-3">
          <button class="btn btn-dark text-sm">Đăng tin</button>
          <button class="btn btn-primary text-sm">Đăng nhập</button>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative">
      <div class="relative container-std py-12 md:py-16">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <ScrollReveal initialClass="opacity-0 translate-y-10" enterClass="opacity-100 translate-y-0">
              <p class="tag mb-4">Tìm kiếm <span class="ml-1 font-bold">Bất động sản Nhơn Trạch</span></p>
              <h1 class="text-2xl md:text-3xl leading-tight">Phát Đạt - Kết nối khách hàng với hàng trăm sản phẩm đất nền,
                nhà phố, biệt thự tại Nhơn Trạch, Đồng Nai.</h1>
              
              <!-- Search Bar -->
              <div class="mt-6 card p-4 md:p-5">
                <div class="grid md:grid-cols-3 gap-3 items-end">
                  <Dropdown label="Vị trí" :options="locations" v-model="filters.location" />
                  <Dropdown label="Mức giá" :options="prices" v-model="filters.price" />
                  <button class="btn btn-primary h-12 self-end text-[14px] px-5">
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal initialClass="opacity-0 translate-y-10" enterClass="opacity-100 translate-y-0">
              <!-- Metrics -->
              <dl class="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <dt class="text-2xl md:text-3xl font-bold">10+</dt>
                  <dd class="text-xs text-mute">Năm kinh nghiệm</dd>
                </div>
                <div>
                  <dt class="text-2xl md:text-3xl font-bold">500+</dt>
                  <dd class="text-xs text-mute">Sản phẩm đã giao dịch</dd>
                </div>
                <div>
                  <dt class="text-2xl md:text-3xl font-bold">1000+</dt>
                  <dd class="text-xs text-mute">Khách hàng hài lòng</dd>
                </div>
              </dl>
            </ScrollReveal>
          </div>
          <ScrollReveal initialClass="opacity-0 -translate-x-10" enterClass="opacity-100 translate-x-0">
            <div class="hidden md:block">
              <img src="/1-15651645335071869680987.jpg" alt="Bất động sản Nhơn Trạch"
                class="rounded-xl2 shadow-soft border border-black/10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Explore Rentals Carousel -->
    <section id="explore" class="py-10 md:py-14">
      <div class="container-std">
        <div class="flex items-end justify-between mb-6">
          <div>
            <h2 class="text-2xl md:text-3xl ">Khám phá bất động sản nổi bật tại Nhơn Trạch</h2>
            <p class="text-mute text-sm mt-1">Danh sách sản phẩm được chọn lọc dành riêng cho bạn</p>
          </div>
          <div class="hidden md:flex items-center gap-2">
            <button @click="prev('explore')" class="p-2 rounded-full border border-black/10 hover:bg-white/10"
              aria-label="Prev">←</button>
            <button @click="next('explore')" class="p-2 rounded-full border border-black/10 hover:bg-white/10"
              aria-label="Next">→</button>
          </div>
        </div>

        <ClientOnly>
          <Swiper :modules="swiperModules" :slides-per-view="1.1"
            :breakpoints="{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3.2 } }" :space-between="16"
            @swiper="setRef('explore', $event)">
            <SwiperSlide v-for="item in exploreListings" :key="item.id">
              <SlideCard :item="item" />
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
        <div class="flex md:hidden justify-center pt-4">
          <div class="flex items-center gap-4">
            <button @click="prev('explore')" class="px-5 py-2 rounded-full border border-black/10 hover:bg-white/10"
              aria-label="Prev">←</button>
            <button @click="next('explore')" class="px-5 py-2 rounded-full border border-black/10 hover:bg-white/10"
              aria-label="Next">→</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Most Rental Listings CTA banner -->
    <section id="rent" class="py-10 md:py-14">
      <div class="container-std">
        <h3 class="text-center text-2xl md:text-3xl ">Nhiều lựa chọn cho thuê nhất Nhơn Trạch</h3>
        <p class="text-center text-mute text-sm mt-1">Chọn từ hàng trăm sản phẩm đất nền, nhà phố, biệt thự cho thuê tại
          Nhơn Trạch, Đồng Nai.</p>
        <div class="mt-6 card overflow-hidden">
          <div class="relative h-64 md:h-80">
            <img src="/1-15651645335071869680987.jpg" alt="Cho thuê"
              class="absolute inset-0 h-full w-full object-cover opacity-80" />
            <div class="absolute inset-0 bg-gradient-to-tr from-ink/60 to-transparent"></div>
            <div class="relative p-6 md:p-8 h-full flex items-end">
              <div>
                <h4 class="text-xl md:text-2xl ">Thuê nhà dễ dàng</h4>
                <p class="text-mute text-sm mt-1 max-w-xl">Duyệt tin đăng chất lượng, liên hệ trực tiếp, ký hợp đồng
                  nhanh chóng và an toàn với Phát Đạt.</p>
                <button class="btn btn-primary mt-4">Xem thêm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Homeownership + Explore Options -->
    <section id="own" class="py-10 md:py-14 bg-white/5">
      <div class="container-std grid md:grid-cols-2 gap-6 items-start">
        <div>
          <h3 class="text-2xl md:text-3xl fw-bold">Tìm kiếm cơ hội sở hữu nhà đất tại Nhơn Trạch</h3>
          <p class="text-mute mt-2">Bạn đang cân nhắc mua đất nền, nhà phố hoặc biệt thự? Phát Đạt sẽ giúp bạn tìm được
            sản phẩm phù hợp nhất với nhu cầu và tài chính.</p>
          <div class="mt-4">
            <button class="btn btn-dark">Bắt đầu ngay</button>
          </div>
        </div>
        <div class="card overflow-hidden">
          <img src="/1-15651645335071869680987.jpg" alt="Sở hữu" class="w-full h-64 md:h-80 object-cover" />
        </div>
      </div>

      <div class="container-std mt-8">
        <div class="card overflow-hidden">
          <div class="grid md:grid-cols-2 gap-0">
            <img src="/1-15651645335071869680987.jpg" alt="Lựa chọn" class="w-full h-60 md:h-80 object-cover" />
            <div class="p-6 md:p-8">
              <h4 class="text-xl md:text-2xl ">Khám phá đa dạng sản phẩm</h4>
              <p class="text-mute text-sm mt-2">Từ đất nền, nhà phố đến biệt thự cao cấp, Phát Đạt luôn có giải pháp phù
                hợp cho bạn tại Nhơn Trạch, Đồng Nai.</p>
              <button class="btn btn-primary mt-4 w-max">Khám phá ngay</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Manage Property -->
    <section id="manage" class="py-10 md:py-14">
      <div class="container-std">
        <div class="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 class="text-2xl md:text-3xl ">Quản lý bất động sản hiệu quả cùng Phát Đạt</h3>
            <p class="text-mute mt-2">Hỗ trợ đăng tin, tư vấn pháp lý, ký gửi và quản lý sản phẩm chuyên nghiệp.</p>
          </div>
          <div class="card overflow-hidden">
            <img src="/1-15651645335071869680987.jpg" alt="Quản lý" class="w-full h-56 md:h-72 object-cover" />
          </div>
        </div>

        <div class="mt-6 grid md:grid-cols-2 gap-6">
          <div class="card p-6 text-center">
            <h4 class=" text-lg">Đăng tin bán/cho thuê</h4>
            <p class="text-mute text-sm mt-1">Tiếp cận hàng ngàn khách hàng tiềm năng tại Nhơn Trạch, Đồng Nai.</p>
            <button class="btn btn-primary mt-4 w-max mx-auto">Đăng tin ngay</button>
          </div>
          <div class="card p-6 text-center bg-white/5">
            <h4 class=" text-lg">Hỗ trợ pháp lý, ký gửi</h4>
            <p class="text-mute text-sm mt-1">Tư vấn, hỗ trợ thủ tục pháp lý, ký gửi sản phẩm nhanh chóng, an toàn.</p>
            <button class="btn btn-dark mt-4 w-max mx-auto">Tìm hiểu thêm</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources -->
    <section id="resources" class="py-10 md:py-14 bg-white/5">
      <div class="container-std">
        <h3 class="text-2xl md:text-3xl  text-center">Hỗ trợ khách hàng & chủ đầu tư</h3>
        <p class="text-mute text-sm text-center mt-1">Bài viết, hướng dẫn, video giúp bạn giao dịch bất động sản an toàn
          và hiệu quả.</p>

        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <ResourceCard title="Kinh nghiệm mua bán"
            text="Chia sẻ kinh nghiệm, thủ tục, lưu ý khi giao dịch bất động sản Nhơn Trạch." cta="Xem bài viết"
            image="/1-15651645335071869680987.jpg" />
          <ResourceCard title="Hỗ trợ chủ đầu tư" text="Tư vấn pháp lý, hỗ trợ đăng tin, ký gửi sản phẩm nhanh chóng."
            cta="Tìm hiểu thêm" image="/1-15651645335071869680987.jpg" />
          <ResourceCard title="Ứng dụng di động"
            text="Cập nhật thông tin bất động sản mọi lúc, mọi nơi với ứng dụng của Phát Đạt." cta="Tải ứng dụng"
            image="/1-15651645335071869680987.jpg" />
        </div>
      </div>
    </section>

    <!-- Support CTA: Email tư vấn + Smart search -->
    <section id="cta-support" class="py-10 md:py-14">
      <div class="container-std">
        <div class="card p-6 md:p-8">
          <div class="grid lg:grid-cols-2 gap-8 items-start">
            <!-- Copy + quick presets -->
            <div>
              <h4 class="text-2xl md:text-3xl font-semibold">Cần gợi ý sản phẩm phù hợp tại Nhơn Trạch?</h4>
              <p class="text-mute mt-2">Để lại email, chúng tôi sẽ gửi danh sách đề xuất theo <span
                  class="font-medium">ngân sách</span> và <span class="font-medium">nhu cầu</span> của bạn trong 24h.
              </p>


              <!-- Smart keyword chips -->
              <div class="mt-4 flex flex-wrap gap-2">
                <button type="button" @click="setPreset('Đất nền')"
                  class="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-sm hover:bg-black/5">Đất
                  nền</button>
                <button type="button" @click="setPreset('Nhà phố')"
                  class="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-sm hover:bg-black/5">Nhà
                  phố</button>
                <button type="button" @click="setPreset('Shophouse')"
                  class="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-sm hover:bg-black/5">Shophouse</button>
                <button type="button" @click="setPreset('Biệt thự')"
                  class="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-sm hover:bg-black/5">Biệt
                  thự</button>
              </div>


              <!-- Simple search fallback -->
              <div class="mt-4 grid grid-cols-1 gap-3">
                <label class="block">
                  <span class="sr-only">Từ khóa</span>
                  <input v-model="supportForm.query" type="text" placeholder="Nhập từ khóa (ví dụ: đất nền, nhà phố...)"
                    class="w-full rounded-xl2 bg-white border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40" />
                </label>
                <div class="text-xs text-mute">Mẹo: chọn nhanh bằng các thẻ ở trên để điền từ khóa.</div>
              </div>
            </div>


            <!-- Form capture -->
            <form @submit.prevent="submitSupport"
              class="bg-white rounded-xl2 p-4 md:p-5 border border-black/10 shadow-sm w-full">
              <div class="grid sm:grid-cols-2 gap-3">
                <label class="block">
                  <span class="block text-xs text-mute mb-1">Họ và tên</span>
                  <input v-model.trim="supportForm.name" required type="text"
                    class="h-12 w-full rounded-xl2 bg-white border border-black/10 px-4 focus:outline-none focus:ring-2 focus:ring-accent/40" />
                </label>
                <label class="block">
                  <span class="block text-xs text-mute mb-1">Email</span>
                  <input v-model.trim="supportForm.email" required type="email"
                    class="h-12 w-full rounded-xl2 bg-white border border-black/10 px-4 focus:outline-none focus:ring-2 focus:ring-accent/40" />
                </label>
                <label class="block sm:col-span-2">
                  <span class="block text-xs text-mute mb-1">Nhu cầu</span>
                  <select v-model="supportForm.need"
                    class="h-12 w-full rounded-xl2 bg-white border border-black/10 px-4 focus:outline-none focus:ring-2 focus:ring-accent/40">
                    <option>Mua</option>
                    <option>Thuê</option>
                    <option>Đầu tư</option>
                  </select>
                </label>
                <label class="block sm:col-span-2">
                  <span class="block text-xs text-mute mb-1">Ghi chú (tuỳ chọn)</span>
                  <textarea v-model.trim="supportForm.message" rows="3"
                    class="w-full rounded-xl2 bg-white border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40"
                    placeholder="Ngân sách, vị trí ưa thích, thời gian dự kiến..."></textarea>
                </label>
              </div>


              <div class="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                <label class="inline-flex items-center gap-2 text-xs text-mute">
                  <input v-model="supportForm.subscribe" type="checkbox" class="rounded border-black/20" />
                  Nhận email về dự án mới & ưu đãi
                </label>
                <button :disabled="supportLoading" class="btn btn-primary h-12 w-full sm:w-auto">
                  <span v-if="!supportLoading">Nhận tư vấn miễn phí</span>
                  <span v-else class="inline-flex items-center gap-2">
                    <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity=".25" />
                      <path d="M22 12a10 10 0 0 1-10 10" fill="none" stroke="currentColor" stroke-width="4" />
                    </svg>
                    Đang gửi...
                  </span>
                </button>
              </div>


              <p v-if="supportSuccess" class="mt-3 text-green-600 text-sm">Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời
                gian sớm nhất.</p>
              <p v-if="supportError" class="mt-3 text-red-600 text-sm">Có lỗi khi gửi thông tin. Vui lòng thử lại.</p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-black/10 py-8 text-sm text-mute">
      <div class="container-std flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {{ new Date().getFullYear() }} Phát Đạt Bất Động Sản Nhơn Trạch. Đã đăng ký bản quyền.</p>
        <div class="flex items-center gap-4">
          <a href="#" class="hover:text-black">Chính sách bảo mật</a>
          <a href="#" class="hover:text-black">Điều khoản sử dụng</a>
          <a href="#" class="hover:text-black">Liên hệ</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/***** Page-only fine-tuning *****/
:root {
  color-scheme: dark;
}
</style>
