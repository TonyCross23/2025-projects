@if (Session::has('success'))
    <div class="w-full bg-green-300 text-white px-3 py-3 border-green-500 rounded-sm relative">
        <span>{{ Session::get('success') }}</span>
        <button onclick="this.parentElement.style.display='none';" class="absolute top-0 right-0 px-3 py-2 text-black">
            &times;
        </button>
    </div>
@endif


@if (Session::has('error'))
    <div class="w-full bg-green-300 text-white px-3 py-3 border-green-500">
        {{ Session::get('error') }}
    </div>
@endif
