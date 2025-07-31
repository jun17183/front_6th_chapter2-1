import"./modulepreload-polyfill-B5Qt9EMX.js";const $="p1",N="p2",H="p3",k="p4",M="p5",I=[{id:$,name:"버그 없애는 키보드",price:1e4,originalPrice:1e4,stock:50,isOnSale:!1,isSuggestedSale:!1},{id:N,name:"생산성 폭발 마우스",price:2e4,originalPrice:2e4,stock:30,isOnSale:!1,isSuggestedSale:!1},{id:H,name:"거북목 탈출 모니터암",price:3e4,originalPrice:3e4,stock:20,isOnSale:!1,isSuggestedSale:!1},{id:k,name:"에러 방지 노트북 파우치",price:15e3,originalPrice:15e3,stock:0,isOnSale:!1,isSuggestedSale:!1},{id:M,name:"코딩할 때 듣는 Lo-Fi 스피커",price:25e3,originalPrice:25e3,stock:10,isOnSale:!1,isSuggestedSale:!1}],w={[$]:.1,[N]:.15,[H]:.2,[k]:.05,[M]:.25},d={BULK_PURCHASE_THRESHOLD:30,BULK_PURCHASE_RATE:.25,INDIVIDUAL_DISCOUNT_THRESHOLD:10,TUESDAY_DISCOUNT_RATE:.1,LIGHTNING_SALE_RATE:.2,SUGGESTED_SALE_RATE:.05},m={BASE_RATE:.001,TUESDAY_MULTIPLIER:2,KEYBOARD_MOUSE_BONUS:50,FULL_SET_BONUS:100,BULK_PURCHASE_BONUS:{10:20,20:50,30:100}},E={LIGHTNING_SALE_DISCOUNT:.2,SUGGESTED_SALE_DISCOUNT:.05,MIN_STOCK:0};let T=[...I];const tt=()=>{T=I.map(t=>({...t})),console.log("Product initialized")},et=()=>T,O=t=>T.find(e=>e.id===t),nt=(t,e)=>{const n=O(t);n&&(n.stock-=e,n.stock<E.MIN_STOCK&&(n.stock=E.MIN_STOCK))},st=(t,e)=>{const n=O(t);n&&(n.stock+=e)},at=()=>T.reduce((t,e)=>t+e.stock,0),it=()=>{const t=T.filter(s=>s.stock>E.MIN_STOCK&&!s.isOnSale&&!s.isSuggestedSale);if(t.length===0)return null;const e=Math.floor(Math.random()*t.length),n=t[e];return n.price=Math.round(n.originalPrice*(1-E.LIGHTNING_SALE_DISCOUNT)),n.isOnSale=!0,n},ot=t=>{const e=T.filter(i=>i.stock>E.MIN_STOCK&&i.id!==t&&!i.isOnSale&&!i.isSuggestedSale);if(e.length===0)return null;const n=Math.floor(Math.random()*e.length),s=e[n];return s.price=Math.round(s.price*(1-E.SUGGESTED_SALE_DISCOUNT)),s.isSuggestedSale=!0,s};let f=[];const lt=()=>{f=[],console.log("Cart initialized")},ct=t=>{f.push({...t})},rt=t=>{const e=f.findIndex(n=>n.id===t.id);e!==-1&&f.splice(e,1)},D=()=>{const t=document.getElementById("cart-items");if(!t)return 0;let e=0;for(let n=0;n<t.children.length;n++){const s=t.children[n].querySelector(".quantity-number");s&&(e+=parseInt(s.textContent)||0)}return e},g={TUESDAY_DAY_OF_WEEK:2,TUESDAY_DISCOUNT:.1,BULK_PURCHASE_THRESHOLD:30,BULK_PURCHASE_DISCOUNT:.25,INDIVIDUAL_DISCOUNT_THRESHOLD:10,PRODUCT_DISCOUNTS:{p1:.1,p2:.15,p3:.2,p4:.05,p5:.25}},G=()=>new Date().getDay()===g.TUESDAY_DAY_OF_WEEK,dt=()=>{console.log("Discount initialized")},ut=()=>{const t=document.getElementById("cart-items");if(!t||t.children.length===0)return 0;let e=0,n=0,s=0;for(let i=0;i<t.children.length;i++){const a=t.children[i],o=a.id,c=O(o),r=a.querySelector(".quantity-number"),S=parseInt(r.textContent)||0;if(c&&S>0){const _=c.originalPrice*S;n+=_,e+=S;let A=0;S>=g.INDIVIDUAL_DISCOUNT_THRESHOLD&&(A=g.PRODUCT_DISCOUNTS[o]||0),s+=_*(1-A)}}return e>=g.BULK_PURCHASE_THRESHOLD&&(s=n*(1-g.BULK_PURCHASE_DISCOUNT)),G()&&s>0&&(s=s*(1-g.TUESDAY_DISCOUNT)),Math.round(s)},u={BONUS_THRESHOLDS:{BULK_30:30,BULK_20:20,BULK_10:10},PRODUCT_IDS:{KEYBOARD:"p1",MOUSE:"p2",MONITOR_ARM:"p3"}},mt=t=>Math.floor(t*m.BASE_RATE),St=()=>{const t=document.getElementById("cart-items");if(!t||t.children.length===0)return 0;let e=0,n=!1,s=!1,i=!1,a=D();for(let o=0;o<t.children.length;o++){const r=t.children[o].id;r===u.PRODUCT_IDS.KEYBOARD&&(n=!0),r===u.PRODUCT_IDS.MOUSE&&(s=!0),r===u.PRODUCT_IDS.MONITOR_ARM&&(i=!0)}return n&&s&&(e+=m.KEYBOARD_MOUSE_BONUS),n&&s&&i&&(e+=m.FULL_SET_BONUS),a>=u.BONUS_THRESHOLDS.BULK_30?e+=m.BULK_PURCHASE_BONUS[u.BONUS_THRESHOLDS.BULK_30]:a>=u.BONUS_THRESHOLDS.BULK_20?e+=m.BULK_PURCHASE_BONUS[u.BONUS_THRESHOLDS.BULK_20]:a>=u.BONUS_THRESHOLDS.BULK_10&&(e+=m.BULK_PURCHASE_BONUS[u.BONUS_THRESHOLDS.BULK_10]),e},gt=()=>{const t=document.getElementById("cart-items");if(!t||t.children.length===0)return"없음";let e=[],n=!1,s=!1,i=!1,a=D();for(let o=0;o<t.children.length;o++){const r=t.children[o].id;r===u.PRODUCT_IDS.KEYBOARD&&(n=!0),r===u.PRODUCT_IDS.MOUSE&&(s=!0),r===u.PRODUCT_IDS.MONITOR_ARM&&(i=!0)}return n&&s&&e.push("키보드+마우스 세트 +50p"),n&&s&&i&&e.push("풀세트 구매 +100p"),a>=u.BONUS_THRESHOLDS.BULK_30?e.push("대량구매(30개+) +100p"):a>=u.BONUS_THRESHOLDS.BULK_20?e.push("대량구매(20개+) +50p"):a>=u.BONUS_THRESHOLDS.BULK_10&&e.push("대량구매(10개+) +20p"),e.length>0?e.join(", "):"없음"},Et=()=>{tt(),lt(),dt(),console.log("All data initialized")},K=et,p=O,y=nt,v=st,Tt=at,pt=it,_t=ot,x=ct,h=rt,Y=D,L=G,C=ut,ft=mt,It=St,Ot=gt,l={COLORS:{SALE_PRICE:"text-red-500",SUGGESTED_PRICE:"text-blue-500",DUAL_SALE_PRICE:"text-purple-600",ORIGINAL_PRICE:"text-gray-400",DEFAULT_TEXT:"text-black",GRAY_TEXT:"text-gray-500",LIGHT_GRAY_TEXT:"text-gray-400",DARK_GRAY_TEXT:"text-gray-700",LIGHTER_GRAY_TEXT:"text-gray-300",POINTS_TEXT:"text-blue-400",DISCOUNT_TEXT:"text-purple-400",ERROR_TEXT:"text-red-500"},ICONS:{LIGHTNING_SALE:"⚡",SUGGESTED_SALE:"💝",DUAL_SALE:"⚡💝",CART:"🛍️"},THRESHOLDS:{BOLD_TEXT_QUANTITY:10},MESSAGES:{EMPTY_CART:"장바구니가 비어있습니다.",DISCOUNT_APPLIED:"할인되었습니다"}},Lt=`
  <div class="mb-8">
    <h1 class="text-xs font-medium tracking-extra-wide uppercase mb-2">🛒 Hanghae Online Store</h1>
    <div class="text-5xl tracking-tight leading-none">Shopping Cart</div>
    <p id="item-count" class="text-sm ${l.COLORS.GRAY_TEXT} font-normal mt-3">${l.ICONS.CART} 0 items in cart</p>
  </div>
`,Ct=()=>{const t=document.getElementById("item-count");if(!t)return;const e=Y(),n=e===1?"item":"items";t.textContent=`🛍️ ${e} ${n} in cart`},ht=`
  <div class="mb-6 pb-6 border-b border-gray-200">
    <select id="product-select" class="w-full p-3 border border-gray-300 rounded-lg text-base mb-3">
    </select>
    <button id="add-to-cart" class="w-full py-3 bg-black text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-all">
      Add to Cart
    </button>
    <div id="stock-status" class="text-xs ${l.COLORS.ERROR_TEXT} mt-3 whitespace-pre-line"></div>
  </div>
`,b=()=>{const t=K(),e=document.getElementById("product-select"),n=Tt();if(!e)return;const s=e.value;e.innerHTML="",t.forEach(a=>{const o=document.createElement("option");o.value=a.id;let c="";a.isOnSale&&(c+=" ⚡SALE"),a.isSuggestedSale&&(c+=" 💝추천"),a.stock===0?(o.textContent=`${a.name} - ${a.price}원 (품절)${c}`,o.disabled=!0,o.className=l.COLORS.LIGHT_GRAY_TEXT):a.isOnSale&&a.isSuggestedSale?(o.textContent=`⚡💝${a.name} - ${a.originalPrice}원 → ${a.price}원 (25% SUPER SALE!)`,o.className=l.COLORS.DUAL_SALE_PRICE+" font-bold"):a.isOnSale?(o.textContent=`⚡${a.name} - ${a.originalPrice}원 → ${a.price}원 (20% SALE!)`,o.className=l.COLORS.SALE_PRICE+" font-bold"):a.isSuggestedSale?(o.textContent=`💝${a.name} - ${a.originalPrice}원 → ${a.price}원 (5% 추천!)`,o.className=l.COLORS.SUGGESTED_PRICE+" font-bold"):o.textContent=`${a.name} - ${a.price}원${c}`,e.appendChild(o)}),s&&e.querySelector(`option[value="${s}"]`)&&(e.value=s);const i=document.getElementById("stock-status");i&&(i.textContent=`Total Stock: ${n} items`)},yt=()=>{const t=document.getElementById("stock-status");if(!t)return;const e=K(),n=[];e.forEach(s=>{s.stock===0?n.push(`${s.name}: 품절`):s.stock>0&&s.stock<5&&n.push(`${s.name}: 재고 부족 (${s.stock}개 남음)`)}),n.length>0?(t.textContent=n.join(" | "),t.style.display="block"):(t.textContent="",t.style.display="none")},xt=`
  <div id="cart-items"></div>
`,Rt=t=>{const e=document.getElementById("cart-items");if(!e||!t)return;const n=Bt(t);e.appendChild(n)},Ut=(t,e)=>{const n=t.querySelector(".text-lg"),s=t.querySelector("h3"),i=t.querySelector(".text-xs.text-black"),a=t.querySelector(".quantity-number"),o=a?parseInt(a.textContent):0,c=q(e),r=X(e);n.innerHTML=c,s.textContent=r,i&&(i.innerHTML=c),vt(n,o)},Dt=()=>{const t=document.getElementById("cart-items").children;for(let e=0;e<t.length;e++){const n=t[e].id,s=p(n);s&&Ut(t[e],s)}},bt=t=>t.isOnSale&&t.isSuggestedSale?l.COLORS.DUAL_SALE_PRICE:t.isOnSale?l.COLORS.SALE_PRICE:t.isSuggestedSale?l.COLORS.SUGGESTED_PRICE:"",At=t=>t.isOnSale&&t.isSuggestedSale?l.ICONS.DUAL_SALE:t.isOnSale?l.ICONS.LIGHTNING_SALE:t.isSuggestedSale?l.ICONS.SUGGESTED_SALE:"",q=t=>{if(t.isOnSale||t.isSuggestedSale){const e=bt(t);return`<span class="line-through ${l.COLORS.ORIGINAL_PRICE}">₩${t.originalPrice.toLocaleString()}</span> <span class="${e}">₩${t.price.toLocaleString()}</span>`}else return`₩${t.price.toLocaleString()}`},X=t=>At(t)+t.name,vt=(t,e)=>{e>=l.THRESHOLDS.BOLD_TEXT_QUANTITY?t.style.fontWeight="bold":t.style.fontWeight="normal"},Pt=t=>{const e=q(t);return`
    <div class="w-20 h-20 bg-gradient-black relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 w-[60%] h-[60%] bg-white/10 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
    </div>
    <div>
      <h3 class="text-base font-normal mb-1 tracking-tight">${X(t)}</h3>
      <p class="text-xs ${l.COLORS.GRAY_TEXT} mb-0.5 tracking-wide">PRODUCT</p>
      <p class="text-xs ${l.COLORS.DEFAULT_TEXT} mb-3">${e}</p>
      <div class="flex items-center gap-4">
        <button class="quantity-change w-6 h-6 border border-black bg-white text-sm flex items-center justify-center transition-all hover:bg-black hover:text-white" data-product-id="${t.id}" data-change="-1">−</button>
        <span class="quantity-number text-sm font-normal min-w-[20px] text-center tabular-nums">1</span>
        <button class="quantity-change w-6 h-6 border border-black bg-white text-sm flex items-center justify-center transition-all hover:bg-black hover:text-white" data-product-id="${t.id}" data-change="1">+</button>
      </div>
    </div>
    <div class="text-right">
      <div class="text-lg mb-2 tracking-tight tabular-nums">${e}</div>
      <a class="remove-item text-2xs ${l.COLORS.GRAY_TEXT} uppercase tracking-wider cursor-pointer transition-colors border-b border-transparent hover:${l.COLORS.DEFAULT_TEXT} hover:border-black" data-product-id="${t.id}">Remove</a>
    </div>
  `},Bt=t=>{const e=document.createElement("div");return e.id=t.id,e.className="grid grid-cols-[80px_1fr_auto] gap-5 py-5 border-b border-gray-100 first:pt-0 last:border-b-0 last:pb-0",e.innerHTML=Pt(t),e},$t=`
  <h2 class="text-xs font-medium mb-5 tracking-extra-wide uppercase">Order Summary</h2>
  <div class="flex-1 flex flex-col">
    <div id="summary-details" class="space-y-3"></div>
    <div class="mt-auto">
      <div id="discount-info" class="mb-4"></div>
      <div id="tuesday-special" class="mt-4 p-3 bg-white/10 rounded-lg hidden">
        <div class="flex items-center gap-2">
          <span class="text-2xs">🎉</span>
          <span class="text-xs uppercase tracking-wide">Tuesday Special ${(d.TUESDAY_DISCOUNT_RATE*100).toFixed(0)}% Applied</span>
        </div>
      </div>
      <div id="cart-total" class="pt-5 border-t border-white/10">
        <div class="flex justify-between items-baseline">
          <span class="text-sm uppercase tracking-wider">Total</span>
          <div id="total-price" class="text-2xl tracking-tight">₩0</div>
        </div>
        <div id="loyalty-points" class="text-xs ${l.COLORS.POINTS_TEXT} mt-2 text-right" style="display: none;">적립 포인트: 0p</div>
      </div>
    </div>
  </div>
  <button class="w-full py-4 bg-white text-black text-sm font-normal uppercase tracking-super-wide cursor-pointer mt-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30">
    Proceed to Checkout
  </button>
  <p class="mt-4 text-2xs text-white/60 text-center leading-relaxed">
    Free shipping on all orders.<br>
    <span id="points-notice">Earn loyalty points with purchase.</span>
  </p>
`,F=()=>{const t=document.getElementById("summary-details");if(!t)return;const e=document.getElementById("cart-items");if(!e||e.children.length===0){P(t);return}const n=W();if(n.length===0){P(t);return}let s="",i=0;if(s+=Ht(n),i=n.reduce((a,{product:o,quantity:c})=>a+o.originalPrice*c,0),i>0){const a=Y(),o=Nt(n);s+=`
      <div class="border-t border-white/10 my-3"></div>
      <div class="flex justify-between text-sm tracking-wide">
        <span>Subtotal</span>
        <span>₩${i.toLocaleString()}</span>
      </div>
    `,s+=kt(a,o),s+=Mt(),s+=wt()}t.innerHTML=s},j=()=>{const t=document.getElementById("total-price");if(!t)return;const e=C();t.textContent=`₩${e.toLocaleString()}`},z=()=>{const t=document.getElementById("discount-info");if(!t)return;const e=document.getElementById("cart-items");if(!e||e.children.length===0){t.innerHTML="";return}const{subtotal:n,totalAmount:s,discountDetails:i}=Gt();if(i.length>0){const a=((n-s)/n*100).toFixed(1);t.innerHTML=`
      <div class="bg-green-500/20 rounded-lg p-3">
        <div class="flex justify-between items-center mb-1">
          <span class="text-xs uppercase tracking-wide text-green-400">총 할인율</span>
          <span class="text-sm font-medium text-green-400">${a}%</span>
        </div>
        <div class="text-2xs ${l.COLORS.LIGHTER_GRAY_TEXT}">₩${Math.round(n-s).toLocaleString()} ${l.MESSAGES.DISCOUNT_APPLIED}</div>
      </div>
    `}else t.innerHTML=""},Q=()=>{const t=document.getElementById("loyalty-points");if(!t)return;const e=document.getElementById("cart-items");if(!e||e.children.length===0){t.style.display="none";return}const{totalPoints:n,pointsDetails:s}=Kt();n>0?(t.innerHTML=`<div>적립 포인트: <span class="font-bold">${n}p</span></div><div class="text-2xs opacity-70 mt-1">${s.join(", ")}</div>`,t.style.display="block"):(t.textContent="적립 포인트: 0p",t.style.display="block");const i=document.getElementById("cart-items");(!i||i.children.length===0)&&(t.style.display="none")},V=()=>{const t=L(),e=C(),n=document.getElementById("tuesday-special");n&&(t&&e>0?n.classList.remove("hidden"):n.classList.add("hidden"))},W=()=>{const t=document.getElementById("cart-items");if(!t)return[];const e=[];for(let n=0;n<t.children.length;n++){const s=t.children[n],i=s.id,a=p(i),o=s.querySelector(".quantity-number"),c=parseInt(o.textContent)||0;a&&c>0&&e.push({product:a,quantity:c,productId:i})}return e},P=t=>{t.innerHTML=`<p class="text-sm ${l.COLORS.LIGHT_GRAY_TEXT}">${l.MESSAGES.EMPTY_CART}</p>`;const e=document.getElementById("loyalty-points");e&&(e.style.display="none")},Nt=t=>{const e=[];return t.forEach(({product:n,quantity:s,productId:i})=>{if(s>=d.INDIVIDUAL_DISCOUNT_THRESHOLD){const a=w[i];if(a){const o=Math.round(a*100);e.push({name:n.name,discount:o})}}}),e},Ht=t=>t.map(({product:e,quantity:n})=>{const s=e.originalPrice*n;return`
      <div class="flex justify-between text-xs tracking-wide ${l.COLORS.LIGHT_GRAY_TEXT}">
        <span>${e.name} x ${n}</span>
        <span>₩${s.toLocaleString()}</span>
      </div>
    `}).join(""),kt=(t,e)=>{let n="";return t>=d.BULK_PURCHASE_THRESHOLD?n+=`
      <div class="flex justify-between text-sm tracking-wide text-green-400">
        <span class="text-xs">🎉 대량구매 할인 (${d.BULK_PURCHASE_THRESHOLD}개 이상)</span>
        <span class="text-xs">-${Math.round(d.BULK_PURCHASE_RATE*100)}%</span>
      </div>
    `:e.length>0&&e.forEach(s=>{n+=`
        <div class="flex justify-between text-sm tracking-wide text-green-400">
          <span class="text-xs">${s.name} (${d.INDIVIDUAL_DISCOUNT_THRESHOLD}개↑)</span>
          <span class="text-xs">-${s.discount}%</span>
        </div>
      `}),n},Mt=()=>L()&&C()>0?`
      <div class="flex justify-between text-sm tracking-wide ${l.COLORS.DISCOUNT_TEXT}">
        <span class="text-xs">🌟 화요일 추가 할인</span>
        <span class="text-xs">-${Math.round(d.TUESDAY_DISCOUNT_RATE*100)}%</span>
      </div>
    `:"",wt=()=>`
    <div class="flex justify-between text-sm tracking-wide ${l.COLORS.LIGHT_GRAY_TEXT}">
      <span>Shipping</span>
      <span>Free</span>
    </div>
  `,Gt=()=>{const t=W();if(t.length===0)return{subtotal:0,totalAmount:0,discountDetails:[]};let e=0,n=0,s=0,i=[];if(t.forEach(({product:a,quantity:o,productId:c})=>{const r=a.originalPrice*o;e+=r,s+=o;let S=0;o>=d.INDIVIDUAL_DISCOUNT_THRESHOLD&&(S=w[c]||0),S>0&&i.push(`${a.name}: ${(S*100).toFixed(1)}% 할인`),n+=r*(1-S)}),s>=d.BULK_PURCHASE_THRESHOLD&&(n=e*(1-d.BULK_PURCHASE_RATE),i=[`대량구매: ${(d.BULK_PURCHASE_RATE*100).toFixed(1)}% 할인`]),L()&&n>0&&(n=n*(1-d.TUESDAY_DISCOUNT_RATE),i.push(`화요일 할인: ${(d.TUESDAY_DISCOUNT_RATE*100).toFixed(1)}% 추가`)),i.length>0){const a=((e-n)/e*100).toFixed(1);i.push(`총 할인율: ${a}%`)}return{subtotal:e,totalAmount:n,discountDetails:i}},Kt=()=>{const t=C(),e=ft(t),n=It(),s=Ot();let i=e+n,a=[`기본: ${e}p`];return L()&&(i=e*m.TUESDAY_MULTIPLIER+n,a=[`기본: ${e}p`,`화요일 ${m.TUESDAY_MULTIPLIER}배`]),s!=="없음"&&a.push(s),{totalPoints:i,pointsDetails:a}},Yt=`
  <button id="manual-toggle-button" data-manual-toggle class="fixed top-4 right-4 bg-black text-white p-3 rounded-full hover:bg-gray-900 transition-colors z-50">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  </button>
`,qt=`
  <div id="manual-overlay" class="fixed inset-0 bg-black/50 z-40 hidden transition-opacity duration-300">
    <div id="manual-panel" class="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto z-50 transform translate-x-full transition-transform duration-300">
      <!-- Close Button -->
      <button id="close-manual" class="absolute top-4 right-4 ${l.COLORS.GRAY_TEXT} hover:${l.COLORS.DEFAULT_TEXT}">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Manual Content -->
      <h2 class="text-xl font-bold mb-4">📖 이용 안내</h2>

      <!-- Discount Policy -->
      <div class="mb-6">
        <h3 class="text-base font-bold mb-3">💰 할인 정책</h3>
        <div class="space-y-3">
          <div class="bg-gray-100 rounded-lg p-3">
            <p class="font-semibold text-sm mb-1">개별 상품</p>
            <p class="${l.COLORS.DARK_GRAY_TEXT} text-xs pl-2">
              • 키보드 10개↑: 10%<br>
              • 마우스 10개↑: 15%<br>
              • 모니터암 10개↑: 20%<br>
              • 스피커 10개↑: 25%
            </p>
          </div>
          <div class="bg-gray-100 rounded-lg p-3">
            <p class="font-semibold text-sm mb-1">전체 수량</p>
            <p class="${l.COLORS.DARK_GRAY_TEXT} text-xs pl-2">• ${d.BULK_PURCHASE_THRESHOLD}개 이상: ${d.BULK_PURCHASE_RATE*100}%</p>
          </div>
          <div class="bg-gray-100 rounded-lg p-3">
            <p class="font-semibold text-sm mb-1">특별 할인</p>
            <p class="${l.COLORS.DARK_GRAY_TEXT} text-xs pl-2">
              • 화요일: +${d.TUESDAY_DISCOUNT_RATE*100}%<br>
              • ⚡번개세일: ${d.LIGHTNING_SALE_RATE*100}%<br>
              • 💝추천할인: ${d.SUGGESTED_SALE_RATE*100}%
            </p>
          </div>
        </div>
      </div>

      <!-- Point Policy -->
      <div class="mb-6">
        <h3 class="text-base font-bold mb-3">🎁 포인트 적립</h3>
        <div class="space-y-3">
          <div class="bg-gray-100 rounded-lg p-3">
            <p class="font-semibold text-sm mb-1">기본</p>
            <p class="${l.COLORS.DARK_GRAY_TEXT} text-xs pl-2">• 구매액의 ${m.BASE_RATE*100}%</p>
          </div>
          <div class="bg-gray-100 rounded-lg p-3">
            <p class="font-semibold text-sm mb-1">추가</p>
            <p class="${l.COLORS.DARK_GRAY_TEXT} text-xs pl-2">
              • 화요일: ${m.TUESDAY_MULTIPLIER}배<br>
              • 키보드+마우스: +${m.KEYBOARD_MOUSE_BONUS}p<br>
              • 풀세트: +${m.FULL_SET_BONUS}p<br>
              • 10개↑: +${m.BULK_PURCHASE_BONUS[10]}p / 20개↑: +${m.BULK_PURCHASE_BONUS[20]}p / 30개↑: +${m.BULK_PURCHASE_BONUS[30]}p
            </p>
          </div>
        </div>
      </div>

      <!-- Tip -->
      <div class="border-t border-gray-200 pt-4 mt-4">
        <p class="text-xs font-bold mb-1">💡 TIP</p>
        <p class="text-2xs ${l.COLORS.GRAY_TEXT} leading-relaxed">
          • 화요일 대량구매 = MAX 혜택<br>
          • ⚡+💝 중복 가능<br>
          • 상품4 = 품절
        </p>
      </div>
    </div>
  </div>
`,Xt=()=>{jt(),b()},Ft=`
  <!-- Header -->
  ${Lt}

  <!-- Main Content -->
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 flex-1 overflow-hidden">

    <!-- Left Column -->
    <div class="bg-white border border-gray-200 p-8 overflow-y-auto">
      ${ht}
      ${xt}
    </div>

    <!-- Right Column -->
    <div class="bg-black text-white p-8 flex flex-col">
      ${$t}
    </div>
  </div>

  <!-- Manual -->
  ${Yt}
  ${qt}
`,jt=()=>{const t=document.getElementById("app");t.innerHTML=Ft};let R=null;const zt=()=>{const t=Math.random()*1e4;setTimeout(()=>{setInterval(Qt,3e4)},t),setTimeout(()=>{setInterval(Vt,6e4)},Math.random()*2e4)},Qt=()=>{const t=pt();t&&(alert(`⚡번개세일! ${t.name}이(가) 20% 할인 중입니다!`),J())},Vt=()=>{const t=document.getElementById("cart-items");if(!(!t||t.children.length===0)&&R){const e=_t(R);e&&(alert(`💝 ${e.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`),J())}},Wt=t=>{R=t},J=()=>{b(),Dt(),F(),j(),z(),Q(),V()},Jt=()=>{const t=document.getElementById("product-select");if(!t)return;const e=t.value,n=p(e);if(!e||!n){alert("상품을 선택해주세요.");return}if(n.stock<=0){alert("품절된 상품입니다.");return}const s=document.getElementById("cart-items");let i=null;s&&(i=s.querySelector(`#${e}`));const a=I.find(c=>c.id===e),o=i&&parseInt(i.querySelector(".quantity-number").textContent)||0;if(a.stock<o+1){alert("재고가 부족합니다.");return}if(i){const c=i.querySelector(".quantity-number");c.textContent=o+1,x(n)}else x(n),Rt(n);y(e,1),U(),Wt(e)},Zt=t=>{const e=t.target;if(e.classList.contains("quantity-change")){t.preventDefault(),t.stopPropagation();const n=e.dataset.productId,s=document.getElementById(n),i=p(n);if(!s||!i)return;const a=parseInt(e.dataset.change),o=s.querySelector(".quantity-number"),c=parseInt(o.textContent),r=c+a;if(r>0)if(a>0){const S=I.find(_=>_.id===i.id);if(r>S.stock){alert("재고가 부족합니다.");return}o.textContent=r,y(i.id,a),x(i)}else o.textContent=r,y(i.id,a),h(i);else if(r<=0){v(i.id,c),s.remove();for(let S=0;S<c;S++)h(i)}U()}else if(e.classList.contains("remove-item")){t.preventDefault(),t.stopPropagation();const n=e.dataset.productId,s=document.getElementById(n),i=p(n);if(!s||!i)return;const a=s.querySelector(".quantity-number"),o=parseInt(a.textContent);v(i.id,o),s.remove();for(let c=0;c<o;c++)h(i);U()}},U=()=>{Ct(),b(),yt(),F(),j(),z(),Q(),V()},te=()=>{const t=document.getElementById("manual-overlay"),e=document.getElementById("manual-panel");t&&e&&(t.classList.toggle("hidden"),e.classList.toggle("translate-x-full"))},ee=t=>{const e=document.getElementById("manual-overlay");t.target===e&&Z()},ne=t=>{t.target.id==="close-manual"&&Z()},Z=()=>{const t=document.getElementById("manual-overlay"),e=document.getElementById("manual-panel");t&&e&&(t.classList.add("hidden"),e.classList.add("translate-x-full"))},se=()=>{const t=document.querySelector("[data-manual-toggle]");t&&t.addEventListener("click",te);const e=document.getElementById("manual-overlay");e&&e.addEventListener("click",ee);const n=document.getElementById("manual-panel");n&&n.addEventListener("click",ne)},ae=()=>{ie(),se(),zt()},ie=()=>{const t=document.getElementById("add-to-cart");t&&t.addEventListener("click",Jt);const e=document.getElementById("cart-items");e&&e.addEventListener("click",Zt)};function B(){console.log("🛒 Hanghae Online Store 초기화 완료!"),Et(),Xt(),ae()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",B):B();
