  var reviews = [
    {t:'“Loved it!! ★★★★★”', c:'A'}, {t:'“Loved it!! ★★★★★” (repost)', c:'A'},
    {t:'“Battery died in a day”', c:'B'}, {t:'“battery died in a day…”', c:'B'},
    {t:'“😍😍😍”', c:'C'}, {t:'“Great value for money”', c:'D'},
    {t:'“Terrible. Never again.”', c:'E'}, {t:'“Très déçu, vraiment”', c:'F'}
  ];
  function chip(r, cls){ return '<span class="chip '+(cls||'dup')+'">'+r.t+' · cluster '+r.c+'</span>'; }
  function setSplit(mode){
    var train = document.getElementById('trainChips'), test = document.getElementById('testChips'), foot = document.getElementById('demoFoot');
    document.getElementById('btn-row').setAttribute('aria-pressed', mode==='row');
    document.getElementById('btn-cluster').setAttribute('aria-pressed', mode==='cluster');
    if(mode==='row'){
      train.innerHTML = chip(reviews[0],'leak')+chip(reviews[2],'leak')+chip(reviews[4])+chip(reviews[5])+chip(reviews[7]);
      test.innerHTML  = chip(reviews[1],'leak')+chip(reviews[3],'leak')+chip(reviews[6]);
      foot.innerHTML = '<strong>⚠ Leakage — the test set looks artificially easy.</strong> Clusters A and B appear on <em>both</em> sides (red). The model has effectively already seen the test reviews, so the score flatters it.';
    } else {
      train.innerHTML = chip(reviews[0],'safe')+chip(reviews[1],'safe')+chip(reviews[2],'safe')+chip(reviews[3],'safe')+chip(reviews[5])+chip(reviews[7]);
      test.innerHTML  = chip(reviews[4],'safe')+chip(reviews[6],'safe');
      foot.innerHTML = '<strong>✓ Honest evaluation.</strong> Every cluster lives on one side only. Clusters A and B stay together in train; the test set holds genuinely unseen clusters — including the emoji-only review, kept and represented rather than deleted.';
    }
  }
  setSplit('row');
  var links = Array.prototype.slice.call(document.querySelectorAll('#scenav a[data-target]'));
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(link){
          var active = link.dataset.target === e.target.id;
          link.classList.toggle('active', active);
          if(active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, {rootMargin:'-30% 0px -60% 0px'});
  links.forEach(function(link){ obs.observe(document.getElementById(link.dataset.target)); });
