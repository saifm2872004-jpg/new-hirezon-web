
(function(){
  const html = document.documentElement;
  const metaTitle = document.getElementById('metaTitle');
  const metaDesc = document.getElementById('metaDesc');
  const TITLES = {
    en:'New Horizon Guangzhou Trading Co., LTD | China Sourcing & Global Trading',
    ar:'New Horizon Guangzhou Trading Co., LTD | التوريد والتجارة العالمية من الصين'
  };
  const DESCS = {
    en:'New Horizon Guangzhou Trading Co., LTD provides professional sourcing, quality control, factory audits, import/export, and global shipping solutions from China to international markets.',
    ar:'تقدم New Horizon Guangzhou Trading Co., LTD خدمات التوريد ومراقبة الجودة وتدقيق المصانع والاستيراد والتصدير وحلول الشحن العالمي من الصين إلى الأسواق الدولية.'
  };
  let lang = 'en';
  try{ lang = localStorage.getItem('nh-lang') || 'en'; }catch(e){}
  if(lang!=='en' && lang!=='ar') lang='en';

  function applyLang(l, animate){
    lang = l;
    try{ localStorage.setItem('nh-lang', l); }catch(e){}
    html.setAttribute('lang', l);
    html.setAttribute('dir', l==='ar' ? 'rtl' : 'ltr');
    const p=document.documentElement.dataset.page || 'index';
    const pageLabels={index:['Home','الرئيسية'],about:['About Us','من نحن'],products:['Products & Solutions','المنتجات والحلول'],services:['Our Services','خدماتنا'],shipping:['Shipping & Logistics','الشحن والخدمات اللوجستية'],projects:['Selected Work','أعمالنا'],contact:['Contact Us','تواصل معنا']};
    const current=pageLabels[p]||pageLabels.index;
    metaTitle.textContent = (l==='ar'?current[1]:current[0])+' | New Horizon Guangzhou Trading';
    document.title = metaTitle.textContent;
    metaDesc.setAttribute('content', DESCS[l]);
    document.querySelector('meta[property="og:title"]').setAttribute('content', l==='ar' ? TITLES.ar : 'New Horizon Guangzhou Trading Co., LTD | From the Heart of China');
    // text
    document.querySelectorAll('[data-en]').forEach(el=>{
      const v = l==='ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if(v!==null){
        // preserve inner gold span in h1: handle specially
        if(el.tagName==='H1' && l==='en' && el.querySelector('.gold')) return;
        el.textContent = v;
      }
    });
    // fix hero h1 rich version
    const h1 = document.querySelector('.hero h1');
    if(h1){
      if(l==='ar'){ h1.innerHTML = 'من قلب الصين… <span class="gold">نُعزّز نجاحكم حول العالم</span>'; }
      else{ h1.innerHTML = 'From the Heart of China… <span class="gold">Powering Your Success Worldwide</span>'; }
    }
    document.querySelectorAll('[data-en-ph]').forEach(el=>{
      el.setAttribute('placeholder', l==='ar' ? el.getAttribute('data-ar-ph') : el.getAttribute('data-en-ph'));
    });
    document.querySelectorAll('[data-en-aria]').forEach(el=>{
      el.setAttribute('aria-label', l==='ar' ? el.getAttribute('data-ar-aria') : el.getAttribute('data-en-aria'));
    });
    // toggle buttons
    ['btnEn','btnEnM'].forEach(id=>{const b=document.getElementById(id); if(b){b.classList.toggle('on', l==='en');b.setAttribute('aria-pressed',String(l==='en'));}});
    ['btnAr','btnArM'].forEach(id=>{const b=document.getElementById(id); if(b){b.classList.toggle('on', l==='ar');b.setAttribute('aria-pressed',String(l==='ar'));}});
    // marquee content flip
    const mq = document.getElementById('mqTrack');
    if(mq){
      if(l==='ar'){ mq.innerHTML = '<span>◆ التوريد ◆ مراقبة الجودة ◆ تدقيق المصانع ◆ OEM ◆ قطع الغيار ◆ LCL / FCL ◆ رورو ◆ DDP من الباب إلى الباب ◆ استيراد وتصدير ◆</span><span>◆ التوريد ◆ مراقبة الجودة ◆ تدقيق المصانع ◆ OEM ◆ قطع الغيار ◆ LCL / FCL ◆ رورو ◆ DDP من الباب إلى الباب ◆ استيراد وتصدير ◆</span>'; }
      else{ mq.innerHTML = '<span>◆ Sourcing ◆ Quality Control ◆ Factory Audits ◆ OEM ◆ Spare Parts ◆ LCL / FCL ◆ Ro-Ro ◆ DDP Door to Door ◆ Import & Export ◆</span><span>◆ Sourcing ◆ Quality Control ◆ Factory Audits ◆ OEM ◆ Spare Parts ◆ LCL / FCL ◆ Ro-Ro ◆ DDP Door to Door ◆ Import & Export ◆</span>'; }
    }
    if(animate){
      document.body.style.transition='opacity .25s';
      document.body.style.opacity='.4';
      setTimeout(()=>{document.body.style.opacity='1';},180);
    }
  }
  window.setLang = applyLang;
  window.getLang = ()=>lang;
  ['btnEn','btnEnM'].forEach(id=>{const b=document.getElementById(id); if(b) b.addEventListener('click',()=>applyLang('en',true));});
  ['btnAr','btnArM'].forEach(id=>{const b=document.getElementById(id); if(b) b.addEventListener('click',()=>applyLang('ar',true));});
  applyLang(lang,false);
})();

/* ================= HEADER / NAV / DRAWER ================= */
(function(){
  const header=document.getElementById('siteHeader');
  const toTop=document.getElementById('toTop');
  const onScroll=()=>{
    const y=window.scrollY;
    header.classList.toggle('scrolled', y>40);
    toTop.classList.toggle('show', y>600);
    // hero parallax
    const bg=document.querySelector('.hero-bg img');
    if(bg && y<window.innerHeight*1.2){ bg.style.translate = `0 ${y*0.12}px`; }
  };
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  const drawer=document.getElementById('drawer');
  const burger=document.getElementById('burger');
  const closeBtn=document.getElementById('drawerClose');
  const bg=document.getElementById('drawerBg');
  function openDrawer(o){ drawer.classList.toggle('open',o); drawer.setAttribute('aria-hidden',String(!o)); drawer.toggleAttribute('inert',!o); document.body.style.overflow=o?'hidden':''; burger.setAttribute('aria-expanded',String(o)); if(o){closeBtn.focus();}else{burger.focus({preventScroll:true});} }
  burger.addEventListener('click',()=>openDrawer(true));
  closeBtn.addEventListener('click',()=>openDrawer(false));
  bg.addEventListener('click',()=>openDrawer(false));
  document.querySelectorAll('#drawerNav a, .drawer-cta').forEach(a=>a.addEventListener('click',()=>openDrawer(false)));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){openDrawer(false); closeModal();} });

  // Active navigation is set server-side by each page's aria-current attribute.

})();

/* ================= REVEAL + COUNTERS + BARS + JOURNEY ================= */
(function(){
  const rio=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('in'); rio.unobserve(e.target);} }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>rio.observe(el));

  // counters
  const cio=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target, target=+el.dataset.target; let cur=0; const step=Math.max(1,Math.ceil(target/40));
    const t=setInterval(()=>{cur+=step; if(cur>=target){cur=target;clearInterval(t);} el.textContent=cur;},60);
    cio.unobserve(el);
  }),{threshold:.6});
  document.querySelectorAll('.count').forEach(el=>cio.observe(el));

  // ship bars
  const bio=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.querySelectorAll('.ship-bar i').forEach(b=>b.style.width=b.dataset.w); bio.unobserve(e.target);} }),{threshold:.3});
  const sg=document.querySelector('.ship-grid'); if(sg) bio.observe(sg);

  // journey animation
  const jt=document.getElementById('journeyTrack'), jp=document.getElementById('journeyProgress');
  const steps=[...document.querySelectorAll('.jstep')];
  const jio=new IntersectionObserver(es=>{
    if(es[0].isIntersecting){
      let i=0; jp.style.width='0'; steps.forEach(s=>s.classList.remove('active'));
      const iv=setInterval(()=>{
        if(i<steps.length){ steps[i].classList.add('active'); const pct=(i/(steps.length-1))*100; jp.style.width=`calc(${pct}% - 0px)`; i++; }
        else clearInterval(iv);
      },650);
      jio.disconnect();
    }
  },{threshold:.4});
  if(jt) jio.observe(jt);
})();

/* ================= PROJECT MODAL ================= */
const modal=document.getElementById('projModal');
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
(function(){
  const mImg=document.getElementById('modalImg'), mTitle=document.getElementById('modalTitle'), mDesc=document.getElementById('modalDesc'), mNo=document.getElementById('modalNo');
  document.querySelectorAll('.proj').forEach((card,idx)=>{
    card.setAttribute('tabindex','0'); card.setAttribute('role','button');
    function open(){
      const l=(window.getLang&&window.getLang())||'en';
      mImg.src=card.dataset.img || card.querySelector('img').src;
      mImg.alt=card.querySelector('img').alt;
      mNo.textContent='0'+(idx+1);
      mTitle.textContent = l==='ar' ? card.dataset.titleAr : card.dataset.titleEn;
      mDesc.textContent = l==='ar' ? card.dataset.descAr : card.dataset.descEn;
      modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    }
    card.addEventListener('click',open);
    card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();open();} });
  });
  document.getElementById('modalBg').addEventListener('click',closeModal);
  document.getElementById('modalClose').addEventListener('click',closeModal);
  document.getElementById('modalCta').addEventListener('click',closeModal);
})();

/* ================= FORM ================= */
(function(){
  const form=document.getElementById('quoteForm');
  const toast=document.getElementById('toast');
  function showToast(msg){ toast.textContent=msg; toast.classList.add('show'); clearTimeout(showToast._t); showToast._t=setTimeout(()=>toast.classList.remove('show'),3800); }
  function setErr(input,bad){ input.closest('.field').classList.toggle('err',bad); return !bad; }
  if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const l=(window.getLang&&window.getLang())||'en';
    const name=document.getElementById('fName'), phone=document.getElementById('fPhone'), email=document.getElementById('fEmail'), msg=document.getElementById('fMsg');
    let ok=true;
    ok = setErr(name, name.value.trim().length<2) && ok;
    ok = setErr(phone, !/^[+\d][\d\s-]{6,18}$/.test(phone.value.trim())) && ok;
    ok = setErr(email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) && ok;
    ok = setErr(msg, msg.value.trim().length<10) && ok;
    if(!ok){ showToast(l==='ar' ? 'يرجى مراجعة الحقول المطلوبة.' : 'Please review the required fields.'); return; }
    const cat=document.getElementById('fCat').value, ship=document.getElementById('fShip').value;
    const lines=["Hello New Horizon — New quotation request:","Name: "+name.value.trim(),"Phone: "+phone.value.trim(),"Email: "+email.value.trim(),"Category: "+cat,"Shipping: "+ship,"Details: "+msg.value.trim()];
    const url='https://wa.me/8619502075640?text='+encodeURIComponent(lines.join('\n'));
    showToast(l==='ar' ? 'تم تجهيز الطلب. أكمل الإرسال في واتساب.' : 'Your request is ready. Complete sending it in WhatsApp.');
    const opened=window.open(url,'_blank','noopener,noreferrer');
    if(!opened) window.location.href=url;
  });
  ['fName','fPhone','fEmail','fMsg'].forEach(id=>document.getElementById(id).addEventListener('input',e=>e.target.closest('.field').classList.remove('err')));
})();